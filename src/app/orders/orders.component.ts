import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Customer360UiService } from '../services/customer360-ui.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  isOpen = false;
  order: any = [];
  orderDetails: any = {
    name: "purchase",
    pk: "id",
    search: "",
    needServerSidePagination: false,
    isPageNationDisable: false,
    isPopoverDisable: false,
    fields: [
      { name: "Order Number", attr: "order_number", width: "135", type: "CLICK", clickFunction: (el: any) => this.openModal(el) },
      { name: "Created Date", attr: "order_date", width: "175" },
      { name: "Grand Total Amount", attr: "order_amount", width: "175" },
      { name: "Sales Order Status", attr: "sales_order_status", width: "175" },
    ],
    actions: [
    ],
    getRecord: (params: any) => this.custmservice.getAllSalesOrder(params),
    buildData: (purchaseList: any) => {
      return purchaseList.map((purchase: any) => {
        return {
          order_number: purchase.order_number,
          order_date: purchase.order_date,
          // original_order: purchase.original_order,
          order_amount: purchase.order_amount,
          // updatedAt: this.datePipe.transform(purchase.updatedAt, this.custmservice.date_time_format),
          sales_order_status: purchase.sales_order_status,
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

  constructor(private datePipe: DatePipe, public custmservice: Customer360UiService, private alertController: AlertController,
    private actRouter: ActivatedRoute) { }
  ngOnInit() {
    this.init();

    // this.custmservice.getSalesOrderDetails(1, {}).subscribe()
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
    // this.lastPurchaseDate(this.userIdParams)
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
  async openModal(element: any) {
    this.isOpen = true;
    this.order = element;
  }

}
