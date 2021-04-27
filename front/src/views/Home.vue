<template>
  <div>
    <!-- Toolbar de Home para ver favoritos y actualizar perfiles -->
    <v-app-bar app>
      <v-toolbar-title>Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="$router.push({ name: 'Favorites' })" text>
        <span class="mr-2">Ver Favoritos</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn @click="$store.dispatch('refreshProfiles')" text>
        <span class="mr-2">Actualizar</span>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Tabla con listado de Perfiles -->
    <v-main>
      <v-container fluid>
        <profile-list v-show="!loading" @select="handleSelect"></profile-list>
        <div v-show="loading" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-container>
    </v-main>

    <!-- Panel expandible con filtros para el listado de perfiles -->
    <v-footer app>
      <v-expansion-panels accordion>
        <v-expansion-panel>
          <v-expansion-panel-header color="primary lighten-2 "
            >Filtros</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <filter-list></filter-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-footer>
  </div>
</template>
<script>
import ProfileList from "@/components/ProfileList.vue";
import FilterList from "@/components/FilterList.vue";

export default {
  name: "Home",
  components: {
    ProfileList,
    FilterList,
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    handleSelect(item) {
      const id = item.login.username;
      this.$router.push({ name: "Profile", params: { id } });
    },
  },
};
</script>
