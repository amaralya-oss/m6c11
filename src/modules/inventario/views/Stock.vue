<template>

<div class="vistaStock">

  <!-- AE2 REQ 1: Interpolación nombre tienda + encargado -->
  <div class="stockHeader">
    <h2 class="tituloStock">📦 Inventario de <span class="nombreTienda">"Bosque Helado"</span> — Encargado: <span class="nombreEncargado">{{ nombreEncargado }}</span></h2>
  </div>

  <!-- AE2 REQ 2 + 3: Estado tienda v-if/v-else + botón @click -->
  <div class="bloqueEstadoTienda">

    <div class="estadoBadge" :class="tiendaAbierta ? 'badge--abierta' : 'badge--cerrada'">
      <span v-if="tiendaAbierta">🟢 Tienda Operativa — Ingresando Stock</span>
      <span v-else>🔴 Tienda Cerrada — Inventario Bloqueado</span>
    </div>

    <button
      class="btnEstadoTienda"
      :class="tiendaAbierta ? 'btn--cerrar' : 'btn--abrir'"
      @click="toggleTienda"
    >
      {{ tiendaAbierta ? "Cerrar Tienda" : "Abrir Tienda" }}
    </button>

  </div>

  <!-- AE2 REQ 4: Inputs + botón agregar producto (v-model, @click, @submit.prevent) -->
  <form class="formProducto" @submit.prevent="agregarProducto">

    <input
      v-model="nombreProducto"
      class="inputStock"
      placeholder="Nombre del producto..."
      :disabled="!tiendaAbierta"
    />

    <input
      v-model="cantidadStock"
      type="number"
      class="inputStock inputNumero"
      placeholder="Cantidad"
      :disabled="!tiendaAbierta"
    />

    <select v-model="cantidadUnidad" class="selectStock" :disabled="!tiendaAbierta">
      <option disabled value="">Unidad</option>
      <option value="kg">kg</option>
      <option value="L">L</option>
      <option value="u">u</option>
    </select>

    <select v-model="nombreCategoria" class="selectStock" :disabled="!tiendaAbierta">
      <option disabled value="">Categoría</option>
      <option v-for="cat in categoria" :key="cat" :value="cat">{{ cat }}</option>
    </select>

    <button type="submit" class="btnAgregarProd" :disabled="!tiendaAbierta">
      ➕ Agregar
    </button>

  </form>

  <!-- Alérgenos (checkboxes) -->
  <div class="bloqueAlergenos" v-if="tiendaAbierta">
    <span class="labelAlergenos">Alérgenos:</span>
    <label
      v-for="alergeno in alergenos"
      :key="alergeno"
      class="checkAlergeno"
    >
      <input
        type="checkbox"
        :value="alergeno"
        v-model="alergenosSeleccionados"
        @change="manejarAlergeno(alergeno)"
      />
      {{ alergeno }}
    </label>
  </div>

  <p v-if="errorFormulario" class="errorStock">⚠️ {{ errorFormulario }}</p>

  <!-- AE2 REQ 6: v-show inventario vacío -->
  <p v-show="stock.length === 0" class="inventarioVacio">🧺 El inventario está vacío</p>

  <!-- AE2 REQ 5: Tabla con v-for en filaStock -->
  <TablaStock
    v-show="stock.length > 0"
    :productos="stock"
    @editar="editarProducto"
    @eliminar="eliminarProducto"
  />

  <!-- Modal edición -->
  <div v-if="mostrarModal" class="modalOverlay" @click.self="cerrarModal">

    <div class="modal">

      <h3 class="tituloModal">✏️ Editar producto</h3>

      <label class="labelModal">Nombre</label>
      <input v-model="nombreProducto" class="inputStock" placeholder="Nombre producto" />

      <label class="labelModal">Cantidad en stock</label>
      <input type="number" v-model="cantidadStock" class="inputStock inputNumero" placeholder="Cantidad" />

      <label class="labelModal">Unidad</label>
      <select v-model="cantidadUnidad" class="selectStock">
        <option disabled value="">Selecciona unidad</option>
        <option value="kg">kg</option>
        <option value="L">L</option>
        <option value="u">u</option>
      </select>

      <label class="labelModal">Categoría</label>
      <select v-model="nombreCategoria" class="selectStock">
        <option disabled value="">Categoría</option>
        <option v-for="cat in categoria" :key="cat" :value="cat">{{ cat }}</option>
      </select>

      <label class="labelModal">Alérgenos</label>
      <div class="bloqueAlergenos">
        <label v-for="alergeno in alergenos" :key="alergeno" class="checkAlergeno">
          <input
            type="checkbox"
            :value="alergeno"
            v-model="alergenosSeleccionados"
            @change="manejarAlergeno(alergeno)"
          />
          {{ alergeno }}
        </label>
      </div>

      <p v-if="errorFormulario" class="errorStock">{{ errorFormulario }}</p>

      <div class="modalBotones">
        <button class="btnGuardar" @click="agregarProducto">💾 Guardar</button>
        <button class="btnCancelar" @click="cerrarModal">Cancelar</button>
      </div>

    </div>

  </div>

