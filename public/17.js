(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/Report.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/issue_good/Report.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layouts_PrintHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layouts/PrintHeader */ "./resources/js/components/layouts/PrintHeader.vue");
/* harmony import */ var _helper_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper/date */ "./resources/js/helper/date.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {
    PrintHeader: _layouts_PrintHeader__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      valid: false,
      delete_dialog: false,
      search: "",
      section_id: "",
      items: [],
      item: {},
      options: {
        itemsPerPage: 100
      },
      total_items: 0,
      itemsPerPage: 1,
      issued_by_id: [],
      sections: [],
      date: {},
      months: _helper_date__WEBPACK_IMPORTED_MODULE_1__["months"]
    };
  },
  methods: {
    clearForm: function clearForm() {
      this.date = {};
      this.search = "";
      this.section_id = "";
      this.fetchItems();
    },
    dateFilter: function dateFilter() {
      if (this.$refs.form.validate()) this.fetchItems();
    },
    fetchItems: function fetchItems() {
      var _this = this;

      axios.get("/api/item_issue?itemsPerPage=" + this.options.itemsPerPage + "&page=" + this.options.current_page + "&q=" + this.search + "&section_id=" + this.section_id + "&date=" + JSON.stringify(this.date)).then(function (response) {
        console.log(response.data);
        _this.options.current_page = response.data.item_issued.current_page;
        _this.options.last_page = response.data.item_issued.last_page;
        _this.issued_by_id = response.data.item_issued.data.reduce(function (r, a) {
          r[a.issue_item.issue_id] = [].concat(_toConsumableArray(r[a.issue_item.issue_id] || []), [a]);
          return r;
        }, {});
      })["catch"](function (error) {
        console.log(error.response.data);
      });
    },
    int_print: function int_print() {
      window.print();
    },
    exportItem: function exportItem() {
      window.open("/item_issue_export?q=" + this.search + "&section_id=" + this.section_id, "_blank");
    },
    fetchOptions: function fetchOptions() {
      var _this2 = this;

      axios.get("/api/itemIssueOptions").then(function (response) {
        _this2.sections = response.data.sections;
      })["catch"](function (error) {});
    }
  },
  watch: {
    options: {
      handler: function handler() {
        this.fetchItems();
      },
      deep: true
    },
    search: {
      handler: function handler() {
        this.options.page = 1;
        this.debouncedGetItems();
      }
    },
    "date.day": {
      handler: function handler() {
        this.options.page = 1;
        this.debouncedGetItems();
      }
    }
  },
  created: function created() {
    this.years = new Array(2050 - 2000).fill(2000).map(function (n, i) {
      return n + i;
    });
    this.$store.state.mainStore.sidebar_panel = false;
    this.fetchItems();
    this.fetchOptions();
    this.debouncedGetItems = _.debounce(this.fetchItems, 1000);
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/Report.vue?vue&type=style&index=0&id=340389c5&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/issue_good/Report.vue?vue&type=style&index=0&id=340389c5&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\ntd[data-v-340389c5] {\r\n  height: 0px !important;\r\n  border-top: solid 1px !important;\r\n  border-right: solid 1px !important;\n}\n.report-border[data-v-340389c5] {\r\n  border: 0px !important;\r\n  border-top: solid 1px !important;\n}\n.starter-border[data-v-340389c5] {\r\n  border: 0px !important;\r\n  border-right: solid 1px !important;\n}\n.border-all[data-v-340389c5] {\r\n  border: solid 1px !important;\n}\n.no-right-border[data-v-340389c5] {\r\n  border-right: 0px;\n}\nth[data-v-340389c5],\r\n.th[data-v-340389c5] {\r\n  background-color: #7fffd4 !important;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/Report.vue?vue&type=style&index=0&id=340389c5&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/issue_good/Report.vue?vue&type=style&index=0&id=340389c5&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Report.vue?vue&type=style&index=0&id=340389c5&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/Report.vue?vue&type=style&index=0&id=340389c5&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/Report.vue?vue&type=template&id=340389c5&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/issue_good/Report.vue?vue&type=template&id=340389c5&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
    "v-row",
    [
      _c(
        "v-col",
        [
          _c(
            "v-card",
            { staticClass: "pb-5" },
            [
              _c(
                "v-toolbar",
                { staticClass: "white" },
                [
                  _c("v-divider"),
                  _vm._v(" "),
                  _c("v-card-title", {}, [_vm._v("ISSUED GOOD REPORT")]),
                  _vm._v(" "),
                  _c("v-divider"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "no-print",
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
              _c("print-header"),
              _vm._v(" "),
              _c(
                "v-simple-table",
                {
                  staticClass: "pa-0",
                  attrs: { dense: "", "fixed-header": "" }
                },
                [
                  _c("thead", [
                    _c("tr", [
                      _c("th", [_vm._v("Grn")]),
                      _vm._v(" "),
                      _c("th", [_vm._v("Item id")]),
                      _vm._v(" "),
                      _c("th", [_vm._v("Item name")]),
                      _vm._v(" "),
                      _c("th", [_vm._v("Section")]),
                      _vm._v(" "),
                      _c("th", [_vm._v("Issued by")]),
                      _vm._v(" "),
                      _c("th", [_vm._v("Quantity")]),
                      _vm._v(" "),
                      _c("th", [_vm._v("Item price")])
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "tbody",
                    [
                      _vm._l(_vm.issued_by_id, function(item_issued, grn) {
                        return [
                          _c(
                            "td",
                            {
                              key: grn + "a",
                              staticClass:
                                "border-all text-top mr-0 blue--text",
                              attrs: { colspan: "2" }
                            },
                            [
                              _vm._v(
                                "\n              " +
                                  _vm._s(grn) +
                                  "\n              "
                              ),
                              _c(
                                "span",
                                {
                                  staticClass: "small",
                                  staticStyle: {
                                    "font-size": "9px",
                                    padding: "0px"
                                  },
                                  attrs: { small: "" }
                                },
                                [
                                  _vm._v(
                                    "(" +
                                      _vm._s(
                                        item_issued[0].issue_item.day +
                                          " - " +
                                          item_issued[0].issue_item.month +
                                          " - " +
                                          item_issued[0].issue_item.year
                                      ) +
                                      ")"
                                  )
                                ]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _vm._l(item_issued, function(received) {
                            return _c(
                              "tr",
                              {
                                key: received.id,
                                class:
                                  _vm.item.balance <= _vm.item.min_balance
                                    ? "red--text"
                                    : "",
                                staticStyle: { width: "100%" }
                              },
                              [
                                _c("td", { staticClass: "starter-border" }),
                                _vm._v(" "),
                                _c("td", [
                                  _vm._v(_vm._s(received.item.item_id))
                                ]),
                                _vm._v(" "),
                                _c("td", [_vm._v(_vm._s(received.item.name))]),
                                _vm._v(" "),
                                _c("td", [
                                  _vm._v(
                                    _vm._s(
                                      received.issue_item.section &&
                                        received.issue_item.section.name
                                    )
                                  )
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  _vm._v(_vm._s(received.issue_item.issued_by))
                                ]),
                                _vm._v(" "),
                                _c("td", [_vm._v(_vm._s(received.quantity))]),
                                _vm._v(" "),
                                _c("td", { staticClass: "no-right-border" }, [
                                  _vm._v(_vm._s(received.avg_price.toFixed(2)))
                                ])
                              ]
                            )
                          }),
                          _vm._v(" "),
                          _c("tr", { key: grn + "b" }, [
                            _c("td", { staticClass: "starter-border" }),
                            _vm._v(" "),
                            _c("td", { staticClass: "report-border" }),
                            _vm._v(" "),
                            _c("td", { staticClass: "report-border" }),
                            _vm._v(" "),
                            _c("td", { staticClass: "report-border" }),
                            _vm._v(" "),
                            _c("td", { staticClass: "report-border" }),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass: "blue--text",
                                staticStyle: { border: "solid 1px" }
                              },
                              [
                                _vm._v(
                                  "\n                Total :\n                " +
                                    _vm._s(
                                      item_issued
                                        .reduce(function(total, value) {
                                          return total + Number(value.quantity)
                                        }, 0)
                                        .toFixed(2)
                                    ) +
                                    "\n              "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass: "blue--text",
                                staticStyle: { border: "solid 1px" }
                              },
                              [
                                _vm._v(
                                  "\n                Total :\n                " +
                                    _vm._s(
                                      item_issued
                                        .reduce(function(total, value) {
                                          return total + Number(value.avg_price)
                                        }, 0)
                                        .toFixed(2)
                                    ) +
                                    "\n              "
                                )
                              ]
                            )
                          ])
                        ]
                      })
                    ],
                    2
                  )
                ]
              ),
              _vm._v(" "),
              _c("v-pagination", {
                attrs: { circle: "", length: _vm.options.last_page },
                on: { input: _vm.fetchItems },
                model: {
                  value: _vm.options.current_page,
                  callback: function($$v) {
                    _vm.$set(_vm.options, "current_page", $$v)
                  },
                  expression: "options.current_page"
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
        "v-col",
        { staticClass: "no-print", attrs: { cols: "2" } },
        [
          _c(
            "v-navigation-drawer",
            [
              _c(
                "v-list-item",
                [
                  _c(
                    "v-list-item-content",
                    [
                      _c(
                        "v-list-item-title",
                        { staticClass: "title text-center" },
                        [_vm._v("FILTER")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-subtitle",
                        { staticClass: "text-center" },
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: { small: "", outlined: "" },
                              on: { click: _vm.clearForm }
                            },
                            [_vm._v("clear")]
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
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-list-item",
                [
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-text-field", {
                        attrs: {
                          "hide-details": "",
                          label: "Search by name or item id"
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "append",
                            fn: function() {
                              return [
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { icon: "" },
                                    on: {
                                      click: function($event) {
                                        _vm.search = ""
                                      }
                                    }
                                  },
                                  [
                                    _c("v-icon", { attrs: { size: "20" } }, [
                                      _vm._v("close")
                                    ])
                                  ],
                                  1
                                )
                              ]
                            },
                            proxy: true
                          }
                        ]),
                        model: {
                          value: _vm.search,
                          callback: function($$v) {
                            _vm.search = $$v
                          },
                          expression: "search"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: {
                          "hide-details": "",
                          items: _vm.sections,
                          "item-text": "name",
                          "item-value": "id",
                          label: "Select section"
                        },
                        on: { input: _vm.fetchItems },
                        scopedSlots: _vm._u([
                          {
                            key: "append",
                            fn: function() {
                              return [
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { icon: "" },
                                    on: {
                                      click: function($event) {
                                        _vm.section_id = ""
                                        _vm.fetchItems()
                                      }
                                    }
                                  },
                                  [
                                    _c("v-icon", { attrs: { size: "20" } }, [
                                      _vm._v("close")
                                    ])
                                  ],
                                  1
                                )
                              ]
                            },
                            proxy: true
                          }
                        ]),
                        model: {
                          value: _vm.section_id,
                          callback: function($$v) {
                            _vm.section_id = $$v
                          },
                          expression: "section_id"
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "v-form",
                        {
                          ref: "form",
                          staticClass: "pt-4",
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
                                { staticClass: "py-0", attrs: { cols: "6" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      "hide-details": "",
                                      label: "Day from"
                                    },
                                    model: {
                                      value: _vm.date.day_from,
                                      callback: function($$v) {
                                        _vm.$set(_vm.date, "day_from", $$v)
                                      },
                                      expression: "date.day_from"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { staticClass: "py-0", attrs: { cols: "6" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      "hide-details": "",
                                      label: "Day to"
                                    },
                                    model: {
                                      value: _vm.date.day_to,
                                      callback: function($$v) {
                                        _vm.$set(_vm.date, "day_to", $$v)
                                      },
                                      expression: "date.day_to"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { staticClass: "py-0", attrs: { cols: "6" } },
                                [
                                  _c("v-autocomplete", {
                                    attrs: {
                                      "hide-details": "",
                                      "menu-props": "auto",
                                      "item-text": "name",
                                      "item-value": "value",
                                      items: _vm.months,
                                      label: "Month from"
                                    },
                                    model: {
                                      value: _vm.date.month_from,
                                      callback: function($$v) {
                                        _vm.$set(_vm.date, "month_from", $$v)
                                      },
                                      expression: "date.month_from"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { staticClass: "py-0", attrs: { cols: "6" } },
                                [
                                  _c("v-autocomplete", {
                                    attrs: {
                                      "hide-details": "",
                                      "menu-props": "auto",
                                      "item-text": "name",
                                      "item-value": "value",
                                      items: _vm.months,
                                      label: "Month to"
                                    },
                                    model: {
                                      value: _vm.date.month_to,
                                      callback: function($$v) {
                                        _vm.$set(_vm.date, "month_to", $$v)
                                      },
                                      expression: "date.month_to"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { staticClass: "py-0", attrs: { cols: "6" } },
                                [
                                  _c("v-autocomplete", {
                                    attrs: {
                                      "hide-details": "",
                                      "menu-props": "auto",
                                      items: _vm.years,
                                      label: "Year from"
                                    },
                                    model: {
                                      value: _vm.date.year_from,
                                      callback: function($$v) {
                                        _vm.$set(_vm.date, "year_from", $$v)
                                      },
                                      expression: "date.year_from"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { staticClass: "py-0", attrs: { cols: "6" } },
                                [
                                  _c("v-autocomplete", {
                                    attrs: {
                                      "hide-details": "",
                                      "menu-props": "auto",
                                      items: _vm.years,
                                      label: "Year to"
                                    },
                                    model: {
                                      value: _vm.date.year_to,
                                      callback: function($$v) {
                                        _vm.$set(_vm.date, "year_to", $$v)
                                      },
                                      expression: "date.year_to"
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
                        "v-btn",
                        {
                          staticClass: "mt-5 mx-1",
                          attrs: { text: "", color: "cyan", dark: "" },
                          on: { click: _vm.dateFilter }
                        },
                        [
                          _c("v-icon", [_vm._v("search")]),
                          _vm._v("SEARCH\n          ")
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "mt-5 mx-1",
                          attrs: { text: "", color: "cyan", dark: "" },
                          on: { click: _vm.exportItem }
                        },
                        [
                          _c("v-icon", [_vm._v("import_export")]),
                          _vm._v("EXPORT\n          ")
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "mt-5 mx-1",
                          attrs: { text: "", color: "cyan", dark: "" },
                          on: { click: _vm.int_print }
                        },
                        [
                          _c("v-icon", { staticClass: "mx-2" }, [
                            _vm._v("print")
                          ]),
                          _vm._v("Print\n          ")
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/layouts/PrintHeader.vue?vue&type=template&id=2c74e0f9&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/layouts/PrintHeader.vue?vue&type=template&id=2c74e0f9& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
        "v-list-item",
        [
          _c(
            "v-list-item-content",
            { staticClass: "text-right" },
            [
              _c("v-list-item-title", [
                _vm._v(_vm._s(_vm.$store.state.mainStore.config.company.name))
              ]),
              _vm._v(" "),
              _c(
                "v-list-item-subtitle",
                [
                  _vm._v(
                    "\n        " +
                      _vm._s(_vm.$store.state.mainStore.config.company.phone) +
                      "\n        "
                  ),
                  _c("v-icon", { attrs: { small: "" } }, [_vm._v("phone")])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item-subtitle",
                [
                  _vm._v(
                    "\n        " +
                      _vm._s(_vm.$store.state.mainStore.config.company.email) +
                      "\n        "
                  ),
                  _c("v-icon", { attrs: { small: "" } }, [_vm._v("mail")])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-list-item-content",
            [
              _c(
                "v-list-item-avatar",
                { attrs: { size: "100" } },
                [
                  _c("v-img", {
                    staticClass: "text-center",
                    attrs: {
                      src:
                        "/storage/company/" +
                        _vm.$store.state.mainStore.config.company.logo,
                      "align-center": "",
                      icon: "",
                      contain: ""
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
            "v-list-item-content",
            { staticClass: "text-left" },
            [
              _c("v-list-item-title", [
                _vm._v(
                  _vm._s(_vm.$store.state.mainStore.config.company.address)
                )
              ]),
              _vm._v(" "),
              _c("v-list-item-subtitle", [
                _vm._v(
                  "Date : " +
                    _vm._s(_vm.$store.state.mainStore.config.current_date)
                )
              ])
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/issue_good/Report.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/issue_good/Report.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Report_vue_vue_type_template_id_340389c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Report.vue?vue&type=template&id=340389c5&scoped=true& */ "./resources/js/components/issue_good/Report.vue?vue&type=template&id=340389c5&scoped=true&");
/* harmony import */ var _Report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Report.vue?vue&type=script&lang=js& */ "./resources/js/components/issue_good/Report.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Report_vue_vue_type_style_index_0_id_340389c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Report.vue?vue&type=style&index=0&id=340389c5&scoped=true&lang=css& */ "./resources/js/components/issue_good/Report.vue?vue&type=style&index=0&id=340389c5&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Report_vue_vue_type_template_id_340389c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Report_vue_vue_type_template_id_340389c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "340389c5",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/issue_good/Report.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/issue_good/Report.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/issue_good/Report.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Report.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/Report.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/issue_good/Report.vue?vue&type=style&index=0&id=340389c5&scoped=true&lang=css&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/issue_good/Report.vue?vue&type=style&index=0&id=340389c5&scoped=true&lang=css& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_style_index_0_id_340389c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Report.vue?vue&type=style&index=0&id=340389c5&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/Report.vue?vue&type=style&index=0&id=340389c5&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_style_index_0_id_340389c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_style_index_0_id_340389c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_style_index_0_id_340389c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_style_index_0_id_340389c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_style_index_0_id_340389c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/issue_good/Report.vue?vue&type=template&id=340389c5&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/issue_good/Report.vue?vue&type=template&id=340389c5&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_template_id_340389c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Report.vue?vue&type=template&id=340389c5&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/issue_good/Report.vue?vue&type=template&id=340389c5&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_template_id_340389c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Report_vue_vue_type_template_id_340389c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/layouts/PrintHeader.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/layouts/PrintHeader.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PrintHeader_vue_vue_type_template_id_2c74e0f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrintHeader.vue?vue&type=template&id=2c74e0f9& */ "./resources/js/components/layouts/PrintHeader.vue?vue&type=template&id=2c74e0f9&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  script,
  _PrintHeader_vue_vue_type_template_id_2c74e0f9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PrintHeader_vue_vue_type_template_id_2c74e0f9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/layouts/PrintHeader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/layouts/PrintHeader.vue?vue&type=template&id=2c74e0f9&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/layouts/PrintHeader.vue?vue&type=template&id=2c74e0f9& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintHeader_vue_vue_type_template_id_2c74e0f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PrintHeader.vue?vue&type=template&id=2c74e0f9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/layouts/PrintHeader.vue?vue&type=template&id=2c74e0f9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintHeader_vue_vue_type_template_id_2c74e0f9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintHeader_vue_vue_type_template_id_2c74e0f9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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