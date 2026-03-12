<template>

<tr :class="{ 'fila--sinstock': producto.stock === 0 }">

<td class="tdNombre">{{ producto.nombre }}</td>

<!-- AE2 REQ 7: :style condicional si stock es 0 el texto va en rojo -->
<td :style="{ color: producto.stock === 0 ? '#e05a00' : '#1a3d2e', fontWeight: producto.stock === 0 ? '700' : '400' }">
  {{ producto.stock }} {{ producto.unidad }}
  <span v-if="producto.stock === 0" class="sinStockBadge">Sin stock</span>
</td>

<td>
  <span class="catBadge">{{ producto.categoria }}</span>
</td>

<td class="tdAlergenos">{{ producto.alergenos.join(", ") }}</td>

<td>
<BotonesTabla
  :producto="producto"
  @editar="$emit('editar', $event)"
  @eliminar="$emit('eliminar', $event)"
/>
</td>

</tr>

</template>

<script>

import BotonesTabla from "./botonesTabla.vue"

export default{

props:{
producto: Object
},

emits:["editar","eliminar"],

components:{
BotonesTabla
}

}

</script>

<style scoped>

td{
padding:12px 14px;
font-size:14px;
border-bottom:1px solid #e8f5e9;
vertical-align:middle;
color:#2a3d2e;
}

.fila--sinstock{
background:#fff8f4;
}

.tdNombre{
font-weight:600;
color:#1a3d2e;
}

.tdAlergenos{
font-size:12px;
color:#888;
}

.sinStockBadge{
display:inline-block;
margin-left:6px;
background:#ffe0cc;
color:#e05a00;
border-radius:50px;
padding:2px 8px;
font-size:11px;
font-weight:700;
}

.catBadge{
display:inline-block;
background:#e0f8ed;
color:#1a6b52;
border-radius:50px;
padding:3px 10px;
font-size:12px;
font-weight:600;
}

</style>
