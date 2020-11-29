(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/config/FGModel.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/config/FGModel.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
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
      finished_good_model: {},
      finished_good_models: [],
      finished_good_categories: []
    };
  },
  methods: {
    fetchModels: function fetchModels() {
      var _this = this;

      axios.get("/api/finished_good_model").then(function (response) {
        _this.finished_good_models = response.data.finished_good_models;
      })["catch"](function (error) {});
    },
    fetchOptions: function fetchOptions() {
      var _this2 = this;

      axios.get("/api/finished_good_category").then(function (response) {
        _this2.finished_good_categories = response.data.finished_good_categories;
      })["catch"](function (error) {});
    },
    handelSubmit: function handelSubmit() {
      var _this3 = this;

      this.btn_loading = true;
      var formData = new FormData();
      Object.keys(this.finished_good_model).forEach(function (key) {
        return formData.append(key, _this3.finished_good_model[key]);
      });
      axios.post("/api/finished_good_model", formData).then(function (response) {
        _this3.fetchModels();

        _this3.dialog = false, _this3.btn_loading = false;
      })["catch"](function (error) {
        _this3.btn_loading = false;
      });
    },
    handelUpdate: function handelUpdate() {
      var _this4 = this;

      this.btn_loading = true;
      var formData = new FormData();
      Object.keys(this.finished_good_model).forEach(function (key) {
        return formData.append(key, _this4.finished_good_model[key]);
      });
      formData.append("_method", "put");
      axios.post("/api/finished_good_model/" + this.$route.params.id, formData).then(function (response) {
        _this4.dialog = false, _this4.btn_loading = false;
      })["catch"](function (error) {
        _this4.dialog = false, _this4.btn_loading = false;
      });
    },
    initDelete: function initDelete(finished_good_model) {
      this.finished_good_model = finished_good_model;
      this.delete_dialog = true;
    },
    confirmDelete: function confirmDelete() {
      var _this5 = this;

      axios["delete"]("/api/finished_good_model/" + this.finished_good_model.id).then(function (response) {
        _this5.fetchModels();

        _this5.delete_dialog = false;
      })["catch"](function (error) {
        _this5.delete_dialog = false;
      });
    }
  },
  created: function created() {
    this.fetchModels();
    this.fetchOptions();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/config/FGModel.vue?vue&type=template&id=28534ab4&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/config/FGModel.vue?vue&type=template&id=28534ab4& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
                _vm._v("FINISHED GOOD MODEL")
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
            _vm._l(_vm.finished_good_models, function(
              finished_good_model,
              index
            ) {
              return _c(
                "v-col",
                { key: index, staticClass: "py-0", attrs: { cols: "6" } },
                [
                  _c(
                    "v-list-item",
                    { attrs: { "two-line": "" } },
                    [
                      _c(
                        "v-list-item-content",
                        [
                          _c("v-list-item-title", [
                            _vm._v(_vm._s(finished_good_model.model))
                          ]),
                          _vm._v(" "),
                          _c("v-list-item-subtitle", [
                            _vm._v(_vm._s(finished_good_model.model_id))
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
                                  return _vm.initDelete(finished_good_model)
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
                    _vm._v("Finished good category registration form")
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
                      _c(
                        "v-row",
                        [
                          _c(
                            "v-col",
                            [
                              _c("v-text-field", {
                                attrs: {
                                  label: "Model id*",
                                  rules: [
                                    function(v) {
                                      return !!v || "Category id is required"
                                    }
                                  ],
                                  required: ""
                                },
                                model: {
                                  value: _vm.finished_good_model.model_id,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.finished_good_model,
                                      "model_id",
                                      $$v
                                    )
                                  },
                                  expression: "finished_good_model.model_id"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-col",
                            [
                              _c("v-select", {
                                attrs: {
                                  items: _vm.finished_good_categories,
                                  "item-text": "category",
                                  "item-value": "id",
                                  rules: [
                                    function(v) {
                                      return !!v || "Category field is required"
                                    }
                                  ],
                                  label: "Finished good category"
                                },
                                model: {
                                  value:
                                    _vm.finished_good_model
                                      .finished_good_category_id,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.finished_good_model,
                                      "finished_good_category_id",
                                      $$v
                                    )
                                  },
                                  expression:
                                    "finished_good_model.finished_good_category_id"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          label: "Model name*",
                          rules: [
                            function(v) {
                              return !!v || "Model name is required"
                            }
                          ],
                          required: ""
                        },
                        model: {
                          value: _vm.finished_good_model.model,
                          callback: function($$v) {
                            _vm.$set(_vm.finished_good_model, "model", $$v)
                          },
                          expression: "finished_good_model.model"
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

/***/ "./resources/js/components/config/FGModel.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/config/FGModel.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FGModel_vue_vue_type_template_id_28534ab4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FGModel.vue?vue&type=template&id=28534ab4& */ "./resources/js/components/config/FGModel.vue?vue&type=template&id=28534ab4&");
/* harmony import */ var _FGModel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FGModel.vue?vue&type=script&lang=js& */ "./resources/js/components/config/FGModel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FGModel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FGModel_vue_vue_type_template_id_28534ab4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FGModel_vue_vue_type_template_id_28534ab4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/config/FGModel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/config/FGModel.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/config/FGModel.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FGModel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./FGModel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/config/FGModel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FGModel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/config/FGModel.vue?vue&type=template&id=28534ab4&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/config/FGModel.vue?vue&type=template&id=28534ab4& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FGModel_vue_vue_type_template_id_28534ab4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FGModel.vue?vue&type=template&id=28534ab4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/config/FGModel.vue?vue&type=template&id=28534ab4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FGModel_vue_vue_type_template_id_28534ab4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FGModel_vue_vue_type_template_id_28534ab4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);