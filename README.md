# Mini App Template

Шаблон для разработки Mini Apps, интегрируемых в мобильное приложение УЖКХ.

##  Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для production
npm run build

# Предпросмотр production-сборки
npm run preview
```

Сервер разработки запускается на `http://localhost:4173`

---

##  Структура проекта

```
src/
├── shared/
│   ├── nativeBridge/     # Bridge для коммуникации с нативным приложением
│   │   ├── bridge.ts     # Реализация bridge-методов
│   │   ├── types.ts      # TypeScript типы для bridge
│   │   └── platform.ts   # Определение платформы (iOS/Android)
│   ├── types/
│   │   └── branding.ts   # Типы для брендирования
│   └── ui/               # UI компоненты
│       ├── Button/
│       ├── Card/
│       ├── Checkbox/
│       ├── DatePicker/
│       ├── Drawer/
│       ├── Field/
│       ├── ImageUploader/
│       ├── Portal/
│       ├── Select/
│       ├── Switch/
│       └── Tag/
├── styles/
│   └── global.css        # Глобальные стили
├── App.tsx               # Корневой компонент
└── main.tsx              # Точка входа
```

---

##  Авторизация

Авторизация осуществляется **автоматически через нативное приложение**. Mini App не управляет токенами и сессией самостоятельно.

### Принцип работы:

1. **Инициализация** — при открытии WebView нативное приложение вызывает `webAppInit()`
2. **Контекст пользователя** — передаётся из нативного приложения через `getBranding()` или отдельные bridge-методы
3. **Защита** — доступ к Mini App возможен только из авторизованного приложения

### Bridge методы для авторизации:

```typescript
import { nativeBridge } from '@/shared/nativeBridge';

// Инициализация WebView (вызывается автоматически)
nativeBridge.webAppInit();

// Получение данных брендирования (включает user context)
const branding = await nativeBridge.getBranding();
```

### Получение данных пользователя:

Данные пользователя передаются из нативного приложения через:
- **URL params** при открытии WebView
- **PostMessage API** для iOS/Android
- **Branding config** — объект с настройками и метаданными

---

##  UI Компоненты

### Button

Кнопка с несколькими темами оформления.

```tsx
import { Button, ButtonTheme } from '@/shared/ui/Button';

<Button onClick={handleClick}>Default</Button>
<Button theme={ButtonTheme.GRADIENT}>Gradient</Button>
<Button theme={ButtonTheme.ACTIVE}>Active</Button>
<Button theme={ButtonTheme.DISABLED}>Disabled</Button>
```

**Пропсы:**
| Проп | Тип | Описание |
|------|-----|----------|
| `children` | `ReactNode` | Содержимое кнопки |
| `onClick` | `() => void` | Обработчик клика |
| `theme` | `ButtonTheme` | Тема оформления |
| `className` | `string` | Дополнительный CSS класс |

---

### Select

Выпадающий список с поиском и порталом.

```tsx
import { Select, SelectTheme } from '@/shared/ui/Select';

const options = [
  { value: 'feedback', label: 'Фидбек' },
  { value: 'lead', label: 'Заявка' },
];

<Select
  label="Тип формы"
  subtitle="Выберите тип"
  options={options}
  theme={SelectTheme.DEFAULT}
  onChange={(option) => console.log(option.value)}
/>
```

**Пропсы:**
| Проп | Тип | Описание |
|------|-----|----------|
| `label` | `string` | Заголовок |
| `subtitle` | `string` | Подзаголовок |
| `options` | `Option[]` | Массив опций `{value, label}` |
| `theme` | `SelectTheme` | Тема оформления |
| `onChange` | `(option: Option) => void` | Обработчик выбора |
| `error` | `string` | Текст ошибки |
| `bordered` | `boolean` | Рамка вокруг компонента |

---

### Field

Многострочное текстовое поле (textarea).

```tsx
import { Field } from '@/shared/ui/Field';

<Field
  leftLabel="Комментарий"
  rightLabel="0/500"
  hint="Необязательное поле"
  placeholder="Введите текст..."
  onChange={(value) => console.log(value)}
/>
```

**Пропсы:**
| Проп | Тип | Описание |
|------|-----|----------|
| `leftLabel` | `string` | Левый заголовок |
| `rightLabel` | `string` | Правый заголовок |
| `placeholder` | `string` | Placeholder |
| `hint` | `string` | Подсказка под полем |
| `error` | `string` | Текст ошибки |
| `onChange` | `(value: string) => void` | Обработчик изменения |

