(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/FinishedGood.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/shop_finished_good/FinishedGood.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Received_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Received.vue */ "./resources/js/components/shop_finished_good/Received.vue");
/* harmony import */ var _Sold_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sold.vue */ "./resources/js/components/shop_finished_good/Sold.vue");
/* harmony import */ var _Returned_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Returned.vue */ "./resources/js/components/shop_finished_good/Returned.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    Received: _Received_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    Sold: _Sold_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    Returned: _Returned_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      tab: 1,
      f_g_sale_count: 0,
      f_g_received_count: 0,
      f_g_return_count: 0,
      f_g_received_price: 0,
      f_g_sale_price: 0,
      shop_f_g: {
        finished_good: {}
      }
    };
  },
  methods: {
    fetchItem: function fetchItem() {
      var _this = this;

      axios.get("/api/shop_finished_good_detail/" + this.$route.params.shop_id + "/" + this.$route.params.id).then(function (response) {
        _this.f_g_sale_count = response.data.f_g_sale_count;
        _this.f_g_received_count = response.data.f_g_received_count;
        _this.f_g_return_count = response.data.f_g_return_count;
        _this.f_g_sale_price = response.data.f_g_sale_price;
        _this.f_g_received_price = response.data.f_g_received_price;
        _this.shop_f_g = response.data.shop_f_g;
      })["catch"](function (error) {});
    }
  },
  watch: {},
  created: function created() {
    this.fetchItem();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/Received.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/shop_finished_good/Received.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      f_g_issue_details: [],
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      headers: [{
        text: "ISSUE ID",
        value: "f_g_issue.issue_id",
        "class": "cyan--text"
      }, {
        text: "Quantity",
        value: "quantity",
        "class": "cyan--text"
      }, {
        text: "AVG Price",
        value: "avg_price",
        "class": "cyan--text"
      }, {
        text: "Date",
        value: "date",
        "class": "cyan--text"
      }]
    };
  },
  methods: {
    fetchReceivedGoods: function fetchReceivedGoods() {
      var _this = this;

      axios.get("/api/shop_finished_good_received/" + this.$route.params.shop_id + "/" + this.$route.params.id + "?itemsPerPage=" + this.options.itemsPerPage + "&page=" + this.options.page).then(function (response) {
        _this.f_g_issue_details = response.data.f_g_issue_details.data;
        _this.totalItems = response.data.f_g_issue_details.total;
      })["catch"](function (error) {});
    }
  },
  watch: {
    options: {
      handler: function handler() {
        this.fetchReceivedGoods();
      },
      deep: true
    }
  },
  created: function created() {
    this.fetchReceivedGoods();
    this.debouncedReceivedGoods = _.debounce(this.fetchReceivedGoods, 1000);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/Returned.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/shop_finished_good/Returned.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      f_g_return_details: [],
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      headers: [{
        text: "Return ID",
        value: "f_g_return.return_id",
        "class": "cyan--text"
      }, {
        text: "Quantity",
        value: "quantity",
        "class": "cyan--text"
      }, {
        text: "Date",
        value: "date",
        "class": "cyan--text"
      }]
    };
  },
  methods: {
    fetchReturnedGoods: function fetchReturnedGoods() {
      var _this = this;

      axios.get("/api/shop_finished_good_returned/" + this.$route.params.shop_id + "/" + this.$route.params.id + "?itemsPerPage=" + this.options.itemsPerPage + "&page=" + this.options.page).then(function (response) {
        _this.f_g_return_details = response.data.f_g_return_details.data;
        _this.totalItems = response.data.f_g_return_details.total;
      })["catch"](function (error) {});
    }
  },
  watch: {
    options: {
      handler: function handler() {
        this.fetchReturnedGoods();
      },
      deep: true
    }
  },
  created: function created() {
    this.fetchReturnedGoods();
    this.debouncedReturnedGoods = _.debounce(this.fetchReturnedGoods, 1000);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/Sold.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/shop_finished_good/Sold.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      f_g_sale_details: [],
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      headers: [{
        text: "Sale id",
        value: "f_g_sale.sale_id",
        "class": "cyan--text"
      }, {
        text: "Quantity",
        value: "quantity",
        "class": "cyan--text"
      }, {
        text: "Price",
        value: "price",
        "class": "cyan--text"
      }, {
        text: "Date",
        value: "date",
        "class": "cyan--text"
      }]
    };
  },
  methods: {
    fetchSoldGoods: function fetchSoldGoods() {
      var _this = this;

      axios.get("/api/shop_finished_good_sold/" + this.$route.params.shop_id + "/" + this.$route.params.id + "?itemsPerPage=" + this.options.itemsPerPage + "&page=" + this.options.page).then(function (response) {
        _this.f_g_sale_details = response.data.f_g_sale_details.data;
        _this.totalItems = response.data.f_g_sale_details.total;
      })["catch"](function (error) {});
    }
  },
  watch: {
    options: {
      handler: function handler() {
        this.fetchSoldGoods();
      },
      deep: true
    }
  },
  created: function created() {
    this.fetchSoldGoods();
    this.debouncedReceivedGoods = _.debounce(this.fetchSoldGoods, 1000);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/FinishedGood.vue?vue&type=template&id=15faf63c&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/shop_finished_good/FinishedGood.vue?vue&type=template&id=15faf63c& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
                _vm._v(_vm._s(_vm.shop_f_g.finished_good.name))
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
            "v-list",
            [
              _c(
                "v-list-item",
                [
                  _c("v-list-item-avatar", { attrs: { size: "100" } }, [
                    _c("img", {
                      attrs: {
                        src:
                          "/storage/finished_good/" +
                          _vm.shop_f_g.finished_good.photo,
                        alt: ""
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(_vm._s(_vm.shop_f_g.finished_good.name))
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          _vm._s(_vm.shop_f_g.finished_good.finished_good_id)
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    { staticClass: "text-center" },
                    [
                      _c("v-list-item-title", [
                        _vm._v("Balance : " + _vm._s(_vm.shop_f_g.quantity))
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          _vm._s(
                            "I balance : " + _vm.shop_f_g.initial_balance + ","
                          )
                        )
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          _vm._s(
                            "B balance : " +
                              _vm.shop_f_g.beginning_balance +
                              ","
                          )
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    { staticClass: "text-center" },
                    [
                      _c("v-list-item-title", [_vm._v("Received")]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          _vm._s("Quantity : " + _vm.f_g_received_count + ",")
                        )
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          _vm._s("AVG Price : " + _vm.f_g_received_price + ",")
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    { staticClass: "text-center" },
                    [
                      _c("v-list-item-title", [_vm._v("Sales")]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(_vm._s("Quantity : " + _vm.f_g_sale_count + ","))
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(_vm._s("Price : " + _vm.f_g_sale_price + ","))
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    { staticClass: "text-center" },
                    [
                      _c("v-list-item-title", [_vm._v("Return")]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          _vm._s("Quantity : " + _vm.f_g_return_count + ",")
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
          ),
          _vm._v(" "),
          _c(
            "v-tabs",
            {
              attrs: { centered: "" },
              model: {
                value: _vm.tab,
                callback: function($$v) {
                  _vm.tab = $$v
                },
                expression: "tab"
              }
            },
            [
              _c("v-tabs-slider"),
              _vm._v(" "),
              _c("v-tab", [_vm._v("RECEIVED")]),
              _vm._v(" "),
              _c("v-tab", [_vm._v("SOLD")]),
              _vm._v(" "),
              _c("v-tab", [_vm._v("Returned")])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-tabs-items",
            {
              staticClass: "px-0",
              model: {
                value: _vm.tab,
                callback: function($$v) {
                  _vm.tab = $$v
                },
                expression: "tab"
              }
            },
            [
              _c("v-tab-item", [_c("Received")], 1),
              _vm._v(" "),
              _c("v-tab-item", [_c("Sold")], 1),
              _vm._v(" "),
              _c("v-tab-item", [_c("Returned")], 1)
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/Received.vue?vue&type=template&id=2a87c218&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/shop_finished_good/Received.vue?vue&type=template&id=2a87c218& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
  return _c("v-data-table", {
    attrs: {
      headers: _vm.headers,
      items: _vm.f_g_issue_details,
      options: _vm.options,
      "server-items-length": _vm.totalItems,
      "footer-props": {
        "items-per-page-options": [15, 25, 35, 45, 55]
      }
    },
    on: {
      "update:options": function($event) {
        _vm.options = $event
      }
    },
    scopedSlots: _vm._u([
      {
        key: "item.date",
        fn: function(ref) {
          var item = ref.item
          return [
            _vm._v(
              _vm._s(
                item.f_g_issue.year +
                  " - " +
                  item.f_g_issue.month +
                  " - " +
                  item.f_g_issue.day
              )
            )
          ]
        }
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/Returned.vue?vue&type=template&id=679c4be2&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/shop_finished_good/Returned.vue?vue&type=template&id=679c4be2& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
  return _c("v-data-table", {
    attrs: {
      headers: _vm.headers,
      items: _vm.f_g_return_details,
      options: _vm.options,
      "server-items-length": _vm.totalItems,
      "footer-props": {
        "items-per-page-options": [15, 25, 35, 45, 55]
      }
    },
    on: {
      "update:options": function($event) {
        _vm.options = $event
      }
    },
    scopedSlots: _vm._u([
      {
        key: "item.date",
        fn: function(ref) {
          var item = ref.item
          return [
            _vm._v(
              _vm._s(
                item.f_g_return.year +
                  " - " +
                  item.f_g_return.month +
                  " - " +
                  item.f_g_return.day
              )
            )
          ]
        }
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/Sold.vue?vue&type=template&id=23342de7&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/shop_finished_good/Sold.vue?vue&type=template&id=23342de7& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
  return _c("v-data-table", {
    attrs: {
      headers: _vm.headers,
      items: _vm.f_g_sale_details,
      options: _vm.options,
      "server-items-length": _vm.totalItems,
      "footer-props": {
        "items-per-page-options": [15, 25, 35, 45, 55]
      }
    },
    on: {
      "update:options": function($event) {
        _vm.options = $event
      }
    },
    scopedSlots: _vm._u([
      {
        key: "item.date",
        fn: function(ref) {
          var item = ref.item
          return [
            _vm._v(
              _vm._s(
                item.f_g_sale.year +
                  " - " +
                  item.f_g_sale.month +
                  " - " +
                  item.f_g_sale.day
              )
            )
          ]
        }
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/shop_finished_good/FinishedGood.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/components/shop_finished_good/FinishedGood.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FinishedGood_vue_vue_type_template_id_15faf63c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FinishedGood.vue?vue&type=template&id=15faf63c& */ "./resources/js/components/shop_finished_good/FinishedGood.vue?vue&type=template&id=15faf63c&");
/* harmony import */ var _FinishedGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FinishedGood.vue?vue&type=script&lang=js& */ "./resources/js/components/shop_finished_good/FinishedGood.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FinishedGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FinishedGood_vue_vue_type_template_id_15faf63c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FinishedGood_vue_vue_type_template_id_15faf63c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/shop_finished_good/FinishedGood.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/shop_finished_good/FinishedGood.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/shop_finished_good/FinishedGood.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./FinishedGood.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/FinishedGood.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/shop_finished_good/FinishedGood.vue?vue&type=template&id=15faf63c&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/shop_finished_good/FinishedGood.vue?vue&type=template&id=15faf63c& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGood_vue_vue_type_template_id_15faf63c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FinishedGood.vue?vue&type=template&id=15faf63c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/FinishedGood.vue?vue&type=template&id=15faf63c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGood_vue_vue_type_template_id_15faf63c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FinishedGood_vue_vue_type_template_id_15faf63c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/shop_finished_good/Received.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/shop_finished_good/Received.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Received_vue_vue_type_template_id_2a87c218___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Received.vue?vue&type=template&id=2a87c218& */ "./resources/js/components/shop_finished_good/Received.vue?vue&type=template&id=2a87c218&");
/* harmony import */ var _Received_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Received.vue?vue&type=script&lang=js& */ "./resources/js/components/shop_finished_good/Received.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Received_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Received_vue_vue_type_template_id_2a87c218___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Received_vue_vue_type_template_id_2a87c218___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/shop_finished_good/Received.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/shop_finished_good/Received.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/shop_finished_good/Received.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Received_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Received.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/Received.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Received_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/shop_finished_good/Received.vue?vue&type=template&id=2a87c218&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/shop_finished_good/Received.vue?vue&type=template&id=2a87c218& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Received_vue_vue_type_template_id_2a87c218___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Received.vue?vue&type=template&id=2a87c218& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/Received.vue?vue&type=template&id=2a87c218&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Received_vue_vue_type_template_id_2a87c218___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Received_vue_vue_type_template_id_2a87c218___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/shop_finished_good/Returned.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/shop_finished_good/Returned.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Returned_vue_vue_type_template_id_679c4be2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Returned.vue?vue&type=template&id=679c4be2& */ "./resources/js/components/shop_finished_good/Returned.vue?vue&type=template&id=679c4be2&");
/* harmony import */ var _Returned_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Returned.vue?vue&type=script&lang=js& */ "./resources/js/components/shop_finished_good/Returned.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Returned_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Returned_vue_vue_type_template_id_679c4be2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Returned_vue_vue_type_template_id_679c4be2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/shop_finished_good/Returned.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/shop_finished_good/Returned.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/shop_finished_good/Returned.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Returned_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Returned.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/Returned.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Returned_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/shop_finished_good/Returned.vue?vue&type=template&id=679c4be2&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/shop_finished_good/Returned.vue?vue&type=template&id=679c4be2& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Returned_vue_vue_type_template_id_679c4be2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Returned.vue?vue&type=template&id=679c4be2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/Returned.vue?vue&type=template&id=679c4be2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Returned_vue_vue_type_template_id_679c4be2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Returned_vue_vue_type_template_id_679c4be2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/shop_finished_good/Sold.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/shop_finished_good/Sold.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sold_vue_vue_type_template_id_23342de7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sold.vue?vue&type=template&id=23342de7& */ "./resources/js/components/shop_finished_good/Sold.vue?vue&type=template&id=23342de7&");
/* harmony import */ var _Sold_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sold.vue?vue&type=script&lang=js& */ "./resources/js/components/shop_finished_good/Sold.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sold_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sold_vue_vue_type_template_id_23342de7___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Sold_vue_vue_type_template_id_23342de7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/shop_finished_good/Sold.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/shop_finished_good/Sold.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/shop_finished_good/Sold.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sold_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Sold.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/Sold.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sold_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/shop_finished_good/Sold.vue?vue&type=template&id=23342de7&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/shop_finished_good/Sold.vue?vue&type=template&id=23342de7& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sold_vue_vue_type_template_id_23342de7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Sold.vue?vue&type=template&id=23342de7& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/shop_finished_good/Sold.vue?vue&type=template&id=23342de7&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sold_vue_vue_type_template_id_23342de7___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sold_vue_vue_type_template_id_23342de7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);