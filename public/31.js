(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/Dashboard.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dashboard/Dashboard.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      statistics: {
        item_count: 0,
        received_quantity: [],
        issued_quantity: [],
        f_g_received_quantity: [],
        f_g_issued_quantity: []
      }
    };
  },
  methods: {
    fetchStatistics: function fetchStatistics() {
      var _this = this;

      axios.get("/api/dashboard_statistics").then(function (response) {
        console.log(response.data);
        _this.statistics = _objectSpread({}, response.data);
      })["catch"](function (error) {
        console.log(error.response.data);
      });
    }
  },
  created: function created() {
    this.fetchStatistics();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/Dashboard.vue?vue&type=template&id=376ddb84&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dashboard/Dashboard.vue?vue&type=template&id=376ddb84& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    [
      _c(
        "v-row",
        [
          _c(
            "v-col",
            { staticClass: "pb-0" },
            [
              _c(
                "v-card",
                { staticClass: "text-center py-5 cyan" },
                [
                  _c(
                    "v-btn",
                    { attrs: { outlined: "", dark: "", rounded: "" } },
                    [
                      _c(
                        "v-icon",
                        { staticClass: "mr-2", attrs: { size: "15" } },
                        [_vm._v("category")]
                      ),
                      _vm._v(
                        "\n          " +
                          _vm._s(_vm.statistics.item_count) +
                          "\n        "
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-card-subtitle", { staticClass: "white--text py-0" }, [
                    _vm._v("Raw Material")
                  ])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { staticClass: "pb-0" },
            [
              _c(
                "v-card",
                { staticClass: "text-center py-5 cyan" },
                [
                  _c(
                    "v-btn",
                    { attrs: { outlined: "", dark: "", rounded: "" } },
                    [
                      _c(
                        "v-icon",
                        { staticClass: "mr-2", attrs: { size: "17" } },
                        [_vm._v("check")]
                      ),
                      _vm._v(_vm._s(_vm.statistics.f_g_count) + "\n        ")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-card-subtitle", { staticClass: "white--text py-0" }, [
                    _vm._v("Finished good")
                  ])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { staticClass: "pb-0" },
            [
              _c(
                "v-card",
                { staticClass: "text-center py-5 cyan" },
                [
                  _c(
                    "v-btn",
                    { attrs: { outlined: "", dark: "", rounded: "" } },
                    [
                      _c(
                        "v-icon",
                        { staticClass: "mr-2", attrs: { size: "17" } },
                        [_vm._v("settings_input_component")]
                      ),
                      _vm._v("455\n        ")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-card-subtitle", { staticClass: "white--text py-0" }, [
                    _vm._v("Spare part")
                  ])
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-row",
        [
          _c(
            "v-col",
            { attrs: { cols: "12", sm: "4" } },
            [
              _c(
                "v-card",
                { staticClass: "my-3" },
                [
                  _c(
                    "v-list-item",
                    { attrs: { "two-line": "" } },
                    [
                      _c(
                        "v-list-item-content",
                        [
                          _c("v-list-item-title", [
                            _vm._v("Todays Sale's Goal : 100 Items")
                          ]),
                          _vm._v(" "),
                          _c("v-list-item-subtitle", [_vm._v("Secondary text")])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-avatar",
                        [
                          _c("v-icon", { attrs: { size: "50" } }, [
                            _vm._v("show_chart")
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-divider"),
                  _vm._v(" "),
                  _c(
                    "v-list-item",
                    [
                      _c("v-list-item-subtitle", [_vm._v("Sold : 0 Items")]),
                      _vm._v(" "),
                      _c(
                        "v-list-item-subtitle",
                        { staticClass: "text-right" },
                        [_vm._v("0.5 %")]
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card",
                { staticClass: "my-3" },
                [
                  _c(
                    "v-list-item",
                    { attrs: { "two-line": "" } },
                    [
                      _c(
                        "v-list-item-content",
                        [
                          _c("v-list-item-title", [
                            _vm._v("Todays Sale's Goal : 100 Items")
                          ]),
                          _vm._v(" "),
                          _c("v-list-item-subtitle", [_vm._v("Secondary text")])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-avatar",
                        [
                          _c("v-icon", { attrs: { size: "50" } }, [
                            _vm._v("show_chart")
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-divider"),
                  _vm._v(" "),
                  _c(
                    "v-list-item",
                    [
                      _c("v-list-item-subtitle", [_vm._v("Sold : 0 Items")]),
                      _vm._v(" "),
                      _c(
                        "v-list-item-subtitle",
                        { staticClass: "text-right" },
                        [_vm._v("0.5 %")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            [
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    [
                      _c(
                        "v-card",
                        [
                          _c(
                            "v-card-subtitle",
                            { staticClass: "text-center" },
                            [_vm._v("Received items")]
                          ),
                          _vm._v(" "),
                          _c("trend", {
                            attrs: {
                              data: _vm.statistics.received_quantity,
                              gradient: ["#6fa8dc", "#42b983", "#2c3e50"],
                              "auto-draw": "",
                              smooth: ""
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    [
                      _c(
                        "v-card",
                        [
                          _c(
                            "v-card-subtitle",
                            { staticClass: "text-center" },
                            [_vm._v("Issued items")]
                          ),
                          _vm._v(" "),
                          _c("trend", {
                            attrs: {
                              data: _vm.statistics.issued_quantity,
                              gradient: ["#6fa8dc", "#42b983", "#2c3e50"],
                              "auto-draw": "",
                              smooth: ""
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("bars", {
                attrs: {
                  data: [15, 25, 5, 9, 5, 10, 3, 5, 2, 5, 1, 8, 2, 9, 0],
                  gradient: ["#6fa8dc", "#42b983"],
                  labelSize: 0.7
                }
              }),
              _vm._v(" "),
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    [
                      _c(
                        "v-card",
                        [
                          _c(
                            "v-card-subtitle",
                            { staticClass: "text-center" },
                            [_vm._v("Received finished good")]
                          ),
                          _vm._v(" "),
                          _c("trend", {
                            attrs: {
                              data: _vm.statistics.f_g_received_quantity,
                              gradient: ["#6fa8dc", "#42b983", "#2c3e50"],
                              "auto-draw": "",
                              smooth: ""
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    [
                      _c(
                        "v-card",
                        [
                          _c(
                            "v-card-subtitle",
                            { staticClass: "text-center" },
                            [_vm._v("Issued finished good")]
                          ),
                          _vm._v(" "),
                          _c("trend", {
                            attrs: {
                              data: _vm.statistics.f_g_issued_quantity,
                              gradient: ["#6fa8dc", "#42b983", "#2c3e50"],
                              "auto-draw": "",
                              smooth: ""
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/dashboard/Dashboard.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/dashboard/Dashboard.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_vue_vue_type_template_id_376ddb84___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=376ddb84& */ "./resources/js/components/dashboard/Dashboard.vue?vue&type=template&id=376ddb84&");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js& */ "./resources/js/components/dashboard/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_376ddb84___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_vue_vue_type_template_id_376ddb84___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dashboard/Dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dashboard/Dashboard.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/dashboard/Dashboard.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dashboard/Dashboard.vue?vue&type=template&id=376ddb84&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/dashboard/Dashboard.vue?vue&type=template&id=376ddb84& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_376ddb84___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=template&id=376ddb84& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/Dashboard.vue?vue&type=template&id=376ddb84&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_376ddb84___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_376ddb84___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);