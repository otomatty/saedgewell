import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../chunk-MTTMPZ3H.mjs';
import '../chunk-3F2QG6WC.mjs';
import '../chunk-WKYHJYPA.mjs';
import '../chunk-C5AMXPVO.mjs';
import { useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector({
  onChange
}) {
  const { i18n } = useTranslation();
  const { language: currentLanguage, options } = i18n;
  const locales = options.supportedLngs.filter(
    (locale) => locale.toLowerCase() !== "cimode"
  );
  const languageNames = useMemo(() => {
    return new Intl.DisplayNames([currentLanguage], {
      type: "language"
    });
  }, [currentLanguage]);
  const [value, setValue] = useState(i18n.language);
  const languageChanged = useCallback(
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
  return /* @__PURE__ */ React.createElement(Select, { value, onValueChange: languageChanged }, /* @__PURE__ */ React.createElement(SelectTrigger, null, /* @__PURE__ */ React.createElement(SelectValue, null)), /* @__PURE__ */ React.createElement(SelectContent, null, locales.map((locale) => {
    var _a;
    const label = capitalize((_a = languageNames.of(locale)) != null ? _a : locale);
    const option = {
      value: locale,
      label
    };
    return /* @__PURE__ */ React.createElement(SelectItem, { value: option.value, key: option.value }, option.label);
  })));
}
function capitalize(lang) {
  return lang.slice(0, 1).toUpperCase() + lang.slice(1);
}

export { LanguageSelector };
//# sourceMappingURL=language-selector.mjs.map
//# sourceMappingURL=language-selector.mjs.map