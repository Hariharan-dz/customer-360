import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Customer360UiService } from 'src/app/services/customer360-ui.service';
import { TableComponent } from 'src/app/table/table.component';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss'],
})
export class PurchasesComponent implements OnInit {
  isOpen = false;
  order: any = [];
  orderDetails: any = {
    total_order_amount: null,
    average_order_amount: null
  };
  orderOverView: any = {
    name: "purchase",
    pk: "id",
    search: "",
    needServerSidePagination: false,
    isPageNationDisable: false,
    isPopoverDisable: true,
    fields: [
      { name: "Order Number", attr: "order_number", width: "135" },
      { name: "Created Date", attr: "order_date", width: "175" },
      { name: "Grand Total Amount", attr: "order_amount", width: "175" },
      { name: "Sales Order Status", attr: "sales_order_status", width: "175" },
      { name: "Action", attr: "viewdetailstext", width: "175", type: "CLICK", clickFunction: (el: any) => this.openModal(el) },
    ],
    actions: [
    ],
    getRecord: async (params: any) => {
      const orderDetails: any = await this.custmservice.getSalesOrderDetails(this.userIdParams, params).toPromise();
      this.orderDetails.total_order_amount = orderDetails.reduce((total, cv) => total + cv.order_amount, 0);
      this.orderDetails.average_order_amount = (this.orderDetails.total_order_amount / orderDetails.length).toFixed(2);
      return orderDetails;
    },
    buildData: (purchaseList: any) => {
      // this.orderDetails = {
      //   total_order_amount: purchaseList.map((data: any) => data.order_amount).reduce((a: any, b: any) => { return a + b }),
      //   average_order_amount: this.orderDetails.total_order_amount / purchaseList.length
      // };

      var viewdetailstext: any = [];
      viewdetailstext.push('View Details');
      return purchaseList.map((purchase: any) => {
        return {
          order_number: purchase.order_number,
          // order_date: purchase.order_date,
          order_date: this.datePipe.transform(purchase.order_date, this.custmservice.date_format),

          order_amount: purchase.order_amount,
          sales_order_status: purchase.sales_order_status,
          viewdetailstext: viewdetailstext,
          // updatedAt: this.datePipe.transform(purchase.updatedAt, this.custmservice.date_time_format),
          // status: purchase.status,
          link: {
            id: '/configuration/template/' + purchase.id
          },
          action: {
            edit: '/configuration/template/' + purchase.id,
            clone: '/configuration/template/clone/' + purchase.id,
          },
          additionalData: {
            category_id: purchase.id
          }
        };
      });
    }
  };

  @ViewChild('template_grid') templateGrid: TableComponent | undefined;

  selectedCategotyList: any = [];
  userIdParams: any;
  lastPurchaseData: any;
  isInitTriggered: boolean = false;
  constructor(private alertController: AlertController,
    private actRouter: ActivatedRoute, private datePipe: DatePipe, private custmservice: Customer360UiService) { }

  ngOnInit() {
    this.init();
  }

  ionViewWillEnter() {
    this.init();
  }

  ionViewWillLeave() {
    this.isInitTriggered = false;
  }

  init() {
    this.actRouter.paramMap.subscribe((param: Params) => {
      this.userIdParams = JSON.parse(param['get']('user_id'));
      console.log(this.userIdParams);
    })
    if (this.isInitTriggered) return;
    this.isInitTriggered = true;
    //this.lastPurchaseDate(this.userIdParams)
  }
  async confirmDelete(purchase: any, status?: any) {
    // this.selectedTemplate = template;
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      subHeader: `Changes you made will be ${status}.`,
      cssClass: 'custom-alert-style',
      buttons: [
        {
          text: 'Disable',
          cssClass: 'alert-button-confirm',
          handler: () => {
            // this.deleteUserSegment(userSegement.id);
          }
        },
        {
          text: 'Cancel',
          cssClass: 'alert-button-cancel',
        },
      ],
    });
    await alert.present();
  }
  deleteUserSegment(id: any) {
    // this.notifiService.deleteUserSegmentById(id).subscribe(
    //   {
    //     next: (data: any) => {
    //       this.notifiService.hideLoader();
    //       this.notifiService.toster.success('Usersegment disable successfully!');
    //       this.userSegmentGrid?.init();
    //     },
    //     error: (err: any) => {
    //       this.notifiService.hideLoader();
    //       err = err.error || err;
    //       this.notifiService.toster.error(err.message || 'Usersegment disable Failed');
    //     }
    //   }
    // )
  }

  lastPurchaseDate(id: any) {
    this.custmservice.lastPurchaseDate(id).subscribe({
      next: (purchaseDate: any) => {
        // this.custmservice.hideLoader();
        this.lastPurchaseData = purchaseDate;
      },
      error: (err: any) => {
        // this.custmservice.hideLoader();
        err = err.error || err;
        // this.custmservice.toster.error(err.message || 'Failed');
      }
    })
  }

  async openModal(element) {
    this.isOpen = true;
    this.order = element;
  }

}
