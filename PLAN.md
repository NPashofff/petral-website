# PetralGroup - План за уеб сайт

## Технологичен стек
- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS v4
- **База данни:** SQLite с Prisma ORM
- **Деплой:** Vercel (безплатен план за старт)

## Прогрес по стъпки

### [x] Стъпка 1: Инициализация на проекта
- Next.js 15 с TypeScript и Tailwind CSS
- Prisma инсталиран, SQLite настроен
- DB схема дефинирана (Product, Inquiry, Contact)

### [x] Стъпка 2: Layout и навигация
- Header с лого "PetralGroup" и навигационни линкове (responsive с мобилно меню)
- Footer с контактна информация и бързи връзки
- Root layout с Inter шрифт (latin + cyrillic)

### [x] Стъпка 3: Начална страница
- Hero секция с CTA бутони
- Секция категории (Трактори / АТВ) с background снимки
- Представени продукти (featured) в grid
- Секция "Защо PetralGroup" с 3 предимства

### [x] Стъпка 4: Каталог
- Списък с продукти (grid layout)
- Филтри по категория, марка, мин/макс цена
- ProductCard компонент с category badge

### [x] Стъпка 5: Детайлна страница на продукт
- Галерия снимки с миниатюри (ImageGallery компонент)
- Таблица с характеристики
- Форма "Поискай оферта" (InquiryForm)
- Breadcrumb навигация

### [x] Стъпка 6: Страници За нас и Контакти
- За нас - описание на компанията + ценности
- Контакти - форма + данни за контакт + Google Maps
- API routes: /api/contact и /api/inquiry

### [x] Стъпка 7: Seed данни и финализиране
- 12 продукта (6 трактора + 6 АТВ-та)
- SEO мета тагове на всички страници
- Build минава успешно, всички страници работят
- API routes тествани и работят

### [x] Стъпка 8: Админ панел
- Dashboard със статистики (продукти, запитвания, контакти)
- CRUD за продукти (създаване, редактиране, изтриване)
- Качване на снимки (валидация за тип и размер до 5MB)
- Преглед на запитвания и контакти
- CMS за съдържание на сайта (текстове, цветове)
- HTTP Basic Auth защита (middleware)
- API routes: /api/admin/products, /api/admin/content, /api/admin/upload

---

## Файлова структура (изпълнена)
```
Petral/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── catalog/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   ├── [id]/edit/page.tsx
│   │   │   │   └── DeleteProductButton.tsx
│   │   │   ├── inquiries/page.tsx
│   │   │   ├── contacts/page.tsx
│   │   │   └── content/page.tsx
│   │   └── api/
│   │       ├── contact/route.ts
│   │       ├── inquiry/route.ts
│   │       └── admin/
│   │           ├── products/
│   │           │   ├── route.ts
│   │           │   └── [id]/route.ts
│   │           ├── content/route.ts
│   │           └── upload/route.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductFilter.tsx
│   │   ├── ContactForm.tsx
│   │   ├── InquiryForm.tsx
│   │   ├── ImageGallery.tsx
│   │   └── ProductForm.tsx
│   ├── lib/
│   │   ├── db.ts
│   │   └── content.ts
│   └── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── images/
│   └── uploads/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

## Следващи стъпки (Фаза 2 - бъдещо)
- [x] Админ панел за управление на продукти
- [ ] Реални снимки на продуктите (заместване на Unsplash placeholder-и)
- [ ] Имейл нотификации при нови запитвания
- [ ] Миграция от SQLite към PostgreSQL при нужда
- [ ] Деплой на Vercel

## Стартиране
```bash
npm run dev             # Стартира dev сървъра на localhost:3000
npm run build           # Production build
npx tsx prisma/seed.ts  # Seed на базата с примерни данни
```
- Потребител: admin
- Парола: petral2024