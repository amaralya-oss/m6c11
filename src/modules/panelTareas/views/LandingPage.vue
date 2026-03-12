<template>
<div class="landingSite">

  <header class="topNav">
    <nav class="navWrap">
      <a href="#inicio" class="brand" @click="menuAbierto = false">
        <span class="brandMark">🍃</span>
        <span class="brandText">Bosque Helado</span>
      </a>

      <button class="menuBtn" @click="menuAbierto = !menuAbierto">☰</button>

      <ul class="navLinks" :class="{ navOpen: menuAbierto }">
        <li v-for="item in menuItems" :key="item.id">
          <a :href="'#' + item.id" @click="menuAbierto = false">{{ item.label }}</a>
        </li>
        <li class="navCtaItem">
          <button class="btnNavCta" @click="$emit('entrar', 'panel')">Entrar al Dashboard</button>
        </li>
      </ul>
    </nav>
  </header>

  <main class="landingMain">

    <section id="inicio" class="heroSection">
      <div class="heroInfo">
        <p class="eyebrow">Heladería artesanal inclusiva</p>
        <h1 class="heroTitle">Helados veganos y sin gluten para todos en Temuco</h1>
        <p class="heroText">
          Creamos sabores honestos, hechos con ingredientes reales y control de alérgenos.
          Nuestra promesa: disfrutar sin dejar a nadie fuera.
        </p>

        <div class="heroActions">
          <a href="#sabores" class="btnPrimary">Ver Sabores</a>
          <a href="#contacto" class="btnGhost">Reservar Degustación</a>
          <button class="btnSoft" @click="$emit('entrar', 'stock')">Entrar a Inventario</button>
        </div>

        <div class="heroMetrics">
          <article class="metricCard" v-for="kpi in heroKpis" :key="kpi.label">
            <p class="metricValue">{{ kpi.value }}</p>
            <p class="metricLabel">{{ kpi.label }}</p>
          </article>
        </div>
      </div>

      <div class="heroVisual">
        <img
          src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1400&q=80"
          alt="Helados artesanales en conos"
        />
      </div>
    </section>

    <section id="historia" class="contentSection">
      <div class="sectionTop">
        <p class="sectionEyebrow">Quiénes somos</p>
        <h2 class="sectionTitle">Una heladería con otra mirada</h2>
      </div>

      <div class="storyGrid">
        <article class="storyCard" v-for="bloque in historia" :key="bloque.titulo">
          <h3>{{ bloque.titulo }}</h3>
          <p>{{ bloque.texto }}</p>
        </article>
      </div>
    </section>

    <section id="servicios" class="contentSection altSection">
      <div class="sectionTop">
        <p class="sectionEyebrow">Servicios</p>
        <h2 class="sectionTitle">Lo que hacemos por tu negocio o evento</h2>
      </div>

      <div class="serviceGrid">
        <article class="serviceCard" v-for="servicio in servicios" :key="servicio.titulo">
          <p class="serviceIcon">{{ servicio.icono }}</p>
          <h3>{{ servicio.titulo }}</h3>
          <p>{{ servicio.texto }}</p>
        </article>
      </div>
    </section>

    <section id="sabores" class="contentSection">
      <div class="sectionTop">
        <p class="sectionEyebrow">Galería de sabores</p>
        <h2 class="sectionTitle">Sabores reales + nuevas propuestas</h2>
      </div>

      <div class="flavorGrid">
        <article class="flavorCard" v-for="sabor in sabores" :key="sabor.nombre">
          <img :src="sabor.imagen" :alt="'Helado sabor ' + sabor.nombre" />
          <div class="flavorBody">
            <p class="flavorTag">{{ sabor.tipo }}</p>
            <h3>{{ sabor.nombre }}</h3>
            <p>{{ sabor.descripcion }}</p>
          </div>
        </article>
      </div>
    </section>

    <section id="proveedores" class="contentSection altSection">
      <div class="sectionTop">
        <p class="sectionEyebrow">Red de confianza</p>
        <h2 class="sectionTitle">Proveedores locales y trazables</h2>
      </div>

      <div class="providerGrid">
        <article class="providerCard" v-for="proveedor in proveedoresDestacados" :key="proveedor.nombre">
          <h3>{{ proveedor.nombre }}</h3>
          <p><strong>Entrega:</strong> {{ proveedor.tiempoEntrega }}</p>
          <p><strong>Dirección:</strong> {{ proveedor.direccion }}</p>
          <p class="providerNote">Abastecimiento pensado para operación diaria y cadena de frío.</p>
        </article>
      </div>
    </section>

    <section id="testimonios" class="contentSection">
      <div class="sectionTop">
        <p class="sectionEyebrow">Experiencias reales</p>
        <h2 class="sectionTitle">Lo que cuenta nuestra comunidad</h2>
      </div>

      <div class="testimonialGrid">
        <article class="testimonialCard" v-for="testimonio in testimonios" :key="testimonio.autor">
          <p class="testimonialText">“{{ testimonio.texto }}”</p>
          <p class="testimonialAuthor">{{ testimonio.autor }}</p>
        </article>
      </div>
    </section>

    <section id="contacto" class="contentSection altSection">
      <div class="sectionTop">
        <p class="sectionEyebrow">Contacto</p>
        <h2 class="sectionTitle">Hablemos de tu pedido o evento</h2>
      </div>

      <div class="contactGrid">
        <form class="contactForm" @submit.prevent="enviarMensaje">
          <label>Nombre</label>
          <input v-model="form.nombre" type="text" placeholder="Tu nombre" />

          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="correo@ejemplo.com" />

          <label>Mensaje</label>
          <textarea v-model="form.mensaje" rows="4" placeholder="Cuéntanos qué necesitas"></textarea>

          <button type="submit" class="btnPrimary">Enviar mensaje</button>
          <p v-if="estadoMensaje" class="estadoMensaje">{{ estadoMensaje }}</p>
        </form>

        <div class="contactMapCard">
          <h3>Visítanos en Temuco</h3>
          <p>Condell 485, esquina O'Higgins, a pasos de Plaza Aníbal Pinto y del Mercado Municipal.</p>
          <iframe
            title="Mapa Bosque Helado en Temuco"
            loading="lazy"
            :src="mapaTemuco"
          ></iframe>
        </div>
      </div>
    </section>
  </main>

  <footer class="siteFooter">
    <p>© {{ anioActual }} Bosque Helado · Heladería vegana y sin gluten</p>
    <button class="btnFooter" @click="$emit('entrar', 'panel')">Abrir Panel Interno</button>
  </footer>

