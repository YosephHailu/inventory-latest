(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/finished_good/FinishedGoods.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/finished_good/FinishedGoods.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
      valid: false,
      delete_dialog: false,
      search: "",
      finished_goods: [],
      finished_good: {},
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      itemsPerPage: 1,
      headers: [{
        text: "Finished good id",
        value: "finished_good_id",
        "class": "cyan--text"
      }, {
        text: "Name",
        value: "name",
        "class": "cyan--text"
      }, {
        text: "category",
        value: "finished_good_model.model",
        "class": "cyan--text"
      }, {
        text: "B. Balance",
        value: "beginning_balance",
        "class": "cyan--text"
      }, {
        text: "Balance",
        value: "balance",
        "class": "cyan--text"
      }, {
        text: "Unit",
        value: "unit.name",
        "class": "cyan--text"
      }, {
        text: "",
        value: "action",
        "class": "cyan--text"
      }]
    };
  },
  methods: {
    fetchFinishedGoods: function fetchFinishedGoods() {
      var _this = this;

      axios.get("/api/finished_good?itemsPerPage=" + this.options.itemsPerPage + "&page=" + this.options.page + "&sortBy=" + this.options.sortBy + "&q=" + this.search).then(function (response) {
        _this.finished_goods = response.data.finished_goods.data;
        _this.totalItems = response.data.finished_goods.total;
      })["catch"](function (error) {});
    },
    deleteItem: function deleteItem(finished_good) {
      var _this2 = this;

      if (confirm("Are you sure you went to delete")) {
        axios["delete"]("/api/finished_good/" + finished_good.id).then(function (response) {
          _this2.fetchFinishedGoods();
        })["catch"](function (error) {});
      }
    }
  },
  watch: {
    options: {
      handler: function handler() {
        this.fetchFinishedGoods();
      },
      deep: true
    },
    search: {
      handler: function handler() {
        this.options.page = 1;
        this.debouncedGetFinishedGoods();
      }
    }
  },
  created: function created() {
    this.fetchFinishedGoods();
    this.debouncedGetFinishedGoods = _.debounce(this.fetchFinishedGoods, 1000);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/finished_good/FinishedGoods.vue?vue&type=template&id=095c9af8&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/finished_good/FinishedGoods.vue?vue&type=template&id=095c9af8& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
        { staticClass: "px-5 pb-5" },
        [
          _c(
            "v-toolbar",
            { staticClass: "cyan" },
            [
              _c("v-divider"),
              _vm._v(" "),
              _c("v-card-title", { staticClass: "white--text" }, [
                _vm._v("FINISHED GOODS")
              ]),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: {
                    text: "",
                    to: { path: "/finished-good-report" },
                    dark: ""
                  }
                },
                [_vm._v("Reports")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("v-text-field", {
            attrs: { label: "Search by name or item id" },
            model: {
              value: _vm.search,
              callback: function($$v) {
                _vm.search = $$v
              },
              expression: "search"
            }
          }),
          _vm._v(" "),
          _c("v-data-table", {
            attrs: {
              headers: _vm.headers,
              items: _vm.finished_goods,
              options: _vm.options,
              "server-items-length": _vm.totalItems,
              "footer-props": {
                "items-per-page-options": [15, 25, 50, 100, 500]
              }
            },
            on: {
              "update:options": function($event) {
                _vm.options = $event
              }
            },
            scopedSlots: _vm._u([
              {
                key: "item.action",
                fn: function(ref) {
                  var item = ref.item
                  return [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          icon: "",
                          to: { path: "/finished-good/" + item.id }
                        }
                      },
                      [
                        _c("v-icon", { attrs: { size: "20" } }, [
                          _vm._v("launch")
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          icon: "",
                          to: { path: "/finished-good/" + item.id + "/edit" }
                        }
                      },
                      [
                        _c("v-icon", { attrs: { size: "20" } }, [
                          _vm._v("edit")
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      { attrs: { icon: "" } },
                      [
                        _c(
                          "v-icon",
                          {
                            staticClass: "red--text",
                            attrs: { size: "20" },
                            on: {
                              click: function($event) {
                                return _vm.deleteItem(item)
                              }
                            }
                          },
                          [_vm._v("delete")]
                        )
                      ],
                      1
                    )
                  ]
                }
              }
            ])
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

/***/ "./resources/js/components/finished_good/FinishedGoods.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/finished_good/FinishedGoods.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FinishedGoods_vue_vue_type_template_id_095c9af8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FinishedGoods.vue?vue&type=template&id=095c9af8& */ "./resources/js/components/finished_good/FinishedGoods.vue?vue&type=template&id=095c9af8&");
/* harmony import */ var _FinishedGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FinishedGoods.vue?vue&type=script&lang=js& */ "./resources/js/components/finished_good/FinishedGoods.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FinishedGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FinishedGoods_vue_vue_type_template_id_095c9af8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FinishedGoods_vue_vue_type_template_id_095c9af8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/finished_good/FinishedGoods.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/finished_good/FinishedGoods.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/finished_good/FinishedGoods.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./FinishedGoods.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/finished_good/FinishedGoods.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/finished_good/FinishedGoods.vue?vue&type=template&id=095c9af8&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/finished_good/FinishedGoods.vue?vue&type=template&id=095c9af8& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoods_vue_vue_type_template_id_095c9af8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FinishedGoods.vue?vue&type=template&id=095c9af8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/finished_good/FinishedGoods.vue?vue&type=template&id=095c9af8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoods_vue_vue_type_template_id_095c9af8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoods_vue_vue_type_template_id_095c9af8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);