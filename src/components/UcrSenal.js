import styles from "./UcrSenal.css" with { type: "css" };

const DEFAULT_TITLE = "Señal UCR";

class UcrSenal extends HTMLElement {
  static get observedAttributes() {
    return ["title-text"];
  }

  #titleEl = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback(name, _old, now) {
    if (name === "title-text" && this.#titleEl) {
      this.#titleEl.textContent = now ?? DEFAULT_TITLE;
    }
  }

  get titleText() {
    return this.getAttribute("title-text") ?? DEFAULT_TITLE;
  }

  #render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <div class="contenedor" part="contenedor">

        <p class="titulo-senal">${this.titleText}</p>

        <slot></slot>

        <div class="footer-wrap" part="footer-wrap">
          <svg class="ola" viewBox="0 0 300 50" preserveAspectRatio="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              
  d="M0,50 C60,0 120,0 150,25 C180,50 240,50 300,0 L300,50 L0,50 Z"
  fill="#ffffff"/>
          </svg>
          <div class="footer" part="footer">UCR</div>
        </div>

      </div>
    `);

    this.#titleEl = this.shadowRoot.querySelector(".titulo-senal");
  }
}

customElements.define("ucr-senal", UcrSenal);