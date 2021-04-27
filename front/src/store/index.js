import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import CSVExport from "../plugins/csv.export";

Vue.use(Vuex);

// URL para desarrollo con webpack - > configurado en vue.config.js
// evitar problemas de bloqueo por seguridad
const URL_PROFILES = "http://localhost:8080/profiles/api";
const URL_API = "http://localhost:8080/node/api";

export default new Vuex.Store({
  state: {
    profiles: [],
    filters: {
      gender: null,
      age_from: 0,
      age_to: 200,
      nats: [],
      nat: null,
    },
    profilesFiltered: [],
    favorites: [],
    axios_error: {
      show: false,
      message: "",
    },
    loading: false,
  },
  mutations: {
    changeProfiles(state, data) {
      state.profiles = data.results;
    },
    changeFavorites(state, data) {
      state.favorites = data.favorites;
    },
    initFilter(state, data) {
      const nats = [];
      data.results.forEach((e) => (nats[e.nat] = 1));
      state.filters.nats = Object.keys(nats); // enumera una lista de todas las nacionalidades de los perfiles
      state.filters.age_from = 0;
      state.filters.age_to = 200; // se establece un limite para el filtro de edades
    },
    setFilter(state, data) {
      const type = data.type;
      const value = data.value;
      state.filters[type] = value;
    },
    applyFilter(state) {
      const minAge = state.filters.age_from;
      const maxAge = state.filters.age_to;

      // filtro de un array según los criterios establecidos por el usuario
      const filtered = state.profiles.filter((e) => {
        // por rango de edad
        const ageFilter = e.dob.age >= minAge && e.dob.age <= maxAge;

        // por genero
        const genderFilter =
          state.filters.gender !== null
            ? e.gender == state.filters.gender
            : true;

        // por nacionalidad
        const natFilter =
          state.filters.nat !== null ? e.nat == state.filters.nat : true;

        return ageFilter && genderFilter && natFilter; // quedan los elementos con 3 criterios en true
      });
      // guarda en store los perfiles filtrados para mostrar en la tabla
      state.profilesFiltered = filtered;
    },
    addtoFavorites(state, data) {
      const pos = state.favorites.findIndex((e) => e === data);
      if (pos > -1) state.favorites.splice(pos, 1);
      else state.favorites.push(data);
    },

    exportToCsv(state) {
      // encuentra los favoritos en la lista completa de pefiles
      // solo se ha guardado listado de favoritos con el username
      const list = state.profiles.filter((e) =>
        state.favorites.includes(e.login.username)
      );

      const csv = new CSVExport();

      let csvString = "gender,name,email,nat,birth,registered" + "\n";
      list.forEach((e) => {
        const gender = e.gender;
        const name = csv.fullName(e.name);
        const email = e.email;
        const nat = e.nat;
        const birth = e.dob.date;
        const registered = e.registered.date;
        csvString =
          csvString +
          `${gender},${name},${email},${nat},${birth},${registered}` +
          "\n";
      });
      // se llama metodo de clase creada para exportar csv
      csv.exportToCsv("archivo.csv", csvString);
    },
    closeAxiosError(state) {
      state.axios_error.show = false;
      state.axios_error.message = "";
    },
    showError(state) {
      state.axios_error.message = "Ha ocurrido un problema. Intente más tarde";
      state.axios_error.show = true;
    },
    showLoading(state, show) {
      state.loading = show;
    },
  },

  actions: {
    // iniciar interceptor de error en conectividad con servicios
    detectErrors({ commit }) {
      axios.interceptors.response.use(
        function (response) {
          return response;
        },
        function () {
          commit("showError");
        }
      );
    },
    // cierra SnackBar de error con accion de usuario
    closeAxiosError({ commit }) {
      commit("closeAxiosError");
    },
    // carga el listado de perfiles del EndPoint publico
    async refreshProfiles({ commit }) {
      commit("showLoading", true);
      let data = await axios.get(URL_PROFILES + "/?results=60");
      commit("showLoading", false);
      if (data == undefined) data = { data: null };
      else {
        data = data.data;
        commit("initFilter", data);
        commit("changeProfiles", data);
        commit("applyFilter");
      }
    },
    // cada vez que se modifica el filtro en el listado
    changeFilter({ commit }, data) {
      commit("setFilter", data);
      commit("applyFilter");
    },
    // agrega un favorito a la lista en el store
    addtoFavorites({ commit }, data) {
      commit("addtoFavorites", data);
    },
    // exporta listado actual del store a archivo csv
    exportToCsv({ commit }) {
      commit("exportToCsv");
    },
    // guarda el listado de favoritos del store en el servicio
    // y guarda el listado de perfiles de la última consulta y que corresponde a los favoritos
    async saveFavorites({ state }, name) {
      const list = state.favorites;
      const profiles = state.profiles;
      await axios.post(URL_API + "/favorites", {
        list,
        name,
        profiles,
      });
    },
    // carga los nombres de las listas de favoritos
    async loadListFavorites({ state }) {
      const list = state.favorites;
      let data = await axios.get(URL_API + "/favorites", { list });

      if (data == undefined) data = { data: {} };

      return data.data;
    },
    // carga la lista de favoritos seleccionado con el nombre
    async loadFavorites({ commit, state }, name) {
      commit("showLoading", true);
      const list = state.favorites;
      let data = await axios.get(URL_API + "/favorites/" + name, {
        list,
      });
      commit("showLoading", false);
      if (data == undefined) {
        data = { data: { results: null, favorites: null } };
      } else {
        data = data.data;
        const results = { results: data.results };
        const favorites = { favorites: data.favorites };

        commit("initFilter", results);
        commit("changeProfiles", results);
        commit("changeFavorites", favorites);

        commit("applyFilter");
      }
      return data;
    },
  },
  modules: {},
});
