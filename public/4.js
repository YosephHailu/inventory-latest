(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/IssueGood.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/issue_good/IssueGood.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/date */ "./resources/js/helper/date.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      date_menu: false,
      edit: false,
      valid: false,
      max_days: 0,
      config: {},
      issue_item: {
        supplier: {}
      },
      btn_loading: false,
      sections: [],
      years: [],
      months: _helper_date__WEBPACK_IMPORTED_MODULE_0__["months"]
    };
  },
  methods: {
    handelSubmit: function handelSubmit() {
      var _this = this;

      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        var formData = new FormData();
        Object.keys(this.issue_item).forEach(function (key) {
          return formData.append(key, _this.issue_item[key]);
        });
        axios.post("/api/issue_item", formData).then(function (response) {
          _this.btn_loading = false;

          _this.$router.push({
            path: "/issue-good/" + response.data.issue_item.id + "/manage"
          });

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

      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        var formData = new FormData();
        this.issue_item._method = "put";
        axios.post("/api/issue_item/" + this.$route.params.id, this.issue_item).then(function (response) {
          _this2.btn_loading = false;

          _this2.$router.go(-1);

          _this2.$store.dispatch("updateAlert", {
            message: "Successfully saved ",
            type: "success",
            visible: true
          });
        })["catch"](function (error) {
          _this2.btn_loading = false;
        });
      }
    },
    fetchIssuedGoods: function fetchIssuedGoods() {
      var _this3 = this;

      axios.get("/api/issue_item/" + this.$route.params.id).then(function (response) {
        _this3.issue_item = response.data.issue_item;
        _this3.issue_item.month = _this3.issue_item.month + 0;

        _this3.$refs.form.validate();

        _this3.selectMonth();
      })["catch"](function (error) {});
    },
    fetchOptions: function fetchOptions() {
      var _this4 = this;

      axios.get("/api/itemIssueOptions").then(function (response) {
        _this4.sections = response.data.sections;
        _this4.config = response.data.config;
      })["catch"](function (error) {});
    },
    selectMonth: function selectMonth() {
      var _this5 = this;

      this.max_days = this.months.filter(function (month) {
        return month.value === _this5.issue_item.month;
      })[0].days;
    }
  },
  created: function created() {
    this.years = new Array(2050 - 2000).fill(2000).map(function (n, i) {
      return n + i;
    });

    if (this.$route.params.id) {
      this.edit = true;
      this.fetchIssuedGoods();
    } else {
      this.issue_item.day = Number(this.$store.state.mainStore.config.date[0]);
      this.issue_item.month = Number(this.$store.state.mainStore.config.date[1]);
      this.issue_item.year = Number(this.$store.state.mainStore.config.date[2]);
      this.edit = false;
    }

    this.fetchOptions();
    this.selectMonth();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/IssueGood.vue?vue&type=template&id=00adc635&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/issue_good/IssueGood.vue?vue&type=template&id=00adc635& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
                    _vm._v("ISSUE ITEM REGISTRATION FORM")
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
                  staticClass: "pt-4",
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
                        { staticClass: "py-0", attrs: { cols: "12", md: "3" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              rules: [
                                function(v) {
                                  return !!v || "Issue number is required"
                                },
                                function(v) {
                                  return (
                                    v >= _vm.config.issue_start ||
                                    "MIN Issue number IS : " +
                                      _vm.config.issue_start
                                  )
                                },
                                function(v) {
                                  return (
                                    v <= _vm.config.issue_end ||
                                    "MAX Issue number IS : " +
                                      _vm.config.issue_end
                                  )
                                }
                              ],
                              label: "Issue id",
                              messages:
                                "FROM - " +
                                _vm.config.issue_start +
                                " - TO - " +
                                _vm.config.issue_end,
                              required: ""
                            },
                            model: {
                              value: _vm.issue_item.issue_id,
                              callback: function($$v) {
                                _vm.$set(_vm.issue_item, "issue_id", $$v)
                              },
                              expression: "issue_item.issue_id"
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
                          _c("v-select", {
                            attrs: {
                              items: _vm.sections,
                              "item-text": "name",
                              "item-value": "id",
                              rules: [
                                function(v) {
                                  return !!v || "Supplier field is required"
                                }
                              ],
                              label: "Section"
                            },
                            model: {
                              value: _vm.issue_item.section_id,
                              callback: function($$v) {
                                _vm.$set(_vm.issue_item, "section_id", $$v)
                              },
                              expression: "issue_item.section_id"
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
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { staticClass: "py-0" },
                                [
                                  _c("v-select", {
                                    attrs: {
                                      "menu-props": "auto",
                                      items: _vm.years,
                                      label: "Year"
                                    },
                                    model: {
                                      value: _vm.issue_item.year,
                                      callback: function($$v) {
                                        _vm.$set(_vm.issue_item, "year", $$v)
                                      },
                                      expression: "issue_item.year"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { staticClass: "py-0" },
                                [
                                  _c("v-select", {
                                    attrs: {
                                      "menu-props": "auto",
                                      "item-text": "name",
                                      "item-value": "value",
                                      items: _vm.months,
                                      label: "Month"
                                    },
                                    on: {
                                      input: function($event) {
                                        return _vm.selectMonth()
                                      }
                                    },
                                    model: {
                                      value: _vm.issue_item.month,
                                      callback: function($$v) {
                                        _vm.$set(_vm.issue_item, "month", $$v)
                                      },
                                      expression: "issue_item.month"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { staticClass: "py-0" },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      rules: [
                                        function(v) {
                                          return (
                                            v <= _vm.max_days ||
                                            "Invalid day value "
                                          )
                                        }
                                      ],
                                      label: "Day"
                                    },
                                    model: {
                                      value: _vm.issue_item.day,
                                      callback: function($$v) {
                                        _vm.$set(_vm.issue_item, "day", $$v)
                                      },
                                      expression: "issue_item.day"
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
                      _c(
                        "v-col",
                        { staticClass: "py-0", attrs: { cols: "12", md: "3" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              label: "Request number",
                              rules: [
                                function(v) {
                                  return !!v || "Request number is required *"
                                }
                              ],
                              required: ""
                            },
                            model: {
                              value: _vm.issue_item.request_no,
                              callback: function($$v) {
                                _vm.$set(_vm.issue_item, "request_no", $$v)
                              },
                              expression: "issue_item.request_no"
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
                              rules: [
                                function(v) {
                                  return !!v || "Issued by is required *"
                                }
                              ],
                              label: "Issued by"
                            },
                            model: {
                              value: _vm.issue_item.issued_by,
                              callback: function($$v) {
                                _vm.$set(_vm.issue_item, "issued_by", $$v)
                              },
                              expression: "issue_item.issued_by"
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
                            attrs: { label: "Prepared by" },
                            model: {
                              value: _vm.issue_item.prepared_by,
                              callback: function($$v) {
                                _vm.$set(_vm.issue_item, "prepared_by", $$v)
                              },
                              expression: "issue_item.prepared_by"
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
                            attrs: { label: "Received by" },
                            model: {
                              value: _vm.issue_item.received_by,
                              callback: function($$v) {
                                _vm.$set(_vm.issue_item, "received_by", $$v)
                              },
                              expression: "issue_item.received_by"
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

/***/ "./resources/js/components/issue_good/IssueGood.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/issue_good/IssueGood.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IssueGood_vue_vue_type_template_id_00adc635___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IssueGood.vue?vue&type=template&id=00adc635& */ "./resources/js/components/issue_good/IssueGood.vue?vue&type=template&id=00adc635&");
/* harmony import */ var _IssueGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IssueGood.vue?vue&type=script&lang=js& */ "./resources/js/components/issue_good/IssueGood.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IssueGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IssueGood_vue_vue_type_template_id_00adc635___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IssueGood_vue_vue_type_template_id_00adc635___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/issue_good/IssueGood.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/issue_good/IssueGood.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/issue_good/IssueGood.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IssueGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./IssueGood.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/IssueGood.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IssueGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/issue_good/IssueGood.vue?vue&type=template&id=00adc635&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/issue_good/IssueGood.vue?vue&type=template&id=00adc635& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IssueGood_vue_vue_type_template_id_00adc635___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./IssueGood.vue?vue&type=template&id=00adc635& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/IssueGood.vue?vue&type=template&id=00adc635&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IssueGood_vue_vue_type_template_id_00adc635___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IssueGood_vue_vue_type_template_id_00adc635___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/helper/date.js":
/*!*************************************!*\
  !*** ./resources/js/helper/date.js ***!
  \*************************************/
/*! exports provided: months */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "months", function() { return months; });
var months = [{
  name: "መስከረም",
  days: 30,
  value: 1
}, {
  name: "ጥቅምት",
  days: 30,
  value: 2
}, {
  name: "ህዳር",
  days: 30,
  value: 3
}, {
  name: "ታህሳስ",
  days: 30,
  value: 4
}, {
  name: "ጥር",
  days: 30,
  value: 5
}, {
  name: "የካቲት",
  days: 30,
  value: 6
}, {
  name: "መጋቢት",
  days: 30,
  value: 7
}, {
  name: "ሚያዝያ",
  days: 30,
  value: 8
}, {
  name: "ግንቦት",
  days: 30,
  value: 9
}, {
  name: "ሰኔ",
  days: 30,
  value: 10
}, {
  name: "ሃምሌ",
  days: 30,
  value: 11
}, {
  name: "ነሃሴ",
  days: 30,
  value: 12
}, {
  name: "ጳጉሜ",
  days: 6,
  value: 13
}];

/***/ })

}]);