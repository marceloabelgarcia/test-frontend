<template>
  <v-app>
    <router-view />

    <v-snackbar v-model="$store.state.axios_error.show">
      {{ $store.state.axios_error.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="$store.dispatch('closeAxiosError')"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("detectErrors");
  },
};
</script>
