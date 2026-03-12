<script setup>
const props = defineProps({
  producto: Object
})
const emit = defineEmits(["editar", "eliminar"])

function editar() {
  emit("editar", props.producto)
}

function eliminar() {
  emit("eliminar", props.producto)
}
</script>

<template>
  <button @click="editar">Editar</button>
  <button @click="eliminar">Eliminar</button>
</template>