</div>

</template>

<script>

import TablaStock from "../components/stock/tablaStock.vue"
import { productos } from "@/modules/inventario/data/productos.js"
import { alergenos } from "@/modules/inventario/data/alergenos.js"
import { categoria } from "@/modules/inventario/data/categoria.js"

export default{

components:{
TablaStock
},

// ── DATOS ────────────────────────────────────────────
data(){
return{
nombreEncargado: "Valentina Torres",
tiendaAbierta: true,            // AE2 REQ 2: booleano tienda

stock: [...productos],          // copia reactiva de productos
alergenos,                      // lista de alérgenos importada
categoria,                      // lista de categorías importada

nombreProducto: "",
cantidadStock: "",
cantidadUnidad: "",
nombreCategoria: "",
alergenosSeleccionados: [],
errorFormulario: "",
mostrarModal: false,
productoAEditar: null
}
},

// ── MÉTODOS ──────────────────────────────────────────
methods:{

toggleTienda(){
this.tiendaAbierta = !this.tiendaAbierta
},

agregarProducto(){
if(
  this.nombreProducto === "" ||
  this.nombreCategoria === "" ||
  this.cantidadStock === "" ||
  this.cantidadUnidad === "" ||
  this.alergenosSeleccionados.length === 0
){
  this.errorFormulario = "Todos los campos son obligatorios"
  return
}

if(this.productoAEditar){
  this.productoAEditar.nombre = this.nombreProducto
  this.productoAEditar.categoria = this.nombreCategoria
  this.productoAEditar.alergenos = [...this.alergenosSeleccionados]
  this.productoAEditar.stock = Number(this.cantidadStock)
  this.productoAEditar.unidad = this.cantidadUnidad
} else {
  this.stock.push({
    nombre: this.nombreProducto,
    categoria: this.nombreCategoria,
    alergenos: [...this.alergenosSeleccionados],
    stock: Number(this.cantidadStock),
    unidad: this.cantidadUnidad
  })
}

this.limpiarFormulario()
},

manejarAlergeno(alergeno){
if(alergeno === "no aplica"){
  this.alergenosSeleccionados = ["no aplica"]
  return
}
this.alergenosSeleccionados = this.alergenosSeleccionados.filter(a => a !== "no aplica")
},

editarProducto(producto){
this.productoAEditar = producto
this.nombreProducto = producto.nombre
this.nombreCategoria = producto.categoria
this.alergenosSeleccionados = [...producto.alergenos]
this.cantidadStock = producto.stock
this.cantidadUnidad = producto.unidad
this.mostrarModal = true
},

eliminarProducto(producto){
this.stock = this.stock.filter(p => p !== producto)
},

cerrarModal(){
this.limpiarFormulario()
this.mostrarModal = false
},

limpiarFormulario(){
this.productoAEditar = null
this.nombreProducto = ""
this.nombreCategoria = ""
this.alergenosSeleccionados = []
this.cantidadStock = ""
this.cantidadUnidad = ""
this.errorFormulario = ""
this.mostrarModal = false
}

}

}

