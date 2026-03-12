<template>

<div class="botones">

<button class="btnEditar" @click="$emit('editar', producto)">✏️ Editar</button>
<button class="btnEliminar" @click="$emit('eliminar', producto)">🗑️ Eliminar</button>

</div>

</template>

<script>

export default{

props:["producto"],

emits:["editar","eliminar"]

}

</script>

<style scoped>

.botones{
display:flex;
gap:6px;
}

.btnEditar{
padding:5px 12px;
border:none;
border-radius:6px;
background:#e8f5e9;
color:#2d9e74;
font-weight:600;
font-size:12px;
cursor:pointer;
transition:0.2s;
border:1px solid #b6e8d3;
}

.btnEditar:hover{
background:#2d9e74;
color:white;
}

.btnEliminar{
padding:5px 12px;
border:none;
border-radius:6px;
background:#fff0f0;
color:#e05a00;
font-weight:600;
font-size:12px;
cursor:pointer;
transition:0.2s;
border:1px solid #ffd6c0;
}

.btnEliminar:hover{
background:#e05a00;
color:white;
}

</style>
