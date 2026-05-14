// ══════════════════════════════════════════════════════════
// UcrPoster.js  –  <ucr-poster>
//
// Web Component con Shadow DOM para el póster
// "La Sede Te Acompaña" de la UCR.
//
// SLOTS disponibles:
//   slot="titulo-linea1"  → texto del badge superior (badge morado)
//   slot="titulo-linea2"  → texto del badge inferior (badge azul)
//   slot="subtitulo"      → bloque de texto bajo el título
//   slot="qr-texto"       → texto de instrucción encima del QR
//   slot="qr"             → elemento <img> del código QR
//   slot="foto"           → elemento <img> principal del póster
//   slot="footer-izq"     → columna izquierda del footer
//   slot="footer-centro"  → columna central del footer
//   slot="footer-der"     → columna derecha del footer
//
// CSS PARTS expuestos (para estilar desde fuera):
//   ::part(poster)        → caja principal del cartel
//   ::part(titulo-wrap)   → zona con los exclamativos y badges
//   ::part(subtitulo)     → bloque de subtítulo
//   ::part(qr-wrap)       → bloque con texto + imagen QR
//   ::part(imagen-wrap)   → contenedor de la foto principal
//   ::part(footer)        → barra blanca inferior
//
// VARIABLES CSS personalizables desde fuera:
//   --color-ucr-dorado    → color de fondo del póster  (default: #c9a227)
//   --color-ucr-azul      → color azul UCR             (default: #2196c4)
//   --color-ucr-morado    → color morado UCR            (default: #6b2fa0)
// ══════════════════════════════════════════════════════════

import styles from "./UcrPoster.css" with { type: "css" };

class UcrPoster extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  connectedCallback() {
    this.#render();
  }

  #render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <div class="poster" part="poster">

        <!-- ── Título ── -->
        <div class="titulo-wrap" part="titulo-wrap">
          <div class="exclamacion izq">¡</div>

          <div class="titulo-bloque">
            <div class="linea-1">
              <span class="badge-linea1" part="badge-linea1">
                <slot name="titulo-linea1">LA SEDE</slot>
              </span>
            </div>
            <div class="linea-2">
              <span class="badge-linea2" part="badge-linea2">
                <slot name="titulo-linea2">TE</slot>
              </span>
            </div>
          </div>

          <div class="exclamacion der">!</div>
        </div>

        <!-- ── Subtítulo ── -->
        <div class="subtitulo" part="subtitulo">
          <slot name="subtitulo">
            <p style="font-size:18px;font-weight:700;font-style:italic;color:#1a1a1a;margin-bottom:2px">
              El respeto no se negocia
            </p>
            <p style="font-size:20px;font-weight:700;font-style:italic;color:#6b2fa0">
              ¡Pará ya de acosar!
            </p>
          </slot>
        </div>

        <!-- ── QR ── -->
        <div class="qr-wrap" part="qr-wrap">
          <slot name="qr-texto">
            <p style="font-size:11px;color:rgba(0,0,0,0.6);text-align:center;line-height:1.4">
              Si necesitás ayuda,<br>escaneá este QR:
            </p>
          </slot>
          <slot name="qr"></slot>
        </div>

        <!-- ── Foto ── -->
        <div class="imagen-wrap" part="imagen-wrap">
          <slot name="foto"></slot>
        </div>

        <!-- ── Footer ── -->
        <div class="footer" part="footer">
          <slot name="footer-izq"></slot>
          <div class="separador"></div>
          <slot name="footer-centro"></slot>
          <div class="separador"></div>
          <slot name="footer-der"></slot>
        </div>

      </div>
    `);
  }
}

customElements.define("ucr-poster", UcrPoster);