</script>

<style scoped>

/* ── LAYOUT ── */
.vistaStock{
padding:28px 32px;
}

/* ── HEADER STOCK ── */
.stockHeader{
margin-bottom:20px;
}

.tituloStock{
font-size:18px;
font-weight:600;
color:#1a3d2e;
margin:0;
}

.nombreTienda{
color:#2d9e74;
font-weight:700;
}

.nombreEncargado{
color:#e05a00;
font-weight:700;
}

/* ── ESTADO TIENDA ── */
.bloqueEstadoTienda{
display:flex;
align-items:center;
gap:14px;
margin-bottom:22px;
flex-wrap:wrap;
}

.estadoBadge{
padding:10px 20px;
border-radius:50px;
font-weight:600;
font-size:14px;
}

.badge--abierta{
background:#d4f5e5;
color:#1a6b52;
border:2px solid #2d9e74;
}

.badge--cerrada{
background:#ffe0cc;
color:#c04000;
border:2px solid #f5a623;
}

.btnEstadoTienda{
padding:10px 22px;
border:none;
border-radius:50px;
font-weight:700;
font-size:14px;
cursor:pointer;
transition:0.2s;
}

.btn--cerrar{
background:#ff6b6b;
color:white;
}

.btn--cerrar:hover{
background:#e85555;
}

.btn--abrir{
background:#2d9e74;
color:white;
}

.btn--abrir:hover{
background:#1a6b52;
}

/* ── FORMULARIO ── */
.formProducto{
display:flex;
gap:10px;
margin-bottom:12px;
flex-wrap:wrap;
align-items:center;
}

.inputStock{
padding:10px 14px;
border:2px solid #b6e8d3;
border-radius:10px;
font-size:14px;
outline:none;
transition:0.2s;
background:#f9fffe;
color:#1a3d2e;
flex:1;
min-width:140px;
}

.inputStock:focus{
border-color:#2d9e74;
background:#fff;
}

.inputStock:disabled{
background:#f0f0f0;
color:#bbb;
cursor:not-allowed;
}

.inputNumero{
max-width:110px;
flex:none;
}

.selectStock{
padding:10px 12px;
border:2px solid #b6e8d3;
border-radius:10px;
font-size:14px;
background:#f9fffe;
color:#1a3d2e;
cursor:pointer;
outline:none;
}

.selectStock:disabled{
background:#f0f0f0;
color:#bbb;
cursor:not-allowed;
}

.btnAgregarProd{
padding:10px 20px;
background:linear-gradient(135deg,#FFD166,#f5a623);
border:none;
border-radius:10px;
font-weight:700;
font-size:14px;
cursor:pointer;
color:#1a3d2e;
transition:0.2s;
white-space:nowrap;
}

.btnAgregarProd:hover:not(:disabled){
transform:translateY(-1px);
box-shadow:0 4px 12px rgba(245,166,35,0.4);
}

.btnAgregarProd:disabled{
opacity:0.45;
cursor:not-allowed;
}

/* ── ALÉRGENOS ── */
.bloqueAlergenos{
display:flex;
flex-wrap:wrap;
gap:10px;
margin-bottom:14px;
align-items:center;
}

.labelAlergenos{
font-weight:600;
color:#1a6b52;
font-size:13px;
}

.checkAlergeno{
display:flex;
align-items:center;
gap:4px;
font-size:13px;
color:#444;
cursor:pointer;
}

/* ── MENSAJES ── */
.errorStock{
color:#e05a00;
font-size:13px;
margin:4px 0 12px;
}

.inventarioVacio{
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
max-width:480px;
box-shadow:0 8px 40px rgba(0,0,0,0.2);
display:flex;
flex-direction:column;
gap:10px;
max-height:90vh;
overflow-y:auto;
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

.modalBotones{
display:flex;
gap:10px;
margin-top:8px;
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
