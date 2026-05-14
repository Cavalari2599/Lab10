# Lab10
Laboratorio 10
# LAB10 – Web Components UCR 🎓

Laboratorio de Web Components nativos usando **Shadow DOM**, **Slots**, **CSS Custom Properties** y **CSS Parts**, 

---



## 🚀 Instalación y uso

```bash
# Instalar dependencias
pnpm install   # o npm install
pnpm add servor
# Servidor de desarrollo
npx servor src index.html 3000
```

---

## 🧩 Componentes

### `<ucr-poster>`

Póster animado "La Sede Te Acompaña".

**Uso básico:**
```html
<ucr-poster>
  <span slot="titulo-linea1">LA SEDE</span>
  <span slot="titulo-linea2">TE ACOMPAÑA</span>
  <div slot="subtitulo">
    <p>El respeto no se negocia</p>
    <p>¡Pará ya de acosar!</p>
  </div>
  <p slot="qr-texto">Escaneá este QR:</p>
  <img slot="qr" src="qr.png" alt="QR">
  <img slot="foto" src="poster.png" alt="Foto">
  <div slot="footer-izq">UCR</div>
  <div slot="footer-centro">Libre de Acoso</div>
  <div slot="footer-der">Sede Guanacaste</div>
</ucr-poster>
```

---

### `<ucr-senal>` + `<ucr-senal-item>`

Señal de dirección del edificio.

**Uso básico:**
```html
<ucr-senal title-text="Edificio A">
  <ucr-senal-item>Aulas 1, 2, 3</ucr-senal-item>
  <ucr-senal-item>Laboratorio</ucr-senal-item>
  <ucr-senal-item>Coordinación</ucr-senal-item>
</ucr-senal>
```

---

## 🎨 Personalización

### Cambiar colores con CSS Custom Properties

Las variables CSS **atraviesan el Shadow DOM**, por lo que puedes sobreescribirlas desde fuera.

#### Colores globales (afectan todos los componentes)
Declara estas variables en `:root` o en cualquier ancestro:

```css
:root {
  --color-ucr-azul:   #2196c4;   /* Azul UCR */
  --color-ucr-morado: #6b2fa0;   /* Morado UCR */
  --color-ucr-dorado: #c9a227;   /* Dorado/fondo del póster */
}
```

#### Colores del póster (`<ucr-poster>`)

```css
/* En el elemento o en su contenedor */
ucr-poster {
  --poster-fondo:   #1c3872;   /* Fondo del cartel (azul oscuro) */
  --poster-azul:    #00bcd4;   /* Color del badge TE y exclamaciones */
  --poster-morado:  #9c27b0;   /* Color del badge LA SEDE */
}
```

#### Colores de la señal (`<ucr-senal>`)

```css
ucr-senal {
  --senal-fondo:        #0d2340;   /* Fondo de la señal */
  --senal-color-item:   #fff3cd;   /* Color del texto de los ítems */
  --senal-color-flecha: #f0b429;   /* Color de las flechas → */
  --senal-footer-color: #0d2340;   /* Color del bloque UCR inferior */
  --senal-radio:        8px;       /* Redondez de bordes */
  --senal-ancho:        400px;     /* Ancho del componente */
  --senal-item-size:    18px;      /* Tamaño de fuente de los ítems */
  --senal-peso:         400;       /* font-weight de los ítems */
}
```

**Ejemplo – señal con tema oscuro dorado:**
```html
<ucr-senal
  title-text="Edificio Central"
  style="
    --senal-fondo: #0d2340;
    --senal-color-item: #fff3cd;
    --senal-color-flecha: #f0b429;
    --senal-footer-color: #0d2340;
  ">
  <ucr-senal-item>Rectoría</ucr-senal-item>
  <ucr-senal-item>Archivo</ucr-senal-item>
</ucr-senal>
```

---

## 🔩 CSS Parts – Estilo desde fuera del Shadow DOM

Los `part=""` permiten a los desarrolladores dar estilo a partes internas desde CSS externo.

