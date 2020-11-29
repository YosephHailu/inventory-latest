(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop/Add.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/shop/Add.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      edit: false,
      valid: false,
      shop: {},
      btn_loading: false
    };
  },
  methods: {
    handelSubmit: function handelSubmit() {
      var _this = this;

      this.btn_loading = true;
      var formData = new FormData();
      Object.keys(this.shop).forEach(function (key) {
        return formData.append(key, _this.shop[key]);
      });
      axios.post("/api/shop", formData).then(function (response) {
        console.log(response.data);

        _this.$router.go(-1);

        _this.btn_loading = false;
      })["catch"](function (error) {
        console.log(error.response.data);
        _this.btn_loading = false;
      });
    },
    handelUpdate: function handelUpdate() {
      var _this2 = this;

      this.btn_loading = true;
      var formData = new FormData();
      Object.keys(this.shop).forEach(function (key) {
        return formData.append(key, _this2.shop[key]);
      });
      formData.append("_method", "put");
      axios.post("/api/shop/" + this.$route.params.id, formData).then(function (response) {
        _this2.$router.go(-1);

        _this2.btn_loading = false;
      })["catch"](function (error) {
        _this2.btn_loading = false;
      });
    },
    fetchShop: function fetchShop() {
      var _this3 = this;

      axios.get("/api/shop/" + this.$route.params.id).then(function (response) {
        _this3.shop = response.data.shop;
      })["catch"](function (error) {});
    }
  },
  created: function created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.fetchShop();
    } else {
      this.edit = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop/Add.vue?vue&type=template&id=0607499a&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/shop/Add.vue?vue&type=template&id=0607499a& ***!
  \***********************************************************************************************************************************************************************************************************/
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
    "v-form",
    {
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
                    _vm._v("SHOP REGISTRATION FORM")
                  ]),
                  _vm._v(" "),
                  _c("v-divider")
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-form",
                {
                  ref: "form",
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
                        { attrs: { cols: "12", md: "4" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              rules: [
                                function(v) {
                                  return !!v || "Shop id is required"
                                }
                              ],
                              label: "Shop id",
                              required: ""
                            },
                            model: {
                              value: _vm.shop.shop_id,
                              callback: function($$v) {
                                _vm.$set(_vm.shop, "shop_id", $$v)
                              },
                              expression: "shop.shop_id"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12", md: "4" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              rules: [
                                function(v) {
                                  return !!v || "Name is required"
                                }
                              ],
                              label: "Shop name",
                              required: ""
                            },
                            model: {
                              value: _vm.shop.name,
                              callback: function($$v) {
                                _vm.$set(_vm.shop, "name", $$v)
                              },
                              expression: "shop.name"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12", md: "4" } },
                        [
                          _c("v-text-field", {
                            attrs: { messages: "optional", label: "Location" },
                            model: {
                              value: _vm.shop.location,
                              callback: function($$v) {
                                _vm.$set(_vm.shop, "location", $$v)
                              },
                              expression: "shop.location"
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
              _c("v-file-input", {
                staticClass: "mx-0",
                attrs: {
                  "prepend-icon": "image",
                  messages: "optional",
                  label: "Photo"
                },
                model: {
                  value: _vm.shop.picture,
                  callback: function($$v) {
                    _vm.$set(_vm.shop, "picture", $$v)
                  },
                  expression: "shop.picture"
                }
              }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "text-center mt-3" },
                [
                  _vm.edit
                    ? _c(
                        "v-btn",
                        {
                          attrs: {
                            dark: "",
                            color: "cyan accent-6",
                            loading: _vm.btn_loading,
                            rounded: ""
                          },
                          on: { click: _vm.handelUpdate }
                        },
                        [_vm._v("Save")]
                      )
                    : _c(
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
                        [_vm._v("Save")]
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

/***/ "./resources/js/components/shop/Add.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/shop/Add.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Add_vue_vue_type_template_id_0607499a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Add.vue?vue&type=template&id=0607499a& */ "./resources/js/components/shop/Add.vue?vue&type=template&id=0607499a&");
/* harmony import */ var _Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Add.vue?vue&type=script&lang=js& */ "./resources/js/components/shop/Add.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Add_vue_vue_type_template_id_0607499a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Add_vue_vue_type_template_id_0607499a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/shop/Add.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/shop/Add.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/components/shop/Add.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Add.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop/Add.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/shop/Add.vue?vue&type=template&id=0607499a&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/shop/Add.vue?vue&type=template&id=0607499a& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_0607499a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Add.vue?vue&type=template&id=0607499a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop/Add.vue?vue&type=template&id=0607499a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_0607499a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_0607499a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);