</div>
</template>

<script>

import { productos } from "@/modules/inventario/data/productos.js"
import { proveedores } from "@/modules/inventario/data/proveedores.js"

const imagenesSabores = {
  Frambuesa: "https://images.unsplash.com/photo-1561845730-208ad5910553?auto=format&fit=crop&w=1200&q=80",
  "Leche de coco": "https://images.unsplash.com/photo-1633933358116-a27b902fad35?auto=format&fit=crop&w=1200&q=80",
  "Cacao amargo": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=1200&q=80",
  "Leche Entera": "https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=1200&q=80"
}

export default{

emits:["entrar"],

data(){
return{
menuAbierto: false,
menuItems:[
  { id:"inicio", label:"Inicio" },
  { id:"historia", label:"Historia" },
  { id:"servicios", label:"Servicios" },
  { id:"sabores", label:"Sabores" },
  { id:"proveedores", label:"Proveedores" },
  { id:"testimonios", label:"Testimonios" },
  { id:"contacto", label:"Contacto" }
],
heroKpis:[
  { value:"100%", label:"Opciones sin lactosa" },
  { value:"8+", label:"Sabores de temporada" },
  { value:"24h", label:"Respuesta a cotizaciones" }
],
historia:[
  {
    titulo: "Nacimos para incluir",
    texto: "Partimos como un pequeño taller en Temuco para crear helados que pudiera disfrutar gente vegana, celíaca y con sensibilidad alimentaria."
  },
  {
    titulo: "Ingredientes con propósito",
    texto: "Trabajamos con frutas y bases vegetales, cuidando la trazabilidad y separando procesos para minimizar contaminación cruzada."
  },
  {
    titulo: "Comunidad local",
    texto: "Conectamos con proveedores de la zona y con clientes que buscan sabor real, atención honesta y opciones seguras."
  }
],
servicios:[
  {
    icono:"🍨",
    titulo:"Barra de helados para eventos",
    texto:"Montamos estaciones para matrimonios, ferias y cumpleaños con opciones veganas y sin gluten."
  },
  {
    icono:"🛵",
    titulo:"Despacho en cadena de frío",
    texto:"Entrega programada para cafeterías, restaurantes y tiendas asociadas."
  },
  {
    icono:"🧪",
    titulo:"Diseño de sabores a medida",
    texto:"Desarrollamos recetas según perfil de cliente: alto contenido frutal, keto o sin azúcar añadida."
  }
],
saboresEspeciales:[
  {
    nombre:"Maracuyá Menta",
    tipo:"Nuevo · vegano",
    descripcion:"Refrescante y cítrico, ideal para tardes de calor.",
    imagen:"https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    nombre:"Avellana Cacao",
    tipo:"Nuevo · sin gluten",
    descripcion:"Perfil intenso, cremosidad alta y notas tostadas.",
    imagen:"https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    nombre:"Vainilla Patagónica",
    tipo:"Especial de la casa",
    descripcion:"Suave, aromática y muy versátil para postres.",
    imagen:"https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=80"
  }
],
testimonios:[
  {
    texto:"Por fin una heladería donde mi hija celíaca puede elegir sin miedo. Además, el sabor es increíble.",
    autor:"Camila R. · Temuco"
  },
  {
    texto:"Pedimos para un evento corporativo y llegaron puntuales, todo bien rotulado y con excelente atención.",
    autor:"Felipe M. · Producción de eventos"
  },
  {
    texto:"El helado de frambuesa es brutal. Se nota que usan fruta real y no solo saborizante.",
    autor:"Javiera P. · Cliente frecuente"
  }
],
form:{
  nombre:"",
  email:"",
  mensaje:""
},
estadoMensaje:"",
mapaTemuco:"https://www.openstreetmap.org/export/embed.html?bbox=-72.6086%2C-38.7447%2C-72.5946%2C-38.7361&layer=mapnik&marker=-38.7404%2C-72.6009"
}
},

computed:{
saboresBase(){
  return productos.map(producto => ({
    nombre: producto.nombre,
    tipo: "Base real del inventario",
    descripcion: "Ingrediente activo del catálogo actual de la tienda.",
    imagen: imagenesSabores[producto.nombre] || "https://images.unsplash.com/photo-1514849302-984523450cf4?auto=format&fit=crop&w=1200&q=80"
  }))
},

sabores(){
  return [...this.saboresBase, ...this.saboresEspeciales]
},

proveedoresDestacados(){
  return proveedores.map(proveedor => ({
    nombre: proveedor.nombre,
    tiempoEntrega: proveedor.tiempo + " " + proveedor.unidad,
    direccion: proveedor.direccion
  }))
},

anioActual(){
  return new Date().getFullYear()
}
},

methods:{
enviarMensaje(){
  if(
    this.form.nombre.trim() === "" ||
    this.form.email.trim() === "" ||
    this.form.mensaje.trim() === ""
  ){
    this.estadoMensaje = "Completa nombre, email y mensaje para continuar."
    return
  }

  this.estadoMensaje = "Mensaje enviado. Te responderemos dentro de 24 horas."
  this.form = { nombre:"", email:"", mensaje:"" }
}
}

}

