# Deployment — Petral

## Архитектура

```
Браузър → Cloudflare CDN → Cloudflare Tunnel → TrueNAS Scale → Docker контейнер
```

- **Платформа**: TrueNAS Scale (Custom App)
- **Контейнер**: `npashofff/petral-web:latest` (Docker Hub)
- **Tunnel**: Cloudflare Tunnel (`tunelpetral` app на TrueNAS)
- **Домейн**: `new.petralgroup.bg` (production preview)

---

## Docker Image

- **Registry**: Docker Hub — `npashofff/petral-web:latest`
- **Base**: `node:20-alpine`
- **Архитектура**: `linux/amd64` (задължително за TrueNAS)
- **Build**: multi-stage (deps → builder → runner)

### Build и Push

```bash
# От проектната директория (на Mac с Apple Silicon):
docker buildx build --platform linux/amd64 -t npashofff/petral-web:latest --push .
```

> **Важно**: TrueNAS работи на amd64. Ако build-ваш от Apple Silicon Mac, задължително ползвай `--platform linux/amd64`.

---

## TrueNAS Scale — Настройки на Custom App

### Container Image
| Поле | Стойност |
|------|----------|
| Image | `npashofff/petral-web` |
| Tag | `latest` |

### Port Forwarding
| Container Port | Host Port | Protocol |
|---|---|---|
| 3000 | 3333 | TCP |

### Environment Variables
| Name | Value |
|------|-------|
| `NODE_ENV` | `production` |
| `ADMIN_SECRET` | *(секретен ключ за админ панела)* |
| `RESEND_API_KEY` | *(Resend API ключ за email нотификации)* |
| `NOTIFICATION_EMAIL` | `admin@petral.bg` |

### Storage (Host Path Volumes)
| Host Path | Mount Path | Описание |
|---|---|---|
| `/mnt/pool/apps/petral/data` | `/app/data` | SQLite база данни |
| `/mnt/pool/apps/petral/uploads` | `/app/public/uploads` | Качени снимки |

> Ако има permission errors, задай ownership: `sudo chown -R 1001:1001 /mnt/pool/apps/petral/data /mnt/pool/apps/petral/uploads`

### Network
- **Restart Policy**: Unless Stopped
- **Host Network**: НЕ (ползва port mapping)

---

## Cloudflare Tunnel — `tunelpetral`

### TrueNAS App настройки
| Поле | Стойност |
|------|----------|
| Image | `cloudflare/cloudflared:latest` |
| Environment | `TUNNEL_TOKEN=<token от Cloudflare>` |
| Host Network | **ДА** (за достъп до host портове) |

### Cloudflare Dashboard Routes

**Zero Trust → Networks → Tunnels → Petral → Public Hostname**

| Subdomain | Domain | Service URL |
|---|---|---|
| *(празно)* | `petralgroup.bg` | `http://192.168.1.10:3000` |
| `new` | `petralgroup.bg` | `http://192.168.1.10:3333` |

DNS записите (тип `Tunnel`) се създават автоматично в Cloudflare DNS.

---

## Процес на обновяване

1. Направи промени в кода локално
2. Build и push нов image:
   ```bash
   docker buildx build --platform linux/amd64 -t npashofff/petral-web:latest --push .
   ```
3. В TrueNAS — спри и стартирай `petral-web` приложението (или от Shell):
   ```bash
   sudo docker pull npashofff/petral-web:latest
   sudo docker restart ix-petral-web-petral-web-1
   ```

---

## Entrypoint

При всяко стартиране контейнерът изпълнява `entrypoint.sh`:
1. Копира Prisma schema в `/app/data/`
2. Изпълнява `prisma db push` (миграция на схемата)
3. Изпълнява `seed.js` (идемпотентен — пропуска ако има данни)
4. Стартира Next.js server

---

## Полезни команди (TrueNAS Shell)

```bash
# Логове на приложението
sudo docker logs ix-petral-web-petral-web-1 --tail 50

# Логове на tunnel-а
sudo docker logs ix-tunelpetral-tunelpetral-1 --tail 20

# Списък контейнери
sudo docker ps | grep petral

# Рестарт на приложението
sudo docker restart ix-petral-web-petral-web-1

# Pull нов image
sudo docker pull npashofff/petral-web:latest
```
