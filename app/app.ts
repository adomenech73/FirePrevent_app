import {App, Platform, Storage, SqlStorage} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {
    //backButtonText: 'Go Back',
    //iconMode: 'ios',
    //modalEnter: 'modal-slide-in',
    //modalLeave: 'modal-slide-out',
    //tabbarPlacement: 'bottom',
    //pageTransition: 'ios',
    // change the mode to always use Material Design
    //mode: 'md'    
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: Type = TabsPage;
  static storage: Storage = new Storage(SqlStorage);

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
      //let MyApp.storage:Storage = new Storage(SqlStorage);

      // Temporal borramos el contenido de la tabla
      MyApp.storage.query('DELETE FROM sources').then((data) => {
                      console.log("TABLE DELETED -> " + JSON.stringify(data.res));
                  }, (error) => {
                      console.log("ERROR -> " + JSON.stringify(error.err));
            });
     
      MyApp.storage.query('CREATE TABLE IF NOT EXISTS sources (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, unit TEXT, delta REAL)').then((data) => {
                      console.log("TABLE CREATED -> " + JSON.stringify(data.res));
                  }, (error) => {
                      console.log("ERROR -> " + JSON.stringify(error.err));
            });

    });
  }
}
