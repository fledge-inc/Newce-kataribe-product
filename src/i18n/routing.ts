import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ja", "en", "zh-CN", "zh-TW", "ko", "ne"],
  defaultLocale: "ja",
  localePrefix: "always"
});

