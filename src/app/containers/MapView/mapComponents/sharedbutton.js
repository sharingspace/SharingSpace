export default class SharedButton extends L.Control {
  constructor(props) {
    super(props)
    console.log('==== shared button props', props)
    this.title = props.title;
    this.options = {
        position: 'topleft'
    }

  }

  onClick() {
    console.log('== BUTTON WAS CLICKED')
  }

  onAdd(map) {
    console.log('=========== rops', this)
    let size = 50;
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    container.style.backgroundColor = 'white';
    container.style.width = size + 'px';
    container.style.height = size + 'px';
    container.style.display = 'flex';
    container.style.flex = 1;
    container.style.textAlign = 'center';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.fontWeight = 'bold';
    container.innerText = this.title;
    container.onclick = (event) => {
      this.onClick();
    }
    return container;
  }
}
