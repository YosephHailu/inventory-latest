(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/good_receive/ManageReceiveGood.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/good_receive/ManageReceiveGood.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddItem */ "./resources/js/components/good_receive/AddItem.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    AddItem: _AddItem__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      search: "",
      edit: false,
      valid: false,
      good_receive: {
        supplier: {}
      },
      item_received: {
        item_id: null,
        item: {
          item_category: {}
        }
      },
      btn_loading: false,
      received_items: [],
      item_categories: [],
      items: []
    };
  },
  methods: {
    clearForm: function clearForm() {
      this.item_received = {
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
        Object.keys(this.item_received).forEach(function (key) {
          return formData.append(key, _this.item_received[key]);
        });
        formData.append("good_receive_id", this.good_receive.id);
        axios.post("/api/item_receive", formData).then(function (response) {
          _this.received_items.unshift(response.data.item_received);

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
    initEdit: function initEdit(item_received) {
      this.edit = true;
      this.item_received = item_received;
      this.fetchItem();
      this.$vuetify.goTo(0, 0);
    },
    handelUpdate: function handelUpdate() {
      var _this2 = this;

      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        var formData = new FormData();
        Object.keys(this.item_received).forEach(function (key) {
          return formData.append(key, _this2.item_received[key]);
        });
        formData.append("good_receive_id", this.good_receive.id);
        formData.append("_method", "put");
        axios.post("/api/item_receive/" + this.item_received.id, formData).then(function (response) {
          _this2.fetchGoodReceive();

          _this2.btn_loading = false;

          _this2.clearForm();

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
    deleteItem: function deleteItem(received_item) {
      var _this3 = this;

      if (confirm("Are you sure you went to delete")) {
        axios["delete"]("/api/item_receive/" + received_item.id).then(function (response) {
          _this3.received_items.splice(_this3.received_items.indexOf(received_item), 1);
        })["catch"](function (error) {});
      }
    },
    fetchGoodReceive: function fetchGoodReceive() {
      var _this4 = this;

      axios.get("/api/good_receive/" + this.$route.params.id + "?q=" + this.search).then(function (response) {
        _this4.good_receive = response.data.good_receive;
        _this4.received_items = response.data.item_receive;
      })["catch"](function (error) {});
    },
    fetchItem: function fetchItem() {
      var _this5 = this;

      axios.get("/api/items?item_category_id=" + this.item_received.item.item_category.id).then(function (response) {
        _this5.items = response.data.items;
      })["catch"](function (error) {});
    },
    fetchOptions: function fetchOptions() {
      var _this6 = this;

      axios.get("/api/itemOptions").then(function (response) {
        _this6.item_categories = response.data.itemCategories;
      })["catch"](function (error) {});
    },
    int_print: function int_print() {
      window.print();
    }
  },
  created: function created() {
    this.fetchOptions();
    this.fetchGoodReceive();
    this.debouncedFetchGoodReceive = _.debounce(this.fetchGoodReceive, 1000);
  },
  watch: {
    search: {
      handler: function handler() {
        this.debouncedFetchGoodReceive();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/good_receive/ManageReceiveGood.vue?vue&type=template&id=aa040650&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/good_receive/ManageReceiveGood.vue?vue&type=template&id=aa040650& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
                _vm._v("ADD RECEIVED ITEMS")
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
                          "GRN : " + _vm._s(_vm.good_receive.good_receive_id)
                        )
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "Invoice : " + _vm._s(_vm.good_receive.invoice_no)
                        )
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "Supplier :\n            " +
                            _vm._s(
                              _vm.good_receive.supplier &&
                                _vm.good_receive.supplier.name
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
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "Prepared by :\n            " +
                            _vm._s(_vm.good_receive.prepared_by)
                        )
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "Approved by :\n            " +
                            _vm._s(_vm.good_receive.approved_by)
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
                          "Proforma No : " + _vm._s(_vm.good_receive.pro_no)
                        )
                      ]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "Purchase No : " + _vm._s(_vm.good_receive.po_no)
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
                              path:
                                "/receive-good/" + _vm.good_receive.id + "/edit"
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
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-form",
            {
              ref: "form",
              staticClass: "pt-4 no-print",
              attrs: { fixed: "" },
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
                          value: _vm.item_received.item.item_category.id,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.item_received.item.item_category,
                              "id",
                              $$v
                            )
                          },
                          expression: "item_received.item.item_category.id"
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
                        model: {
                          value: _vm.item_received.item_id,
                          callback: function($$v) {
                            _vm.$set(_vm.item_received, "item_id", $$v)
                          },
                          expression: "item_received.item_id"
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
                              return !!v || "Quantity is required"
                            }
                          ],
                          label: "Quantity"
                        },
                        model: {
                          value: _vm.item_received.quantity,
                          callback: function($$v) {
                            _vm.$set(_vm.item_received, "quantity", $$v)
                          },
                          expression: "item_received.quantity"
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
                              return !!v || "Item price is required"
                            }
                          ],
                          label: "Item price"
                        },
                        model: {
                          value: _vm.item_received.item_price,
                          callback: function($$v) {
                            _vm.$set(_vm.item_received, "item_price", $$v)
                          },
                          expression: "item_received.item_price"
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
                            type: "submit",
                            color: "cyan accent-6",
                            loading: _vm.btn_loading,
                            rounded: ""
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.handelUpdate($event)
                            }
                          }
                        },
                        [_vm._v("Save")]
                      )
                    : _c(
                        "v-btn",
                        {
                          attrs: {
                            dark: "",
                            type: "submit",
                            color: "cyan accent-6",
                            loading: _vm.btn_loading,
                            rounded: ""
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.handelSubmit($event)
                            }
                          }
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
          _c(
            "div",
            { staticClass: "no-print" },
            [
              _c("v-text-field", {
                attrs: {
                  label: "Search by name or item id",
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
              })
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
                  _c(
                    "v-list-item-content",
                    { staticClass: "text-center" },
                    [
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "\n            Total items :\n            " +
                            _vm._s(
                              _vm.received_items.reduce(function(total, value) {
                                return total + Number(value.quantity)
                              }, 0)
                            ) +
                            "\n          "
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
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "\n            Total price :\n            " +
                            _vm._s(
                              _vm.received_items
                                .reduce(function(total, value) {
                                  return (
                                    total + value.item_price * value.quantity
                                  )
                                }, 0)
                                .toLocaleString()
                            ) +
                            "\n          "
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
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "\n            VAT :\n            " +
                            _vm._s(
                              (
                                (_vm.received_items.reduce(function(
                                  total,
                                  value
                                ) {
                                  return (
                                    total + value.item_price * value.quantity
                                  )
                                },
                                0) *
                                  15) /
                                100
                              ).toLocaleString()
                            ) +
                            "\n          "
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                _vm._l(_vm.received_items, function(received_item, index) {
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
                                _vm._v(_vm._s(received_item.item.name))
                              ]),
                              _vm._v(" "),
                              _c("v-list-item-subtitle", [
                                _vm._v(
                                  "Quantity : " +
                                    _vm._s(received_item.quantity) +
                                    ", Price :\n                " +
                                    _vm._s(received_item.item_price)
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
                                      path: "/item/" + received_item.item.id
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
                                      return _vm.initEdit(received_item)
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
                                      return _vm.deleteItem(received_item)
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

/***/ "./resources/js/components/good_receive/ManageReceiveGood.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/good_receive/ManageReceiveGood.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ManageReceiveGood_vue_vue_type_template_id_aa040650___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ManageReceiveGood.vue?vue&type=template&id=aa040650& */ "./resources/js/components/good_receive/ManageReceiveGood.vue?vue&type=template&id=aa040650&");
/* harmony import */ var _ManageReceiveGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ManageReceiveGood.vue?vue&type=script&lang=js& */ "./resources/js/components/good_receive/ManageReceiveGood.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ManageReceiveGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ManageReceiveGood_vue_vue_type_template_id_aa040650___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ManageReceiveGood_vue_vue_type_template_id_aa040650___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/good_receive/ManageReceiveGood.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/good_receive/ManageReceiveGood.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/good_receive/ManageReceiveGood.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageReceiveGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ManageReceiveGood.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/good_receive/ManageReceiveGood.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageReceiveGood_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/good_receive/ManageReceiveGood.vue?vue&type=template&id=aa040650&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/good_receive/ManageReceiveGood.vue?vue&type=template&id=aa040650& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageReceiveGood_vue_vue_type_template_id_aa040650___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ManageReceiveGood.vue?vue&type=template&id=aa040650& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/good_receive/ManageReceiveGood.vue?vue&type=template&id=aa040650&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageReceiveGood_vue_vue_type_template_id_aa040650___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageReceiveGood_vue_vue_type_template_id_aa040650___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);