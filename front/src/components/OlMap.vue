<template>
  <div id="map"></div>
</template>
<script>
// componente para mostrar ubicación en el mapa
// se utilizó openlayers por CDN
// se podría haber utilizado también algún framework

export default {
  props: ["latlng", "zoom", "address"],
  data() {
    return {
      profile: [],
    };
  },

  mounted() {
    this.addPoint();
  },

  methods: {
    addPoint() {
      let map = window.map;
      const OpenLayers = window.OpenLayers;
      // The overlay layer for our marker, with a simple diamond as symbol
      var overlay = new OpenLayers.Layer.Vector("Overlay", {
        styleMap: new OpenLayers.StyleMap({
          externalGraphic: "../img/marker.png",
          graphicWidth: 20,
          graphicHeight: 24,
          graphicYOffset: -24,
        }),
      });

      // The location of our marker and popup. We usually think in geographic
      // coordinates ('EPSG:4326'), but the map is projected ('EPSG:3857').
      var myLocation = new OpenLayers.Geometry.Point(
        this.latlng[1],
        this.latlng[0]
      );

      // We add the marker with a tooltip text to the overlay
      overlay.addFeatures([
        new OpenLayers.Feature.Vector(myLocation, { tooltip: "OpenLayers" }),
      ]);

      // Finally we create the map
      map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:3857",
        layers: [new OpenLayers.Layer.OSM(), overlay],
        center: myLocation.getBounds().getCenterLonLat(),
        zoom: this.zoom,
      });

      // A popup with some information about our location
      const popup = new OpenLayers.Popup.FramedCloud(
        "Popup",
        myLocation.getBounds().getCenterLonLat(),
        null,
        this.address,
        null,
        true // <-- true if we want a close (X) button, false otherwise
      );

      map.addPopup(popup);
    },
  },
};
</script>
