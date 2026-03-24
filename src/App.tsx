import { ChangeEvent, useLayoutEffect, useState } from "react";
import "./styles/global.css";
import styles from "./App.module.css";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Checkbox } from "@/shared/ui/Checkbox";
import { DatePicker } from "@/shared/ui/DatePicker";
import { Field } from "@/shared/ui/Field";
import { Select, SelectTheme } from "@/shared/ui/Select";
import { Switch } from "@/shared/ui/Switch";
import { Tag, TagTheme, TagVariant } from "@/shared/ui/Tag";
import { nativeBridge } from "./shared/nativeBridge";
import { BrandConfig } from "./shared/types/branding";

type Option = {
  value: string;
  label: string;
};

const DEFAULT_URL = "https://example.com";

const LINK_OPTIONS: Option[] = [
  { value: "https://example.com", label: "Example" },
  { value: "https://google.com", label: "Google" },
  { value: "https://github.com", label: "GitHub" },
];

const FORM_OPTIONS: Option[] = [
  { value: "feedback", label: "Фидбек" },
  { value: "lead", label: "Заявка" },
  { value: "support", label: "Поддержка" },
];

export function App() {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [urlError, setUrlError] = useState<string | undefined>();
  const [openExternally, setOpenExternally] = useState(false);
  const [lastAction, setLastAction] = useState("Метод не вызывался");

  const [, setSelectedForm] = useState<Option>(FORM_OPTIONS[0]);
  const [, setNotes] = useState("");
  const [, setNotifications] = useState(false);
  const [, setPublishReady] = useState(false);
  const [branding, setBranding] = useState<BrandConfig | null>(null);

  useLayoutEffect(() => {
    let isMounted = true;

    nativeBridge.getBranding().then((branding) => {
      if (!isMounted) {
        return;
      }

      setBranding(branding);
      handleInit();
      Object.entries(branding).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUrlInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    if (urlError) {
      setUrlError(undefined);
    }
  };

  const handleOpenUrl = () => {
    const nextUrl = url.trim();

    if (!nextUrl) {
      setUrlError("Введите ссылку");
      return;
    }

    nativeBridge.openUrl(nextUrl, openExternally);
    setLastAction(
      `openUrl(${nextUrl}, inSeparateApp: ${openExternally ? "true" : "false"})`,
    );
  };

  const handleInit = () => {
    nativeBridge.webAppInit();
    setLastAction("webAppInit()");
  };

  const handleClose = () => {
    nativeBridge.closeWebView();
    setLastAction("closeWebView()");
  };

  return (
    <main className={styles.app}>
      <div className={styles.layout}>
        <section className={styles.card}>
          <h1 className={styles.sectionTitle}>Проверка методов bridge</h1>

          <Select
            label="Быстрая ссылка"
            subtitle="Примеры ссылок"
            options={LINK_OPTIONS}
            theme={SelectTheme.DEFAULT}
            onChange={(option) => {
              setUrl(option.value);
              setUrlError(undefined);
            }}
          />

          <label className={styles.field}>
            <span>URL для openUrl</span>
            <input
              value={url}
              onChange={handleUrlInput}
              className={`${styles.input} ${urlError ? styles.inputError : ""}`}
              placeholder="https://"
            />
            {urlError && <span className={styles.error}>{urlError}</span>}
          </label>

          <div className={styles.switchBox}>
            <Switch
              label="Открывать во внешнем приложении"
              direction="row"
              onChange={setOpenExternally}
            />
          </div>

          <div className={styles.actions}>
            <Button theme={ButtonTheme.GRADIENT} onClick={handleOpenUrl}>
              openUrl
            </Button>
            <Button onClick={handleInit}>webAppInit</Button>
            <Button onClick={handleClose}>closeWebView</Button>
          </div>

          <div className={styles.status}>
            <span className={styles.statusLabel}>Последний вызов</span>
            <code className={styles.statusValue}>{lastAction}</code>
          </div>
          <div className={styles.status}>
            <span className={styles.statusLabel}>Брендирование</span>
            <code className={styles.statusValue}>
              {JSON.stringify(branding)}
            </code>
          </div>
        </section>

        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Витрина компонентов</h2>

          <div className={styles.tagRow}>
            <Tag theme={TagTheme.NEUTRAL} variant={TagVariant.OUTLINE}>
              Default
            </Tag>
            <Tag theme={TagTheme.SUCCESS} variant={TagVariant.FILLED}>
              Success
            </Tag>
            <Tag theme={TagTheme.DANGER} variant={TagVariant.OUTLINE}>
              Warning
            </Tag>
          </div>

          <Select
            label="Тип формы"
            subtitle="Текущий выбор"
            options={FORM_OPTIONS}
            theme={SelectTheme.DEFAULT}
            onChange={setSelectedForm}
          />

          <Field
            leftLabel="Текст поля Field"
            hint="Hint text"
            placeholder="Короткий комментарий"
            onChange={setNotes}
          />

          <DatePicker leftLabel="DatePicker" hint="Hint text" />

          <div className={styles.toggles}>
            <Switch
              label="Switch"
              direction="row"
              onChange={setNotifications}
            />
            <Checkbox
              label="Checkbox"
              direction="row"
              onChange={setPublishReady}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
