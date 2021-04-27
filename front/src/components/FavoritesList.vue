<template>
  <v-simple-table>
    <thead>
      <tr>
        <th>Género</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Nacionalidad</th>
        <th>Nacimiento</th>
        <th>Registrado</th>
      </tr>
    </thead>

    <tbody>
      <tr
        :key="item.id.value"
        v-for="item in getFavorites(
          $store.state.profiles,
          $store.state.favorites
        )"
      >
        <td>{{ item.gender | gender }}</td>

        <td>{{ item.name | fullName }}</td>

        <td>{{ item.email }}</td>

        <td>{{ item.nat }}</td>

        <td>{{ item.dob.date | dateFormat }}</td>

        <td>
          {{ item.registered.date | dateFormat }}
        </td>
      </tr>
    </tbody></v-simple-table
  >
</template>

<script>
export default {
  filters: {
    // filtro para transformar la fecha en la tabla
    dateFormat(value) {
      let d = new Date(value);
      var options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };

      return d.toLocaleDateString("es-ES", options);
    },

    // filtro para  mostrar el nombre completo
    fullName(item) {
      return item.title + " " + item.first + " " + item.last;
    },

    // filtro para mostrar el texto en español
    gender(value) {
      let v = "femenino";
      if (value == "male") v = "masculino";
      return v;
    },
  },

  methods: {
    // devulve el listado de pefiles filtrado por favoritos, almacenados en el store de vuex
    getFavorites(profiles, favorites) {
      const list = profiles.filter((e) => favorites.includes(e.login.username));
      return list;
    },
  },
};
</script>
