<template>
  <v-card class="pr-3">
    <v-row>
      <v-col cols="12" md="3">
        <v-list>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item exact="" v-for="(link, i) in links" :key="i" :to="{path: link.link}">
              <v-list-item-icon>
                <v-icon v-text="link.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="link.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    item: 1,
    links: [
      { title: "Configuration", icon: "settings", link: "/setting" },
      { title: "Company", icon: "home", link: "/setting/company" },
      { title: "Unit", icon: "clock", link: "/setting/unit" },
      {
        title: "Item category",
        icon: "category",
        link: "/setting/item-category"
      },
      {
        title: "FG category",
        icon: "category",
        link: "/setting/fg-category"
      },
      {
        title: "FG model",
        icon: "category",
        link: "/setting/fg-model"
      },
      {
        title: "Suppliers",
        icon: "category",
        link: "/setting/supplier"
      },
      {
        title: "Department",
        icon: "apartment",
        link: "/setting/department"
      },
      {
        title: "IMPORT",
        icon: "import_export",
        link: "/setting/import"
      }
    ]
  })
};
</script>