(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/ManageBalance.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/item/ManageBalance.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      btn_loading: false,
      item_id: null,
      item: {
        item_category: {}
      },
      items: [],
      item_categories: []
    };
  },
  methods: {
    clearForm: function clearForm() {
      this.item = {
        item_category: {}
      };
    },
    handelSubmit: function handelSubmit() {
      var _this = this;

      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        var formData = new FormData();
        Object.keys(this.item).forEach(function (key) {
          return formData.append(key, _this.item[key]);
        });
        axios.post("/api/updateItemBalance/" + this.item.id, formData).then(function (response) {
          _this.btn_loading = false;

          _this.clearForm();
        })["catch"](function (error) {
          _this.btn_loading = false;
        });
      }
    },
    selectItem: function selectItem() {
      var _this2 = this;

      this.item = this.items.filter(function (item) {
        return item.id == _this2.item.id;
      })[0];
      this.$refs.form.validate();
    },
    fetchItem: function fetchItem() {
      var _this3 = this;

      axios.get("/api/items?item_category_id=" + this.item.item_category.id).then(function (response) {
        _this3.items = response.data.items;
      })["catch"](function (error) {});
    },
    fetchOptions: function fetchOptions() {
      var _this4 = this;

      axios.get("/api/itemOptions").then(function (response) {
        _this4.item_categories = response.data.itemCategories;
      })["catch"](function (error) {});
    }
  },
  created: function created() {
    this.fetchOptions();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/ManageBalance.vue?vue&type=template&id=7f34c7a6&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/item/ManageBalance.vue?vue&type=template&id=7f34c7a6& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
    "v-card",
    { staticClass: "pa-3" },
    [
      _c(
        "v-toolbar",
        { staticClass: "cyan" },
        [
          _c("v-divider"),
          _vm._v(" "),
          _c("v-card-title", { staticClass: "white--text" }, [
            _vm._v("MANAGE ITEM INITIAL BALANCE")
          ]),
          _vm._v(" "),
          _c("v-divider"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "white--text no-print",
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
      _c(
        "v-form",
        {
          ref: "form",
          staticClass: "pt-4 no-print",
          on: { submit: _vm.handelSubmit },
          model: {
            value: _vm.valid,
            callback: function($$v) {
              _vm.valid = $$v
            },
            expression: "valid"
          }
        },
        [
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { staticClass: "py-0", attrs: { cols: "12", md: "4" } },
                [
                  _c("v-autocomplete", {
                    attrs: {
                      items: _vm.item_categories,
                      "item-text": "category",
                      "item-value": "id",
                      rules: [
                        function(v) {
                          return !!v || "Category field is required"
                        }
                      ],
                      label: "Item category"
                    },
                    on: { change: _vm.fetchItem },
                    model: {
                      value: _vm.item.item_category.id,
                      callback: function($$v) {
                        _vm.$set(_vm.item.item_category, "id", $$v)
                      },
                      expression: "item.item_category.id"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { staticClass: "py-0", attrs: { cols: "12", md: "4" } },
                [
                  _c("v-autocomplete", {
                    attrs: {
                      items: _vm.items,
                      "item-text": "name",
                      "item-value": "id",
                      rules: [
                        function(v) {
                          return !!v || "Item field is required"
                        }
                      ],
                      label: "Item "
                    },
                    on: { change: _vm.selectItem },
                    model: {
                      value: _vm.item.id,
                      callback: function($$v) {
                        _vm.$set(_vm.item, "id", $$v)
                      },
                      expression: "item.id"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { staticClass: "py-0", attrs: { cols: "12", md: "4" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      type: "number",
                      messages: "Current balance : " + _vm.item.balance,
                      label: "Initial balance"
                    },
                    model: {
                      value: _vm.item.initial_balance,
                      callback: function($$v) {
                        _vm.$set(_vm.item, "initial_balance", $$v)
                      },
                      expression: "item.initial_balance"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("v-divider"),
          _vm._v(" "),
          _vm.item.id
            ? _c(
                "v-list-item",
                [
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [_vm._v(_vm._s(_vm.item.name))]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(_vm._s(_vm.item.item_category.category))
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v("Current balance : " + _vm._s(_vm.item.balance))
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "Initial balance : " +
                            _vm._s(_vm.item.initial_balance)
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c("v-divider"),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "text-center mt-3" },
            [
              _c(
                "v-btn",
                {
                  attrs: {
                    dark: "",
                    color: "cyan accent-6",
                    loading: _vm.btn_loading,
                    rounded: ""
                  },
                  on: { click: _vm.handelSubmit }
                },
                [_vm._v("Update")]
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

/***/ "./resources/js/components/item/ManageBalance.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/item/ManageBalance.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ManageBalance_vue_vue_type_template_id_7f34c7a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ManageBalance.vue?vue&type=template&id=7f34c7a6& */ "./resources/js/components/item/ManageBalance.vue?vue&type=template&id=7f34c7a6&");
/* harmony import */ var _ManageBalance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ManageBalance.vue?vue&type=script&lang=js& */ "./resources/js/components/item/ManageBalance.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ManageBalance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ManageBalance_vue_vue_type_template_id_7f34c7a6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ManageBalance_vue_vue_type_template_id_7f34c7a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/item/ManageBalance.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/item/ManageBalance.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/item/ManageBalance.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageBalance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ManageBalance.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/ManageBalance.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageBalance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/item/ManageBalance.vue?vue&type=template&id=7f34c7a6&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/item/ManageBalance.vue?vue&type=template&id=7f34c7a6& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageBalance_vue_vue_type_template_id_7f34c7a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ManageBalance.vue?vue&type=template&id=7f34c7a6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/ManageBalance.vue?vue&type=template&id=7f34c7a6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageBalance_vue_vue_type_template_id_7f34c7a6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageBalance_vue_vue_type_template_id_7f34c7a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);