</script>

<style scoped>

@import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;600;700;800&display=swap");

.landingSite{
--bg-soft:#f4fdf8;
--bg-alt:#edf8f2;
--green-900:#123528;
--green-700:#1a6b52;
--green-500:#2d9e74;
--mint:#d4f5e5;
--amber:#ffd166;
--amber-soft:#fff3d0;
background:var(--bg-soft);
color:var(--green-900);
font-family:"Outfit", "Trebuchet MS", sans-serif;
scroll-behavior:smooth;
}

.topNav{
position:sticky;
top:0;
z-index:50;
backdrop-filter:blur(10px);
background:rgba(244,253,248,0.88);
border-bottom:1px solid rgba(26,107,82,0.1);
}

.navWrap{
max-width:1200px;
margin:0 auto;
padding:10px 24px;
display:flex;
align-items:center;
justify-content:space-between;
gap:10px;
}

.brand{
display:inline-flex;
align-items:center;
gap:8px;
text-decoration:none;
}

.brandMark{
font-size:22px;
}

.brandText{
font-size:16px;
font-weight:800;
letter-spacing:0.3px;
color:var(--green-900);
}

.menuBtn{
display:none;
border:none;
background:transparent;
font-size:24px;
cursor:pointer;
color:var(--green-700);
}

.navLinks{
display:flex;
align-items:center;
list-style:none;
gap:16px;
padding:0;
margin:0;
}

.navLinks a{
text-decoration:none;
font-size:13px;
font-weight:600;
color:#255242;
}

