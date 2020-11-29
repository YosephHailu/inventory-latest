(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/Report.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/item/Report.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layouts_PrintHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layouts/PrintHeader */ "./resources/js/components/layouts/PrintHeader.vue");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  components: {
    PrintHeader: _layouts_PrintHeader__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      valid: false,
      delete_dialog: false,
      search: "",
      category_id: "",
      items: [],
      item: {},
      options: {
        itemsPerPage: 150
      },
      total_items: 0,
      itemsPerPage: 1,
      group: [],
      item_categories: []
    };
  },
  methods: {
    fetchItems: function fetchItems() {
      var _this = this;

      console.log(this.category_id);
      axios.get("/api/item?itemsPerPage=" + this.options.itemsPerPage + "&page=" + this.options.current_page + "&q=" + this.search + "&category_id=" + this.category_id).then(function (response) {
        _this.options.current_page = response.data.items.current_page;
        _this.options.last_page = response.data.items.last_page;
        _this.group = response.data.items.data.reduce(function (r, a) {
          r[a.item_category.category] = [].concat(_toConsumableArray(r[a.item_category.category] || []), [a]);
          return r;
        }, {});
      })["catch"](function (error) {
        console.log(error.response.data);
      });
    },
    exportItem: function exportItem() {
      window.open("/item_export?q=" + this.search + "&category_id=" + this.category_id, "_blank");
    },
    int_print: function int_print() {
      window.print();
    },
    fetchOptions: function fetchOptions() {
      var _this2 = this;

      axios.get("/api/itemOptions").then(function (response) {
        _this2.item_categories = response.data.itemCategories;
      })["catch"](function (error) {});
    }
  },
  watch: {
    options: {
      handler: function handler() {
        this.fetchItems();
      },
      deep: true
    },
    search: {
      handler: function handler() {
        this.options.page = 1;
        this.debouncedGetItems();
      }
    }
  },
  created: function created() {
    // this.$store.state.mainStore.sidebar_panel = false;
    this.fetchItems();
    this.fetchOptions();
    this.debouncedGetItems = _.debounce(this.fetchItems, 1000);
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/Report.vue?vue&type=style&index=0&id=0c6f1256&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/item/Report.vue?vue&type=style&index=0&id=0c6f1256&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\ntd[data-v-0c6f1256] {\r\n  height: 0px !important;\r\n  border-top: solid 1px !important;\r\n  border-right: solid 1px !important;\n}\n.starter-border[data-v-0c6f1256] {\r\n  border: 0px !important;\r\n  border-right: solid 1px !important;\n}\n.border-all[data-v-0c6f1256] {\r\n  border: solid 1px !important;\n}\n.no-right-border[data-v-0c6f1256] {\r\n  border-right: 0px;\n}\nth[data-v-0c6f1256] {\r\n  background-color: #7fffd4 !important;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/Report.vue?vue&type=style&index=0&id=0c6f1256&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/item/Report.vue?vue&type=style&index=0&id=0c6f1256&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Report.vue?vue&type=style&index=0&id=0c6f1256&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/Report.vue?vue&type=style&index=0&id=0c6f1256&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/Report.vue?vue&type=template&id=0c6f1256&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/item/Report.vue?vue&type=template&id=0c6f1256&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
    "v-container",
    [
      _c(
        "v-card",
        { staticClass: "pb-5" },
        [
          _c(
            "v-toolbar",
            [
              _c("v-divider"),
              _vm._v(" "),
              _c("v-card-title", [_vm._v("RAW MATERIAL REPORT")]),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  staticClass: "no-print",
                  attrs: { text: "", outlined: "" },
                  on: {
                    click: function($event) {
                      return _vm.$router.go(-1)
                    }
                  }
                },
                [_vm._v("close")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("print-header"),
          _vm._v(" "),
          _c(
            "v-row",
            { staticClass: "px-5 no-print" },
            [
              _c("v-text-field", {
                attrs: {
                  "hide-details": "",
                  label: "Search by name or item id"
                },
                scopedSlots: _vm._u([
                  {
                    key: "append",
                    fn: function() {
                      return [
                        _c(
                          "v-btn",
                          {
                            attrs: { icon: "" },
                            on: {
                              click: function($event) {
                                _vm.search = ""
                              }
                            }
                          },
                          [
                            _c("v-icon", { attrs: { size: "20" } }, [
                              _vm._v("close")
                            ])
                          ],
                          1
                        )
                      ]
                    },
                    proxy: true
                  }
                ]),
                model: {
                  value: _vm.search,
                  callback: function($$v) {
                    _vm.search = $$v
                  },
                  expression: "search"
                }
              }),
              _vm._v(" "),
              _c("v-select", {
                attrs: {
                  "hide-details": "",
                  items: _vm.item_categories,
                  "item-text": "category",
                  "item-value": "id",
                  label: "Select Item category"
                },
                on: { input: _vm.fetchItems },
                scopedSlots: _vm._u([
                  {
                    key: "append",
                    fn: function() {
                      return [
                        _c(
                          "v-btn",
                          {
                            attrs: { icon: "" },
                            on: {
                              click: function($event) {
                                _vm.category_id = ""
                                _vm.fetchItems()
                              }
                            }
                          },
                          [
                            _c("v-icon", { attrs: { size: "20" } }, [
                              _vm._v("close")
                            ])
                          ],
                          1
                        )
                      ]
                    },
                    proxy: true
                  }
                ]),
                model: {
                  value: _vm.category_id,
                  callback: function($$v) {
                    _vm.category_id = $$v
                  },
                  expression: "category_id"
                }
              }),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  staticClass: "mt-5 mx-1",
                  attrs: { text: "", color: "cyan", dark: "" },
                  on: { click: _vm.exportItem }
                },
                [
                  _c("v-icon", [_vm._v("import_export")]),
                  _vm._v("EXPORT\n      ")
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  staticClass: "mt-5 mx-1",
                  attrs: { text: "", color: "cyan", dark: "" },
                  on: { click: _vm.int_print }
                },
                [
                  _c("v-icon", { staticClass: "mx-2" }, [_vm._v("print")]),
                  _vm._v("Print\n      ")
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("v-simple-table", { attrs: { dense: "", "fixed-header": "" } }, [
            _c("thead", [
              _c("tr", [
                _c("th", [_vm._v("Category")]),
                _vm._v(" "),
                _c("th", [_vm._v("Item id")]),
                _vm._v(" "),
                _c("th", [_vm._v("Name")]),
                _vm._v(" "),
                _c("th", [_vm._v("Balance")]),
                _vm._v(" "),
                _c("th", [_vm._v("B balance")])
              ])
            ]),
            _vm._v(" "),
            _c(
              "tbody",
              [
                _vm._l(_vm.group, function(category, indexas) {
                  return [
                    _c(
                      "td",
                      { key: indexas, staticClass: "border-all text-top" },
                      [_vm._v(_vm._s(indexas))]
                    ),
                    _vm._v(" "),
                    _vm._l(category, function(item) {
                      return _c(
                        "tr",
                        {
                          key: item.id,
                          class:
                            item.balance <= item.min_balance ? "red--text" : "",
                          staticStyle: { width: "100%" }
                        },
                        [
                          _c("td", { staticClass: "starter-border" }),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(item.item_id))]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(item.name))]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(item.balance))]),
                          _vm._v(" "),
                          _c("td", { staticClass: "no-right-border" }, [
                            _vm._v(_vm._s(item.beginning_balance))
                          ])
                        ]
                      )
                    }),
                    _vm._v(" "),
                    _c("tr", { key: indexas + "1" }, [
                      _c("td", { staticClass: "starter-border" }),
                      _vm._v(" "),
                      _c("td", { staticClass: "report-border" }),
                      _vm._v(" "),
                      _c("td", { staticClass: "report-border" }),
                      _vm._v(" "),
                      _c(
                        "td",
                        {
                          staticClass: "blue--text",
                          staticStyle: { border: "solid 1px" }
                        },
                        [
                          _vm._v(
                            "\n              Total :\n              " +
                              _vm._s(
                                category.reduce(function(total, value) {
                                  return total + Number(value.balance)
                                }, 0)
                              ) +
                              "\n            "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("td")
                    ])
                  ]
                })
              ],
              2
            )
          ]),
          _vm._v(" "),
          _c("v-pagination", {
            attrs: { circle: "", length: _vm.options.last_page },
            on: { input: _vm.fetchItems },
            model: {
              value: _vm.options.current_page,
              callback: function($$v) {
                _vm.$set(_vm.options, "current_page", $$v)
              },
              expression: "options.current_page"
            }
          })
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/layouts/PrintHeader.vue?vue&type=template&id=2c74e0f9&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/layouts/PrintHeader.vue?vue&type=template&id=2c74e0f9& ***!
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
        "v-list-item",
        [
          _c(
            "v-list-item-content",
            { staticClass: "text-right" },
            [
              _c("v-list-item-title", [
                _vm._v(_vm._s(_vm.$store.state.mainStore.config.company.name))
              ]),
              _vm._v(" "),
              _c(
                "v-list-item-subtitle",
                [
                  _vm._v(
                    "\n        " +
                      _vm._s(_vm.$store.state.mainStore.config.company.phone) +
                      "\n        "
                  ),
                  _c("v-icon", { attrs: { small: "" } }, [_vm._v("phone")])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item-subtitle",
                [
                  _vm._v(
                    "\n        " +
                      _vm._s(_vm.$store.state.mainStore.config.company.email) +
                      "\n        "
                  ),
                  _c("v-icon", { attrs: { small: "" } }, [_vm._v("mail")])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-list-item-content",
            [
              _c(
                "v-list-item-avatar",
                { attrs: { size: "100" } },
                [
                  _c("v-img", {
                    staticClass: "text-center",
                    attrs: {
                      src:
                        "/storage/company/" +
                        _vm.$store.state.mainStore.config.company.logo,
                      "align-center": "",
                      icon: "",
                      contain: ""
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
            "v-list-item-content",
            { staticClass: "text-left" },
            [
              _c("v-list-item-title", [
                _vm._v(
                  _vm._s(_vm.$store.state.mainStore.config.company.address)
                )
              ]),
              _vm._v(" "),
              _c("v-list-item-subtitle", [
                _vm._v(
                  "Date : " +
                    _vm._s(_vm.$store.state.mainStore.config.current_date)
                )
              ])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/item/Report.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/item/Report.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Report_vue_vue_type_template_id_0c6f1256_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Report.vue?vue&type=template&id=0c6f1256&scoped=true& */ "./resources/js/components/item/Report.vue?vue&type=template&id=0c6f1256&scoped=true&");
/* harmony import */ var _Report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Report.vue?vue&type=script&lang=js& */ "./resources/js/components/item/Report.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Report_vue_vue_type_style_index_0_id_0c6f1256_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Report.vue?vue&type=style&index=0&id=0c6f1256&scoped=true&lang=css& */ "./resources/js/components/item/Report.vue?vue&type=style&index=0&id=0c6f1256&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Report_vue_vue_type_template_id_0c6f1256_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Report_vue_vue_type_template_id_0c6f1256_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0c6f1256",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/item/Report.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/item/Report.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/item/Report.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Report.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/Report.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/item/Report.vue?vue&type=style&index=0&id=0c6f1256&scoped=true&lang=css&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/item/Report.vue?vue&type=style&index=0&id=0c6f1256&scoped=true&lang=css& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_style_index_0_id_0c6f1256_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Report.vue?vue&type=style&index=0&id=0c6f1256&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/Report.vue?vue&type=style&index=0&id=0c6f1256&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_style_index_0_id_0c6f1256_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_style_index_0_id_0c6f1256_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_style_index_0_id_0c6f1256_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_style_index_0_id_0c6f1256_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_style_index_0_id_0c6f1256_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/item/Report.vue?vue&type=template&id=0c6f1256&scoped=true&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/item/Report.vue?vue&type=template&id=0c6f1256&scoped=true& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_template_id_0c6f1256_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Report.vue?vue&type=template&id=0c6f1256&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/Report.vue?vue&type=template&id=0c6f1256&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_template_id_0c6f1256_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_template_id_0c6f1256_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/layouts/PrintHeader.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/layouts/PrintHeader.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PrintHeader_vue_vue_type_template_id_2c74e0f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrintHeader.vue?vue&type=template&id=2c74e0f9& */ "./resources/js/components/layouts/PrintHeader.vue?vue&type=template&id=2c74e0f9&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  script,
  _PrintHeader_vue_vue_type_template_id_2c74e0f9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PrintHeader_vue_vue_type_template_id_2c74e0f9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/layouts/PrintHeader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/layouts/PrintHeader.vue?vue&type=template&id=2c74e0f9&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/layouts/PrintHeader.vue?vue&type=template&id=2c74e0f9& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintHeader_vue_vue_type_template_id_2c74e0f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PrintHeader.vue?vue&type=template&id=2c74e0f9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/layouts/PrintHeader.vue?vue&type=template&id=2c74e0f9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintHeader_vue_vue_type_template_id_2c74e0f9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintHeader_vue_vue_type_template_id_2c74e0f9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);