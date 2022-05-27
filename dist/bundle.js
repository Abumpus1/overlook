/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const getData = (dataLocation) => {
  return fetch(`http://localhost:3001/api/v1/${dataLocation}`)
 .then(response => {
   if (!response.ok) {
     throw Error(response.statusText)
    }
    return response.json()
  })
  .catch(err => console.log(err));
}

const postData = (userID, date, roomNum) => {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    body: JSON.stringify({
      userID: userID,
      date: date,
      roomNumber: roomNum
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .catch(err => console.log(err));
}



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 4 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* -------- GENERAL -------- */\n\n* {\n  font-family: Calibri, sans-serif;\n  font-size: 16pt;\n  margin: 0;\n}\n\nhtml, body {\n  height: 100%;\n  overflow: hidden;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  height: 85%;\n  overflow: hidden;\n}\n\nbutton {\n  background: #015524;\n  border: 0;\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  font-size: 12pt;\n  max-width: 200px;\n}\n\nlabel {\n  cursor: pointer;\n}\n\ninput {\n  cursor: pointer;\n}\n\n\n/* -------- MULTI USE -------- */\n\n.bookings-list {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 50px;\n  width: 100vw;\n}\n\n.user-booking-box, .booking-box {\n  border: solid grey 1px;\n  display: flex;\n  margin: 10px 5vw;\n  min-width: 650px;\n  padding: 10px;\n}\n\n.user-booking-box > div, .booking-box > div {\n  padding-left: 10px;\n  width: 70%;\n}\n\n.user-booking-box img, .booking-box img {\n  border: solid lightgray 1px;\n  height: 130px;\n  width: 180px;\n}\n\n.user-booking-box h4, .booking-box h4 {\n  color: #015524;\n  margin-bottom: 10px;\n}\n\n.box-line {\n  border-bottom: solid lightgray 1px;\n  margin-bottom: 5px;\n  width: 100%;\n}\n\n\n/* -------- LOGIN -------- */\n\n.login-page {\n  align-items: center;\n  background-color: black;\n  display: flex;\n  height: 100vh;\n  justify-content: center;\n  position: relative;\n  width: 100vw;\n  z-index: 1;\n}\n\n.login-image {\n  filter: blur(8px);\n  left: -10vw;\n  position: absolute;\n  right: -10vw;\n  width: 120vw;\n  z-index: 2;\n}\n\n.login-container {\n  align-items: center;\n  background-color: #efe6df;\n  border-radius: 30px;\n  box-shadow:\n  1.9px 1px 3.6px rgba(0, 0, 0, 0.153),\n  5.4px 2.6px 10px rgba(0, 0, 0, 0.22),\n  13px 6.3px 24.1px rgba(0, 0, 0, 0.287),\n  43px 21px 80px rgba(0, 0, 0, 0.44);\n  display: flex;\n  filter: none;\n  flex-direction: column;\n  height: 40vh;\n  justify-content: center;\n  min-width: 450px;\n  min-height: 300px;\n  width: 35vw;\n  z-index: 3;\n}\n\nh1 {\n  color: #015524;\n  font-family: \"URW Chancery L\", cursive;\n  font-size: 30pt;\n  text-shadow: 1px 1px 1px black;\n}\n\n.login-container h2 {\n  font-weight: 300;\n}\n\n.login-container div {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin-top: 20px;\n}\n\n.login-container label {\n  cursor: default;\n}\n\n.login-container input {\n  border-radius: 15px;\n  cursor: text;\n  text-indent: 10px;\n}\n\n.sign-in {\n  height: 40px;\n  margin: 10px;\n  width: 120px;\n}\n\n.login-err {\n  color: red;\n}\n\n\n/* -------- NAV BAR -------- */\n\nnav {\n  align-items: center;\n  background: #efe6df;\n  border-bottom: solid black 1px;\n  display: flex;\n  height: 15%;\n  justify-content: space-between;\n  padding: 0 5vw;\n}\n\n.logo {\n  height: 12vh;\n}\n\n.return-to-dashboard, .book-now {\n  height: 60px;\n  width: 130px;\n}\n\n\n/* -------- DASHBOARD -------- */\n\n.dashboard-page {\n  overflow: hidden;\n  overflow-y: auto;\n  position: relative;\n}\n\n.stanley-box {\n  align-items: center;\n  display: flex;\n  height: 45vh;\n  justify-content: center;\n  overflow: hidden;\n  padding-bottom: 5vh;\n  width: 100vw;\n}\n\n.stanley {\n  width: 100vw;\n}\n\n.user-total-box {\n  align-items: flex-end;\n  background: #efe6df;\n  border-radius: 0 0 10px 10px;\n  display: flex;\n  height: 14vh;\n  justify-content: center;\n  margin-left: 35px;\n  padding: 5px;\n  padding-bottom: 1vw;\n  position: sticky;\n  top: -9vh;\n  width: 20vw;\n}\n\n.user-total-box h2, .user-total-box span {\n  font-size: 1.8vw;\n}\n\n.dashboard-tag {\n  border-bottom: solid #015524 3px;\n}\n\n.dashboard-content {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  margin-top: -14vh;\n  overflow: hidden;\n  overflow-y: auto;\n  z-index: 2;\n}\n\n.user-booking-box p {\n  margin-top: 20px;\n  font-size: 12pt;\n}\n\n\n/* -------- BOOKINGS PAGE -------- */\n\n.booking-select-page {\n  display: flex;\n  flex-direction: row-reverse;\n  overflow-y: auto;\n  position: relative;\n}\n\n.available-bookings-container {\n  height: auto;\n  overflow: hidden;\n  overflow-y: scroll;\n  padding-bottom: 5vh;\n}\n\n.booking-box {\n  min-width: 500px;\n  position: relative;\n  width: 50vw;\n}\n\n.booking-box button {\n  bottom: 10px;\n  height: 50px;\n  position: absolute;\n  right: 10px;\n  width: 120px;\n}\n\n.booking-box p {\n  font-size: 12pt;\n}\n\n.cpn {\n  color: #015524;\n  font-weight: bold;\n  margin-top: 15px;\n}\n\n\n/* ---- aside ---- */\n\n.bookings-aside {\n  display: flex;\n  justify-content: center;\n  width: 45vw;\n}\n\n.bookings-aside input {\n  margin: 10px 5px 10px 10px;\n}\n\n.all-bookings-box {\n  align-items: center;\n  background: #efe6df;\n  border: solid black 1px;\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  height: 400px;\n  justify-content: space-between;\n  margin-top: 40px;\n  min-width: 250px;\n  padding: 20px 0;\n  width: 70%;\n}\n\n.filter-room-types {\n  border-radius: 15px;\n  display: flex;\n  flex-direction: column;\n  margin: 0 5px;\n}\n\n.date-input-box {\n  display: flex;\n  flex-direction: column;\n}\n\n#bookDateInput {\n  margin-left: 0;\n}\n\n.date-err {\n  color: red;\n}\n\n.update-booking-search {\n  height: 32px;\n}\n\n\n/* -------- HIDDEN -------- */\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["/* -------- GENERAL -------- */\n\n* {\n  font-family: Calibri, sans-serif;\n  font-size: 16pt;\n  margin: 0;\n}\n\nhtml, body {\n  height: 100%;\n  overflow: hidden;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  height: 85%;\n  overflow: hidden;\n}\n\nbutton {\n  background: #015524;\n  border: 0;\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  font-size: 12pt;\n  max-width: 200px;\n}\n\nlabel {\n  cursor: pointer;\n}\n\ninput {\n  cursor: pointer;\n}\n\n\n/* -------- MULTI USE -------- */\n\n.bookings-list {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 50px;\n  width: 100vw;\n}\n\n.user-booking-box, .booking-box {\n  border: solid grey 1px;\n  display: flex;\n  margin: 10px 5vw;\n  min-width: 650px;\n  padding: 10px;\n}\n\n.user-booking-box > div, .booking-box > div {\n  padding-left: 10px;\n  width: 70%;\n}\n\n.user-booking-box img, .booking-box img {\n  border: solid lightgray 1px;\n  height: 130px;\n  width: 180px;\n}\n\n.user-booking-box h4, .booking-box h4 {\n  color: #015524;\n  margin-bottom: 10px;\n}\n\n.box-line {\n  border-bottom: solid lightgray 1px;\n  margin-bottom: 5px;\n  width: 100%;\n}\n\n\n/* -------- LOGIN -------- */\n\n.login-page {\n  align-items: center;\n  background-color: black;\n  display: flex;\n  height: 100vh;\n  justify-content: center;\n  position: relative;\n  width: 100vw;\n  z-index: 1;\n}\n\n.login-image {\n  filter: blur(8px);\n  left: -10vw;\n  position: absolute;\n  right: -10vw;\n  width: 120vw;\n  z-index: 2;\n}\n\n.login-container {\n  align-items: center;\n  background-color: #efe6df;\n  border-radius: 30px;\n  box-shadow:\n  1.9px 1px 3.6px rgba(0, 0, 0, 0.153),\n  5.4px 2.6px 10px rgba(0, 0, 0, 0.22),\n  13px 6.3px 24.1px rgba(0, 0, 0, 0.287),\n  43px 21px 80px rgba(0, 0, 0, 0.44);\n  display: flex;\n  filter: none;\n  flex-direction: column;\n  height: 40vh;\n  justify-content: center;\n  min-width: 450px;\n  min-height: 300px;\n  width: 35vw;\n  z-index: 3;\n}\n\nh1 {\n  color: #015524;\n  font-family: \"URW Chancery L\", cursive;\n  font-size: 30pt;\n  text-shadow: 1px 1px 1px black;\n}\n\n.login-container h2 {\n  font-weight: 300;\n}\n\n.login-container div {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin-top: 20px;\n}\n\n.login-container label {\n  cursor: default;\n}\n\n.login-container input {\n  border-radius: 15px;\n  cursor: text;\n  text-indent: 10px;\n}\n\n.sign-in {\n  height: 40px;\n  margin: 10px;\n  width: 120px;\n}\n\n.login-err {\n  color: red;\n}\n\n\n/* -------- NAV BAR -------- */\n\nnav {\n  align-items: center;\n  background: #efe6df;\n  border-bottom: solid black 1px;\n  display: flex;\n  height: 15%;\n  justify-content: space-between;\n  padding: 0 5vw;\n}\n\n.logo {\n  height: 12vh;\n}\n\n.return-to-dashboard, .book-now {\n  height: 60px;\n  width: 130px;\n}\n\n\n/* -------- DASHBOARD -------- */\n\n.dashboard-page {\n  overflow: hidden;\n  overflow-y: auto;\n  position: relative;\n}\n\n.stanley-box {\n  align-items: center;\n  display: flex;\n  height: 45vh;\n  justify-content: center;\n  overflow: hidden;\n  padding-bottom: 5vh;\n  width: 100vw;\n}\n\n.stanley {\n  width: 100vw;\n}\n\n.user-total-box {\n  align-items: flex-end;\n  background: #efe6df;\n  border-radius: 0 0 10px 10px;\n  display: flex;\n  height: 14vh;\n  justify-content: center;\n  margin-left: 35px;\n  padding: 5px;\n  padding-bottom: 1vw;\n  position: sticky;\n  top: -9vh;\n  width: 20vw;\n}\n\n.user-total-box h2, .user-total-box span {\n  font-size: 1.8vw;\n}\n\n.dashboard-tag {\n  border-bottom: solid #015524 3px;\n}\n\n.dashboard-content {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  margin-top: -14vh;\n  overflow: hidden;\n  overflow-y: auto;\n  z-index: 2;\n}\n\n.user-booking-box p {\n  margin-top: 20px;\n  font-size: 12pt;\n}\n\n\n/* -------- BOOKINGS PAGE -------- */\n\n.booking-select-page {\n  display: flex;\n  flex-direction: row-reverse;\n  overflow-y: auto;\n  position: relative;\n}\n\n.available-bookings-container {\n  height: auto;\n  overflow: hidden;\n  overflow-y: scroll;\n  padding-bottom: 5vh;\n}\n\n.booking-box {\n  min-width: 500px;\n  position: relative;\n  width: 50vw;\n}\n\n.booking-box button {\n  bottom: 10px;\n  height: 50px;\n  position: absolute;\n  right: 10px;\n  width: 120px;\n}\n\n.booking-box p {\n  font-size: 12pt;\n}\n\n.cpn {\n  color: #015524;\n  font-weight: bold;\n  margin-top: 15px;\n}\n\n\n/* ---- aside ---- */\n\n.bookings-aside {\n  display: flex;\n  justify-content: center;\n  width: 45vw;\n}\n\n.bookings-aside input {\n  margin: 10px 5px 10px 10px;\n}\n\n.all-bookings-box {\n  align-items: center;\n  background: #efe6df;\n  border: solid black 1px;\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  height: 400px;\n  justify-content: space-between;\n  margin-top: 40px;\n  min-width: 250px;\n  padding: 20px 0;\n  width: 70%;\n}\n\n.filter-room-types {\n  border-radius: 15px;\n  display: flex;\n  flex-direction: column;\n  margin: 0 5px;\n}\n\n.date-input-box {\n  display: flex;\n  flex-direction: column;\n}\n\n#bookDateInput {\n  margin-left: 0;\n}\n\n.date-err {\n  color: red;\n}\n\n.update-booking-search {\n  height: 32px;\n}\n\n\n/* -------- HIDDEN -------- */\n\n.hidden {\n  display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 5 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 6 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Customer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _Booking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _Room__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);




class Hotel {
  constructor(rooms, bookings) {
    this.activeCustomer = null;
    this.bookings = bookings.map(booking => new _Booking__WEBPACK_IMPORTED_MODULE_1__.default(booking));
    this.rooms = rooms.map(room => new _Room__WEBPACK_IMPORTED_MODULE_2__.default(room));
  }

  selectCustomer(customer) {
      this.activeCustomer = new _Customer__WEBPACK_IMPORTED_MODULE_0__.default(customer);
  }

  findUserBookings() {
    return this.bookings.filter(booking => booking.userID === this.activeCustomer.id);
  }

  findUserRoomDetails() {
    return this.findUserBookings().map(booking => {
      let thisRoom = this.rooms.find(room => room.number === booking.roomNumber)
      return {
        number: thisRoom.number,
        roomType: thisRoom.roomType,
        bidet: thisRoom.bidet,
        bedSize: thisRoom.bedSize,
        numBeds: thisRoom.numBeds,
        costPerNight: thisRoom.costPerNight,
        date: booking.date,
        bookingID: booking.id
      }
    });
  }

  sortUserRooms() {
    return this.findUserRoomDetails().sort((a, b) => {
      return a.date.split("/").join("") - b.date.split("/").join("");
    });
  }

  calcTotal() {
    return this.findUserRoomDetails().reduce((acc, room) => {
      acc += room.costPerNight;
      acc = Math.round(acc * 100) / 100
      return acc;
    },0);
  }

  findBookings(date) {
    return this.bookings.filter(booking => booking.date === date).map(filtBook => filtBook.roomNumber);
  }

  findFilteredRooms(date, roomType) {
    let filteredBookings = this.findBookings(date.split("-").join("/"));
    let roomsByDate = this.rooms.filter(room => !filteredBookings.includes(room.number))
    return roomsByDate.reduce((acc, room) => {
      if (!roomType) {
        acc.push(room);
      } else if (roomType === room.roomType) {
        acc.push(room);
      }
      return acc;
    }, []);
  }

  addBooking(newBooking) {
    this.bookings.push(new _Booking__WEBPACK_IMPORTED_MODULE_1__.default(newBooking));
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hotel);

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Booking {
  constructor(booking) {
    this.id = booking.id;
    this.userID = booking.userID;
    this.date = booking.date;
    this.roomNumber = booking.roomNumber;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Booking);

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Room {
  constructor(room) {
    this.number = room.number;
    this.roomType = room.roomType;
    this.bidet = room.bidet;
    this.bedSize = room.bedSize;
    this.numBeds = room.numBeds;
    this.costPerNight = room.costPerNight;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Room);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/login-image.jpg");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/stanley.jpg");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/OverlookHotel.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/1full.jpg");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/2full.jpg");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/1twin.jpg");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/2twin.jpg");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/1queen.jpg");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/2queen.jpg");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/1king.jpg");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/2king.jpg");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_calls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _Hotel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _images_login_image_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _images_stanley_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _images_OverlookHotel_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _images_1full_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _images_2full_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var _images_1twin_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(16);
/* harmony import */ var _images_2twin_jpg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(17);
/* harmony import */ var _images_1queen_jpg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(18);
/* harmony import */ var _images_2queen_jpg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(19);
/* harmony import */ var _images_1king_jpg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(20);
/* harmony import */ var _images_2king_jpg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(21);















let hotel;

// QUERY SELECTORS ///////////////////////////////
const bookDateInput = document.querySelector("#bookDateInput");
const userBookings = document.querySelector(".user-bookings-container");
const userBookingsOld = document.querySelector(".user-bookings-container-old");
const totalSpent = document.querySelector(".total-spent");
const welcomeUser = document.querySelector(".welcome-user");
const bookNow = document.querySelector(".book-now");
const returnToDash = document.querySelector(".return-to-dashboard");
const dashboardPage = document.querySelector(".dashboard-page");
const bookingsPage = document.querySelector(".booking-select-page");
const allBookings = document.querySelector(".available-bookings-container");
const roomTypeInputs = document.querySelectorAll(".filter-room-types input");
const updateSearchButton = document.querySelector(".update-booking-search");
const dateErr = document.querySelector(".date-err");
const password = document.querySelector(".password");
const username = document.querySelector(".username");
const loginButton = document.querySelector(".sign-in");
const loginErr = document.querySelector(".login-err");
const main = document.querySelector("main");
const nav = document.querySelector("nav");
const loginPage = document.querySelector(".login-page");


// PROMISES //////////////////////////////////////

const promiseData = () => {
  Promise.all([(0,_api_calls__WEBPACK_IMPORTED_MODULE_0__.getData)("rooms"), (0,_api_calls__WEBPACK_IMPORTED_MODULE_0__.getData)("bookings")])
  .then(data => {
    setHotel(data[0].rooms, data[1].bookings);
    setBookingDate();
  })
  .catch(err => console.log(err));
}

const promiseUser = (id) => {
  Promise.all([(0,_api_calls__WEBPACK_IMPORTED_MODULE_0__.getData)(`customers/${id}`)])
  .then(data => {
    hotel.selectCustomer(data[0])
    hide(loginPage);
    show(nav);
    show(main);
    updateDashboard();
  })
  .catch(err => console.log(err));
}

const promisePost = (button) => {
  Promise.all([(0,_api_calls__WEBPACK_IMPORTED_MODULE_0__.postData)(hotel.activeCustomer.id, button.dataset.date, parseInt(button.dataset.number))])
  .then(data => {
    console.log(data[0].newBooking);
    hotel.addBooking(data[0].newBooking);
    goToDashPage();
  })
  .catch(err => console.log(err));
}


// FUNCTIONS /////////////////////////////////////

const setHotel = (customers, rooms, bookings) => {
  hotel = new _Hotel__WEBPACK_IMPORTED_MODULE_2__.default(customers, rooms, bookings);
}

const hide = (element) => {
  element.classList.add("hidden");
}

const show = (element) => {
  element.classList.remove("hidden");
}

const setBookingDate = () => {
  bookDateInput.min = getDate();
  bookDateInput.value = getDate();
}

const getDate = () => {
  return new Date().toISOString().split("T")[0];
}

const resetRoomType = () => {
  roomTypeInputs[0].checked = true;
}

const updateDashboard = () => {
  userBookings.innerHTML = "";
  userBookingsOld.innerHTML = "";
  dashboardPage.scrollTop = 0;
  totalSpent.innerText = hotel.calcTotal();
  welcomeUser.innerText = `Welcome back, ${hotel.activeCustomer.name.split(" ")[0]}!`;
  let dateNum = getDate().split("-").join("");
  let userBookingsByDate;
  hotel.sortUserRooms().forEach(room => {
    let roomDate = room.date.split("/").join("");
    if (roomDate < dateNum) {
      userBookingsByDate = userBookingsOld;
    } else {
      userBookingsByDate = userBookings;
    }
    userBookingsByDate.innerHTML += `
    <article aria-label="room ${room.number}" class="user-booking-box">
      <img src="./images/${room.numBeds}${room.bedSize}.jpg" alt="hotel bedroom showing ${room.numBeds} ${room.bedSize}">
      <div>
        <h4>You've booked room ${room.number} for ${room.date}</h4>
        <div class="box-line"></div>
        <p>${room.roomType}</p>
        <p>${room.numBeds} ${room.bedSize}</p>
      </div>
    </article>
    `;
  });
  if (!userBookings.innerHTML) {
    userBookings.innerHTML += `
      <h4>It looks like you have no active bookings.</h4>
    `;
  }
}

const updateBookingsPage = () => {
  allBookings.innerHTML = "";
  let roomType;
  roomTypeInputs.forEach(input => {
    if (input.checked) {
      roomType = input.dataset.type;
    }
  });
  if (bookDateInput.value.split("-").join("") >= getDate().split("-").join("")) {
    hide(dateErr);
    hotel.findFilteredRooms(bookDateInput.value, roomType).forEach(room => {
      allBookings.innerHTML += `
        <article aria-label="room ${room.number}" class="booking-box">
          <img src="./images/${room.numBeds}${room.bedSize}.jpg" alt="hotel bedroom showing ${room.numBeds} ${room.bedSize}">
          <div>
            <h4>Room ${room.number} is Available</h4>
            <div class="box-line"></div>
            <p>${room.roomType}</p>
            <p>${room.numBeds} ${room.bedSize}</p>
            <p>${checkForBidet(room)}</p>
            <p class="cpn">Cost per night: $${room.costPerNight}</p>
          </div>
          <button aria-label="book room ${room.number} now" data-number="${room.number}" data-date="${bookDateInput.value.split("-").join("/")}" type="button" class="book-room">BOOK NOW</button>
        </article>
      `;
    });
  } else {
    show(dateErr);
  }
  if(!allBookings.innerHTML) {
    allBookings.innerHTML += `
    <article class="booking-box">
    <h4>We apologize for the inconvenience. There are no rooms available matching your search criteria. Please try selecting alternate dates or modifying your filter options.</h4>
    </article>
    `;
  }
}

const checkForBidet = (room) => {
  if (room.bidet) {
    return "bidet included";
  } else {
    return "bidet not included";
  }
}

const confirmPass = () => {
  if (password.value === "overlook2021") {
    return true;
  }
}

const confirmUsername = () => {
  let uName = username.value;
  if (uName.startsWith("customer") && uName.length === 10) {
    uName = uName.split("customer").join("")
    if (parseInt(uName) >= 10 && parseInt(uName) <= 50) {
      return true;
    }
  } else if (uName.startsWith("customer") && uName.length === 9) {
    uName = uName.split("customer").join("")
    if (parseInt(uName) >= 1 && parseInt(uName) <= 9) {
      return true;
    }
  }
}

const confirmLogin = () => {
  if (confirmUsername() && confirmPass()) {
    loginErr.innerText = "";
    promiseUser(username.value.substring(8));
  } else {
    loginErr.innerText = "Incorrect Username or Password";
  }
}

const goToBookingPage = () => {
  hide(bookNow);
  hide(dashboardPage);
  show(bookingsPage);
  show(returnToDash);
  setBookingDate();
  resetRoomType();
  updateBookingsPage();
  returnToDash.focus();
}

const goToDashPage = () => {
  hide(bookingsPage);
  hide(returnToDash);
  show(bookNow);
  show(dashboardPage);
  updateDashboard();
  bookNow.focus();
}

// EVENT LISTENERS ///////////////////////////////
window.addEventListener("load", promiseData);
bookNow.addEventListener("click", goToBookingPage);
returnToDash.addEventListener("click", goToDashPage);
updateSearchButton.addEventListener("click", updateBookingsPage);
allBookings.addEventListener("click", (event) => {
  if(event.target.type === "button") {
    promisePost(event.target);
  }
});
loginButton.addEventListener("click", confirmLogin);
password.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    confirmLogin();
  }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map