import './chunk-FJBZBVPE.mjs';

// src/create-i18n-settings.ts
function createI18nSettings({
  languages,
  language,
  namespaces
}) {
  const lng = language;
  const ns = namespaces;
  return {
    supportedLngs: languages,
    fallbackLng: languages[0],
    detection: void 0,
    lng,
    load: "languageOnly",
    preload: false,
    lowerCaseLng: true,
    fallbackNS: ns,
    missingInterpolationHandler: (text, value, options) => {
      console.debug(
        `Missing interpolation value for key: ${text}`,
        value,
        options
      );
    },
    ns,
    react: {
      useSuspense: true
    }
  };
}

export { createI18nSettings };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map