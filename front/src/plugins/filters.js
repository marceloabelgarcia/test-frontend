import Vue from "vue";

Vue.filter("dateFormat", (value) => {
  let d = new Date(value);
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return d.toLocaleDateString("es-ES", options);
});

Vue.filter("fullName", (item) => {
  return item.title + " " + item.first + " " + item.last;
});

Vue.filter("gender", (value) => {
  let v = "femenino";
  if (value == "male") v = "masculino";
  return v;
});