.navLinks a:hover{
color:var(--green-500);
}

.btnNavCta{
border:none;
background:linear-gradient(135deg,var(--green-500),var(--green-700));
color:white;
padding:9px 14px;
border-radius:10px;
font-weight:700;
font-size:12px;
cursor:pointer;
}

.landingMain{
max-width:1200px;
margin:0 auto;
padding:10px 24px 38px;
}

.heroSection{
min-height:88vh;
display:grid;
grid-template-columns:1.1fr 0.9fr;
gap:24px;
align-items:center;
padding:24px 0 30px;
}

.heroInfo{
display:flex;
flex-direction:column;
gap:16px;
}

.eyebrow{
margin:0;
font-size:13px;
font-weight:700;
letter-spacing:1px;
text-transform:uppercase;
color:var(--green-500);
}

.heroTitle{
margin:0;
font-family:"DM Serif Display", Georgia, serif;
font-size:56px;
line-height:1;
color:var(--green-900);
}

.heroText{
margin:0;
font-size:17px;
line-height:1.5;
max-width:58ch;
color:#2f5446;
}

.heroActions{
display:flex;
flex-wrap:wrap;
gap:10px;
}

.btnPrimary,
.btnGhost,
.btnSoft{
display:inline-flex;
align-items:center;
justify-content:center;
text-decoration:none;
padding:11px 18px;
border-radius:10px;
font-size:14px;
font-weight:700;
cursor:pointer;
transition:0.2s ease;
}

.btnPrimary{
border:none;
background:linear-gradient(135deg,var(--green-500),var(--green-700));
color:white;
}

.btnPrimary:hover{
transform:translateY(-1px);
box-shadow:0 8px 20px rgba(26,107,82,0.25);
}

.btnGhost{
border:1px solid rgba(26,107,82,0.3);
color:var(--green-700);
background:white;
}

.btnGhost:hover{
background:var(--mint);
}

.btnSoft{
border:1px solid #ffe3a1;
color:#8f5a00;
background:var(--amber-soft);
}

.btnSoft:hover{
background:#ffeab3;
}

.heroMetrics{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(110px,1fr));
gap:10px;
max-width:520px;
}

.metricCard{
background:white;
padding:12px;
border:1px solid rgba(26,107,82,0.12);
border-radius:12px;
box-shadow:0 8px 20px rgba(18,53,40,0.05);
}

.metricValue{
margin:0;
font-size:22px;
font-weight:800;
color:var(--green-700);
}

.metricLabel{
margin:2px 0 0;
font-size:12px;
color:#5a766b;
}

.heroVisual{
position:relative;
}

.heroVisual img{
width:100%;
height:620px;
object-fit:cover;
border-radius:26px;
box-shadow:0 18px 55px rgba(18,53,40,0.22);
}

.contentSection{
padding:65px 0;
}

.altSection{
background:var(--bg-alt);
margin-left:-24px;
margin-right:-24px;
padding-left:24px;
padding-right:24px;
border-top:1px solid rgba(26,107,82,0.08);
border-bottom:1px solid rgba(26,107,82,0.08);
}

.sectionTop{
display:flex;
flex-direction:column;
gap:7px;
margin-bottom:20px;
}

.sectionEyebrow{
margin:0;
font-size:12px;
font-weight:700;
text-transform:uppercase;
letter-spacing:1px;
color:var(--green-500);
}

.sectionTitle{
margin:0;
font-family:"DM Serif Display", Georgia, serif;
font-size:38px;
line-height:1.05;
color:var(--green-900);
}

.storyGrid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:12px;
}

.storyCard{
background:white;
border:1px solid rgba(26,107,82,0.15);
border-radius:14px;
padding:18px;
}

.storyCard h3{
margin:0 0 8px;
font-size:18px;
color:var(--green-700);
}

.storyCard p{
margin:0;
line-height:1.45;
color:#315548;
}

.serviceGrid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(210px,1fr));
gap:12px;
}

.serviceCard{
background:white;
border-radius:14px;
padding:18px;
border:1px solid rgba(26,107,82,0.12);
}

.serviceIcon{
margin:0 0 8px;
font-size:25px;
}

.serviceCard h3{
margin:0 0 6px;
font-size:18px;
color:var(--green-900);
}

.serviceCard p{
margin:0;
font-size:14px;
line-height:1.45;
color:#36594b;
}

.flavorGrid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:12px;
}

