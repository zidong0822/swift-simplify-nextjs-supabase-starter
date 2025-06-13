import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async () => {
  let locale: Locale = routing.defaultLocale;

  try {
    // 尝试从 cookies 获取语言设置
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get("NEXT_LOCALE");

    if (localeCookie && routing.locales.includes(localeCookie.value as Locale)) {
      locale = localeCookie.value as Locale;
    }
  } catch {
    // 如果无法访问 cookies（比如在静态生成时），使用默认语言
    console.log("使用默认语言:", routing.defaultLocale);
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
