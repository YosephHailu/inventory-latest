(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[39],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      search: "",
      edit: false,
      valid: false,
      f_g_issue: {
        shop: {}
      },
      f_g_issue_detail: {
        finished_good_id: null,
        finished_good: {
          finished_good_model_id: ""
        }
      },
      finished_good: {},
      btn_loading: false,
      f_g_issued_detail: [],
      finished_good_models: [],
      finished_goods: []
    };
  },
  methods: {
    clearForm: function clearForm() {
      this.f_g_issue_detail = {
        item_id: null,
        finished_good: {}
      };
      this.edit = false;
    },
    handelSubmit: function handelSubmit() {
      var _this = this;

      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        var formData = new FormData();
        Object.keys(this.f_g_issue_detail).forEach(function (key) {
          return formData.append(key, _this.f_g_issue_detail[key]);
        });
        formData.append("f_g_issue_id", this.f_g_issue.id);
        axios.post("/api/finished_good_issue_detail", formData).then(function (response) {
          _this.f_g_issued_detail.unshift(response.data.f_g_issue_detail);

          _this.btn_loading = false;

          _this.clearForm();
        })["catch"](function (error) {
          console.log(error.response.data);
          _this.btn_loading = false;
        });
      }
    },
    initEdit: function initEdit(f_g_issue_detail) {
      this.edit = true;
      this.f_g_issue_detail = f_g_issue_detail;
      this.finished_good = f_g_issue_detail.finished_good;
      this.finished_good.balance += f_g_issue_detail.quantity;
      this.fetchFinishedGoods();
      this.$vuetify.goTo(0, 0);
    },
    handelUpdate: function handelUpdate() {
      var _this2 = this;

      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        var formData = new FormData();
        Object.keys(this.f_g_issue_detail).forEach(function (key) {
          return formData.append(key, _this2.f_g_issue_detail[key]);
        });
        formData.append("f_g_issue_id", this.f_g_issue.id);
        formData.append("_method", "put");
        axios.post("/api/finished_good_issue_detail/" + this.f_g_issue_detail.id, formData).then(function (response) {
          _this2.fetchIssuedGood();

          _this2.btn_loading = false;

          _this2.clearForm();

          _this2.$store.state.mainStore.alert.message = response.data.status;
          _this2.$store.state.mainStore.alert.type = "success";
          _this2.$store.state.mainStore.alert.visible = true;
        })["catch"](function (error) {
          _this2.btn_loading = false;
        });
      }
    },
    selectFinishedGood: function selectFinishedGood() {
      var _this3 = this;

      this.finished_good = this.finished_goods.filter(function (finished_good) {
        return finished_good.id == _this3.f_g_issue_detail.finished_good_id;
      })[0];
      this.$refs.form.validate();
    },
    deleteIssued: function deleteIssued(f_g_issue_detail) {
      var _this4 = this;

      if (confirm("Are you sure you went to delete")) {
        axios["delete"]("/api/finished_good_issue_detail/" + f_g_issue_detail.id).then(function (response) {
          _this4.f_g_issued_detail.splice(_this4.f_g_issued_detail.indexOf(f_g_issue_detail), 1);
        })["catch"](function (error) {});
      }
    },
    fetchIssuedGood: function fetchIssuedGood() {
      var _this5 = this;

      axios.get("/api/finished_good_issue/" + this.$route.params.id + "?q=" + this.search).then(function (response) {
        _this5.f_g_issue = response.data.f_g_issue;
        _this5.f_g_issued_detail = response.data.f_g_issue_detail;
      })["catch"](function (error) {});
    },
    fetchFinishedGoods: function fetchFinishedGoods() {
      var _this6 = this;

      axios.get("/api/finished_goods?finished_good_model_id=" + this.f_g_issue_detail.finished_good.finished_good_model_id).then(function (response) {
        _this6.finished_goods = response.data.finished_goods;
      })["catch"](function (error) {});
    },
    fetchOptions: function fetchOptions() {
      var _this7 = this;

      axios.get("/api/finishedGoodOptions").then(function (response) {
        _this7.finished_good_models = response.data.finished_good_models;
      })["catch"](function (error) {});
    },
    int_print: function int_print() {
      window.print();
    }
  },
  created: function created() {
    this.fetchOptions();
    this.fetchIssuedGood();
    this.debouncedFetchIssuedGood = _.debounce(this.fetchIssuedGood, 1000);
  },
  watch: {
    search: {
      handler: function handler() {
        this.debouncedFetchIssuedGood();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue?vue&type=template&id=735b5a3d&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue?vue&type=template&id=735b5a3d& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
        "v-btn",
        {
          staticClass: "no-print",
          attrs: {
            fixed: "",
            dark: "",
            fab: "",
            bottom: "",
            right: "",
            color: "cyan"
          },
          on: { click: _vm.int_print }
        },
        [_c("v-icon", [_vm._v("print")])],
        1
      ),
      _vm._v(" "),
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
                _vm._v("ADD ISSUED FINISHED GOODS")
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
            "v-card",
            [
              _c(
                "v-list-item",
                [
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "Issue number : " + _vm._s(_vm.f_g_issue.issue_id)
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "Shop : " +
                            _vm._s(
                              _vm.f_g_issue.shop && _vm.f_g_issue.shop.name
                            )
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c(
                        "v-list-item-subtitle",
                        { staticClass: "text-right" },
                        [
                          _vm._v(
                            _vm._s(
                              _vm.f_g_issue.day +
                                " - " +
                                _vm.f_g_issue.month +
                                " -" +
                                _vm.f_g_issue.year
                            )
                          )
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-action",
                    { staticClass: "no-print" },
                    [
                      _c(
                        "v-btn",
                        {
                          attrs: {
                            icon: "",
                            to: {
                              path:
                                "/issue-finished-good/" +
                                _vm.f_g_issue.id +
                                "/edit"
                            }
                          }
                        },
                        [
                          _c("v-icon", { attrs: { color: "blue" } }, [
                            _vm._v("edit")
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
              _c("v-list-item-subtitle", [
                _vm._v(_vm._s(_vm.f_g_issue && _vm.f_g_issue.remark))
              ])
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
                          items: _vm.finished_good_models,
                          "item-text": "model",
                          "item-value": "id",
                          rules: [
                            function(v) {
                              return !!v || "Model field is required"
                            }
                          ],
                          label: "Model"
                        },
                        on: { change: _vm.fetchFinishedGoods },
                        model: {
                          value:
                            _vm.f_g_issue_detail.finished_good
                              .finished_good_model_id,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.f_g_issue_detail.finished_good,
                              "finished_good_model_id",
                              $$v
                            )
                          },
                          expression:
                            "f_g_issue_detail.finished_good.finished_good_model_id"
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
                          items: _vm.finished_goods,
                          "item-text": "name",
                          "item-value": "id",
                          rules: [
                            function(v) {
                              return !!v || "Finished good field is required"
                            }
                          ],
                          label: "Finished good"
                        },
                        on: { change: _vm.selectFinishedGood },
                        model: {
                          value: _vm.f_g_issue_detail.finished_good_id,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.f_g_issue_detail,
                              "finished_good_id",
                              $$v
                            )
                          },
                          expression: "f_g_issue_detail.finished_good_id"
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
                          rules: [
                            function(v) {
                              return !!v || "Quantity is required"
                            },
                            function(v) {
                              return (
                                v <= _vm.finished_good.balance ||
                                "Insufficient balance, available-balance : " +
                                  _vm.finished_good.balance
                              )
                            }
                          ],
                          label: "Quantity"
                        },
                        model: {
                          value: _vm.f_g_issue_detail.quantity,
                          callback: function($$v) {
                            _vm.$set(_vm.f_g_issue_detail, "quantity", $$v)
                          },
                          expression: "f_g_issue_detail.quantity"
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
                        [_vm._v("Add")]
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
        { staticClass: "my-2" },
        [
          _c("v-text-field", {
            staticClass: "no-print",
            attrs: {
              label: "Search by item name or id",
              "solo-inverted": "",
              "hide-details": ""
            },
            model: {
              value: _vm.search,
              callback: function($$v) {
                _vm.search = $$v
              },
              expression: "search"
            }
          }),
          _vm._v(" "),
          _c(
            "v-list",
            [
              _c(
                "v-row",
                _vm._l(_vm.f_g_issued_detail, function(issued_item, index) {
                  return _c(
                    "v-col",
                    { key: index },
                    [
                      _c(
                        "v-list-item",
                        [
                          _c(
                            "v-list-item-content",
                            [
                              _c("v-list-item-title", [
                                _vm._v(_vm._s(issued_item.finished_good.name))
                              ]),
                              _vm._v(" "),
                              _c("v-list-item-subtitle", [
                                _vm._v(
                                  "Quantity : " +
                                    _vm._s(issued_item.quantity) +
                                    ", Average price : " +
                                    _vm._s(issued_item.avg_price)
                                )
                              ])
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-item-icon",
                            { staticClass: "no-print" },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    icon: "",
                                    to: {
                                      path:
                                        "/finished-good/" +
                                        issued_item.finished_good.id
                                    }
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
                                  attrs: { icon: "" },
                                  on: {
                                    click: function($event) {
                                      return _vm.initEdit(issued_item)
                                    }
                                  }
                                },
                                [
                                  _c("v-icon", { attrs: { color: "blue" } }, [
                                    _vm._v("edit")
                                  ])
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: { icon: "" },
                                  on: {
                                    click: function($event) {
                                      return _vm.deleteIssued(issued_item)
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

/***/ "./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ManageIssueFinishedGood_vue_vue_type_template_id_735b5a3d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ManageIssueFinishedGood.vue?vue&type=template&id=735b5a3d& */ "./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue?vue&type=template&id=735b5a3d&");
/* harmony import */ var _ManageIssueFinishedGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ManageIssueFinishedGood.vue?vue&type=script&lang=js& */ "./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ManageIssueFinishedGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ManageIssueFinishedGood_vue_vue_type_template_id_735b5a3d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ManageIssueFinishedGood_vue_vue_type_template_id_735b5a3d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageIssueFinishedGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ManageIssueFinishedGood.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageIssueFinishedGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue?vue&type=template&id=735b5a3d&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue?vue&type=template&id=735b5a3d& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageIssueFinishedGood_vue_vue_type_template_id_735b5a3d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ManageIssueFinishedGood.vue?vue&type=template&id=735b5a3d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_finished_good/ManageIssueFinishedGood.vue?vue&type=template&id=735b5a3d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageIssueFinishedGood_vue_vue_type_template_id_735b5a3d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageIssueFinishedGood_vue_vue_type_template_id_735b5a3d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);