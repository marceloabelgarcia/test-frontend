<template>
  <div>
    <!-- Toolbar para vista de Listado de Favoritos -->
    <v-app-bar app>
      <v-toolbar-title>Listado de Favoritos</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="loadListFavorites" text>
        <span class="mr-2">Cargar Favoritos</span>
        <v-icon>cloud_download</v-icon>
      </v-btn>

      <v-btn @click="$router.push({ name: 'Home' })" text>
        <span class="mr-2">Volver</span>
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Tabla con listado de Favoritos -->
    <v-main>
      <v-container fluid>
        <favorites-list v-show="!loading"></favorites-list>
        <div v-show="loading" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-container>
    </v-main>

    <!-- Footer de Favoritos - Guardar y Exportar -->
    <v-footer app>
      <v-toolbar>
        <v-spacer></v-spacer>

        <v-btn @click="activeSave = true" text>
          <span class="mr-2">Guardar</span>
          <v-icon>save</v-icon>
        </v-btn>

        <v-btn @click="exportToCsv()" text>
          <span class="mr-2">Exportar</span>
          <v-icon>upload</v-icon>
        </v-btn>
      </v-toolbar>
    </v-footer>

    <!--- Modal para guardar Favoritos -->
    <main-modal v-model="activeSave" label="Guardar la lista de Favoritos">
      <v-card-text>
        <label>Escriba el nombre de la lista</label>

        <v-text-field v-model="saveName"></v-text-field>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn @click="activeSave = false">Cancelar</v-btn>
        <v-btn :disabled="getDisabled(saveName)" @click="saveFavorites"
          >Guardar</v-btn
        >
      </v-card-actions>
    </main-modal>

    <!-- Modal para cargar una lista de favoritos -->
    <main-modal v-model="activeLoad" label="Cargar una lista de Favoritos">
      <v-card-text>
        <v-select
          :items="listFav"
          label="Seleccionar lista"
          v-model="selectFav"
        ></v-select>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn @click="activeLoad = false">Cancelar</v-btn>
        <v-btn @click="loadFavorites">Abrir</v-btn>
      </v-card-actions>
    </main-modal>
  </div>
</template>
<script>
import FavoritesList from "@/components/FavoritesList.vue";
import MainModal from "@/components/MainModal.vue";

export default {
  name: "Favorites",
  components: {
    FavoritesList,
    MainModal,
  },
  data() {
    return {
      activeSave: false,
      saveName: "",
      activeLoad: false,
      listFav: [],
      selectFav: null,
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    exportToCsv() {
      this.$store.dispatch("exportToCsv");
    },
    saveFavorites() {
      // cierra modal y guarda favoritos
      this.activeSave = false;
      this.$store.dispatch("saveFavorites", this.saveName);
    },
    async loadListFavorites() {
      // antes de abrir modal, carga lista con favoritos
      const { data } = await this.$store.dispatch("loadListFavorites");
      if (data) {
        this.listFav = data;
        this.activeLoad = true;
        this.selectFav = 0;
      }
    },
    loadFavorites() {
      // cierra modal y carga los favoritos
      this.activeLoad = false;
      this.$store.dispatch("loadFavorites", this.selectFav);
      this.saveName = this.selectFav; // pone el nombre de la lista cargada en el input de guardar
    },
    // Habilitar para guardar nombres de lista mayores a 2 caracteres
    getDisabled(value) {
      const n = value.length;
      return n < 3;
    },
  },
};
</script>
<style scoped>
.select {
  width: 100%;
  background: transparent;
  border: none;
  font-size: 16px;
  color: #666;
}
</style>
