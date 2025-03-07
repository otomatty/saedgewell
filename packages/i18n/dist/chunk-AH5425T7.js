'use strict';

var chunkDDAAVRWG_js = require('./chunk-DDAAVRWG.js');
var i18next = require('i18next');
var LanguageDetector = require('i18next-browser-languagedetector');
var resourcesToBackend = require('i18next-resources-to-backend');
var reactI18next = require('react-i18next');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var i18next__default = /*#__PURE__*/_interopDefault(i18next);
var LanguageDetector__default = /*#__PURE__*/_interopDefault(LanguageDetector);
var resourcesToBackend__default = /*#__PURE__*/_interopDefault(resourcesToBackend);

var iteration = 0;
var MAX_ITERATIONS = 20;
async function initializeI18nClient(settings, resolver) {
  const loadedLanguages = [];
  const loadedNamespaces = [];
  await i18next__default.default.use(
    resourcesToBackend__default.default(async (language, namespace, callback) => {
      const data = await resolver(language, namespace);
      if (!loadedLanguages.includes(language)) {
        loadedLanguages.push(language);
      }
      if (!loadedNamespaces.includes(namespace)) {
        loadedNamespaces.push(namespace);
      }
      return callback(null, data);
    })
  ).use(LanguageDetector__default.default).use(reactI18next.initReactI18next).init(
    chunkDDAAVRWG_js.__spreadProps(chunkDDAAVRWG_js.__spreadValues({}, settings), {
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
    return i18next__default.default;
  }
  if (loadedLanguages.length === 0 || loadedNamespaces.length === 0) {
    iteration++;
    console.debug(
      `Keeping component from rendering if no languages or namespaces are loaded. Iteration: ${iteration}. Will stop after ${MAX_ITERATIONS} iterations.`
    );
    throw new Error("No languages or namespaces loaded");
  }
  return i18next__default.default;
}

exports.initializeI18nClient = initializeI18nClient;
//# sourceMappingURL=chunk-AH5425T7.js.map
//# sourceMappingURL=chunk-AH5425T7.js.map