'use strict';

var chunkAH5425T7_js = require('./chunk-AH5425T7.js');
require('./chunk-DDAAVRWG.js');
var reactI18next = require('react-i18next');

function I18nProvider({
  settings,
  children,
  resolver,
  instance
}) {
  useI18nClient(settings, resolver, instance);
  return /* @__PURE__ */ React.createElement(reactI18next.I18nextProvider, { i18n: instance }, children);
}
function useI18nClient(settings, resolver, instance) {
  if (!instance || instance.language !== settings.lng) {
    throw loadI18nInstance(settings, resolver);
  }
  return instance;
}
async function loadI18nInstance(settings, resolver) {
  return await chunkAH5425T7_js.initializeI18nClient(settings, resolver);
}

exports.I18nProvider = I18nProvider;
//# sourceMappingURL=i18n-provider.js.map
//# sourceMappingURL=i18n-provider.js.map