const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

function hasConfigOrEntityChanged(element, changedProps) {
  if (changedProps.has("config")) {
    return true;
  }

  const oldHass = changedProps.get("hass");
  if (oldHass) {
    return (
      oldHass.states[element.config.entity] !==
        element.hass.states[element.config.entity]
    );
  }

  return true;
}

class PollenHUCard extends LitElement {

  static get properties() {
    return {
      config: {},
      hass: {},
    };
  }

  _getPollens(hass, sensor_name, above_level) {
    var res = [];
    if (typeof hass.states[`sensor.${sensor_name}`] != "undefined") {
      const data1 = hass.states[`sensor.${sensor_name}`].attributes['pollens'];
      Object.keys(data1 || {}).forEach(function (key) {
        if ( parseInt(data1[key].value, 10) > above_level ) {
          res.push({
            name: data1[key].name,
            concentration: "level" + data1[key].value,
          });
        }
      });
    }
    return res;
  }

  setConfig(config) {
    const defaultConfig = {
      'no_pollens_label': 'No pollens',
      'sensor_name': 'pollen_hu',
      'above_level': 2,
      'title': 'Pollens',
    }

    this.config = {
      ...defaultConfig,
      ...config
    };
  }

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const pollens = this._getPollens(this.hass, this.config.sensor_name, this.config.above_level);
    return html`
      <ha-card header="${this.config.title}">
          <div id="attributes">
          ${pollens.length > 0
            ? html`<div class="pollen">${pollens.map(pollen => this.renderPollen(pollen))}</div>`
            : html`<div class="no-pollen">${this.config.no_pollens_label}</div>`
          }
          </div>
      </ha-card>
    `;
  }

  renderPollen(pollen) {
    return html
    `
      <div class="inpollen"><ha-icon icon="mdi:blur" class="${pollen.concentration} levelicon"></ha-icon>
      ${pollen.name}</div>
    `;
  }

  getCardSize() {
    return 1;
  }

  static get styles() {
    return css`
    #attributes {
      margin-top: 0.4em;
      padding-bottom: 0.8em;
      display: flex;
    }
    .pollen {
      margin-left: 2em;
      margin-right: 2em;
      margin: auto;
      display: float;
      width: auto;
    }
    .inpollen {
       margin: 0px 15px 0px 15px;
       padding: 0px 5px 0px 5px;
       float: left;
       position: relative;
    }
    .level0 {
      color: grey;
    }
    .level1 {
      color: green;
    }
    .level2 {
      color: yellow;
    }
    .level3 {
      color: orange;
    }
    .level4 {
      color: red;
    }
    .levelicon {
      --mdc-icon-size: 2.5em;
    }
    .no-pollens {
      margin-left: 1.4em;
    }
    `;
  }
}

customElements.define('pollen-hu-card', PollenHUCard);

// Puts card into the UI card picker dialog
(window).customCards = (window).customCards || [];
(window).customCards.push({
  type: 'pollen-hu-card',
  name: 'Pollen Information Hungary Card',
  preview: true,
  description: 'This Lovelace custom card displays pollen information provided by the Pollen Information Hungary custom Integration.',
});
