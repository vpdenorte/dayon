<template>
  <div>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Dayon</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" clipped>
      <v-list nav>
        <v-list-item
          v-for="(item, index) in drawerItems"
          :key="index"
          :to="{ name: item.link }"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="main-view">
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      drawerItems: [
        // {
        //   title: 'Dashboard',
        //   icon: 'mdi-view-dashboard',
        //   link: 'Dashboard',
        // },
        {
          title: 'Rooms',
          icon: 'mdi-door-open',
          link: 'Rooms',
        },
        {
          title: 'Cards',
          icon: 'mdi-smart-card',
          link: 'Cards',
        },
        {
          title: 'Visitors',
          icon: 'mdi-account-multiple',
          link: 'Visitors',
        },
        {
          title: 'Logs',
          icon: 'mdi-file-document-outline',
          link: 'admin-logs',
        },
      ],
    }
  },
}
</script>

<style scoped>
.main-view {
  width: 75vw;
}
</style>
