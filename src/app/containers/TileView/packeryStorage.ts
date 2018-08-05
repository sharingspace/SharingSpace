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
      let divDomElem = document.createElement('div');

      // save divDomElem we're creating into memory
      this.elemsInList.push(divDomElem);
      // give it a class
      divDomElem.className = 'grid-item';

      // set the size
      let sizeModifier = 9;
      let randomModifier = 2;

      let height = Math.random() * randomModifier + sizeModifier;
      let width = Math.random() * randomModifier + sizeModifier;

      divDomElem.style.height = height + 'rem';
      divDomElem.style.width = width + 'rem';
      divDomElem.style.position = 'relative';

      let textNode = document.createElement('div');
      textNode.innerText = `${listElem.display_name} ${listElem.natural_post_type} ${listElem.title}`;
      textNode.style.position = 'absolute';
      textNode.style.bottom = '0';
      textNode.style.backgroundColor = 'rgba(0, 0, 0, .5)';
      textNode.style.color = 'rgba(255, 255, 255, 1)';
      textNode.style.width = '100%';
      textNode.style.padding = '.2rem';
      textNode.style.fontSize = '.8rem';
      textNode.style.borderBottomLeftRadius = '.5rem';
      textNode.style.borderBottomRightRadius = '.5rem';
      textNode.style.padding = '.5rem';
      textNode.style.borderLeft = '2px solid lightgrey';
      textNode.style.borderRight = '2px solid lightgrey';
      textNode.style.borderBottom = '2px solid lightgrey';
      textNode.style.textAlign = 'center';

      let backgroundNode = document.createElement('div');
      backgroundNode.className = 'each-grid-item-background-container';
      backgroundNode.style.backgroundSize = 'cover';
      backgroundNode.style.backgroundPosition = 'center';

      // if image, do image styling
      if(listElem.parsedImageUrl) {
        backgroundNode.style.background = 'url(' + listElem.parsedImageUrl + ')';
      } else {
        // no image
        backgroundNode.style.backgroundColor = 'rgba(0, 0, 0, .5)';
        textNode.style.height = '100%';
        textNode.style.display = 'flex';
        textNode.style.alignItems = 'center';
        textNode.style.justifyContent = 'center';
        textNode.style.borderRadius = '.5rem';

      }

      divDomElem.appendChild(backgroundNode);
      divDomElem.appendChild(textNode);

      this.packeryElem.appendChild(divDomElem);
      this.packeryObject.appended(divDomElem);
      this.packeryObject.layout();
    })

  }

}

let packeryStorage = new PackeryStorage();
export default packeryStorage;
