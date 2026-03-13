const STORAGE_KEY = "bosque_helado_tareas"

function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function normalizarTarea(tarea, index = 0) {
  const prioridad = ["baja", "media", "alta"].includes(tarea?.prioridad)
    ? tarea.prioridad
    : "media"
  const id = Number(tarea?.id)

  return {
    id: Number.isFinite(id) && id > 0 ? id : index + 1,
    nombre: String(tarea?.nombre || "").trim(),
    prioridad,
    completada: Boolean(tarea?.completada)
  }
}

function normalizarEstado(estado) {
  const tareas = Array.isArray(estado?.tareas)
    ? estado.tareas
        .map((tarea, index) => normalizarTarea(tarea, index))
        .filter((tarea) => tarea.nombre !== "")
    : []

  const maxId = tareas.reduce((mayor, tarea) => Math.max(mayor, tarea.id), 0)
  const nextId = Number(estado?.nextId)

  return {
    diaActivo: typeof estado?.diaActivo === "boolean" ? estado.diaActivo : true,
    tareas,
    nextId: Number.isFinite(nextId) && nextId > maxId ? nextId : maxId + 1
  }
}

export function listarEstadoTareas() {
  return normalizarEstado(cargarDesdeStorage())
}

export function guardarEstadoTareas(estado) {
  const normalizado = normalizarEstado(estado)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizado))
  return normalizado
}
