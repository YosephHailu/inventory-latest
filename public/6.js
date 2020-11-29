(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/Add.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/item/Add.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      edit: false,
      valid: false,
      item: {
        unit: {},
        item_category: {}
      },
      btn_loading: false,
      itemCategories: [],
      units: []
    };
  },
  methods: _defineProperty({
    clearForm: function clearForm() {
      this.item = {
        unit: {},
        item_category: {}
      };
    },
    handelSubmit: function handelSubmit(close) {
      var _this = this;

      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        var formData = new FormData();
        Object.keys(this.item).forEach(function (key) {
          return formData.append(key, _this.item[key]);
        });
        formData.append("unit", JSON.stringify(this.item.unit));
        formData.append("item_category", JSON.stringify(this.item.item_category));
        axios.post("/api/item", formData).then(function (response) {
          if (close) _this.$router.go(-1);else _this.clearForm();
          _this.btn_loading = false;

          _this.$store.dispatch("updateAlert", {
            message: "Successfully saved ",
            type: "success",
            visible: true
          });
        })["catch"](function (error) {
          _this.btn_loading = false;
        });
      }
    },
    handelUpdate: function handelUpdate() {
      var _this2 = this;

      console.log(this.item);

      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        var formData = new FormData();
        Object.keys(this.item).forEach(function (key) {
          return formData.append(key, _this2.item[key]);
        });
        formData.append("unit", JSON.stringify(this.item.unit));
        formData.append("item_category", JSON.stringify(this.item.item_category));
        formData.append("_method", "put");
        axios.post("/api/item/" + this.item.id, formData).then(function (response) {
          console.log(response.data); // this.$router.push({ path: "/items" });

          _this2.btn_loading = false;

          _this2.$store.dispatch("updateAlert", {
            message: "Successfully updated ",
            type: "success",
            visible: true
          });
        })["catch"](function (error) {
          _this2.btn_loading = false;
          console.log(error.response.data);
        });
      }
    },
    fetchItem: function fetchItem() {
      var _this3 = this;

      axios.get("/api/item/" + this.$route.params.id).then(function (response) {
        _this3.item = response.data.item;
      })["catch"](function (error) {});
    },
    fetchOptions: function fetchOptions() {
      var _this4 = this;

      axios.get("/api/itemOptions").then(function (response) {
        _this4.itemCategories = response.data.itemCategories;
        _this4.units = response.data.units;
      })["catch"](function (error) {});
    }
  }, "fetchItem", function fetchItem() {
    var _this5 = this;

    axios.get("/api/item/" + this.$route.params.id).then(function (response) {
      _this5.item = response.data.item;
    })["catch"](function (error) {});
  }),
  created: function created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.fetchItem();
    } else {
      this.edit = false;
    }

    this.fetchOptions();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/Add.vue?vue&type=template&id=63188e50&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/item/Add.vue?vue&type=template&id=63188e50& ***!
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
                    _vm._v("RAW MATERIAL REGISTRATION FORM")
                  ]),
                  _vm._v(" "),
                  _c("v-divider"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "white--text",
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
                  on: {
                    submit: function($event) {
                      return _vm.handelSubmit(false)
                    }
                  },
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
                                  return !!v || "Item id is required"
                                }
                              ],
                              label: "Item id",
                              required: ""
                            },
                            model: {
                              value: _vm.item.item_id,
                              callback: function($$v) {
                                _vm.$set(_vm.item, "item_id", $$v)
                              },
                              expression: "item.item_id"
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
                          _c("v-autocomplete", {
                            attrs: {
                              items: _vm.itemCategories,
                              "item-text": "category",
                              rules: [
                                function(v) {
                                  return !!v || "Category field is required"
                                }
                              ],
                              label: "Item category"
                            },
                            model: {
                              value: _vm.item.item_category.category,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.item.item_category,
                                  "category",
                                  $$v
                                )
                              },
                              expression: "item.item_category.category"
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
                              label: "Item name",
                              required: ""
                            },
                            model: {
                              value: _vm.item.name,
                              callback: function($$v) {
                                _vm.$set(_vm.item, "name", $$v)
                              },
                              expression: "item.name"
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
                          _c("v-select", {
                            attrs: {
                              items: _vm.units,
                              "item-text": "name",
                              rules: [
                                function(v) {
                                  return !!v || "Unit field is required"
                                }
                              ],
                              label: "Measurement unit"
                            },
                            model: {
                              value: _vm.item.unit.name,
                              callback: function($$v) {
                                _vm.$set(_vm.item.unit, "name", $$v)
                              },
                              expression: "item.unit.name"
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
                              value: _vm.item.location,
                              callback: function($$v) {
                                _vm.$set(_vm.item, "location", $$v)
                              },
                              expression: "item.location"
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
                                  return !!v || "Minimum balance is required"
                                }
                              ],
                              label: "Minimum balance",
                              required: ""
                            },
                            model: {
                              value: _vm.item.min_balance,
                              callback: function($$v) {
                                _vm.$set(_vm.item, "min_balance", $$v)
                              },
                              expression: "item.min_balance"
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
                  value: _vm.item.picture,
                  callback: function($$v) {
                    _vm.$set(_vm.item, "picture", $$v)
                  },
                  expression: "item.picture"
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
                          on: {
                            click: function($event) {
                              return _vm.handelUpdate(true)
                            }
                          }
                        },
                        [_vm._v("Update")]
                      )
                    : _c(
                        "div",
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
                              on: {
                                click: function($event) {
                                  return _vm.handelSubmit(false)
                                }
                              }
                            },
                            [_vm._v("Add")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              staticClass: "float-right",
                              attrs: {
                                dark: "",
                                color: "cyan darken-3",
                                loading: _vm.btn_loading,
                                rounded: ""
                              },
                              on: {
                                click: function($event) {
                                  return _vm.handelSubmit(true)
                                }
                              }
                            },
                            [_vm._v("Save & Close")]
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

/***/ "./resources/js/components/item/Add.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/item/Add.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Add_vue_vue_type_template_id_63188e50___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Add.vue?vue&type=template&id=63188e50& */ "./resources/js/components/item/Add.vue?vue&type=template&id=63188e50&");
/* harmony import */ var _Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Add.vue?vue&type=script&lang=js& */ "./resources/js/components/item/Add.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Add_vue_vue_type_template_id_63188e50___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Add_vue_vue_type_template_id_63188e50___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/item/Add.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/item/Add.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/components/item/Add.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Add.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/Add.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/item/Add.vue?vue&type=template&id=63188e50&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/item/Add.vue?vue&type=template&id=63188e50& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_63188e50___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Add.vue?vue&type=template&id=63188e50& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/item/Add.vue?vue&type=template&id=63188e50&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_63188e50___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_63188e50___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);