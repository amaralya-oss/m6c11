<template>

<tr class="filaProveedor">

<td class="tdNombre">{{ proveedor.nombre }}</td>
<td>{{ proveedor.telefono }}</td>
<td>{{ proveedor.tiempo }} {{ proveedor.unidad }}</td>
<td class="tdDir">{{ proveedor.direccion }}</td>

<td>
<BotonesProveedores
  :proveedor="proveedor"
  @editar="$emit('editar', $event)"
  @eliminar="$emit('eliminar', $event)"
/>
</td>

</tr>

</template>

<script>

import BotonesProveedores from "./botonesProveedores.vue"

export default{

props:{
proveedor: Object
},

emits:["editar","eliminar"],

components:{
BotonesProveedores
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

.tdNombre{
font-weight:600;
color:#1a3d2e;
}

.tdDir{
font-size:12px;
color:#888;
}

.filaProveedor:hover{
background:#f0fdf7;
}

</style>
