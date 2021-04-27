<template>
  <div>
    <v-row>
      <v-col cols="12" xs="12" sm="auto">
        <v-card class="px-1 py-1" height="100%">
          <v-avatar class="profile" color="grey" size="150" tile
            ><img :src="item.picture.large"
          /></v-avatar>
        </v-card>
      </v-col>

      <v-col>
        <v-card class="px-1 py-1" height="100%">
          <v-row>
            <v-col>
              <ol-map
                class="simplemap"
                :latlng="getLatLng(item)"
                zoom="3"
                :address="getAddress(item)"
              ></ol-map>
            </v-col>
            <v-col cols="12" xs="auto" align="end" sm="auto">
              <v-btn
                @click="addtoFavorites(item)"
                icon
                :color="isFavorite(item) ? 'red' : 'gray'"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-col></v-row
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="6">
        <v-card min-height="200">
          <v-card-title>Datos Personales</v-card-title>

          <v-card-subtitle>
            <div>
              <strong>Direccion: </strong>
              <span>
                {{ item.name | fullName }}
              </span>
            </div>
            <div>
              <strong>E-Mail: </strong>
              <span>
                {{ item.email }}
              </span>
            </div>
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="12" xs="12" sm="6">
        <v-card min-height="200">
          <v-card-title>Datos de Localización</v-card-title>

          <v-card-subtitle>
            <strong>Direccion: </strong>
            <span v-html="getAddress(item)">
              {{ getAddress(item) }}
            </span>
          </v-card-subtitle>
          <v-card-subtitle>
            <strong>Teléfono: </strong>
            <span>{{ item.phone }}</span>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import OlMap from "@/components/OlMap";

export default {
  props: ["item"],
  components: {
    OlMap,
  },
  data() {
    return {
      profile: [],
    };
  },
  methods: {
    getLatLng(item) {
      const lat = item.location.coordinates.latitude;
      const lng = item.location.coordinates.longitude;

      return [lat, lng];
    },

    getAddress(item) {
      return (
        `Calle ${item.location.street.name} ${item.location.street.number}<br />` +
        `${item.location.state} (${item.location.postcode}) , ` +
        `<b>${item.location.country}</b>`
      );
    },

    isFavorite(item) {
      const username = item.login.username;
      const pos = this.$store.state.favorites.findIndex((e) => e === username);

      return pos > -1;
    },
    addtoFavorites(item) {
      const username = item.login.username;
      console.log("agregar: ", username);
      this.$store.dispatch("addtoFavorites", username);
    },
  },
};
</script>
<style scoped>
.col-fav {
  text-align: right;
  padding-right: 20px;
  padding-left: 20px;
}
.simplemap {
  width: 100%;
  height: 500px;
}
.foot-info {
  display: flex;
}
</style>