.flavorCard{
overflow:hidden;
border-radius:14px;
background:white;
border:1px solid rgba(26,107,82,0.12);
box-shadow:0 8px 24px rgba(18,53,40,0.06);
}

.flavorCard img{
width:100%;
height:180px;
object-fit:cover;
display:block;
}

.flavorBody{
padding:14px;
display:flex;
flex-direction:column;
gap:6px;
}

.flavorTag{
margin:0;
font-size:11px;
font-weight:700;
text-transform:uppercase;
letter-spacing:0.8px;
color:#8f5a00;
}

.flavorBody h3{
margin:0;
font-size:19px;
color:var(--green-900);
}

.flavorBody p{
margin:0;
font-size:14px;
color:#36594b;
line-height:1.4;
}

.providerGrid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(230px,1fr));
gap:12px;
}

.providerCard{
background:white;
border-radius:14px;
padding:18px;
border:1px solid rgba(26,107,82,0.12);
}

.providerCard h3{
margin:0 0 8px;
color:var(--green-700);
}

.providerCard p{
margin:0 0 4px;
font-size:14px;
color:#36594b;
}

.providerNote{
margin-top:10px;
padding-top:10px;
border-top:1px dashed rgba(26,107,82,0.2);
font-size:13px;
}

.testimonialGrid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(230px,1fr));
gap:12px;
}

.testimonialCard{
background:linear-gradient(150deg,#ffffff,#f8fffb);
border-radius:14px;
padding:18px;
border:1px solid rgba(26,107,82,0.12);
}

.testimonialText{
margin:0 0 12px;
line-height:1.45;
color:#294f40;
}

.testimonialAuthor{
margin:0;
font-size:13px;
font-weight:700;
color:var(--green-700);
}

.contactGrid{
display:grid;
grid-template-columns:1fr 1fr;
gap:14px;
}

.contactForm,
.contactMapCard{
background:white;
border:1px solid rgba(26,107,82,0.12);
border-radius:14px;
padding:18px;
display:flex;
flex-direction:column;
gap:8px;
}

.contactForm label{
font-size:13px;
font-weight:700;
color:#2a5646;
}

.contactForm input,
.contactForm textarea{
width:100%;
border:1px solid rgba(26,107,82,0.22);
border-radius:10px;
padding:10px 12px;
font-size:14px;
font-family:"Outfit", "Trebuchet MS", sans-serif;
outline:none;
background:#fcfffd;
}

.contactForm input:focus,
.contactForm textarea:focus{
border-color:var(--green-500);
}

.estadoMensaje{
margin:4px 0 0;
font-size:13px;
font-weight:600;
color:#2a5646;
}

.contactMapCard h3{
margin:0;
font-size:20px;
color:var(--green-900);
}

.contactMapCard p{
margin:0;
font-size:14px;
line-height:1.4;
color:#335c4d;
}

.contactMapCard iframe{
width:100%;
height:280px;
border:0;
border-radius:12px;
margin-top:4px;
}

.siteFooter{
display:flex;
justify-content:space-between;
align-items:center;
gap:10px;
padding:20px 24px 26px;
max-width:1200px;
margin:0 auto;
border-top:1px solid rgba(26,107,82,0.12);
}

.siteFooter p{
margin:0;
font-size:13px;
color:#507568;
}

.btnFooter{
border:none;
background:var(--amber-soft);
color:#8f5a00;
padding:10px 14px;
border-radius:10px;
font-size:13px;
font-weight:700;
cursor:pointer;
}

@media (max-width: 980px){
  .heroSection{
    grid-template-columns:1fr;
    min-height:auto;
    padding-top:18px;
  }

  .heroVisual img{
    height:380px;
  }

  .contactGrid{
    grid-template-columns:1fr;
  }
}

@media (max-width: 760px){
  .menuBtn{
    display:block;
  }

  .navLinks{
    position:absolute;
    top:62px;
    left:0;
    right:0;
    display:none;
    flex-direction:column;
    align-items:flex-start;
    gap:12px;
    background:#f8fffb;
    border-bottom:1px solid rgba(26,107,82,0.15);
    padding:14px 24px;
  }

  .navLinks.navOpen{
    display:flex;
  }

  .navCtaItem{
    width:100%;
  }

  .btnNavCta{
    width:100%;
  }

  .heroTitle{
    font-size:40px;
  }

  .sectionTitle{
    font-size:31px;
  }

  .siteFooter{
    flex-direction:column;
    align-items:flex-start;
  }
}

</style>
