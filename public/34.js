(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/finished_good_receive/FinishedGoodReceives.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/finished_good_receive/FinishedGoodReceives.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************/
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
      received_finished_goods: [],
      item: {},
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      headers: [{
        text: "GRN",
        value: "receive_id",
        "class": "cyan--text"
      }, {
        text: "Department",
        value: "department.name",
        "class": "cyan--text"
      }, {
        text: "Date",
        value: "date",
        "class": "cyan--text"
      }, {
        text: "Action",
        value: "action",
        "class": "cyan--text"
      }]
    };
  },
  methods: {
    fetchReceivedGoods: function fetchReceivedGoods() {
      var _this = this;

      axios.get("/api/finished_good_receive?itemsPerPage=" + this.options.itemsPerPage + "&page=" + this.options.page + "&q=" + this.search).then(function (response) {
        _this.received_finished_goods = response.data.received_finished_goods.data;
        _this.totalItems = response.data.received_finished_goods.total;
      })["catch"](function (error) {});
    },
    deleteGoodReceive: function deleteGoodReceive(item) {
      var _this2 = this;

      if (confirm("Are you sure you went to delete")) {
        axios["delete"]("/api/finished_good_receive/" + item.id).then(function (response) {
          console.log(response.data);

          _this2.fetchReceivedGoods();
        })["catch"](function (error) {
          console.log(error.response.data);
        });
      }
    }
  },
  watch: {
    options: {
      handler: function handler() {
        this.fetchReceivedGoods();
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
    this.debouncedReceivedGoods = _.debounce(this.fetchReceivedGoods, 1000);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/finished_good_receive/FinishedGoodReceives.vue?vue&type=template&id=c44dc92a&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/finished_good_receive/FinishedGoodReceives.vue?vue&type=template&id=c44dc92a& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
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
                _vm._v("RECEIVED FINISHED GOODS")
              ]),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: {
                    text: "",
                    to: { path: "/receive-finished-good-report" },
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
            attrs: { label: "Search by grn" },
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
              items: _vm.received_finished_goods,
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
                      _vm._s(item.day + " - " + item.month + " - " + item.year)
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
                            path: "receive-finished-good/" + item.id + "/manage"
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
                            path: "receive-finished-good/" + item.id + "/edit"
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

/***/ "./resources/js/components/finished_good_receive/FinishedGoodReceives.vue":
/*!********************************************************************************!*\
  !*** ./resources/js/components/finished_good_receive/FinishedGoodReceives.vue ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FinishedGoodReceives_vue_vue_type_template_id_c44dc92a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FinishedGoodReceives.vue?vue&type=template&id=c44dc92a& */ "./resources/js/components/finished_good_receive/FinishedGoodReceives.vue?vue&type=template&id=c44dc92a&");
/* harmony import */ var _FinishedGoodReceives_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FinishedGoodReceives.vue?vue&type=script&lang=js& */ "./resources/js/components/finished_good_receive/FinishedGoodReceives.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FinishedGoodReceives_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FinishedGoodReceives_vue_vue_type_template_id_c44dc92a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FinishedGoodReceives_vue_vue_type_template_id_c44dc92a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/finished_good_receive/FinishedGoodReceives.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/finished_good_receive/FinishedGoodReceives.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/finished_good_receive/FinishedGoodReceives.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoodReceives_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./FinishedGoodReceives.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/finished_good_receive/FinishedGoodReceives.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoodReceives_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/finished_good_receive/FinishedGoodReceives.vue?vue&type=template&id=c44dc92a&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/finished_good_receive/FinishedGoodReceives.vue?vue&type=template&id=c44dc92a& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoodReceives_vue_vue_type_template_id_c44dc92a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FinishedGoodReceives.vue?vue&type=template&id=c44dc92a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/finished_good_receive/FinishedGoodReceives.vue?vue&type=template&id=c44dc92a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoodReceives_vue_vue_type_template_id_c44dc92a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGoodReceives_vue_vue_type_template_id_c44dc92a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);