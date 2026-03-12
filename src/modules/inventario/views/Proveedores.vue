<template>

<div class="vistaProveedores">

  <div class="provHeader">
    <h2 class="tituloProveedores">🤝 Proveedores — <span class="subTitulo">Bosque Helado</span></h2>
    <button class="btnNuevoProv" @click="mostrarModal = true">➕ Nuevo proveedor</button>
  </div>

  <!-- Sin proveedores -->
  <p v-show="listaProveedores.length === 0" class="sinProveedores">
    No hay proveedores registrados.
  </p>

  <!-- Tabla proveedores -->
  <div v-show="listaProveedores.length > 0" class="tablaWrapper">

    <table class="tablaProveedores">

      <thead>
        <tr>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Entrega</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <FilaProveedores
          v-for="prov in listaProveedores"
          :key="prov.nombre"
          :proveedor="prov"
          @editar="editarProveedor"
          @eliminar="eliminarProveedor"
        />
      </tbody>

    </table>

  </div>

  <!-- Modal -->
  <div v-if="mostrarModal" class="modalOverlay" @click.self="cerrarModal">

    <div class="modal">

      <h3 class="tituloModal">{{ proveedorAEditar ? "✏️ Editar" : "➕ Nuevo" }} Proveedor</h3>

      <label class="labelModal">Nombre</label>
      <input v-model="form.nombre" class="inputProv" placeholder="Nombre del proveedor" />

      <label class="labelModal">Teléfono</label>
      <input v-model="form.telefono" class="inputProv" placeholder="+569..." />

      <label class="labelModal">Tiempo de entrega</label>
      <div class="filaTiempo">
        <input v-model="form.tiempo" type="number" class="inputProv inputNum" placeholder="Ej: 2" />
        <select v-model="form.unidad" class="selectProv">
          <option value="dias">días</option>
          <option value="horas">horas</option>
        </select>
      </div>

      <label class="labelModal">Dirección</label>
      <input v-model="form.direccion" class="inputProv" placeholder="Dirección, ciudad" />

      <p v-if="errorModal" class="errorProv">⚠️ {{ errorModal }}</p>

      <div class="modalBotones">
        <button class="btnGuardar" @click="guardarProveedor">💾 Guardar</button>
        <button class="btnCancelar" @click="cerrarModal">Cancelar</button>
      </div>

    </div>

  </div>

</div>

</template>

<script>

import FilaProveedores from "../components/proveedores/filaProveedores.vue"
import { proveedores } from "@/modules/inventario/data/proveedores.js"

export default{

components:{
FilaProveedores
},

// ── DATOS ────────────────────────────────────────────
data(){
return{
listaProveedores: [...proveedores],
mostrarModal: false,
proveedorAEditar: null,
errorModal: "",
form:{
  nombre: "",
  telefono: "",
  tiempo: "",
  unidad: "dias",
  direccion: "",
  productos: ""
}
}
},

// ── MÉTODOS ──────────────────────────────────────────
methods:{

guardarProveedor(){
if(
  this.form.nombre === "" ||
  this.form.telefono === "" ||
  this.form.tiempo === "" ||
  this.form.direccion === ""
){
  this.errorModal = "Todos los campos son obligatorios"
  return
}

if(this.proveedorAEditar){
  this.proveedorAEditar.nombre = this.form.nombre
  this.proveedorAEditar.telefono = this.form.telefono
  this.proveedorAEditar.tiempo = Number(this.form.tiempo)
  this.proveedorAEditar.unidad = this.form.unidad
  this.proveedorAEditar.direccion = this.form.direccion
} else {
  this.listaProveedores.push({
    nombre: this.form.nombre,
    telefono: this.form.telefono,
    tiempo: Number(this.form.tiempo),
    unidad: this.form.unidad,
    direccion: this.form.direccion,
    productos: ""
  })
}

this.cerrarModal()
},

editarProveedor(prov){
this.proveedorAEditar = prov
this.form.nombre = prov.nombre
this.form.telefono = prov.telefono
this.form.tiempo = prov.tiempo
this.form.unidad = prov.unidad
this.form.direccion = prov.direccion
this.mostrarModal = true
},

eliminarProveedor(prov){
this.listaProveedores = this.listaProveedores.filter(p => p !== prov)
},

cerrarModal(){
this.proveedorAEditar = null
this.errorModal = ""
this.form = { nombre:"", telefono:"", tiempo:"", unidad:"dias", direccion:"", productos:"" }
this.mostrarModal = false
}

}

}

