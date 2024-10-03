/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, HostListener, Optional, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationUiService } from './services/notification-ui.service';
import { PushNotificationService } from './services/push-notification.service';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';
import { AlertController, IonAccordionGroup, IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  urlList: any = ['/login', '/signup', '/authorize', '/logout', '/reset-password'];
  isMenuCollapse = true;
  menuList = [
    {
      title: 'Dashboard',
      src_outline: '../assets/icon/Line Icons/Dashboard_Line.svg',
      src_filled: '../assets/icon/Fill Icons/Dashboard_Fill.svg',
      link: 'dashboard',
    },
    {
      title: 'Customers',
      src_outline: '../assets/icon/Line Icons/Customers_Line.svg',
      src_filled: '../assets/icon/Fill Icons/Customers__Fill.svg',
      link: 'customers',
    },
    {
      title: 'Orders',
      src_outline: '../assets/icon/Line Icons/Orders_Line.svg',
      src_filled: '../assets/icon/Fill Icons/Orders_Fill.svg',
      link: 'orders',
    },
    {
      title: 'Segment',
      src_outline: '../assets/icon/Line Icons/Segmentation_Line.svg',
      src_filled: '../assets/icon/Fill Icons/Segments_Fill.svg',
      link: 'segment',
    },
    {
      title: 'Tickets',
      src_outline: '../assets/icon/Line Icons/Tickets_Line.svg',
      src_filled: '../assets/icon/Fill Icons/Tickets_Fill.svg',
      link: 'tickets',
    },
    {
      title: 'WQM',
      src_outline: '../assets/icon/Line Icons/WQM_Line.svg',
      src_filled: '../assets/icon/Fill Icons/WQM_Fill.svg',
      link: 'wqm',
    },
    {
      title: 'Notifications',
      src_outline: '../assets/icon/Line Icons/Notification_Line.svg',
      src_filled: '../assets/icon/Fill Icons/Notifications_Fill.svg',
      link: 'notifications',
    },
    {
      title: 'Reports',
      src_outline: '../assets/icon/Line Icons/Reports_Line.svg',
      src_filled: '../assets/icon/Fill Icons/Reports_Fill.svg',
      link: 'reports',
    },
    {
      title: 'Adiministration',
      src_outline: '../assets/icon/Line Icons/Administration_Line.svg',
      src_filled: '../assets/icon/Fill Icons/Administration_Fill.svg',
      link: 'admin',
    },
    {
      title: 'Developer',
      src_outline: '../assets/icon/Line Icons/Developer_Line.svg',
      src_filled: '../assets/icon/Fill Icons/Developer_Fill.svg',
      link: 'developer',
    }
  ];

  customPopoverOptions: any = {
    cssClass: 'popover-wide',
  };
  @Optional() private routerOutlet!: IonRouterOutlet


  constructor(public route: Router,
    public notifiService: NotificationUiService,
    private pushNotificationService: PushNotificationService,
    private _location: Location,
    private alertController: AlertController,
    private platform: Platform, public router: Router
  ) {

    App.addListener('backButton', () => {
      if (this._location.isCurrentPathEqualTo('/configuration/category')) {
        // navigator['app'].exitApp();
        // this.route.navigate['app'].exitApp();
        // alert('1st alert')
        // this.exitConformation();
        // console.log('vdfvd')
      }
      else {
        this._location.back();
        this.platform.backButton.subscribeWithPriority(-1, () => {
          if (!this.routerOutlet.canGoBack()) {
            this.exitConformation();
          }
        });
      }
    });

  }

  ngOnInit() {
  }

  async exitConformation() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      subHeader: 'Want to exit',
      cssClass: 'custom-alert-style',
      buttons: [
        {
          text: 'Leave',
          cssClass: 'alert-button-confirm btn-primary',
          handler: () => { navigator['app'].exitApp() }
        },
        {
          text: 'Cancel',
          cssClass: 'alert-button-cancel btn-secondary',
        },
      ],
    });
    await alert.present();
  }

  access(event: any) {
    event.stopPropagation();
  }

  isActiveIcon(value?: any) {
    return this.router.url.includes(value) ? true : false;
  }
}