---

### DatePicker

Поле выбора даты.

```tsx
import { DatePicker } from '@/shared/ui/DatePicker';

<DatePicker
  leftLabel="Дата рождения"
  hint="Формат: ДД.ММ.ГГГГ"
/>
```

---

### Switch

Переключатель (toggle).

```tsx
import { Switch } from '@/shared/ui/Switch';

<Switch
  label="Уведомления"
  direction="row"
  onChange={(checked) => console.log(checked)}
/>
```

**Пропсы:**
| Проп | Тип | Описание |
|------|-----|----------|
| `label` | `string` | Подпись |
| `direction` | `'row' \| 'column'` | Направление расположения |
| `onChange` | `(checked: boolean) => void` | Обработчик изменения |

---

### Checkbox

Чекбокс.

```tsx
import { Checkbox } from '@/shared/ui/Checkbox';

<Checkbox
  label="Согласен с условиями"
  direction="row"
  onChange={(checked) => console.log(checked)}
/>
```

---

### Tag

Тег/бейдж для отображения статусов.

```tsx
import { Tag, TagTheme, TagVariant } from '@/shared/ui/Tag';

<Tag theme={TagTheme.NEUTRAL} variant={TagVariant.OUTLINE}>Default</Tag>
<Tag theme={TagTheme.SUCCESS} variant={TagVariant.FILLED}>Success</Tag>
<Tag theme={TagTheme.DANGER} variant={TagVariant.OUTLINE}>Warning</Tag>
```

**Темы:** `NEUTRAL`, `SUCCESS`, `DANGER`, `WARNING`, `INFO`

**Варианты:** `FILLED`, `OUTLINE`

---

### ImageUploader

Загрузчик изображений с превью.

```tsx
import { ImageUploader } from '@/shared/ui/ImageUploader';

<ImageUploader
  onUpload={(file) => console.log(file)}
  maxSize={5 * 1024 * 1024} // 5MB
/>
```

---

## 🔌 Native Bridge

Модуль для коммуникации с нативным приложением (iOS/Android).

### Методы:

```typescript
import { nativeBridge } from '@/shared/nativeBridge';

// Открыть URL (внутри или снаружи приложения)
nativeBridge.openUrl('https://example.com', false);

// Закрыть WebView
nativeBridge.closeWebView();

// Инициализация (вызывается автоматически)
nativeBridge.webAppInit();

// Получить настройки брендирования
const branding = await nativeBridge.getBranding();
```

### BrandConfig (в разработке, в текущий момент просьба использовать внутренние стили): 

```typescript
interface BrandConfig {
  primary: string;           // Основной цвет (#00a539)
  secondary: string;         // Вторичный цвет
  muted: string;             // Приглушённый цвет
  primaryActive: string;     // Цвет активного состояния
  textPrimary: string;       // Основной текст
  textSecondary: string;     // Вторичный текст
  backgroundGray: string;    // Серый фон
  backgroundWhite: string;   // Белый фон
  red: string;               // Цвет ошибки
  spaceSmall: string;        // Малый отступ
  spaceMedium: string;       // Средний отступ
  spaceLarge: string;        // Большой отступ
  spaceExtraLarge: string;   // Очень большой отступ
  buttonSpacing: string;     // Padding кнопок
  buttonHeight: string;      // Высота кнопок
  cornerRadius: string;      // Радиус скругления
  cornerRadiusBig: string;   // Большой радиус
}
```

---

##  Брендирование

CSS переменные автоматически устанавливаются из `BrandConfig`:

```css
/* Пример использования в CSS */
.my-button {
  background-color: var(--primary);
  color: var(--textPrimary);
  padding: var(--buttonSpacing);
  border-radius: var(--cornerRadius);
}
```

---

## 🛠 Технологии

- **React 19** — UI библиотека
- **TypeScript** — типизация
- **Vite** — сборщик
- **PostCSS** — обработка CSS
- **@headlessui/react** — доступные UI примитивы
- **@emotion** — CSS-in-JS
- **classnames** — условные CSS классы

---

## 📱 Поддерживаемые платформы

- iOS 14+
- Android 8.0+
- Web (для разработки)
