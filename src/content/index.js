import en from "./en";
import ar from "./ar";
import { useLanguage } from "../context/LanguageContext";
export function useContent() {
  const { lang, pick } = useLanguage();
  return { c: lang === "ar" ? ar : en, lang, pick };
}
