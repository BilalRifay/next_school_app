"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/page.js":
/*!*************************!*\
  !*** ./src/app/page.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_intersection_observer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intersection-observer */ \"(app-pages-browser)/./node_modules/react-intersection-observer/dist/index.mjs\");\n/* harmony import */ var _components_PageComponents_CarouselSection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/PageComponents/CarouselSection */ \"(app-pages-browser)/./src/components/PageComponents/CarouselSection.jsx\");\n/* harmony import */ var _components_pageComponents_Testimonials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/pageComponents/Testimonials */ \"(app-pages-browser)/./src/components/pageComponents/Testimonials.jsx\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-i18next */ \"(app-pages-browser)/./node_modules/react-i18next/dist/es/index.js\");\n/* harmony import */ var _components_pageComponents_PopupPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/pageComponents/PopupPage */ \"(app-pages-browser)/./src/components/pageComponents/PopupPage.jsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nconst HeroPage = ()=>{\n    _s();\n    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();\n    const { ref: heroRef, inView: heroInView } = (0,react_intersection_observer__WEBPACK_IMPORTED_MODULE_6__.useInView)({\n        triggerOnce: true,\n        threshold: 0.1\n    });\n    const eventData = t(\"events\", {\n        returnObjects: true\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"font-comfortaa\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_pageComponents_PopupPage__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                lineNumber: 21,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"relative w-full md:mt-0 h-[80vh] flex items-center justify-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"picture\", {\n                        className: \"w-full h-full\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                            src: t(\"heroimages.image1\"),\n                            alt: \"Hero\",\n                            // className=\"w-full h-full object-cover shadow-lg\"\n                            layout: \"fill\",\n                            objectFit: \"cover\",\n                            className: \"shadow-lg\"\n                        }, void 0, false, {\n                            fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                            lineNumber: 25,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 24,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"absolute inset-0 bg-gradient-to-r from-blue-800/80 via-transparent to-transparent shadow-lg\"\n                    }, void 0, false, {\n                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 34,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"absolute top-[50%] md:top-[35%] right-5 md:right-[2rem] bg-white/90 md:bg-white/70 text-gray-900 p-8 rounded-xl shadow-xl w-[90%] md:w-[40%] lg:w-[27%]\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                className: \"text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bold leading-tight\",\n                                children: t(\"heroPage.title\")\n                            }, void 0, false, {\n                                fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                                lineNumber: 36,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"mt-4 mb-4 text-[1rem] md:text-[1rem]\",\n                                children: t(\"heroPage.description\")\n                            }, void 0, false, {\n                                fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                                lineNumber: 39,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                href: \"/admission\",\n                                className: \"mt-6 w-full md:w-3/4 text-[1rem] p-2 px-[2rem] bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300\",\n                                children: t(\"heroPage.applyNow\")\n                            }, void 0, false, {\n                                fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                                lineNumber: 42,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 35,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                lineNumber: 23,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                ref: heroRef,\n                className: \"md:mt-[6rem] text-center transition-opacity duration-1000 ease-in-out \".concat(heroInView ? \"opacity-100 translate-y-0\" : \"opacity-0 translate-y-10\"),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-[2rem] mt-5 font-poppins lg:text-4xl text-blue-800/80 font-bold inline-block px-8 py-2 rounded-xl animate-fade-in\",\n                        children: t(\"heroPage.welcomeTitle\")\n                    }, void 0, false, {\n                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 58,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"mt-4 text-[1.2rem] w-3/4 m-auto lg:text-[2rem] text-gray-700 lg:text-xl font-poppins\",\n                        children: t(\"heroPage.welcomeDescription\")\n                    }, void 0, false, {\n                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 61,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_pageComponents_Testimonials__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        testimonials: t(\"testimonials\", {\n                            returnObjects: true\n                        })\n                    }, void 0, false, {\n                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 64,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                lineNumber: 52,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_PageComponents_CarouselSection__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                        title: t(\"heroPage.celebrationsTitle\"),\n                        items: eventData\n                    }, void 0, false, {\n                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 71,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_PageComponents_CarouselSection__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                        title: t(\"heroPage.servicesTitle\"),\n                        description: t(\"heroPage.serviceDescription\"),\n                        items: eventData\n                    }, void 0, false, {\n                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 75,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                lineNumber: 70,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"relative w-full h-screen flex items-center justify-center bg-blue-900 text-white\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: t(\"heroimages.image1\"),\n                        alt: \"School\",\n                        className: \"absolute inset-0 w-full h-full object-cover\"\n                    }, void 0, false, {\n                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 82,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"absolute inset-0 bg-gradient-to-r from-blue-800/80 via-transparent to-transparent\"\n                    }, void 0, false, {\n                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 87,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"relative z-10 text-center p-8 md:p-16 lg:p-24\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                className: \"text-4xl md:text-5xl font-bold mb-4\",\n                                children: t(\"heroPage.welcomeTitle\")\n                            }, void 0, false, {\n                                fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                                lineNumber: 89,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"text-lg mb-6\",\n                                children: t(\"heroPage.welcomeDescription\")\n                            }, void 0, false, {\n                                fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                                lineNumber: 92,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex flex-col md:flex-row gap-4 justify-center\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                        href: \"/admission\",\n                                        className: \"bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg\",\n                                        children: t(\"heroPage.applyNow\")\n                                    }, void 0, false, {\n                                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                                        lineNumber: 94,\n                                        columnNumber: 13\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        className: \"bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg\",\n                                        children: t(\"heroPage.downloadBrochure\")\n                                    }, void 0, false, {\n                                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                                        lineNumber: 100,\n                                        columnNumber: 13\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                                lineNumber: 93,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 88,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n                lineNumber: 81,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"E:\\\\workplace\\\\next-setup\\\\src\\\\app\\\\page.js\",\n        lineNumber: 20,\n        columnNumber: 5\n    }, undefined);\n};\n_s(HeroPage, \"4+9Ddy7+tRo7WYtbIEz/gPg+FmY=\", false, function() {\n    return [\n        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,\n        react_intersection_observer__WEBPACK_IMPORTED_MODULE_6__.useInView\n    ];\n});\n_c = HeroPage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (HeroPage);\nvar _c;\n$RefreshReg$(_c, \"HeroPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRXdEO0FBQ21CO0FBQ047QUFDeEM7QUFDa0I7QUFDZ0I7QUFFL0QsTUFBTU0sV0FBVzs7SUFDZixNQUFNLEVBQUVDLENBQUMsRUFBRSxHQUFHSCw2REFBY0E7SUFDNUIsTUFBTSxFQUFFSSxLQUFLQyxPQUFPLEVBQUVDLFFBQVFDLFVBQVUsRUFBRSxHQUFHWCxzRUFBU0EsQ0FBQztRQUNyRFksYUFBYTtRQUNiQyxXQUFXO0lBQ2I7SUFFQSxNQUFNQyxZQUFZUCxFQUFFLFVBQVU7UUFBRVEsZUFBZTtJQUFLO0lBRXBELHFCQUNFLDhEQUFDQztRQUFJQyxXQUFVOzswQkFDYiw4REFBQ1osNEVBQVNBOzs7OzswQkFFViw4REFBQ1c7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDQzt3QkFBUUQsV0FBVTtrQ0FDakIsNEVBQUNFOzRCQUNDQyxLQUFLYixFQUFFOzRCQUNQYyxLQUFJOzRCQUNKLG1EQUFtRDs0QkFDbkRDLFFBQU87NEJBQ1BDLFdBQVU7NEJBQ1ZOLFdBQVU7Ozs7Ozs7Ozs7O2tDQUdkLDhEQUFDRDt3QkFBSUMsV0FBVTs7Ozs7O2tDQUNmLDhEQUFDRDt3QkFBSUMsV0FBVTs7MENBQ2IsOERBQUNPO2dDQUFHUCxXQUFVOzBDQUNYVixFQUFFOzs7Ozs7MENBRUwsOERBQUNrQjtnQ0FBRVIsV0FBVTswQ0FDVlYsRUFBRTs7Ozs7OzBDQUVMLDhEQUFDSixpREFBSUE7Z0NBQ0h1QixNQUFLO2dDQUNMVCxXQUFVOzBDQUVUVixFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBTVQsOERBQUNvQjtnQkFDQ25CLEtBQUtDO2dCQUNMUSxXQUFXLHlFQUVWLE9BRENOLGFBQWEsOEJBQThCOztrQ0FHN0MsOERBQUNhO3dCQUFHUCxXQUFVO2tDQUNYVixFQUFFOzs7Ozs7a0NBRUwsOERBQUNrQjt3QkFBRVIsV0FBVTtrQ0FDVlYsRUFBRTs7Ozs7O2tDQUVMLDhEQUFDTCwrRUFBWUE7d0JBQ1gwQixjQUFjckIsRUFBRSxnQkFBZ0I7NEJBQUVRLGVBQWU7d0JBQUs7Ozs7Ozs7Ozs7OzswQkFLMUQsOERBQUNDOztrQ0FDQyw4REFBQ2Ysa0ZBQWVBO3dCQUNkNEIsT0FBT3RCLEVBQUU7d0JBQ1R1QixPQUFPaEI7Ozs7OztrQ0FFVCw4REFBQ2Isa0ZBQWVBO3dCQUNkNEIsT0FBT3RCLEVBQUU7d0JBQ1R3QixhQUFheEIsRUFBRTt3QkFDZnVCLE9BQU9oQjs7Ozs7Ozs7Ozs7OzBCQUdYLDhEQUFDRTtnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNFO3dCQUNDQyxLQUFLYixFQUFFO3dCQUNQYyxLQUFJO3dCQUNKSixXQUFVOzs7Ozs7a0NBRVosOERBQUNEO3dCQUFJQyxXQUFVOzs7Ozs7a0NBQ2YsOERBQUNEO3dCQUFJQyxXQUFVOzswQ0FDYiw4REFBQ087Z0NBQUdQLFdBQVU7MENBQ1hWLEVBQUU7Ozs7OzswQ0FFTCw4REFBQ2tCO2dDQUFFUixXQUFVOzBDQUFnQlYsRUFBRTs7Ozs7OzBDQUMvQiw4REFBQ1M7Z0NBQUlDLFdBQVU7O2tEQUNiLDhEQUFDZCxpREFBSUE7d0NBQ0h1QixNQUFLO3dDQUNMVCxXQUFVO2tEQUVUVixFQUFFOzs7Ozs7a0RBRUwsOERBQUN5Qjt3Q0FBT2YsV0FBVTtrREFDZlYsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVWpCO0dBckdNRDs7UUFDVUYseURBQWNBO1FBQ2lCSixrRUFBU0E7OztLQUZsRE07QUF1R04sK0RBQWVBLFFBQVFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9wYWdlLmpzPzJiM2QiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCB7IHVzZUluVmlldyB9IGZyb20gXCJyZWFjdC1pbnRlcnNlY3Rpb24tb2JzZXJ2ZXJcIjtcbmltcG9ydCBDYXJvdXNlbFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvUGFnZUNvbXBvbmVudHMvQ2Fyb3VzZWxTZWN0aW9uXCI7XG5pbXBvcnQgVGVzdGltb25pYWxzIGZyb20gXCIuLi9jb21wb25lbnRzL3BhZ2VDb21wb25lbnRzL1Rlc3RpbW9uaWFsc1wiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tIFwicmVhY3QtaTE4bmV4dFwiO1xuaW1wb3J0IFBvcHVwUGFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9wYWdlQ29tcG9uZW50cy9Qb3B1cFBhZ2VcIjtcblxuY29uc3QgSGVyb1BhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IHsgdCB9ID0gdXNlVHJhbnNsYXRpb24oKTtcbiAgY29uc3QgeyByZWY6IGhlcm9SZWYsIGluVmlldzogaGVyb0luVmlldyB9ID0gdXNlSW5WaWV3KHtcbiAgICB0cmlnZ2VyT25jZTogdHJ1ZSxcbiAgICB0aHJlc2hvbGQ6IDAuMSxcbiAgfSk7XG5cbiAgY29uc3QgZXZlbnREYXRhID0gdChcImV2ZW50c1wiLCB7IHJldHVybk9iamVjdHM6IHRydWUgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtY29tZm9ydGFhXCI+XG4gICAgICA8UG9wdXBQYWdlIC8+XG4gICAgICB7LyogSGVybyBTZWN0aW9uICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgbWQ6bXQtMCBoLVs4MHZoXSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICA8cGljdHVyZSBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPXt0KFwiaGVyb2ltYWdlcy5pbWFnZTFcIil9XG4gICAgICAgICAgICBhbHQ9XCJIZXJvXCJcbiAgICAgICAgICAgIC8vIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIHNoYWRvdy1sZ1wiXG4gICAgICAgICAgICBsYXlvdXQ9XCJmaWxsXCJcbiAgICAgICAgICAgIG9iamVjdEZpdD1cImNvdmVyXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInNoYWRvdy1sZ1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9waWN0dXJlPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtODAwLzgwIHZpYS10cmFuc3BhcmVudCB0by10cmFuc3BhcmVudCBzaGFkb3ctbGdcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC1bNTAlXSBtZDp0b3AtWzM1JV0gcmlnaHQtNSBtZDpyaWdodC1bMnJlbV0gYmctd2hpdGUvOTAgbWQ6Ymctd2hpdGUvNzAgdGV4dC1ncmF5LTkwMCBwLTggcm91bmRlZC14bCBzaGFkb3cteGwgdy1bOTAlXSBtZDp3LVs0MCVdIGxnOnctWzI3JV1cIj5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1bMS41cmVtXSBtZDp0ZXh0LVsycmVtXSBsZzp0ZXh0LVsycmVtXSBmb250LWJvbGQgbGVhZGluZy10aWdodFwiPlxuICAgICAgICAgICAge3QoXCJoZXJvUGFnZS50aXRsZVwiKX1cbiAgICAgICAgICA8L2gxPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTQgbWItNCB0ZXh0LVsxcmVtXSBtZDp0ZXh0LVsxcmVtXVwiPlxuICAgICAgICAgICAge3QoXCJoZXJvUGFnZS5kZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPExpbmtcbiAgICAgICAgICAgIGhyZWY9XCIvYWRtaXNzaW9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTYgdy1mdWxsIG1kOnctMy80IHRleHQtWzFyZW1dIHAtMiBweC1bMnJlbV0gYmctYmx1ZS02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHNoYWRvdy1tZCBob3ZlcjpiZy1ibHVlLTcwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0KFwiaGVyb1BhZ2UuYXBwbHlOb3dcIil9XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogV2VsY29tZSBTZWN0aW9uICovfVxuICAgICAgPHNlY3Rpb25cbiAgICAgICAgcmVmPXtoZXJvUmVmfVxuICAgICAgICBjbGFzc05hbWU9e2BtZDptdC1bNnJlbV0gdGV4dC1jZW50ZXIgdHJhbnNpdGlvbi1vcGFjaXR5IGR1cmF0aW9uLTEwMDAgZWFzZS1pbi1vdXQgJHtcbiAgICAgICAgICBoZXJvSW5WaWV3ID8gXCJvcGFjaXR5LTEwMCB0cmFuc2xhdGUteS0wXCIgOiBcIm9wYWNpdHktMCB0cmFuc2xhdGUteS0xMFwiXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1bMnJlbV0gbXQtNSBmb250LXBvcHBpbnMgbGc6dGV4dC00eGwgdGV4dC1ibHVlLTgwMC84MCBmb250LWJvbGQgaW5saW5lLWJsb2NrIHB4LTggcHktMiByb3VuZGVkLXhsIGFuaW1hdGUtZmFkZS1pblwiPlxuICAgICAgICAgIHt0KFwiaGVyb1BhZ2Uud2VsY29tZVRpdGxlXCIpfVxuICAgICAgICA8L2gxPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC00IHRleHQtWzEuMnJlbV0gdy0zLzQgbS1hdXRvIGxnOnRleHQtWzJyZW1dIHRleHQtZ3JheS03MDAgbGc6dGV4dC14bCBmb250LXBvcHBpbnNcIj5cbiAgICAgICAgICB7dChcImhlcm9QYWdlLndlbGNvbWVEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgPC9wPlxuICAgICAgICA8VGVzdGltb25pYWxzXG4gICAgICAgICAgdGVzdGltb25pYWxzPXt0KFwidGVzdGltb25pYWxzXCIsIHsgcmV0dXJuT2JqZWN0czogdHJ1ZSB9KX1cbiAgICAgICAgLz5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgey8qIENhcm91c2VsIFNlY3Rpb24gZm9yIEV2ZW50cyAqL31cbiAgICAgIDxkaXY+XG4gICAgICAgIDxDYXJvdXNlbFNlY3Rpb25cbiAgICAgICAgICB0aXRsZT17dChcImhlcm9QYWdlLmNlbGVicmF0aW9uc1RpdGxlXCIpfVxuICAgICAgICAgIGl0ZW1zPXtldmVudERhdGF9XG4gICAgICAgIC8+XG4gICAgICAgIDxDYXJvdXNlbFNlY3Rpb25cbiAgICAgICAgICB0aXRsZT17dChcImhlcm9QYWdlLnNlcnZpY2VzVGl0bGVcIil9XG4gICAgICAgICAgZGVzY3JpcHRpb249e3QoXCJoZXJvUGFnZS5zZXJ2aWNlRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgaXRlbXM9e2V2ZW50RGF0YX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgaC1zY3JlZW4gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctYmx1ZS05MDAgdGV4dC13aGl0ZVwiPlxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPXt0KFwiaGVyb2ltYWdlcy5pbWFnZTFcIil9XG4gICAgICAgICAgYWx0PVwiU2Nob29sXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1ibHVlLTgwMC84MCB2aWEtdHJhbnNwYXJlbnQgdG8tdHJhbnNwYXJlbnRcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMTAgdGV4dC1jZW50ZXIgcC04IG1kOnAtMTYgbGc6cC0yNFwiPlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBtZDp0ZXh0LTV4bCBmb250LWJvbGQgbWItNFwiPlxuICAgICAgICAgICAge3QoXCJoZXJvUGFnZS53ZWxjb21lVGl0bGVcIil9XG4gICAgICAgICAgPC9oMT5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxnIG1iLTZcIj57dChcImhlcm9QYWdlLndlbGNvbWVEZXNjcmlwdGlvblwiKX08L3A+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGdhcC00IGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICBocmVmPVwiL2FkbWlzc2lvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWJsdWUtNjAwIGhvdmVyOmJnLWJsdWUtNzAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHB5LTIgcHgtNCByb3VuZGVkLWxnXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3QoXCJoZXJvUGFnZS5hcHBseU5vd1wiKX1cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYmctYmx1ZS02MDAgaG92ZXI6YmctYmx1ZS03MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgcHktMiBweC00IHJvdW5kZWQtbGdcIj5cbiAgICAgICAgICAgICAge3QoXCJoZXJvUGFnZS5kb3dubG9hZEJyb2NodXJlXCIpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICB7LyogPGJ1dHRvbiBjbGFzc05hbWU9XCJiZy1ibHVlLTYwMCBob3ZlcjpiZy1ibHVlLTcwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCBweS0yIHB4LTQgcm91bmRlZC1sZ1wiPlxuICAgICAgICAgICAgICB7dChcImhlcm9QYWdlLnNjaGVkdWxlVmlzaXRcIil9XG4gICAgICAgICAgICA8L2J1dHRvbj4gKi99XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIZXJvUGFnZTtcbiJdLCJuYW1lcyI6WyJ1c2VJblZpZXciLCJDYXJvdXNlbFNlY3Rpb24iLCJUZXN0aW1vbmlhbHMiLCJMaW5rIiwidXNlVHJhbnNsYXRpb24iLCJQb3B1cFBhZ2UiLCJIZXJvUGFnZSIsInQiLCJyZWYiLCJoZXJvUmVmIiwiaW5WaWV3IiwiaGVyb0luVmlldyIsInRyaWdnZXJPbmNlIiwidGhyZXNob2xkIiwiZXZlbnREYXRhIiwicmV0dXJuT2JqZWN0cyIsImRpdiIsImNsYXNzTmFtZSIsInBpY3R1cmUiLCJpbWciLCJzcmMiLCJhbHQiLCJsYXlvdXQiLCJvYmplY3RGaXQiLCJoMSIsInAiLCJocmVmIiwic2VjdGlvbiIsInRlc3RpbW9uaWFscyIsInRpdGxlIiwiaXRlbXMiLCJkZXNjcmlwdGlvbiIsImJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.js\n"));

/***/ })

});