# Native Bridge Mini-Lib

## Слои

1. `types.ts` — расширяет глобальный `window` и описывает полезные payload'ы.
2. `platform.ts` — безопасно определяет среду (iOS, Android) через `react-device-detect` и логирует ошибки.
3. `bridge.ts` — публичное API (`nativeBridge`) с методами `openUrl`, `closeWebView`, `webAppInit`, `getBranding`.

## Добавление нового метода

1. Дополните `types.ts`, чтобы объявить новый handler в `window.webkit.messageHandlers` и/или `window.AndroidBridge`.
2. Создайте приватные функции в `bridge.ts` по аналогии (например, `shareOnIOS`, `shareOnAndroid`).
3. Добавьте публичный метод в объект `createBridge()`, прокиньте его через `PlatformActions`.

## Отладка

- Все ошибки из нативного слоя летят в `console.error` с префиксом `[IOS bridge]`/`[ANDROID bridge]`.
- Для web-стейджа без нативного окружения методы просто ничего не сделают — это помогает безопасно мокать их в браузере.
