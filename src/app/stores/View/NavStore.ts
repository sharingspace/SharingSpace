import { authStore } from 'stores';

export default class NavStore {

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

  public routeToLogin = () => {
    this.route(false, '/login');
  }

  private route(isPrivate: boolean, route: string) {
    // if (isPrivate) {
      // check for auth
    //   authStore.checkToken((res) => {
    //     console.log('Check token!!', res);
    //     if (res) {
    //       this.history.push(route);
    //     } else {
    //       this.history.push('/login');
    //     }
    //   });
    // } else {
    //   // just nav it
    //   this.history.push(route);
    // }
  }
}
