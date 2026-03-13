import { productos } from "../data/productos.js"
import { proveedores as proveedoresBase } from "../data/proveedores.js"

const STORAGE_KEY_STOCK = "bosque_helado_stock"
const STORAGE_KEY_PROVEEDORES = "bosque_helado_proveedores"

function clonarLista(lista) {
  return JSON.parse(JSON.stringify(lista))
}

function cargarLista(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function guardarLista(key, lista) {
  localStorage.setItem(key, JSON.stringify(lista))
  return lista
}

function normalizarProducto(producto) {
  const stock = Number(producto?.stock)
  const alergenos = Array.isArray(producto?.alergenos)
    ? producto.alergenos.map((item) => String(item).trim()).filter(Boolean)
    : []

  return {
    nombre: String(producto?.nombre || "").trim(),
    stock: Number.isFinite(stock) ? stock : 0,
    unidad: String(producto?.unidad || "u").trim() || "u",
    categoria: String(producto?.categoria || "").trim(),
    alergenos: alergenos.length > 0 ? alergenos : ["no aplica"],
    cloudinary_url: String(producto?.cloudinary_url || ""),
    thumbnail_url: String(producto?.thumbnail_url || "")
  }
}

function normalizarProveedor(proveedor) {
  const tiempo = Number(proveedor?.tiempo)

  return {
    nombre: String(proveedor?.nombre || "").trim(),
    telefono: String(proveedor?.telefono || "").trim(),
    tiempo: Number.isFinite(tiempo) ? tiempo : 0,
    unidad: String(proveedor?.unidad || "dias").trim() || "dias",
    direccion: String(proveedor?.direccion || "").trim(),
    productos: String(proveedor?.productos || "").trim(),
    cloudinary_url: String(proveedor?.cloudinary_url || ""),
    thumbnail_url: String(proveedor?.thumbnail_url || "")
  }
}

function obtenerListaNormalizada(key, fallback, normalizador) {
  const guardada = cargarLista(key)
  const base = Array.isArray(guardada) ? guardada : clonarLista(fallback)
  const normalizada = base.map((item) => normalizador(item)).filter((item) => item.nombre !== "")

  if (!Array.isArray(guardada)) {
    guardarLista(key, normalizada)
  }

  return normalizada
}

export function listarStock() {
  return obtenerListaNormalizada(STORAGE_KEY_STOCK, productos, normalizarProducto)
}

export function guardarStock(lista) {
  const normalizada = Array.isArray(lista)
    ? lista.map((item) => normalizarProducto(item)).filter((item) => item.nombre !== "")
    : []

  return guardarLista(STORAGE_KEY_STOCK, normalizada)
}

export function listarProveedores() {
  return obtenerListaNormalizada(STORAGE_KEY_PROVEEDORES, proveedoresBase, normalizarProveedor)
}

export function guardarProveedores(lista) {
  const normalizada = Array.isArray(lista)
    ? lista.map((item) => normalizarProveedor(item)).filter((item) => item.nombre !== "")
    : []

  return guardarLista(STORAGE_KEY_PROVEEDORES, normalizada)
}
