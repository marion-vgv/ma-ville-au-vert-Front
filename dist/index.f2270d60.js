// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3LxIK":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "cfbf11013e3564d550893a81f2270d60";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"4leWE":[function(require,module,exports) {
require('../sass/_reset.css');
require('../sass/_vars.scss');
require('../sass/style.scss');
var _formModule = require('./formModule');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _formModuleDefault = _parcelHelpers.interopDefault(_formModule);
var _resultModule = require('./resultModule');
var _resultModuleDefault = _parcelHelpers.interopDefault(_resultModule);
const app = {
  base_url: "http://localhost:3000",
  init: async () => {
    console.log("app.init !");
    _formModuleDefault.default.setBaseUrl(app.base_url);
    _resultModuleDefault.default.setBaseUrl(app.base_url);
    app.addListeners();
    await _formModuleDefault.default.getFormOptionsFromAPI();
  },
  addListeners: () => {
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", app.handleSearchForm);
    console.log(`L'event listener is in da place !`);
    const aboutLink = document.getElementById("aboutLink");
    aboutLink.addEventListener("click", app.showAboutModal);
    const closeModalIcon = document.getElementById("closeIcon");
    closeModalIcon.addEventListener("click", app.hideAboutModal);
  },
  handleSearchForm: event => {
    _formModuleDefault.default.handleSearchForm(event);
  },
  reloadHomepage: () => {
    document.location.reload();
  },
  showAboutModal: () => {
    const modal = document.getElementById("modal");
    modal.classList.remove("isInvisible");
  },
  hideAboutModal: () => {
    const modal = document.getElementById("modal");
    modal.classList.add("isInvisible");
  }
};
document.addEventListener("DOMContentLoaded", app.init);

},{"../sass/_reset.css":"2RrnM","../sass/_vars.scss":"6QrPa","../sass/style.scss":"6H7Uv","./formModule":"eiRqM","./resultModule":"7cYwj","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"2RrnM":[function() {},{}],"6QrPa":[function() {},{}],"6H7Uv":[function() {},{}],"eiRqM":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
exports.default = formModule = {
  base_url: null,
  setBaseUrl: url => {
    formModule.base_url = url;
  },
  // Récupération des options pour générer le formulaire
  getFormOptionsFromAPI: async () => {
    try {
      const result = await fetch(`${formModule.base_url}/`);
      const json = await result.json();
      formModule.setFormOptions(json);
    } catch (error) {
      console.error(`Impossible de charger les options depuis l'API`, error);
    }
  },
  // Injection des options dans le HTML
  setFormOptions: options => {
    console.log("setFormOptions");
    // -- OPTIONS DE REGIONS
    const locationRegion = document.getElementById("locationRegion");
    for (const region of options.regions) {
      if (region.id > 5) {
        const regionOption = document.createElement("option");
        regionOption.setAttribute("value", region.id);
        const regionOptionText = document.createTextNode(region.name_region);
        regionOption.appendChild(regionOptionText);
        locationRegion.appendChild(regionOption);
      }
    }
    // -- OPTIONS DE DEPARTEMENTS
    const locationDepartment = document.getElementById("locationDepartment");
    for (const department of options.departments) {
      if (department.id < 500) {
        const departmentOption = document.createElement("option");
        departmentOption.setAttribute("value", department.id);
        const departmentOptionText = document.createTextNode(department.name_dpt);
        departmentOption.appendChild(departmentOptionText);
        locationDepartment.appendChild(departmentOption);
      }
    }
  },
  handleSearchForm: async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // 
    // VERIFICATION QUE LE FORM EST CORRECTEMENT REMPLI
    // 
    // 
    // PAR REGION : IL FAUT SELECTIONNER UNE REGION
    if (formData.get("location") === "region" && isNaN(parseInt(formData.get("locationRegion")))) {
      const fieldRegion = document.getElementById("locationRegion").closest(".radioButtonOption");
      fieldRegion.classList.add("error");
      const formBlock = fieldRegion.closest(".formBlockRadio");
      formBlock.addEventListener("click", () => {
        fieldRegion.classList.remove("error");
      });
    }
    // PAR DEPARTEMENT : IL FAUT SELECTIONNER UN DEPARTEMENT
    if (formData.get("location") === "department" && isNaN(parseInt(formData.get("locationDepartment")))) {
      const fieldDepartment = document.getElementById("locationDepartment").closest(".radioButtonOption");
      fieldDepartment.classList.add("error");
      const formBlock = fieldDepartment.closest(".formBlockRadio");
      formBlock.addEventListener("click", () => {
        fieldDepartment.classList.remove("error");
      });
    }
    // AIRE URBAINE : IL FAUT FAIRE UNE SELECTION
    if (formData.get("type") === "urbaine" && isNaN(parseInt(formData.get("uu")))) {
      const fieldUU = document.getElementById("uu").closest(".radioButtonOption");
      fieldUU.classList.add("error");
      const formBlock = fieldUU.closest(".formBlockRadio");
      formBlock.addEventListener("click", () => {
        fieldUU.classList.remove("error");
      });
    }
    // POPULATION : IL FAUT QUE GAUCHE SOIT INFERIEUR A DROITE
    if (parseInt(formData.get("townMin")) > parseInt(formData.get("townMax"))) {
      const fieldMin = document.getElementById("townMin").closest(".formBlockSelect");
      const fieldMax = document.getElementById("townMax").closest(".formBlockSelect");
      fieldMin.classList.add("error");
      fieldMax.classList.add("error");
      const formBlock = fieldMin.closest(".formBlock");
      formBlock.addEventListener("click", () => {
        fieldMin.classList.remove("error");
        fieldMax.classList.remove("error");
      });
    }
    // ECOLE : IL FAUT SELECTIONNER AU MOINS UN TYPE D'ECOLE
    if (formData.get("school") === "true" && formData.get("schoolOptions") === null) {
      const fieldSchool = document.getElementById("schoolOptions").closest(".radioButtonOption");
      fieldSchool.classList.add("error");
      const formBlock = fieldSchool.closest(".formBlockRadio");
      formBlock.addEventListener("click", () => {
        fieldSchool.classList.remove("error");
      });
          // 
      // SI LE FORM EST REMPLI CORRECTEMENT :
      // 
} else // 
    // SI LE FORM EST REMPLI CORRECTEMENT :
    // 
    {
      // CACHER LE FORM DE RECHERCHE
      const form = document.getElementById("searchForm");
      form.classList.add("isInvisible");
      // AFFICHER LE LOADER
      const loader = document.getElementById("searchInProgress");
      loader.classList.remove("isInvisible");
      // ENVOYER LA RECHERCHE AU BACK
      try {
        const result = await fetch(`${formModule.base_url}/`, {
          method: "POST",
          body: formData
        });
        if (result.ok) {
          const json = await result.json();
          console.log(`On a reçu un résultat !`);
          console.log(json);
          console.log(json.length);
          resultModule.showSearchResults(json);
        } else {
          console.error("On a eu un pépin sur le serveur");
        }
      } catch (error) {
        console.error(`Impossible de charger les résultats de la recherche depuis l'API`, error);
      }
    }
  }
};

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"7cYwj":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _app = require('./app');
var _appDefault = _parcelHelpers.interopDefault(_app);
exports.default = resultModule = {
  base_url: null,
  setBaseUrl: url => {
    resultModule.base_url = url;
  },
  showSearchResults: results => {
    console.log("Search results !");
    // GENERER LE MENU DES RESULTATS
    resultModule.handleSearchMenuOptions(results);
    // CACHER LE LOADER
    const loader = document.getElementById("searchInProgress");
    loader.classList.add("isInvisible");
    // AFFICHER LA SECTION D'AFFICHAGE DES RESULTATS
    const searchResults = document.getElementById("searchResults");
    searchResults.classList.remove("isInvisible");
    // AFFICHER LE NOMBRE DE RESULTATS DISPONIBLES
    const resultSentence = document.getElementById("searchResultsNumber");
    if (results.length == 0) {
      resultSentence.textContent = `Il n'existe pas de ville correspondant à votre recherche`;
    }
    if (results.length == 1) {
      resultSentence.textContent = `Il existe ${results.length} ville correspondant à votre recherche`;
    }
    if (results.length > 1) {
      resultSentence.textContent = `Il existe ${results.length} villes correspondant à votre recherche`;
    }
    // GENERER 1 FICHE VILLE / RESULTAT
    for (const result of results) {
      resultModule.makeTownCardInDOM(result);
    }
  },
  makeTownCardInDOM: data => {
    console.log(data);
    const template = document.getElementById("townCardTemplate");
    const node = document.importNode(template.content, true);
    // NOM DE VILLE
    const townName = node.querySelector(".townCardName");
    townName.textContent = data.name_town;
    // NOM DE REGION
    const townRegion = node.querySelector(".townCardRegion");
    townRegion.textContent = `(${data.region.name_region})`;
    // NOM DE DEPARTEMENT
    const townDepartment = node.querySelector(".townCardDepartment");
    townDepartment.textContent = data.department.name_dpt;
    // ZONE URBAINE OU ZONE RURALE
    const townUU = node.querySelector(".townCardUU");
    const uuName = data.urban_unit.name_uu;
    console.log("uuName");
    console.log(uuName);
    if (uuName.includes("hors unité urbaine") == true) {
      const uuNameUpdated = uuName.replace("hors unité urbaine", "rurale");
      console.log(uuName);
      townUU.textContent = uuNameUpdated;
    } else {
      townUU.textContent = `Commune appartenant à l'aire urbaine de ${uuName}`;
    }
    // NB HABITANTS
    const townPopulation = node.querySelector(".townCardPop");
    townPopulation.textContent = `${data.population.population_total} habitants`;
    // ECOLES
    const townSchool = node.querySelector(".townCardSchool");
    const schoolSection = node.querySelector(".schoolSection");
    const schoolIcon = node.querySelector(".schoolIcon");
    const dataKeys = Object.keys(data);
    if (dataKeys.includes("school") == true) {
      const schools = data.school;
      if (schools.length == 1) {
        townSchool.textContent = `Il y a ${data.school.length} école correspondant à votre recherche :`;
      }
      if (schools.length > 1) {
        townSchool.textContent = `Il y a ${data.school.length} écoles correspondant à votre recherche :`;
      }
      const schoolList = document.createElement("ul");
      schoolList.setAttribute("class", "schoolList");
      townSchool.appendChild(schoolList);
      for (const school of schools) {
        const schoolElement = document.createElement("li");
        schoolElement.setAttribute("class", "schoolElement");
        schoolElement.textContent = `- ${school.name_place} (${school.secteur})`;
        schoolList.appendChild(schoolElement);
      }
    } else {
      townSchool.setAttribute("hidden", "");
      schoolSection.setAttribute("hidden", "");
      schoolIcon.setAttribute("hidden", "");
    }
    // AJOUT DE LA CARTE AU DOM
    document.getElementById("searchResultsContainer").appendChild(node);
  },
  handleSearchMenuOptions: () => {
    // NOUVELLE RECHERCHE : RELOAD DE LA PAGE D'ACCUEIL
    const newSearch = document.getElementById("newSearch");
    newSearch.addEventListener("click", _appDefault.default.reloadHomepage);
  }
};

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./app":"4leWE"}]},["3LxIK","4leWE"], "4leWE", "parcelRequire0b0c")

//# sourceMappingURL=index.f2270d60.js.map