import { initializeI18nClient } from './chunk-PQ435PFM.mjs';
import './chunk-FJBZBVPE.mjs';
import { I18nextProvider } from 'react-i18next';

function I18nProvider({
  settings,
  children,
  resolver,
  instance
}) {
  useI18nClient(settings, resolver, instance);
  return /* @__PURE__ */ React.createElement(I18nextProvider, { i18n: instance }, children);
}
function useI18nClient(settings, resolver, instance) {
  if (!instance || instance.language !== settings.lng) {
    throw loadI18nInstance(settings, resolver);
  }
  return instance;
}
async function loadI18nInstance(settings, resolver) {
  return await initializeI18nClient(settings, resolver);
}

export { I18nProvider };
//# sourceMappingURL=i18n-provider.mjs.map
//# sourceMappingURL=i18n-provider.mjs.map