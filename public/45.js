(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[45],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/section/Section.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/section/Section.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      valid: false,
      delete_dialog: false,
      btn_loading: false,
      dialog: false,
      section: {},
      sections: [],
      departments: []
    };
  },
  methods: {
    fetchSuppliers: function fetchSuppliers() {
      var _this = this;

      axios.get("/api/section").then(function (response) {
        _this.sections = response.data.sections;
      })["catch"](function (error) {});
    },
    handelSubmit: function handelSubmit() {
      var _this2 = this;

      this.btn_loading = true;
      var formData = new FormData();
      Object.keys(this.section).forEach(function (key) {
        return formData.append(key, _this2.section[key]);
      });
      axios.post("/api/section", formData).then(function (response) {
        _this2.fetchSuppliers();

        _this2.dialog = false, _this2.btn_loading = false;
      })["catch"](function (error) {
        _this2.btn_loading = false;
      });
    },
    handelUpdate: function handelUpdate() {
      var _this3 = this;

      this.btn_loading = true;
      var formData = new FormData();
      Object.keys(this.section).forEach(function (key) {
        return formData.append(key, _this3.section[key]);
      });
      formData.append("_method", "put");
      axios.post("/api/section/" + this.$route.params.id, formData).then(function (response) {
        _this3.dialog = false, _this3.btn_loading = false;
      })["catch"](function (error) {
        _this3.dialog = false, _this3.btn_loading = false;
      });
    },
    fetchOptions: function fetchOptions() {
      var _this4 = this;

      axios.get("/api/department").then(function (response) {
        _this4.departments = response.data.departments;
      })["catch"](function (error) {});
    },
    initDelete: function initDelete(section) {
      this.section = section;
      this.delete_dialog = true;
    },
    confirmDelete: function confirmDelete() {
      var _this5 = this;

      axios["delete"]("/api/section/" + this.section.id).then(function (response) {
        _this5.fetchSuppliers();

        _this5.delete_dialog = false;
      })["catch"](function (error) {
        _this5.delete_dialog = false;
      });
    }
  },
  created: function created() {
    this.fetchSuppliers();
    this.fetchOptions();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/section/Section.vue?vue&type=template&id=193bc6c0&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/section/Section.vue?vue&type=template&id=193bc6c0& ***!
  \******************************************************************************************************************************************************************************************************************/
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
                _vm._v("SECTIONS")
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
        [
          _c(
            "v-row",
            _vm._l(_vm.sections, function(section, index) {
              return _c(
                "v-col",
                { key: index, attrs: { cols: "12", md: "6" } },
                [
                  _c(
                    "v-list-item",
                    { attrs: { "two-line": "" } },
                    [
                      _c(
                        "v-list-item-content",
                        [
                          _c("v-list-item-title", [
                            _vm._v(_vm._s(section.name))
                          ]),
                          _vm._v(" "),
                          _c("v-list-item-subtitle", [
                            _vm._v(
                              _vm._s(section.section_id) +
                                ", " +
                                _vm._s(section.tin_no)
                            )
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-action",
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: { icon: "" },
                              on: {
                                click: function($event) {
                                  return _vm.initDelete(section)
                                }
                              }
                            },
                            [
                              _c("v-icon", { attrs: { color: "red" } }, [
                                _vm._v("delete")
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
                  _c("v-divider")
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
          attrs: { persistent: "", "max-width": "600px" },
          model: {
            value: _vm.dialog,
            callback: function($$v) {
              _vm.dialog = $$v
            },
            expression: "dialog"
          }
        },
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
                    _vm._v("SECTION REGISTRATION FORM")
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
                    "v-container",
                    [
                      _c("v-text-field", {
                        attrs: {
                          label: "Section Id*",
                          rules: [
                            function(v) {
                              return !!v || "Section id is required"
                            }
                          ],
                          required: ""
                        },
                        model: {
                          value: _vm.section.section_id,
                          callback: function($$v) {
                            _vm.$set(_vm.section, "section_id", $$v)
                          },
                          expression: "section.section_id"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          label: "Name*",
                          rules: [
                            function(v) {
                              return !!v || "Name is required"
                            }
                          ],
                          required: ""
                        },
                        model: {
                          value: _vm.section.name,
                          callback: function($$v) {
                            _vm.$set(_vm.section, "name", $$v)
                          },
                          expression: "section.name"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: {
                          items: _vm.departments,
                          "item-text": "name",
                          "item-value": "id",
                          rules: [
                            function(v) {
                              return !!v || "Department field is required"
                            }
                          ],
                          label: "Department category"
                        },
                        model: {
                          value: _vm.section.department_id,
                          callback: function($$v) {
                            _vm.$set(_vm.section, "department_id", $$v)
                          },
                          expression: "section.department_id"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "blue darken-1", text: "" },
                          on: {
                            click: function($event) {
                              _vm.dialog = false
                            }
                          }
                        },
                        [_vm._v("Close")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: {
                            color: "blue darken-1",
                            loading: _vm.btn_loading,
                            text: ""
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.handelSubmit($event)
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

/***/ "./resources/js/components/section/Section.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/section/Section.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Section_vue_vue_type_template_id_193bc6c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Section.vue?vue&type=template&id=193bc6c0& */ "./resources/js/components/section/Section.vue?vue&type=template&id=193bc6c0&");
/* harmony import */ var _Section_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Section.vue?vue&type=script&lang=js& */ "./resources/js/components/section/Section.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Section_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Section_vue_vue_type_template_id_193bc6c0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Section_vue_vue_type_template_id_193bc6c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/section/Section.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/section/Section.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/section/Section.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Section_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Section.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/section/Section.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Section_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/section/Section.vue?vue&type=template&id=193bc6c0&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/section/Section.vue?vue&type=template&id=193bc6c0& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Section_vue_vue_type_template_id_193bc6c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Section.vue?vue&type=template&id=193bc6c0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/section/Section.vue?vue&type=template&id=193bc6c0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Section_vue_vue_type_template_id_193bc6c0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Section_vue_vue_type_template_id_193bc6c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);