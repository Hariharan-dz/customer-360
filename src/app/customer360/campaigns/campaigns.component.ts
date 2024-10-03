import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Customer360UiService } from 'src/app/services/customer360-ui.service';
import { TableComponent } from 'src/app/table/table.component';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnInit {
  campaignsDetail: any = [];
  isOpen = false;
  userIdParams: any;
  chartOptions: any;
  notificationSummaryCount: any = {};

  campaignsTableDetails: any = {
    name: "campaigns",
    pk: "id",
    search: "",
    needServerSidePagination: true,
    filterCriteria: { status: "SENT,DELIVERED,VIEWED" },
    fields: [
      { name: "ID", attr: "id", width: "75", type: "CLICK", clickFunction: (el: any) => this.openModal(el) },
      { name: "User Id", attr: "user_id", width: "100" },
      { name: "Category", attr: "category_name", width: "175" },
      { name: "Channels", attr: "channel", width: "175", type: "IMAGE_LIST" },
      { name: "Identifier", attr: "identifier", width: "200", },
      { name: "Priority", attr: "priority", width: "175" },
      { name: "Status", attr: "status", width: "175" },
      { name: "Sent Time", attr: "sent_at", width: "175" }
    ],
    actions: [],
    getRecord: (params: any) => this.custmservice.getNotificationHistoryByUserIdWithStatus(this.userIdParams, params),
    buildData: (campaigns: any) => {
      return campaigns.map((campaignsview: any) => {
        var channel: any = [];
        if (campaignsview.channel.indexOf('EMAIL') !== -1) channel.push({ title: "Email", name: 'mail-outline' });
        if (campaignsview.channel.indexOf('WEB_PUSH') !== -1) channel.push({ title: "Web Push", name: 'desktop-outline' });
        if (campaignsview.channel.indexOf('MOBILE_PUSH') !== -1) channel.push({ title: "Mobile Push", name: 'phone-portrait-outline' });
        if (campaignsview.channel.indexOf('SMS') !== -1) channel.push({ title: "SMS", name: 'chatbox-ellipses-outline' });
        if (campaignsview.channel.indexOf('IN_APP_MESSAGE') !== -1) channel.push({ title: "In App", name: 'apps-outline' });
        return {
          id: campaignsview.id,
          user_id: campaignsview.user_id,
          category_name: campaignsview.category_name,
          channel: channel,
          identifier: campaignsview.identifier,
          priority: campaignsview.priority,
          status: campaignsview.status,
          sent_at: this.datePipe.transform(campaignsview.sent_at, this.custmservice.time_format),
        };
      });
    }
  };

  campaignsChart: any = {
    series: [56, 42, 26, 18],
    colors: ['#f50c21', '#85016D', '#FE6E01', '#41C0BF'],
    chart: {
      type: 'donut',
      height: 130
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              color: 'var(--common-text)',
              fontSize: 14,
              fontWeight: 400,
              fontFamily: 'Roboto',
              formatter: () => {
                return 56 + 42 + 26 + 18;
              }
            }
          }
        }
      },
      radialBar: {
        hollow: {
          size: "50%"
        }
      },
    },
    labels: ['Email - 56', 'Web - 42', 'Mobile - 26', 'SMS - 18'],
    legend: {
      show: true,
      position: 'right',
      horizontalAlign: 'right',
      fontSize: '12px',
      labels: {
        colors: 'var(--common-text)'
      },
      itemMargin: {
        vertical: 0
      }
    }
  }

  @ViewChild('campaigns_grid') campaignsGrid: TableComponent | undefined;

  constructor(private custmservice: Customer360UiService, private datePipe: DatePipe, private actRouter: ActivatedRoute) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.actRouter.paramMap.subscribe((param: Params) => {
      this.userIdParams = JSON.parse(param['get']('user_id'));
      console.log(this.userIdParams);
      this.getNotificationSummary(this.userIdParams);
    })
  }

  getNotificationSummary(id: any) {
    this.custmservice.getUserNotificationSummary(id).subscribe({
      next: (data: any) => {
        this.notificationSummaryCount = data;
      }
    })
  }
  async openModal(element: any) {
    this.isOpen = true;
    this.campaignsDetail = element;

  }
}
