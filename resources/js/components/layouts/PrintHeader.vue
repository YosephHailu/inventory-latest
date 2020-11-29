<template>
  <section>
    <v-list-item>
      <v-list-item-content class="text-right">
        <v-list-item-title>{{$store.state.mainStore.config.company.name}}</v-list-item-title>
        <v-list-item-subtitle>
          {{$store.state.mainStore.config.company.phone}}
          <v-icon small>phone</v-icon>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          {{$store.state.mainStore.config.company.email}}
          <v-icon small>mail</v-icon>
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-content>
        <v-list-item-avatar size="100">
          <v-img :src="'/storage/company/' + $store.state.mainStore.config.company.logo" align-center class="text-center" icon contain />
        </v-list-item-avatar>
      </v-list-item-content>

      <v-list-item-content class="text-left">
        <v-list-item-title>{{$store.state.mainStore.config.company.address}}</v-list-item-title>
        <v-list-item-subtitle>Date : {{$store.state.mainStore.config.current_date}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </section>
</template>