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
          link
          exact
          :to="{ name: item.routeName }"
          color="accent"
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

    <v-main>
      <router-view class="view"></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      drawerItems: [
        {
          title: 'Home',
          icon: 'mdi-home-outline',
          routeName: 'room-home',
        },
        {
          title: 'Settings',
          icon: 'mdi-cog-outline',
          routeName: 'room-settings',
        },
      ],
    }
  },
}
</script>

<style scoped>
.view {
  width: 720px;
  margin: 0 auto;
  padding: 24px 0;
}
</style>
