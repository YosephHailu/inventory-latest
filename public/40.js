(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[40],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/ManageIssueGood.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/issue_good/ManageIssueGood.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
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
      issue_good: {
        section: {}
      },
      item_issued: {
        item_id: null,
        item: {
          item_category: {}
        }
      },
      item: {},
      btn_loading: false,
      issued_items: [],
      item_categories: [],
      items: []
    };
  },
  methods: {
    clearForm: function clearForm() {
      this.item_issued = {
        item_id: null,
        item: {
          item_category: {}
        }
      };
      this.edit = false;
    },
    handelSubmit: function handelSubmit() {
      var _this = this;

      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        var formData = new FormData();
        Object.keys(this.item_issued).forEach(function (key) {
          return formData.append(key, _this.item_issued[key]);
        });
        formData.append("issue_item_id", this.issue_good.id);
        axios.post("/api/item_issue", formData).then(function (response) {
          _this.issued_items.unshift(response.data.item_issued);

          _this.btn_loading = false;

          _this.clearForm();

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
    initEdit: function initEdit(item_issued) {
      this.edit = true;
      this.item_issued = item_issued;
      this.item = item_issued.item;
      this.item.balance += item_issued.quantity;
      this.fetchItem();
      this.$vuetify.goTo(0, 0);
    },
    handelUpdate: function handelUpdate() {
      var _this2 = this;

      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        var formData = new FormData();
        Object.keys(this.item_issued).forEach(function (key) {
          return formData.append(key, _this2.item_issued[key]);
        });
        formData.append("issue_item_id", this.issue_good.id);
        formData.append("_method", "put");
        axios.post("/api/item_issue/" + this.item_issued.id, formData).then(function (response) {
          _this2.fetchIssuedGood();

          _this2.btn_loading = false;

          _this2.clearForm();

          _this2.$store.dispatch("updateAlert", {
            message: "Successfully saved ",
            type: "success",
            visible: true
          });

          _this2.$store.state.mainStore.alert.message = response.data.status;
          _this2.$store.state.mainStore.alert.type = "success";
          _this2.$store.state.mainStore.alert.visible = true;
        })["catch"](function (error) {
          _this2.btn_loading = false;
        });
      }
    },
    selectItem: function selectItem() {
      var _this3 = this;

      this.item = this.items.filter(function (item) {
        return item.id == _this3.item_issued.item_id;
      })[0];
      this.$refs.form.validate();
    },
    deleteItem: function deleteItem(issued_item) {
      var _this4 = this;

      if (confirm("Are you sure you went to delete")) {
        axios["delete"]("/api/item_issue/" + issued_item.id).then(function (response) {
          _this4.issued_items.splice(_this4.issued_items.indexOf(issued_item), 1);
        })["catch"](function (error) {});
      }
    },
    fetchIssuedGood: function fetchIssuedGood() {
      var _this5 = this;

      axios.get("/api/issue_item/" + this.$route.params.id + "?q=" + this.search).then(function (response) {
        _this5.issue_good = response.data.issue_item;
        _this5.issued_items = response.data.item_issue;
      })["catch"](function (error) {});
    },
    fetchItem: function fetchItem() {
      var _this6 = this;

      axios.get("/api/items?item_category_id=" + this.item_issued.item.item_category.id).then(function (response) {
        _this6.items = response.data.items;
      })["catch"](function (error) {});
    },
    fetchOptions: function fetchOptions() {
      var _this7 = this;

      axios.get("/api/itemOptions").then(function (response) {
        _this7.item_categories = response.data.itemCategories;
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/ManageIssueGood.vue?vue&type=template&id=202fc8e0&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/issue_good/ManageIssueGood.vue?vue&type=template&id=202fc8e0& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
                _vm._v("ADD ISSUED ITEMS")
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
                          "Issue number : " + _vm._s(_vm.issue_good.issue_id)
                        )
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "Request number : " +
                            _vm._s(_vm.issue_good.request_no)
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
                          "Section : " +
                            _vm._s(
                              _vm.issue_good.section &&
                                _vm.issue_good.section.name
                            )
                        )
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "Issued by : " + _vm._s(_vm.issue_good.issued_by)
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          "Approved by : " + _vm._s(_vm.issue_good.approved_by)
                        )
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "Received by : " + _vm._s(_vm.issue_good.received_by)
                        )
                      ])
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
                              path: "/issue-good/" + _vm.issue_good.id + "/edit"
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
                _vm._v(_vm._s(_vm.issue_good && _vm.issue_good.remark))
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
                          value: _vm.item_issued.item.item_category.id,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.item_issued.item.item_category,
                              "id",
                              $$v
                            )
                          },
                          expression: "item_issued.item.item_category.id"
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
                          value: _vm.item_issued.item_id,
                          callback: function($$v) {
                            _vm.$set(_vm.item_issued, "item_id", $$v)
                          },
                          expression: "item_issued.item_id"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { staticClass: "py-0", attrs: { cols: "12", md: "3" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          type: "number",
                          rules: [
                            function(v) {
                              return !!v || "Quantity is required"
                            },
                            function(v) {
                              return (
                                v <= _vm.item.balance ||
                                "Insufficient balance, available-balance : " +
                                  _vm.item.balance
                              )
                            }
                          ],
                          label: "Quantity"
                        },
                        model: {
                          value: _vm.item_issued.quantity,
                          callback: function($$v) {
                            _vm.$set(_vm.item_issued, "quantity", $$v)
                          },
                          expression: "item_issued.quantity"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { staticClass: "py-3" },
                    [
                      _vm.item_issued.quantity > _vm.item.balance
                        ? _c(
                            "v-btn",
                            { attrs: { icon: "" } },
                            [
                              _c("v-icon", { attrs: { color: "red" } }, [
                                _vm._v("report_problem")
                              ])
                            ],
                            1
                          )
                        : _vm._e()
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
                _vm._l(_vm.issued_items, function(issued_item, index) {
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
                                _vm._v(_vm._s(issued_item.item.name))
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
                                    to: { path: "/item/" + issued_item.item.id }
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
                                      return _vm.deleteItem(issued_item)
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

/***/ "./resources/js/components/issue_good/ManageIssueGood.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/issue_good/ManageIssueGood.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ManageIssueGood_vue_vue_type_template_id_202fc8e0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ManageIssueGood.vue?vue&type=template&id=202fc8e0& */ "./resources/js/components/issue_good/ManageIssueGood.vue?vue&type=template&id=202fc8e0&");
/* harmony import */ var _ManageIssueGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ManageIssueGood.vue?vue&type=script&lang=js& */ "./resources/js/components/issue_good/ManageIssueGood.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ManageIssueGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ManageIssueGood_vue_vue_type_template_id_202fc8e0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ManageIssueGood_vue_vue_type_template_id_202fc8e0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/issue_good/ManageIssueGood.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/issue_good/ManageIssueGood.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/issue_good/ManageIssueGood.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageIssueGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ManageIssueGood.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/ManageIssueGood.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageIssueGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/issue_good/ManageIssueGood.vue?vue&type=template&id=202fc8e0&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/issue_good/ManageIssueGood.vue?vue&type=template&id=202fc8e0& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageIssueGood_vue_vue_type_template_id_202fc8e0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ManageIssueGood.vue?vue&type=template&id=202fc8e0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/ManageIssueGood.vue?vue&type=template&id=202fc8e0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageIssueGood_vue_vue_type_template_id_202fc8e0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageIssueGood_vue_vue_type_template_id_202fc8e0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);