(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[47],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop/shops.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/shop/shops.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      valid: false,
      delete_dialog: false,
      shops: [],
      shop: {}
    };
  },
  methods: {
    fetchStores: function fetchStores() {
      var _this = this;

      axios.get("/api/shop").then(function (response) {
        _this.shops = response.data.shops;
      })["catch"](function (error) {});
    },
    initDelete: function initDelete(shop) {
      this.shop = shop;
      this.delete_dialog = true;
    },
    confirmDelete: function confirmDelete() {
      var _this2 = this;

      axios["delete"]("/api/shop/" + this.shop.id).then(function (response) {
        _this2.fetchStores();

        _this2.delete_dialog = false;
      })["catch"](function (error) {
        _this2.delete_dialog = false;
      });
    }
  },
  created: function created() {
    this.fetchStores();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop/shops.vue?vue&type=template&id=0b223b22&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/shop/shops.vue?vue&type=template&id=0b223b22& ***!
  \*************************************************************************************************************************************************************************************************************/
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
                _vm._v("SHOPES")
              ]),
              _vm._v(" "),
              _c("v-divider")
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-row",
            _vm._l(_vm.shops, function(shop, index) {
              return _c(
                "v-col",
                { key: index, attrs: { cols: "6" } },
                [
                  _c(
                    "v-card",
                    { staticClass: "text-center py-3" },
                    [
                      _c(
                        "v-avatar",
                        { staticClass: "ma-3", attrs: { size: "125" } },
                        [
                          _c("v-img", {
                            attrs: { src: "./storage/shop/" + shop.photo }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-toolbar-title", { staticClass: "text-center" }, [
                        _vm._v(_vm._s(shop.name))
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-card-subtitle",
                        { staticClass: "text-center py-0" },
                        [_vm._v(_vm._s(shop.shop_id))]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: {
                            to: { path: "/shop/" + shop.id + "/edit" },
                            small: ""
                          }
                        },
                        [_vm._v("Edit")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "red white--text",
                          attrs: { small: "" },
                          on: {
                            click: function($event) {
                              return _vm.initDelete(shop)
                            }
                          }
                        },
                        [_vm._v("Delete")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            }),
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          staticClass: "danger",
          attrs: { persistent: "", "max-width": "290" },
          model: {
            value: _vm.delete_dialog,
            callback: function($$v) {
              _vm.delete_dialog = $$v
            },
            expression: "delete_dialog"
          }
        },
        [
          _c(
            "v-card",
            { staticClass: "red", attrs: { dark: "" } },
            [
              _c("v-card-title", { staticClass: "center headline" }, [
                _vm._v("Confirm")
              ]),
              _vm._v(" "),
              _c("v-card-text", [
                _vm._v(
                  "\n        This operation is irreversible. are you sure you went to continue,\n        Press cancel to get back\n      "
                )
              ]),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "white ", text: "" },
                      on: {
                        click: function($event) {
                          _vm.delete_dialog = false
                        }
                      }
                    },
                    [_vm._v("Cancel")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "white", text: "" },
                      on: { click: _vm.confirmDelete }
                    },
                    [_vm._v("Confirm")]
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

/***/ "./resources/js/components/shop/shops.vue":
/*!************************************************!*\
  !*** ./resources/js/components/shop/shops.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shops_vue_vue_type_template_id_0b223b22___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shops.vue?vue&type=template&id=0b223b22& */ "./resources/js/components/shop/shops.vue?vue&type=template&id=0b223b22&");
/* harmony import */ var _shops_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shops.vue?vue&type=script&lang=js& */ "./resources/js/components/shop/shops.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _shops_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _shops_vue_vue_type_template_id_0b223b22___WEBPACK_IMPORTED_MODULE_0__["render"],
  _shops_vue_vue_type_template_id_0b223b22___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/shop/shops.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/shop/shops.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/shop/shops.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shops_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./shops.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop/shops.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shops_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/shop/shops.vue?vue&type=template&id=0b223b22&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/shop/shops.vue?vue&type=template&id=0b223b22& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_shops_vue_vue_type_template_id_0b223b22___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./shops.vue?vue&type=template&id=0b223b22& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop/shops.vue?vue&type=template&id=0b223b22&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_shops_vue_vue_type_template_id_0b223b22___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_shops_vue_vue_type_template_id_0b223b22___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);