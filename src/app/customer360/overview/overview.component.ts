import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Customer360UiService } from 'src/app/services/customer360-ui.service';
import { TableComponent } from 'src/app/table/table.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @Input() userType;
  @Input() userDetails: any;
  isPopupOpen = false;
  isModalOpen = false;
  userIdParams: any;
  openOrderStatus: any;
  taskDetails: any;
  lastPurchaseData: any;
  task: any;
  tasks: any = {
    name: "task",
    pk: "id",
    search: "",
    needServerSidePagination: false,
    isPageNationDisable: true,
    fields: [
      { name: "ID", attr: "id", width: "75",type: "CLICK", clickFunction: (el: any) => this.clickModel(el) },
      { name: "TASK NAME", attr: "type_name", width: "175" },
      { name: "DESCRIPTION", attr: "description", width: "175" },
      { name: "PRIORITY", attr: "priority", width: "135" },
      { name: "DUE DATE", attr: "dueDate", width: "135" },
      { name: "STATUS", attr: "status", width: "100" },
      { name: "ASSIGNEE", attr: "assignee", width: "135" },
    ],
    actions: [
    ],
    getRecord: (params: any) => this.custmservice.getCustomerOpenTask(this.userDetails.id),
    buildData: (tasks: any) => {
      return tasks.map((task: any) => {
        return {
          id: task.id,
          type_name: task.type_name,
          description: task.description,
          priority: task.priority,
          dueDate: this.datePipe.transform(task.dueDate, this.custmservice.date_format),
          status: task.status,
          assignee: task.assignee
        };
      });
    }
  };

  recommendedOffer: any = [
    { offerName: 'Get Unlimited Entertainment WITH PREMIUM PLAN' },
    { offerName: 'Buy Unlimited Entertainment WITH PREMIUM PLAN' },
    { offerName: 'Sell Unlimited Entertainment' },
    { offerName: 'Buy Unlimited Netflix offer' },
    { offerName: 'Buy limited Hotstart and Amazon prime' },
  ]

  slideOpts = {
    slidesPerView: 3,
    spaceBetween: 5,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 3000
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }


  items = [
    { product: "../../../assets/icon/watch.png", title: "Apple Watch Series 7 (GPS, 41mm)Blue Aluminium Case with Abyss Blue Sport Band - Regular", Qty: 1, date: "February 25, 2022", price: "499" },
    { product: "../../../assets/icon/watch.png", title: "Apple Watch Series 7 (GPS, 41mm)Blue Aluminium Case with Abyss Blue Sport Band - Regular", Qty: 2, date: "February 25, 2022", price: "499" },
    { product: "../../../assets/icon/watch.png", title: "Apple Watch Series 7 (GPS, 41mm)Blue Aluminium Case with Abyss Blue Sport Band - Regular", Qty: 4, date: "February 25, 2022", price: "499", }
  ]

  tilesObj: any = [
    {
      'task_number': 9898989898,
      'status': 'Open',
    },
    {
      'task_number': 7878787878,
      'status': 'Open',
    },
    {
      'task_number': 8978978988,
      'status': 'Open',
    },
  ]

  chart: any = {
    colors: ['var(--ion-color-primary)'],
    series: [80],
    chart: { height: 115, type: 'radialBar' },
    plotOptions: {
      radialBar: {
        hollow: { size: '50%' },
        dataLabels: {
          name: {
            show: true
          },
          value: {
            show: false
          }
        }
      }
    },
    labels: ['80%'],
  }

  @ViewChild('openorders_grid') openordersGrid: TableComponent | undefined;
  @ViewChild('tasks_grid') tasksGrid: TableComponent | undefined;

  constructor(private alertController: AlertController,
  private actRouter: ActivatedRoute, private datePipe: DatePipe,
  private custmservice: Customer360UiService, private modalController: ModalController) { }

    ngOnInit() {
      this.init();
  }

  init() {
    this.actRouter.paramMap.subscribe((param: Params) => {
      this.userIdParams = JSON.parse(param['get']('user_id'));
      // console.log(this.userIdParams);
      this.lastPurchaseDate(this.userIdParams);
      this.getAllOpenOrderStatusById(this.userIdParams, {status: 'open'});
    })
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  getInteractionHistoryDetails() {
    this.custmservice.getInteractionHistoryDetailsByCustomerId(this.userIdParams, null).subscribe({
      next: (purchaseDate: any) => {
        // this.custmservice.hideLoader();
        this.lastPurchaseDate = purchaseDate;
      },
      error: (err: any) => {
        // this.custmservice.hideLoader();
        err = err.error || err;
        // this.custmservice.toster.error(err.message || 'Failed');
      }
    });
  }
  lastPurchaseDate(id: any) {
    this.custmservice.lastPurchaseDate(id).subscribe({
      next: (purchaseDate: any) => {
        // this.custmservice.hideLoader();
        this.lastPurchaseDate = purchaseDate;
      },
      error: (err: any) => {
        // this.custmservice.hideLoader();
        err = err.error || err;
        // this.custmservice.toster.error(err.message || 'Failed');
      }
    })
  }

  getAllOpenOrderStatusById(id: any, params: any) {
    // this.openOrderStatus = await this.custmservice.getAllOpenOrderStatusById(id,params).toPromise();
    // console.log('OPS',this.openOrderStatus)
    this.custmservice.getAllOpenOrderStatusById(id, params).subscribe({
      next: (openOrders: any) => {
        this.openOrderStatus = openOrders;
      },
      error: (err: any) => {
        // this.custmservice.hideLoader();
        err = err.error || err;
        // this.custmservice.toster.error(err.message || 'Failed');
      }
    })
  }

  async getTaskDetailsByAssignee(assignee: any, status: any) {
    // this.taskDetails = await this.custmservice.getTaskDetailsByAssignee(assignee, status).toPromise()
    // console.log(this.taskDetails);
    this.custmservice.getTaskDetailsByAssignee(assignee, status).subscribe({
      next: (task: any) => {
        this.taskDetails = task;
        // console.log('TD',this.taskDetails);
      },
      error: (err: any) => {
        // this.custmservice.hideLoader();
        err = err.error || err;
        // this.custmservice.toster.error(err.message || 'Failed');
      }
    })
  }
  async clickModel(el: any){
    this.isPopupOpen = true;
    this.task = el;
  }
}
