import { observable, action, runInAction } from 'mobx';
import { saveToken, deleteToken } from '../../services/tokenHandlers';

export interface loginProps {
    userName: string;
    password: string;
}

export default class AuthStore {
  // @observable public authenticated = false;
  // @observable public loggingIn = false;
  // @observable public checkingToken = false;
  // //
  // @action public saveToken = (token:string) => {
  //     saveToken(token)
  // }
  //
  // @action public checkToken = (cb?: Function) => {
  //     this.checkingToken = true;
  //     checkToken()
  //     .then((res: any) => {
  //       runInAction(() => {
  //         this.checkingToken = false;
  //           if(res.ok) {
  //               this.authenticated = true
  //           } else {
  //               this.authenticated = false
  //           }
  //           if (cb) {
  //               cb(this.authenticated);
  //           }
  //       });
  //     })
  //     .catch(err => {
  //         runInAction(() => {
  //           this.authenticated = false;
  //           this.checkingToken = false;
  //         });
  //         deleteToken();
  //         if (cb) {
  //             cb();
  //         }
  //     });
  // }
  //
  // @action login = (params:loginProps) => {
  //     return new Promise((resolve => {
  //         const loginData = {
  //           username: params.userName,
  //           password: params.password
  //         }
  //         login(loginData)
  //             .then((res: any) => {
  //                 if(res.ok) {
  //                     console.log("res is ok in login action", res);
  //                     resolve(res);
  //                 } else {
  //                     console.log('res is not ok in login action', res);
  //                     resolve(res);
  //                 }
  //             })
  //             .catch((err: any) => {
  //                 console.log('we have a fail', err)
  //                 console.warn(err);
  //                 resolve(err);
  //             });
  //
  //     }));
  // }
  //
  // @action logout = () => {
  //   deleteToken();
  //   this.authenticated = false;
  //   this.isAdmin = false;
  // }

}
