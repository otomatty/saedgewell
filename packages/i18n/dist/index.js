'use strict';

require('./chunk-DDAAVRWG.js');

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

exports.createI18nSettings = createI18nSettings;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map