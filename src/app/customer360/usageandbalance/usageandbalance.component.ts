import { Component, OnInit } from '@angular/core';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ActivatedRoute, Params } from '@angular/router';
import { Customer360UiService } from 'src/app/services/customer360-ui.service';
import { LoadingController } from '@ionic/angular';
import { NotificationUiService } from 'src/app/services/notification-ui.service';


@Component({
  selector: 'app-usageandbalance',
  templateUrl: './usageandbalance.component.html',
  styleUrls: ['./usageandbalance.component.scss'],
})

export class UsageandbalanceComponent implements OnInit {

  getAllDetail: any = {};
  dataUsageDetails: any = {
    usageCharacteristic: [{}, {}, {}, {}]
  };
  dataUsed: any;
  dataLeft: any;
  dataSpeed: any;
  daysLeft: any;
  isShowCustom = false;
  paymentdata: any = '';

  isModalOpen = false;
  chart: any
  //public chartOptions: Partial<ChartOptions> |any;
  spline: any
  barWeekly: any;
  barMonthly: any;
  year: string = "January"
  dateTab: any = ["Day", "Weekly", "Monthly"];
  showContent = true;
  selectedList: any
  account: any = {
    paymentPlan: [{}]
  };
  userIdParams: any;
  isInitTriggered: any;
  constructor(private actRouter: ActivatedRoute, public notifiService: NotificationUiService, public customer360UiService: Customer360UiService, public loadingCtrl: LoadingController) {
    this.selectedList = 'Day'
    this.chart = {
      colors: ['var(--ion-color-primary'],
      series: [32],
      chart: {
        height: 160,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "50%"
          },
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
      labels: ['32%']
    };

    this.spline = {
      series: [
        {
          name: "Download",
          data: [310, 400, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Upload",
          data: [11, 32, 45, 32, 34, 52, 41, 31, 40, 28, 50, 42, 10, 10, 31, 40, 20, 51, 42, 19, 10, 31, 40, 28, 51, 42, 109, 100]
        }
      ],
      colors: ["#FEC527", "#5875CB"],
      chart: {
        height: 350,
        type: "area"
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
        ]
      },
      yaxis: {
        categories: ["0GB", "5GB", "10GB"]
      }
    };
    this.barMonthly = {
      series: [
        {
          name: "Download",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Upload",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }
      ],
      colors: ["#FEC527", "#5875CB"],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return "$ " + val + " thousands";
          }
        }
      }
    };
  }
  usageDetails: any = {
    getUsageDetailsByCustomerId: async (params: any) => {
      const billingResp: any = await this.customer360UiService.getBillingAccountDetailsByCustomer(this.userIdParams, params).toPromise();
      this.account = billingResp;
      this.dataUsageDetails = await this.customer360UiService.getUsageDetailsByCustomerId(this.userIdParams, params).toPromise();
      this.dataUsageDetails = this.dataUsageDetails[0];
      this.dataUsed = this.dataUsageDetails.usagecharacteristicsList.find(d => d.name == "data-used").value;
      this.dataLeft = this.dataUsageDetails.usagecharacteristicsList.find(d => d.name == "data-left").value;
      this.dataSpeed = this.dataUsageDetails.usagecharacteristicsList.find(d => d.name == "data-speed").value;
      this.daysLeft = this.dataUsageDetails.usagecharacteristicsList.find(d => d.name == "days-left").value;
      this.notifiService.hideLoader();
    }
  }
  init() {
    this.actRouter.paramMap.subscribe((param: Params) => {
      this.userIdParams = JSON.parse(param['get']('user_id'));
      //console.log(this.userIdParams);
      if (!this.isInitTriggered) {
        this.isInitTriggered = true;
        this.usageDetails.getUsageDetailsByCustomerId(null);
      }
    })
  }
  ngOnInit() {
    this.notifiService.showLoader();
    this.init();
  }


  showComponent(value: any) {
    this.selectedList = value;
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