</script>

<style scoped>

/* ── LAYOUT ── */
.vistaProveedores{
padding:28px 32px;
}

/* ── HEADER ── */
.provHeader{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:20px;
flex-wrap:wrap;
gap:12px;
}

.tituloProveedores{
font-size:18px;
font-weight:700;
color:#1a3d2e;
margin:0;
}

.subTitulo{
color:#2d9e74;
}

.btnNuevoProv{
padding:10px 20px;
background:linear-gradient(135deg,#FFD166,#f5a623);
border:none;
border-radius:10px;
font-weight:700;
font-size:14px;
cursor:pointer;
color:#1a3d2e;
transition:0.2s;
}

.btnNuevoProv:hover{
transform:translateY(-1px);
box-shadow:0 4px 12px rgba(245,166,35,0.35);
}

/* ── TABLA ── */
.tablaWrapper{
overflow-x:auto;
border-radius:14px;
box-shadow:0 2px 16px rgba(29,107,82,0.1);
border:1px solid #b6e8d3;
}

.tablaProveedores{
width:100%;
border-collapse:collapse;
background:white;
}

.tablaProveedores thead tr{
background:linear-gradient(90deg,#1a6b52,#2d9e74);
}

.tablaProveedores thead th{
padding:13px 14px;
text-align:left;
font-size:13px;
font-weight:600;
color:#fff;
}

.tablaProveedores tbody tr:last-child td{
border-bottom:none;
}

/* ── MENSAJES ── */
.sinProveedores{
color:#999;
font-style:italic;
margin-top:16px;
}

/* ── MODAL ── */
.modalOverlay{
position:fixed;
inset:0;
background:rgba(0,0,0,0.45);
display:flex;
align-items:center;
justify-content:center;
z-index:100;
}

.modal{
background:white;
border-radius:16px;
padding:28px;
width:100%;
max-width:440px;
box-shadow:0 8px 40px rgba(0,0,0,0.2);
display:flex;
flex-direction:column;
gap:10px;
}

.tituloModal{
font-size:17px;
font-weight:700;
color:#1a3d2e;
margin:0 0 4px;
}

.labelModal{
font-size:13px;
font-weight:600;
color:#2d9e74;
margin-top:4px;
}

.inputProv{
padding:10px 14px;
border:2px solid #b6e8d3;
border-radius:10px;
font-size:14px;
outline:none;
transition:0.2s;
background:#f9fffe;
color:#1a3d2e;
width:100%;
box-sizing:border-box;
}

.inputProv:focus{
border-color:#2d9e74;
background:#fff;
}

.inputNum{
max-width:80px;
width:80px;
}

.filaTiempo{
display:flex;
gap:10px;
align-items:center;
}

.selectProv{
padding:10px 12px;
border:2px solid #b6e8d3;
border-radius:10px;
font-size:14px;
background:#f9fffe;
color:#1a3d2e;
cursor:pointer;
outline:none;
}

.errorProv{
color:#e05a00;
font-size:13px;
}

.modalBotones{
display:flex;
gap:10px;
margin-top:6px;
}

.btnGuardar{
flex:1;
padding:11px;
background:linear-gradient(135deg,#2d9e74,#1a6b52);
border:none;
border-radius:10px;
color:white;
font-weight:700;
cursor:pointer;
font-size:14px;
transition:0.2s;
}

.btnGuardar:hover{
opacity:0.9;
}

.btnCancelar{
padding:11px 20px;
background:#f0f0f0;
border:none;
border-radius:10px;
color:#555;
font-weight:600;
cursor:pointer;
font-size:14px;
transition:0.2s;
}

.btnCancelar:hover{
background:#e0e0e0;
}

</style>
