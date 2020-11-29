(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/config/Config.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/config/Config.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      delete_dialog: false,
      btn_loading: false,
      dialog: false,
      config: {},
      configs: []
    };
  },
  methods: {
    fetchConfig: function fetchConfig() {
      var _this = this;

      axios.get("/api/config").then(function (response) {
        if (response.data.config) {
          _this.config = response.data.config;
          _this.edit = true;
        }
      })["catch"](function (error) {
        console.log(error.response.data);
      });
    },
    handelSubmit: function handelSubmit() {
      var _this2 = this;

      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        var formData = new FormData();
        Object.keys(this.config).forEach(function (key) {
          return formData.append(key, _this2.config[key]);
        });
        axios.post("/api/config", formData).then(function (response) {
          _this2.fetchConfig();

          _this2.dialog = false, _this2.btn_loading = false;
        })["catch"](function (error) {
          _this2.btn_loading = false;
        });
      }
    },
    handelUpdate: function handelUpdate() {
      var _this3 = this;

      this.btn_loading = true;
      var formData = new FormData();
      Object.keys(this.config).forEach(function (key) {
        return formData.append(key, _this3.config[key]);
      });
      formData.append("_method", "put");
      axios.post("/api/config/" + this.config.id, formData).then(function (response) {
        _this3.dialog = false, _this3.btn_loading = false;
      })["catch"](function (error) {
        _this3.dialog = false, _this3.btn_loading = false;
      });
    },
    closeup: function closeup() {
      var _this4 = this;

      this.btn_loading = true;
      axios.get("/api/closeup/").then(function (response) {
        console.log(response.data);
      })["catch"](function (error) {
        console.log(error.response.data);
      })["finally"](function () {
        _this4.btn_loading = false;
      });
    },
    revalidate: function revalidate() {
      var _this5 = this;

      this.btn_loading = true;
      axios.get("/api/revalidate/").then(function (response) {
        console.log(response.data);
      })["catch"](function (error) {
        console.log(error.response.data);
      })["finally"](function () {
        _this5.btn_loading = false;
      });
    }
  },
  created: function created() {
    this.fetchConfig();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/config/Config.vue?vue&type=template&id=e9dc49d8&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/config/Config.vue?vue&type=template&id=e9dc49d8& ***!
  \****************************************************************************************************************************************************************************************************************/
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
        "v-card",
        [
          _c(
            "v-toolbar",
            { staticClass: "cyan" },
            [
              _c("v-divider"),
              _vm._v(" "),
              _c("v-card-title", { staticClass: "white--text" }, [
                _vm._v("CONFIGURATION")
              ]),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: {
                    absolute: "",
                    dark: "",
                    fab: "",
                    right: "",
                    color: "cyan"
                  },
                  on: {
                    click: function($event) {
                      _vm.dialog = true
                    }
                  }
                },
                [_c("v-icon", [_vm._v("add")])],
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
        "v-card",
        { staticClass: "pa-3" },
        [
          _c(
            "v-form",
            {
              ref: "form",
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  return _vm.handelSubmit($event)
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
                    { staticClass: "py-0", attrs: { cols: "12", md: "6" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          label: "GRN start*",
                          rules: [
                            function(v) {
                              return !!v || "GRN start id is required"
                            }
                          ],
                          required: ""
                        },
                        model: {
                          value: _vm.config.grn_start,
                          callback: function($$v) {
                            _vm.$set(_vm.config, "grn_start", $$v)
                          },
                          expression: "config.grn_start"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { staticClass: "py-0", attrs: { cols: "12", md: "6" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          label: "GRN end*",
                          rules: [
                            function(v) {
                              return !!v || "GRN end is required"
                            }
                          ],
                          required: ""
                        },
                        model: {
                          value: _vm.config.grn_end,
                          callback: function($$v) {
                            _vm.$set(_vm.config, "grn_end", $$v)
                          },
                          expression: "config.grn_end"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { staticClass: "py-0", attrs: { cols: "12", md: "6" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          label: "Issue number start*",
                          rules: [
                            function(v) {
                              return !!v || "Issue number start id is required"
                            }
                          ],
                          required: ""
                        },
                        model: {
                          value: _vm.config.issue_start,
                          callback: function($$v) {
                            _vm.$set(_vm.config, "issue_start", $$v)
                          },
                          expression: "config.issue_start"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { staticClass: "py-0", attrs: { cols: "12", md: "6" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          label: "Issue number end*",
                          rules: [
                            function(v) {
                              return !!v || "Issue number end is required"
                            }
                          ],
                          required: ""
                        },
                        model: {
                          value: _vm.config.issue_end,
                          callback: function($$v) {
                            _vm.$set(_vm.config, "issue_end", $$v)
                          },
                          expression: "config.issue_end"
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
                "div",
                { staticClass: "text-center mt-3" },
                [
                  _vm.edit
                    ? _c(
                        "v-btn",
                        {
                          attrs: {
                            type: "submit",
                            dark: "",
                            color: "cyan accent-6",
                            loading: _vm.btn_loading,
                            rounded: ""
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.handelUpdate(true)
                            }
                          }
                        },
                        [_vm._v("Update")]
                      )
                    : _c(
                        "v-btn",
                        {
                          attrs: {
                            type: "submit",
                            dark: "",
                            color: "cyan accent-6",
                            loading: _vm.btn_loading,
                            rounded: ""
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.handelSubmit(false)
                            }
                          }
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
      ),
      _vm._v(" "),
      _c(
        "v-card",
        { staticClass: "text-center my-3 py-3" },
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
                  $event.preventDefault()
                  return _vm.closeup($event)
                }
              }
            },
            [_vm._v("CLOSE UP")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card",
        { staticClass: "text-center my-3 py-3" },
        [
          _c(
            "v-btn",
            {
              attrs: {
                dark: "",
                color: "primary accent-6",
                loading: _vm.btn_loading,
                rounded: ""
              },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.revalidate($event)
                }
              }
            },
            [_vm._v("VALIDATE DATABASE BALANCE")]
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

/***/ "./resources/js/components/config/Config.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/config/Config.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Config_vue_vue_type_template_id_e9dc49d8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Config.vue?vue&type=template&id=e9dc49d8& */ "./resources/js/components/config/Config.vue?vue&type=template&id=e9dc49d8&");
/* harmony import */ var _Config_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Config.vue?vue&type=script&lang=js& */ "./resources/js/components/config/Config.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Config_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Config_vue_vue_type_template_id_e9dc49d8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Config_vue_vue_type_template_id_e9dc49d8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/config/Config.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/config/Config.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/config/Config.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Config_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Config.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/config/Config.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Config_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/config/Config.vue?vue&type=template&id=e9dc49d8&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/config/Config.vue?vue&type=template&id=e9dc49d8& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Config_vue_vue_type_template_id_e9dc49d8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Config.vue?vue&type=template&id=e9dc49d8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/config/Config.vue?vue&type=template&id=e9dc49d8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Config_vue_vue_type_template_id_e9dc49d8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Config_vue_vue_type_template_id_e9dc49d8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);