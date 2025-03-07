import { __spreadProps, __spreadValues } from './chunk-FJBZBVPE.mjs';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

var iteration = 0;
var MAX_ITERATIONS = 20;
async function initializeI18nClient(settings, resolver) {
  const loadedLanguages = [];
  const loadedNamespaces = [];
  await i18next.use(
    resourcesToBackend(async (language, namespace, callback) => {
      const data = await resolver(language, namespace);
      if (!loadedLanguages.includes(language)) {
        loadedLanguages.push(language);
      }
      if (!loadedNamespaces.includes(namespace)) {
        loadedNamespaces.push(namespace);
      }
      return callback(null, data);
    })
  ).use(LanguageDetector).use(initReactI18next).init(
    __spreadProps(__spreadValues({}, settings), {
      detection: {
        order: ["htmlTag", "cookie", "navigator"],
        caches: ["cookie"],
        lookupCookie: "lang"
      },
      interpolation: {
        escapeValue: false
      }
    }),
    (err) => {
      if (err) {
        console.error("Error initializing i18n client", err);
      }
    }
  );
  if (iteration >= MAX_ITERATIONS) {
    console.debug(`Max iterations reached: ${MAX_ITERATIONS}`);
    return i18next;
  }
  if (loadedLanguages.length === 0 || loadedNamespaces.length === 0) {
    iteration++;
    console.debug(
      `Keeping component from rendering if no languages or namespaces are loaded. Iteration: ${iteration}. Will stop after ${MAX_ITERATIONS} iterations.`
    );
    throw new Error("No languages or namespaces loaded");
  }
  return i18next;
}

export { initializeI18nClient };
//# sourceMappingURL=chunk-PQ435PFM.mjs.map
//# sourceMappingURL=chunk-PQ435PFM.mjs.map