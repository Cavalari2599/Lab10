// ══════════════════════════════════════════════════════════
// UcrSenalItem.js  –  <ucr-senal-item>
//
// Ítem individual de la señal. Normalmente se usa dentro
// de <ucr-senal>, pero puede usarse de forma independiente.
//
// SLOT default:
//   El texto del ítem se pasa como contenido de la etiqueta:
//   <ucr-senal-item>Aulas 5, 6, 7</ucr-senal-item>
//
// ATRIBUTOS:
//   index   → número de orden para el delay de animación
//             (se lo asigna automáticamente ucr-senal, o manualmente)
//
// CSS PARTS expuestos:
//   ::part(texto)    → contenedor del texto del ítem
//   ::part(flecha)   → ícono SVG de flecha
//
// VARIABLES CSS heredadas desde <ucr-senal> (o personalizables):
//   --senal-color-item     → color del texto
//   --senal-color-flecha   → color de la flecha
//   --senal-item-size      → tamaño de fuente
//   --senal-peso           → font-weight
// ══════════════════════════════════════════════════════════

import styles from "./UcrSenalItem.css" with { type: "css" };

class UcrSenalItem extends HTMLElement {
  static get observedAttributes() {
    return ["index"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  connectedCallback() {
    // Auto-detectar posición entre hermanos para el delay
    const siblings = [...(this.parentElement?.querySelectorAll("ucr-senal-item") ?? [])];
    const idx = this.getAttribute("index") ?? siblings.indexOf(this);
    this.style.setProperty("--item-delay", `${idx * 0.08}s`);

    this.#render();
  }

  attributeChangedCallback(name, _old, now) {
    if (name === "index") {
      this.style.setProperty("--item-delay", `${(now ?? 0) * 0.08}s`);
    }
  }

#render() {
  this.shadowRoot.setHTMLUnsafe(/* html */`
    <div class="fila">
      <span class="texto" part="texto">
        <slot></slot>
      </span>
      <svg class="flecha" part="flecha"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2.5"
           stroke-linecap="round"
           stroke-linejoin="round"
           aria-hidden="true">
        <line x1="5"  y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </div>
  `);
  }
}

customElements.define("ucr-senal-item", UcrSenalItem);
