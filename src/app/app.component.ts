import { Component } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationActionPerformed,
  PushNotificationToken
} from '@capacitor/core';

const { SplashScreen, StatusBar, PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  notifications: any = [];

  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    SplashScreen.hide().catch(error => {
      console.error(error);
    });

    StatusBar.hide().catch(error => {
      console.error(error);
    });

    PushNotifications.register();
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('token ' + token.value);
      }
    );
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('error on register ' + JSON.stringify(error));
    });
    /* PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotification) => {
        console.log('notification ' + JSON.stringify(notification));
        this.notifications.push(notification);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        console.log('notification ' + JSON.stringify(notification));
        this.notifications.push(notification);
      }
    ); */
  }
}
