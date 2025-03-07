'use strict';

var chunkO36ZS4SX_js = require('../chunk-O36ZS4SX.js');
require('../chunk-XKMXOZKR.js');
require('../chunk-XE52ECJH.js');
require('../chunk-GNZACLC7.js');
var react = require('react');
var reactI18next = require('react-i18next');

function LanguageSelector({
  onChange
}) {
  const { i18n } = reactI18next.useTranslation();
  const { language: currentLanguage, options } = i18n;
  const locales = options.supportedLngs.filter(
    (locale) => locale.toLowerCase() !== "cimode"
  );
  const languageNames = react.useMemo(() => {
    return new Intl.DisplayNames([currentLanguage], {
      type: "language"
    });
  }, [currentLanguage]);
  const [value, setValue] = react.useState(i18n.language);
  const languageChanged = react.useCallback(
    async (locale) => {
      setValue(locale);
      if (onChange) {
        onChange(locale);
      }
      await i18n.changeLanguage(locale);
      window.location.reload();
    },
    [i18n, onChange]
  );
  return /* @__PURE__ */ React.createElement(chunkO36ZS4SX_js.Select, { value, onValueChange: languageChanged }, /* @__PURE__ */ React.createElement(chunkO36ZS4SX_js.SelectTrigger, null, /* @__PURE__ */ React.createElement(chunkO36ZS4SX_js.SelectValue, null)), /* @__PURE__ */ React.createElement(chunkO36ZS4SX_js.SelectContent, null, locales.map((locale) => {
    var _a;
    const label = capitalize((_a = languageNames.of(locale)) != null ? _a : locale);
    const option = {
      value: locale,
      label
    };
    return /* @__PURE__ */ React.createElement(chunkO36ZS4SX_js.SelectItem, { value: option.value, key: option.value }, option.label);
  })));
}
function capitalize(lang) {
  return lang.slice(0, 1).toUpperCase() + lang.slice(1);
}

exports.LanguageSelector = LanguageSelector;
//# sourceMappingURL=language-selector.js.map
//# sourceMappingURL=language-selector.js.map