### Parts de `<ucr-poster>`

| Part | Descripción |
|------|-------------|
| `poster` | Caja principal del cartel |
| `titulo-wrap` | Zona del título con exclamaciones |
| `badge-linea1` | Badge morado (ej. "LA SEDE") |
| `badge-linea2` | Badge azul (ej. "TE") |
| `subtitulo` | Bloque de subtítulo |
| `qr-wrap` | Bloque QR |
| `imagen-wrap` | Contenedor de la foto |
| `footer` | Barra blanca inferior |

```css
/* Cambiar el borde del cartel */
ucr-poster::part(poster) {
  border: 4px solid #1c3872;
  border-radius: 16px;
}

/* Cambiar tipografía del badge */
ucr-poster::part(badge-linea1) {
  font-size: 32px;
  letter-spacing: 3px;
}

/* Dar fondo diferente al footer */
ucr-poster::part(footer) {
  background: #f5f5f5;
  border-top: 2px solid #e0e0e0;
}
```

### Parts de `<ucr-senal>`

| Part | Descripción |
|------|-------------|
| `contenedor` | Caja principal de la señal |
| `footer-wrap` | Zona de ola SVG + footer |
| `footer` | Barra UCR inferior |

```css
ucr-senal::part(contenedor) {
  border: 2px solid rgba(255,255,255,0.2);
}

ucr-senal::part(footer) {
  font-size: 32px;
}
```

### Parts de `<ucr-senal-item>`

| Part | Descripción |
|------|-------------|
| `texto` | Contenedor del texto del ítem |
| `flecha` | Ícono SVG de la flecha `→` |

```css
ucr-senal-item::part(flecha) {
  stroke: gold;
  width: 28px;
}

ucr-senal-item::part(texto) {
  font-size: 20px;
}
```

---

## 📦 Slots disponibles

### `<ucr-poster>` – Slots nombrados

| Slot | Qué va ahí | Fallback |
|------|-----------|---------|
| `titulo-linea1` | Badge superior (ej. "LA SEDE") | `"LA SEDE"` |
| `titulo-linea2` | Badge inferior (ej. "TE") | `"TE"` |
| `subtitulo` | Bloque `<div>` con párrafos | Texto de acoso sexual |
| `qr-texto` | `<p>` con instrucción QR | Texto por defecto |
| `qr` | `<img>` del código QR | Vacío |
| `foto` | `<img>` foto principal | Vacío |
| `footer-izq` | Columna izquierda del footer | Vacío |
| `footer-centro` | Columna central del footer | Vacío |
| `footer-der` | Columna derecha del footer | Vacío |

### `<ucr-senal>` – Slot default

Los hijos `<ucr-senal-item>` van directamente como contenido:
```html
<ucr-senal>
  <!-- Todo lo de adentro va al slot default -->
  <ucr-senal-item>Texto aquí</ucr-senal-item>
</ucr-senal>
```

### `<ucr-senal-item>` – Slot default

El texto del ítem va directamente:
```html
<ucr-senal-item>Nombre del destino</ucr-senal-item>
<!-- Admite HTML también: -->
<ucr-senal-item>Coordinación<br>Informática</ucr-senal-item>
```

---

## ⚡ Reactividad

El atributo `title-text` de `<ucr-senal>` es **reactivo**:

```js
const senal = document.querySelector("ucr-senal");
senal.setAttribute("title-text", "Nuevo Edificio"); // actualiza el DOM
```

---

## 📖 Tecnologías utilizadas

- **Custom Elements** – etiquetas HTML propias
- **Shadow DOM** – encapsulación de estilos y DOM
- **CSS adoptedStyleSheets** – hojas de estilos importadas sin FOUC
- **Slots** – ranuras para contenido desde el Light DOM
- **CSS Parts** – apertura controlada del Shadow DOM
- **CSS Custom Properties** – personalización sin romper encapsulación
- **`observedAttributes` + `attributeChangedCallback`** – reactividad
