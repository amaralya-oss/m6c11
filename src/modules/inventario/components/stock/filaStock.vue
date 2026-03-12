<script setup>

import BotonesTabla from "./botonesTabla.vue"

defineProps({
  producto: Object
})

</script>

<template>

<tr>

<td>{{ producto.nombre }}</td>

<td :style="{ color: producto.stock === 0 ? 'red' : 'black' }">
{{ producto.stock }} {{ producto.unidad }} <span v-if="producto.stock === 0"> (Sin stock)</span>
</td>

<td>{{ producto.categoria }}</td>

<td>{{ producto.alergenos.join(", ") }}</td>

<td>
<BotonesTabla
 :producto="producto"
    @editar="$emit('editar', $event)"
    @eliminar="$emit('eliminar', $event)" />
</td>

</tr>

</template>