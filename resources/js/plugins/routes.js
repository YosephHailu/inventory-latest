export const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../components/dashboard/Dashboard"),
        meta: {
            authenticated: true,
            breadcrumb: []
        }
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../components/auth/Login"),
        meta: {
            breadcrumb: [{ text: "Login", href: "/", disabled: true }]
        }
    },
    {
        path: "/sections",
        name: "sections",
        component: () => import("../components/section/Section"),
        meta: {
            roles: ["administrator"],
            authenticated: true,
            breadcrumb: [{ text: "Sections", href: "/", disabled: true }]
        }
    },
    {
        path: "/stores",
        name: "stores",
        component: () => import("../components/store/Stores"),
        meta: {
            roles: ["administrator"],
            authenticated: true,
            breadcrumb: [{ text: "Stores", href: "/", disabled: true }]
        }
    },
    {
        path: "/add-store",
        name: "add-store",
        component: () => import("../components/store/Add"),
        meta: {
            roles: ["administrator"],
            authenticated: true,
            breadcrumb: [
                { text: "Stores", href: "/stores" },
                {
                    text: "Registration form",
                    href: "/add-store",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/store/:id/edit",
        name: "edit-store",
        component: () => import("../components/store/Add"),
        meta: {
            roles: ["administrator"],
            authenticated: true,
            breadcrumb: [{ text: "Stores", href: "/stores", disabled: true }]
        }
    },
    {
        path: "/setting",
        component: () => import("../components/config/index"),
        meta: {
            roles: ["administrator"]
        },
        children: [
            {
                path: "/",
                name: "config",
                component: () => import("../components/config/Config"),
                meta: {
                    roles: ["administrator"],
                    authenticated: true,
                    breadcrumb: [
                        {
                            roles: ["administrator"],
                            text: "Configurations",
                            href: "/configuration",
                            disabled: true
                        }
                    ]
                }
            },
            {
                path: "company",
                name: "Company information",
                component: () => import("../components/config/Company"),
                meta: {
                    authenticated: true,
                    breadcrumb: [
                        {
                            roles: ["administrator"],
                            text: "Configurations",
                            href: "/configuration",
                            disabled: true
                        }
                    ]
                }
            },
            {
                path: "unit",
                name: "unit",
                component: () => import("../components/config/Unit"),
                meta: {
                    authenticated: true,
                    breadcrumb: [
                        {
                            roles: ["administrator"],
                            text: "Measurement units",
                            href: "/unit",
                            disabled: true
                        }
                    ]
                }
            },
            {
                path: "item-category",
                name: "item-category",
                component: () => import("../components/config/Category"),
                meta: {
                    authenticated: true,
                    breadcrumb: [
                        {
                            roles: ["administrator"],
                            text: "Item category",
                            href: "/item-category",
                            disabled: true
                        }
                    ]
                }
            },
            {
                path: "fg-category",
                name: "fg-category",
                component: () => import("../components/config/FGCategory"),
                meta: {
                    authenticated: true,
                    breadcrumb: [
                        {
                            roles: ["administrator"],
                            text: "FInished good category",
                            href: "/fg-category",
                            disabled: true
                        }
                    ]
                }
            },
            {
                path: "fg-model",
                name: "fg-model",
                component: () => import("../components/config/FGModel"),
                meta: {
                    authenticated: true,
                    breadcrumb: [
                        {
                            roles: ["administrator"],
                            text: "FInished good model",
                            href: "/fg-model",
                            disabled: true
                        }
                    ]
                }
            },
            {
                path: "supplier",
                name: "supplier",
                component: () => import("../components/config/Supplier"),
                meta: {
                    authenticated: true,
                    breadcrumb: [
                        {
                            roles: ["administrator"],
                            text: "Suppliers",
                            href: "/supplier",
                            disabled: true
                        }
                    ]
                }
            },
            {
                path: "department",
                name: "department",
                component: () => import("../components/config/Department"),
                meta: {
                    authenticated: true,
                    breadcrumb: [
                        {
                            roles: ["administrator"],
                            text: "department",
                            href: "/department",
                            disabled: true
                        }
                    ]
                }
            },
            {
                path: "import",
                name: "import",
                component: () => import("../components/config/Import"),
                meta: {
                    authenticated: true,
                    breadcrumb: [
                        {
                            roles: ["administrator"],
                            text: "Import",
                            href: "/import",
                            disabled: true
                        }
                    ]
                }
            }
        ]
    },
    {
        path: "/users",
        name: "users",
        component: () => import("../components/user/users"),
        meta: {
            roles: ["administrator"],
            authenticated: true,
            breadcrumb: [{ text: "Users", href: "/", disabled: true }]
        }
    },
    {
        path: "/add-user",
        name: "add-user",
        component: () => import("../components/user/Add"),
        meta: {
            roles: ["administrator"],
            authenticated: true,
            breadcrumb: [
                { text: "Users", href: "/user" },
                {
                    text: "Registration form",
                    href: "/add-user",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/user/:id/edit",
        name: "edit-user",
        component: () => import("../components/user/Add"),
        meta: {
            authenticated: true,
            breadcrumb: [
                { text: "Users", href: "/users" },
                {
                    text: "Registration form",
                    href: "/items",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/items",
        name: "items",
        component: () => import("../components/item/Items"),
        meta: {
            authenticated: true,
            breadcrumb: [{ text: "Item", href: "/", disabled: true }]
        }
    },
    {
        path: "/mange-item-balance",
        name: "manage-item-balance",
        component: () => import("../components/item/ManageBalance"),
        meta: {
            roles: ["administrator"],
            authenticated: true,
            breadcrumb: [
                {
                    text: "Item Balance",
                    href: "/manage-balance",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/item/:id",
        name: "item",
        component: () => import("../components/item/Item"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Items", href: "/items" },
                { text: "Item", href: "/item", disabled: true }
            ]
        }
    },
    {
        path: "/add-item",
        name: "add-item",
        component: () => import("../components/item/Add"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Items", href: "/items" },
                {
                    text: "Registration form",
                    href: "/add-item",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/item/:id/edit",
        name: "edit-item",
        component: () => import("../components/item/Add"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Items", href: "/items" },
                {
                    text: "Registration form",
                    href: "/items",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/item-report",
        name: "item-report",
        component: () => import("../components/item/Report"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Items", href: "/items" },
                {
                    text: "Reports",
                    href: "/report",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/good-receives",
        name: "good-receives",
        component: () => import("../components/good_receive/GoodReceives"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [{ text: "Received items", href: "/", disabled: true }]
        }
    },
    {
        path: "/receive-good",
        name: "receive-good",
        component: () => import("../components/good_receive/ReceiveGood"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Good receives", href: "/good-receives" },
                {
                    text: "Registration form",
                    href: "/add-item",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/receive-good/:id/edit",
        name: "edit-received-good",
        component: () => import("../components/good_receive/ReceiveGood"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Good receives", href: "/good-receives" },
                {
                    text: "Registration form",
                    href: "/items",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/receive-good/:id/manage",
        name: "manage-received-good",
        component: () => import("../components/good_receive/ManageReceiveGood"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Manage Good receives", href: "/good-receives" },
                {
                    text: "Registration form",
                    href: "/items",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/receive-good-report",
        name: "receive-good-report",
        component: () => import("../components/good_receive/Report"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Manage Good receives", href: "/good-receives" },
                {
                    text: "Reports",
                    href: "/report",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/issue-goods",
        name: "issue-goods",
        component: () => import("../components/issue_good/GoodIssues"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [{ text: "Received items", href: "/", disabled: true }]
        }
    },
    // {
    //     path: "/good-issue",
    //     name: "good-issue",
    //     component: () => import("../components/issue_good/GoodIssue"),
    //     meta: {
    //         authenticated: true,
    //         breadcrumb: [
    //             { text: "Good receives", href: "/issue-goods" },
    //             { text: "Item", href: "/item", disabled: true }
    //         ]
    //     }
    // },
    {
        path: "/issue-good",
        name: "issue-good",
        component: () => import("../components/issue_good/IssueGood"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Good receives", href: "/issue-goods" },
                {
                    text: "Registration form",
                    href: "/add-item",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/issue-good/:id/edit",
        name: "edit-issue-good",
        component: () => import("../components/issue_good/IssueGood"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Good receives", href: "/issue-goods" },
                {
                    text: "Registration form",
                    href: "/items",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/issue-good/:id/manage",
        name: "manage-issue-good",
        component: () => import("../components/issue_good/ManageIssueGood"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Manage issue good", href: "/issue-goods" },
                {
                    text: "Registration form",
                    href: "/items",
                    disabled: true
                }
            ]
        }
    },

    {
        path: "/issue-good-report",
        name: "issue-good-report",
        component: () => import("../components/issue_good/Report"),
        meta: {
            roles: ["raw material manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Manage issue good", href: "/issue-goods" },
                {
                    text: "Reports",
                    href: "/report",
                    disabled: true
                }
            ]
        }
    },

    //Finished good

    {
        path: "/finished-goods",
        name: "finished-goods",
        component: () => import("../components/finished_good/FinishedGoods"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [{ text: "Finished Goods", href: "/", disabled: true }]
        }
    },
    {
        path: "/mange-finished_good-balance",
        name: "manage-finished_good-balance",
        component: () => import("../components/finished_good/ManageBalance"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                {
                    text: "Finished Good balance",
                    href: "/manage-balance",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/finished-good/:id",
        name: "finished-good",
        component: () => import("../components/finished_good/FinishedGood"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Finished Goods", href: "/finished-goods" },
                { text: "Finished Good", href: "/item", disabled: true }
            ]
        }
    },
    {
        path: "/add-finished-good",
        name: "add-finished-good",
        component: () => import("../components/finished_good/Add"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Finished Goods", href: "/finished-goods" },
                {
                    text: "Registration form",
                    href: "/add-item",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/finished-good/:id/edit",
        name: "edit-finished-good",
        component: () => import("../components/finished_good/Add"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Finished Goods", href: "/finished-goods" },
                {
                    text: "Registration form",
                    href: "/finished-goods",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/finished-good-report",
        name: "finished-good-report",
        component: () => import("../components/finished_good/Report"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Finished Goods", href: "/finished-good" },
                {
                    text: "Reports",
                    href: "/report",
                    disabled: true
                }
            ]
        }
    },

    {
        path: "/finished-good-receives",
        name: "finished-good-receives",
        component: () =>
            import("../components/finished_good_receive/FinishedGoodReceives"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Received finished goods", href: "/", disabled: true }
            ]
        }
    },
    {
        path: "/receive-finished-good",
        name: "receive-finished-good",
        component: () =>
            import("../components/finished_good_receive/ReceiveFinishedGood"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                {
                    text: "Finished Good receives",
                    href: "/finished-good-receives"
                },
                {
                    text: "Registration form",
                    href: "/add-item",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/receive-finished-good/:id/edit",
        name: "edit-received-finished-good",
        component: () =>
            import("../components/finished_good_receive/ReceiveFinishedGood"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                {
                    text: "Finished Good receives",
                    href: "/finished-good-receives"
                },
                {
                    text: "Registration form",
                    href: "/add-item",
                    disabled: true
                }
            ]
        }
    },

    {
        path: "/receive-finished-good/:id/manage",
        name: "manage-received-finished-good",
        component: () =>
            import(
                "../components/finished_good_receive/ManageReceiveFinishedGood"
            ),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Finished Good receives", href: "/good-receives" },
                {
                    text: "Good management form",
                    href: "/items",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/receive-finished-good-report",
        name: "receive-finished-good-report",
        component: () => import("../components/finished_good_receive/Report"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Manage Good receives", href: "/good-receives" },
                {
                    text: "Reports",
                    href: "/report",
                    disabled: true
                }
            ]
        }
    },

    {
        path: "/issue-finished-goods",
        name: "issue-finished-goods",
        component: () =>
            import("../components/issue_finished_good/FinishedGoodIssues"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Received finished goods", href: "/", disabled: true }
            ]
        }
    },
    {
        path: "/issue-finished-good",
        name: "issue-finished-good",
        component: () =>
            import("../components/issue_finished_good/IssueFinishedGood"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                {
                    text: "Received finished goods",
                    href: "/issue-finished-goods"
                },
                {
                    text: "Registration form",
                    href: "/issue-finished-good",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/issue-finished-good/:id/edit",
        name: "edit-issue-finished-good",
        component: () =>
            import("../components/issue_finished_good/IssueFinishedGood"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Good receives", href: "/issue-finished-goods" },
                {
                    text: "Registration form",
                    href: "/items",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/issue-finished-good/:id/manage",
        name: "manage-issue-finished-good",
        component: () =>
            import("../components/issue_finished_good/ManageIssueFinishedGood"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Manage issue good", href: "/issue-finished-goods" },
                {
                    text: "Registration form",
                    href: "/items",
                    disabled: true
                }
            ]
        }
    },

    {
        path: "/issue-finished-good-report",
        name: "issue-finished-good-report",
        component: () => import("../components/issue_finished_good/Report"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                {
                    text: "Manage issue finished good",
                    href: "/issue-finished-goods"
                },
                {
                    text: "Reports",
                    href: "/report",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/sale-finished-good/:id/manage",
        name: "sale-finished-good",
        component: () =>
            import("../components/sale_finished_good/ManageSaleGood"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Sale finished good", href: "/sale-finished-goods" },
                {
                    text: "Reports",
                    href: "/report",
                    disabled: true
                }
            ]
        }
    },

    {
        path: "/return-finished-good/:id/manage",
        name: "return-finished-good",
        component: () =>
            import("../components/return_finished_good/ManageReturnGood"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                {
                    text: "Return finished good",
                    href: "/return-finished-goods"
                },
                {
                    text: "Reports",
                    href: "/report",
                    disabled: true
                }
            ]
        }
    },
    //Sales store

    {
        path: "/shops",
        name: "shops",
        component: () => import("../components/shop/shops"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [{ text: "Shops", href: "/", disabled: true }]
        }
    },
    {
        path: "/shop/:id",
        name: "shop",
        component: () => import("../components/shop/Shop"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [{ text: "Shop", href: "/", disabled: true }]
        }
    },
    {
        path: "/add-shop",
        name: "add-shop",
        component: () => import("../components/shop/Add"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Shop", href: "/shops" },
                {
                    text: "Registration form",
                    href: "/add-shop",
                    disabled: true
                }
            ]
        }
    },
    {
        path: "/shop/:id/edit",
        name: "edit-shop",
        component: () => import("../components/shop/Add"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [{ text: "Shops", href: "/shops", disabled: true }]
        }
    },
    {
        path: "/shop-finished-good/:id/:shop_id",
        name: "shop-finished-good",
        component: () =>
            import("../components/shop_finished_good/FinishedGood"),
        meta: {
            roles: ["finished good manager"],
            authenticated: true,
            breadcrumb: [
                { text: "Shop finished good", href: "/", disabled: true }
            ]
        }
    }
];
