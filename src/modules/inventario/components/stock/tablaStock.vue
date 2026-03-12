<template>

<div class="tablaWrapper">

<table class="tablaStock">

<thead>
<tr>
<th>Nombre</th>
<th>Stock</th>
<th>Categoría</th>
<th>Alérgenos</th>
<th>Acciones</th>
</tr>
</thead>

<tbody>

<FilaStock
v-for="producto in productos"
:key="producto.nombre"
:producto="producto"
@editar="$emit('editar', $event)"
@eliminar="$emit('eliminar', $event)"
/>

</tbody>

</table>

</div>

</template>

<script>

import FilaStock from "./filaStock.vue"

export default{

props:{
productos: Array
},

emits:["editar","eliminar"],

components:{
FilaStock
}

}

</script>

<style scoped>

.tablaWrapper{
overflow-x:auto;
border-radius:14px;
box-shadow:0 2px 16px rgba(29,107,82,0.1);
border:1px solid #b6e8d3;
}

.tablaStock{
width:100%;
border-collapse:collapse;
background:white;
}

.tablaStock thead tr{
background:linear-gradient(90deg,#1a6b52,#2d9e74);
}

.tablaStock thead th{
padding:13px 14px;
text-align:left;
font-size:13px;
font-weight:600;
color:#fff;
letter-spacing:0.3px;
}

.tablaStock tbody tr:last-child td{
border-bottom:none;
}

.tablaStock tbody tr:hover{
background:#f0fdf7;
}

</style>
