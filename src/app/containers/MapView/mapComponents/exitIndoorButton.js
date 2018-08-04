import SharedButton from './sharedButton';

export default class ExitIndoorButton extends SharedButton {
  constructor(props) {
    super(props)
  }

  onClick() {
    this._map.indoors.exit();
  }
}
