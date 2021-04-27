<template>
  <v-dialog max-width="500" @input="handleClose" v-model="vshow">
    <v-card>
      <v-card-title>{{ label }}</v-card-title>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>
<script>
/*
Componente Modal, para utilizar un estilo homogeneo

Aquí utilizo 'model' definido de manera tal para clonar el comportamiento del modal nativo.

El v-model del padre ingresa como parametro en show, 
se lo asigno a vshow para evitar 'error mutation' y utilizo variable local 'vshow'
y cuando cambia el estado de vshow dentro del componente
utilizo el emit 'close' para cambiar el v-model padre
Detecto el cambio con @input (por ejemplo tecla escape cambia vshow a false)

He utilizado slot, para evitar código y complejidad por cada modal diferente,
Si tuviese más modales y encuentro un patrón con los botones por ej.
podría modificar este componente para su mejor implementación

*/
export default {
  model: {
    prop: "show",
    event: "close",
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data(props) {
    return {
      vshow: props.show,
    };
  },
  watch: {
    show(v1) {
      this.vshow = v1;
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>
