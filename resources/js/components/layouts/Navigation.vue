<template>
  <v-navigation-drawer v-if="getActivePanel" permanent app width="280" class="no-print">
    <v-tabs inset grow dark v-model="tab">
      <v-tabs-slider></v-tabs-slider>

      <v-tab class="blue-grey">
        <v-icon>menu</v-icon>
      </v-tab>

      <v-tab class="blue-grey">
        <v-icon>settings</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="px-0">
      <v-tab-item>
        <v-row>
          <v-col class="ma-0">
            <v-card
              flat
              class="text-center cyan--text py-2 lighten-4"
              active-class="cyan white--text"
              :to="{path: '/'}"
            >
              <v-icon size="50">home</v-icon>
              <v-card-subtitle class="pt-1 pb-3">DASHBOARD</v-card-subtitle>
            </v-card>
          </v-col>

          <v-col class="ma-0">
            <v-card
              flat
              class="text-center py-2 lighten-4"
              active-class="cyan"
              :to="{path: '/report'}"
            >
              <v-icon size="50">show_chart</v-icon>
              <v-card-subtitle class="pt-1 pb-3">REPORT</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>

        <v-expansion-panels v-model="sidebar_panel" focusable flat dense>
          <v-expansion-panel class="px-0 mt-0">
            <v-expansion-panel-header v-if="checkRole(['administrator', 'finished good manager'])">
              <v-card-subtitle class="pa-0">SITE LIST</v-card-subtitle>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              v-if="checkRole(['administrator', 'finished good manager'])"
              class="pa-0 mx-0"
            >
              <v-row>
                <v-col cols="6" class="mx-0 pa-0 pr-1" v-for="(shop, index) in shops" :key="index">
                  <v-card
                    flat
                    class="text-center cyan--text py-2 lighten-4"
                    active-class="cyan white--text"
                    :to="{path: '/shop/' + shop.id}"
                    exact
                  >
                    <v-icon size="35" class="cyan--text">shop</v-icon>
                    <v-card-subtitle style="font-size: 12px" class="pt-1 pb-3">{{shop.name}}</v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
            <v-divider></v-divider>
          </v-expansion-panel>

          <v-expansion-panel
            class="px-0 mt-0"
            v-for="(sidebarLink, index) in sidebarLinks"
            :key="index"
          >
            <v-expansion-panel-header v-if="checkRole(sidebarLink.roles)">
              <v-card-subtitle class="pa-0">{{sidebarLink.title}}</v-card-subtitle>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-0 mx-0">
              <v-row>
                <v-col
                  cols="6"
                  class="mx-0 pa-0 pr-1"
                  v-for="(link, index) in sidebarLink.links"
                  :key="index"
                >
                  <v-card
                    flat
                    class="text-center cyan--text py-2 lighten-4"
                    active-class="cyan white--text"
                    :to="{path: link.link}"
                    exact
                  >
                    <v-icon size="35" class="cyan--text">{{link.icon}}</v-icon>
                    <v-card-subtitle style="font-size: 12px" class="pt-1 pb-3">{{link.action}}</v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
            <v-divider></v-divider>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>Hello from athor</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-navigation-drawer>
</template>

<script>
import { hasRole } from "../../helper/role";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      tab: null,
      sidebarLinks: [
        {
          roles: ["administrator", "raw material manager"],
          title: "RAW MATERIAL",
          links: [
            {
              action: "ADD NEW",
              icon: "plus_one",
              link: "/add-item"
            },
            {
              action: "ITEMS LIST",
              icon: "store",
              link: "/items"
            },
            {
              action: "RECEIVE",
              icon: "plus_one",
              link: "/receive-good"
            },
            {
              action: "RECEIVED LIST",
              icon: "store",
              link: "/good-receives"
            },
            {
              action: "ISSUE",
              icon: "plus_one",
              link: "/issue-good"
            },
            {
              action: "ISSUE GOODS",
              icon: "store",
              link: "/issue-goods"
            },
            {
              action: "MANAGE I.BALANCE",
              icon: "store",
              link: "/mange-item-balance"
            }
          ]
        },
        {
          roles: ["administrator", "finished good manager"],
          title: "MAIN WAREHOUSE",
          links: [
            {
              action: "ADD NEW",
              icon: "plus_one",
              link: "/add-finished-good"
            },
            {
              action: "WAREHOUSE PRODUCT LIST",
              icon: "store",
              link: "/finished-goods"
            },
            {
              action: "RECEIVE",
              icon: "plus_one",
              link: "/receive-finished-good"
            },
            {
              action: "RECEIVED LIST",
              icon: "store",
              link: "/finished-good-receives"
            },
            {
              action: "ISSUE",
              icon: "plus_one",
              link: "/issue-finished-good"
            },
            {
              action: "ISSUE GOODS",
              icon: "store",
              link: "/issue-finished-goods"
            },
            {
              action: "Manage Balance",
              icon: "store",
              link: "/mange-finished_good-balance"
            }
          ]
        },
        {
          roles: ["administrator"],
          title: "MANAGE SHOP",
          links: [
            {
              action: "ADD NEW",
              icon: "plus_one",
              link: "/add-shop"
            },
            {
              action: "SHOP LIST",
              icon: "shop",
              link: "/shops"
            }
          ]
        },
        {
          roles: ["administrator"],
          title: "WAREHOUSE",
          links: [
            {
              action: "ADD NEW",
              icon: "plus_one",
              link: "/add-store"
            },
            {
              action: "WAREHOUSE LIST",
              icon: "store",
              link: "/stores"
            }
          ]
        },
        {
          roles: ["administrator"],
          title: "SECTION",
          links: [
            {
              action: "SECTION",
              icon: "apartment",
              link: "/sections"
            }
          ]
        },
        {
          roles: ["administrator"],
          title: "USERS",
          links: [
            {
              action: "ADD NEW",
              icon: "plus_one",
              link: "/add-user"
            },
            {
              action: "USERS LIST",
              icon: "people",
              link: "/users"
            }
          ]
        },
        {
          roles: ["administrator"],
          title: "SETTING",
          links: [
            {
              action: "CONFIGURATION",
              icon: "settings",
              link: "/setting"
            }
          ]
        }
      ],
      right: null,
      shops: []
    };
  },
  computed: {
    sidebar_panel: {
      get() {
        return this.$store.getters.getActivePanel;
      },
      set(value) {
        this.updateActivePanel(this.sidebar_panel);
      }
    },
    ...mapGetters(["getActivePanel", "getAuth"])
  },
  methods: {
    ...mapActions(["updateActivePanel"]),
    fetchShops() {
      axios
        .get("/api/shop/")
        .then(response => {
          this.shops = response.data.shops;
        })
        .catch(error => {});
    },

    checkRole(role) {
      if (role.length < 1) return true;
      return hasRole(role, this.getAuth.user.role);
    }
  },
  created() {
    this.fetchShops();
  }
};
</script>

<style>
.v-expansion-panel-content__wrap {
  padding: 0px !important;
}
</style>