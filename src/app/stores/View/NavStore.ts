class NavStore {

  constructor() {
  }

  public currentPath: string = '';
  public history: any = null;
  public currentMatch: any = null;

  public setCurrentPath = (newPath: string) => {
    this.currentPath = newPath;
  }

  public saveCurrentMatch = (newMatch: any) => {
    this.currentMatch = newMatch;
  }

  public replaceUrlWithoutReloading = (newUrl: string) => {
    console.warn('replace without reloading', newUrl)
    this.history.push(newUrl)
  }

  public saveHistory = (historyFromHOC: any) => {
    console.log('Saving history', historyFromHOC);
    this.history = historyFromHOC;
  }

  public routeToHome = () => {
    this.route(true, '/home');
  }

  public routeToList = () => {
    console.log('nav to list');
    this.route(true, '/list');
  }

  public routeToGrid = () => {
    console.log('nav to grid');
    this.route(true, '/grid');
  }

  public routeToMap = () => {
    console.log('nav to map');
    this.route(true, '/map');
  }

  private route(isPrivate: boolean, route: string) {
    console.log('this history', route)
    this.history.push(route);
  }
}

export default NavStore;
