(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[38],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_finished_good/FinishedGoodIssues.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/issue_finished_good/FinishedGoodIssues.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************/
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
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      valid: false,
      delete_dialog: false,
      search: "",
      items: [],
      f_g_issues: [],
      item: {},
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      headers: [{
        text: "GRN",
        value: "issue_id",
        "class": "cyan--text"
      }, {
        text: "Shop",
        value: "shop.name",
        "class": "cyan--text"
      }, {
        text: "Date",
        value: "date",
        "class": "cyan--text"
      }, {
        text: "",
        value: "action",
        "class": "cyan--text"
      }]
    };
  },
  methods: {
    fetchIssuedGoods: function fetchIssuedGoods() {
      var _this = this;

      axios.get("/api/finished_good_issue?itemsPerPage=" + this.options.itemsPerPage + "&page=" + this.options.page + "&q=" + this.search).then(function (response) {
        _this.f_g_issues = response.data.f_g_issues.data;
        _this.totalItems = response.data.f_g_issues.total;
      })["catch"](function (error) {});
    },
    deleteGoodReceive: function deleteGoodReceive(item) {
      var _this2 = this;

      if (confirm("Are you sure you went to delete")) {
        axios["delete"]("/api/finished_good_issue/" + item.id).then(function (response) {
          _this2.fetchIssuedGoods();
        })["catch"](function (error) {});
      }
    }
  },
  watch: {
    options: {
      handler: function handler() {
        this.fetchIssuedGoods();
      },
      deep: true
    },
    search: {
      handler: function handler() {
        this.debouncedReceivedGoods();
      }
    }
  },
  created: function created() {
    this.fetchIssuedGoods();
    this.debouncedReceivedGoods = _.debounce(this.fetchIssuedGoods, 1000);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_finished_good/FinishedGoodIssues.vue?vue&type=template&id=418f9c7f&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/issue_finished_good/FinishedGoodIssues.vue?vue&type=template&id=418f9c7f& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
                _vm._v("ISSUED FINISHED GOODS")
              ]),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: {
                    text: "",
                    to: { path: "/issue-finished-good-report" },
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
              items: _vm.f_g_issues,
              options: _vm.options,
              "server-items-length": _vm.totalItems,
              "footer-props": {
                "items-per-page-options": [15, 25, 35, 45, 55]
              }
            },
            on: {
              "update:options": function($event) {
                _vm.options = $event
              }
            },
            scopedSlots: _vm._u([
              {
                key: "item.date",
                fn: function(ref) {
                  var item = ref.item
                  return [
                    _vm._v(
                      _vm._s(item.year + " - " + item.month + " - " + item.day)
                    )
                  ]
                }
              },
              {
                key: "item.action",
                fn: function(ref) {
                  var item = ref.item
                  return [
                    _c(
                      "v-btn",
                      {
                        staticClass: "blue-grey white--text",
                        attrs: {
                          small: "",
                          to: {
                            path: "issue-finished-good/" + item.id + "/manage"
                          }
                        }
                      },
                      [_vm._v("Manage")]
                    ),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          icon: "",
                          to: {
                            path: "issue-finished-good/" + item.id + "/edit"
                          }
                        }
                      },
                      [_c("v-icon", [_vm._v("edit")])],
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
                            on: {
                              click: function($event) {
                                return _vm.deleteGoodReceive(item)
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

/***/ "./resources/js/components/issue_finished_good/FinishedGoodIssues.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/components/issue_finished_good/FinishedGoodIssues.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FinishedGoodIssues_vue_vue_type_template_id_418f9c7f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FinishedGoodIssues.vue?vue&type=template&id=418f9c7f& */ "./resources/js/components/issue_finished_good/FinishedGoodIssues.vue?vue&type=template&id=418f9c7f&");
/* harmony import */ var _FinishedGoodIssues_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FinishedGoodIssues.vue?vue&type=script&lang=js& */ "./resources/js/components/issue_finished_good/FinishedGoodIssues.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FinishedGoodIssues_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FinishedGoodIssues_vue_vue_type_template_id_418f9c7f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FinishedGoodIssues_vue_vue_type_template_id_418f9c7f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/issue_finished_good/FinishedGoodIssues.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/issue_finished_good/FinishedGoodIssues.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/issue_finished_good/FinishedGoodIssues.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoodIssues_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./FinishedGoodIssues.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_finished_good/FinishedGoodIssues.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoodIssues_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/issue_finished_good/FinishedGoodIssues.vue?vue&type=template&id=418f9c7f&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/issue_finished_good/FinishedGoodIssues.vue?vue&type=template&id=418f9c7f& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoodIssues_vue_vue_type_template_id_418f9c7f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FinishedGoodIssues.vue?vue&type=template&id=418f9c7f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_finished_good/FinishedGoodIssues.vue?vue&type=template&id=418f9c7f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoodIssues_vue_vue_type_template_id_418f9c7f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoodIssues_vue_vue_type_template_id_418f9c7f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);