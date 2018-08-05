import Packery from 'packery';

class PackeryStorage {

  packeryObject: any;
  packeryElem: any;
  elemsInList: any;

  constructor() {
    this.packeryObject = {};
    this.packeryElem = null;
    this.elemsInList = [];
  }

  initPackeryElem(ref) {
    let packeryElem = ref.current;
    packeryElem.style.cssText = `height: 10rem`;
    this.packeryElem = packeryElem;
  }

  initPackeryObject() {
    this.packeryObject = new Packery( this.packeryElem, {
      // options
      itemSelector: '.grid-item',
      gutter: 10,
      originLeft: true,
      originTop: true,
    });
  }

  clearPackeryObject() {
    // remove all items from packery, from dom and finally clear list
    this.elemsInList.forEach((elem, i) => {
      this.packeryObject.remove(elem);
      elem.remove();
    })
    this.elemsInList = [];
  }

  populatePackery(list) {
    this.clearPackeryObject();

    list.forEach((listElem, i) => {
      // create dom element
      let elem = document.createElement('div');

      // save elem we're creating into memory
      this.elemsInList.push(elem);
      // give it a class
      elem.className = 'grid-item';

      // set the size
      let sizeModifier = 5;
      let height = Math.random() * 5 + sizeModifier;
      let width = Math.random() * 5 + sizeModifier;

      elem.style.cssText = `height: ${height}rem; width: ${width}rem`;

      let textNode = document.createTextNode("box: " + i);

      let imageUrl = 'http://paulbourke.net/dome/skyvision/test.jpg';

      let backgroundNode = document.createElement('div');
      backgroundNode.className = 'each-grid-item-background-container';
      backgroundNode.style.background = 'url(' + imageUrl + ')';
      backgroundNode.style.backgroundSize = 'cover';
      backgroundNode.style.backgroundPosition = 'center';

      elem.appendChild(backgroundNode);

      this.packeryElem.appendChild( elem );
      this.packeryObject.appended( elem );
      this.packeryObject.layout();
    })

  }

}

let packeryStorage = new PackeryStorage();
export default packeryStorage;
