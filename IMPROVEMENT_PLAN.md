# План за подобрение на сайта Petral

## 1. Потребителско изживяване (UX)

- **Търсене** — full-text search в каталога по име, марка, описание
- **Сортиране** — по цена, година, мощност
- **Пагинация** — pagination или infinite scroll
- **Wishlist / Сравнение** — сравняване на продукти side-by-side
- **Breadcrumb навигация** — подобряване в product detail страниците
- **Loading states** — skeleton loaders при зареждане

## 2. SEO и Маркетинг

- **Structured Data (JSON-LD)** — Product schema за Google Rich Results
- **Open Graph / Twitter Cards** — мета тагове за социални мрежи
- **Blog секция** — SEO съдържание и новини
- **Sitemap подобрения** — динамичен sitemap с lastmod
- **robots.txt** — добавяне
- **Canonical URLs** — предотвратяване на дублирано съдържание

## 3. Функционалност

- **Email нотификации** — имейл при ново запитване/контакт
- **PDF каталог** — генериране на PDF с продуктови спецификации
- **Споделяне в социални мрежи** — бутони за споделяне
- **Google Maps интеграция** — реална карта в контактната страница
- **Cookie consent** — GDPR съвместимост
- **Мултиезичност (i18n)** — BG/EN поддръжка

## 4. Админ панел

- **Статистики и графики** — визуализация в dashboard
- **Export данни** — CSV/Excel експорт на запитвания и контакти
- **Bulk операции** — масово изтриване/редактиране на продукти
- **Image reorder** — drag-and-drop за пренареждане на снимки
- **Audit log** — лог на действията на администраторите
- **Inquiry статус** — маркиране като „обработено", „в процес", „затворено"

## 5. Производителност

- **Image optimization** — Next.js `<Image>` с WebP, lazy loading, responsive sizes
- **Database** — миграция от SQLite към PostgreSQL
- **Caching** — HTTP cache headers, ISR за product pages
- **CDN** — Cloudflare за статични ресурси
- **Bundle analysis** — проверка за ненужни зависимости

## 6. Сигурност

- **Rate limiting** — защита на API routes
- **CSRF protection** — допълнителна защита на формите
- **Input sanitization** — по-стриктна валидация
- **Content Security Policy** — CSP headers
- **Secure file uploads** — допълнителна валидация

## 7. DevOps и Инфраструктура

- **CI/CD pipeline** — GitHub Actions за build, lint, deploy
- **Тестове** — unit и integration (Vitest/Playwright)
- **Monitoring** — error tracking (Sentry), analytics
- **Staging среда** — отделен environment за тестване
- **Backup стратегия** — автоматични backup-и на базата

---

## Ред на изпълнение

| Фаза | Задачи | Приоритет |
|------|--------|-----------|
| **Фаза 1** | Image optimization, PostgreSQL, Email нотификации, Rate limiting | Висок |
| **Фаза 2** | Търсене, сортиране, пагинация, SEO (JSON-LD, OG tags, robots.txt) | Висок |
| **Фаза 3** | Inquiry статус, Export данни, Loading states, CI/CD | Среден |
| **Фаза 4** | Blog, i18n, Cookie consent, Тестове | Среден |
| **Фаза 5** | Wishlist, PDF каталог, Audit log, Monitoring | Нисък |
