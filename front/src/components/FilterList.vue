<template>
  <v-row class="pt-4" gutters>
    <v-col cols="12" md="4">
      <label>Género</label>
      <v-select
        :items="[
          { text: 'Todos', value: null },
          { text: 'Masculino', value: 'male' },
          { text: 'Femenino', value: 'female' },
        ]"
        v-model="gender"
      ></v-select>
    </v-col>
    <v-col cols="12" md="4">
      <label>Edad</label>
      <v-row gutters>
        <v-col cols="12" md="6">
          <v-select :items="itemsAgeFrom" v-model="age_from"></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select :items="itemsAgeTo" v-model="age_to"></v-select>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="4">
      <label>Nacionalidad</label>
      <v-select :items="nats" v-model="nat"></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      itemsAgeFrom: [
        { text: "Min", value: 0 },
        { text: "10", value: 10 },
        { text: "20", value: 20 },
        { text: "30", value: 30 },
        { text: "40", value: 40 },
        { text: "60", value: 60 },
        { text: "80", value: 80 },
      ],
      itemsAgeTo: [
        { text: "Max", value: 200 },
        { text: "10", value: 10 },
        { text: "20", value: 20 },
        { text: "30", value: 30 },
        { text: "40", value: 40 },
        { text: "60", value: 60 },
        { text: "80", value: 80 },
      ],
    };
  },

  computed: {
    gender: {
      get: function () {
        return this.$store.state.filters.gender;
      },
      set: function (value) {
        this.changeFilter("gender", value);
      },
    },

    age_from: {
      get: function () {
        return 0;
      },
      set: function (value) {
        this.changeFilter("age_from", value);
      },
    },
    age_to: {
      get: function () {
        return 200;
      },
      set: function (value) {
        this.changeFilter("age_to", value);
      },
    },
    nats: {
      get: function () {
        return ["Todos", ...this.$store.state.filters.nats];
      },
    },

    nat: {
      get: function () {
        let nat = this.$store.state.filters.nat;
        if (nat === null) nat = "Todos";
        return nat;
      },
      set: function (value) {
        if (value === "Todos") value = null;
        this.changeFilter("nat", value);
      },
    },
  },
  methods: {
    // cada vez que se establece un cambio en los computed del filtro,
    // establezco en store un cambio en los parametros de filtro
    changeFilter(type, value) {
      this.$store.dispatch("changeFilter", { type, value });
    },
  },
};
</script>
