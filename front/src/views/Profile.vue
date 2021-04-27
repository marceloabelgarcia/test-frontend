<template>
  <div>
    <!-- Toolbar vista de perfil, para volver a Home -->
    <v-app-bar app>
      <v-toolbar-title>Perfil</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="$router.push({ name: 'Home' })" text>
        <span class="mr-2">Cerrar</span>
        <v-icon>close</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Contenedor de vista de un perfile -->
    <v-main>
      <v-container>
        <!-- Se pasa como parametro el perfil seleccionado filtrado de los perfiles
             el filtrado del perfile lo toma del Route (parametro por url)
        -->
        <profile-view
          v-for="(item, index) in $store.state.profiles.filter(
            (e) => e.login.username === $route.params.id
          )"
          :key="index"
          :item="item"
        ></profile-view> </v-container
    ></v-main>
  </div>
</template>
<script>
import ProfileView from "@/components/ProfileView.vue";

export default {
  name: "Profile",
  components: {
    ProfileView,
  },
};
</script>
