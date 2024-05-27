import { LitElement, html, PropertyValues, css } from 'lit-element';
import { customElement, property } from 'lit/decorators.js';

@customElement('custom-button')
export class CustomButton extends LitElement {
  @property({ type: String }) label = 'Button';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) connectedtoDom = false;

  // static get eventButtonClick():
  //  Defines a static getter that returns the name of the custom event 'button-click'
  static get eventButtonClick() {
    return 'button-click';
  }

  // Calls the superclass's connectedCallback method.
  connectedCallback() {
    super.connectedCallback();
    this.connectedtoDom = true;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.connectedtoDom = false;
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('label')) {
      console.log(`Label property changed to: ${this.label}`);
    }
    if (changedProperties.has('disabled')) {
      console.log(`Disabled property changed to: ${this.disabled}`);
    }
  }

  static get styles() {
    return css`
      button {
        padding: 8px 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        background-color: green;
      }
  
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
  
      button.clicked {
        background-color: red;
      }
    `;
  }

  handleClick() {
    if (!this.disabled) {
      const event = new CustomEvent(CustomButton.eventButtonClick, {
        bubbles: true,
        composed: true,
        detail: { label: this.label },
      });
      this.dispatchEvent(event);
    }
    const button = this.shadowRoot?.querySelector('button');
    if (button) {
      button.classList.toggle('clicked');
    }
  }

  render() {
    return html`
    <button @click=${this.handleClick}> ${this.label}</button>
    <p> ${this.connectedtoDom} </p>
  `;
  }
}

customElements.define('custom-button', CustomButton);
