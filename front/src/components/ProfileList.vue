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
        :key="item.login.username"
        v-for="item in $store.state.profilesFiltered"
        @click="onSelect(item)"
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
  methods: {
    onSelect(item) {
      this.$emit("select", item);
    },
  },
};
</script>
