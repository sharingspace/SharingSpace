import { observable, action, runInAction } from 'mobx';
import { navStore } from '../index';


export default class RefreshControl {

    @action refreshCurrentPage = () => {
        console.warn('Refresh current page',);

        let path = navStore.currentPath;

        console.log('current page', path);

        let baseURl = '/profile/:profile_id/dashboard'

        // if(path === `${baseURl}/keywords`) {
        //     console.log('Match on getKeywords');
        //     keywordStore.getKeywords();
        // }

    }


}
