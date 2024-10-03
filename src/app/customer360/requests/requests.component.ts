import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Customer360UiService } from '../../services/customer360-ui.service';
import { TableComponent } from '../../table/table.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  isModalOpen = false;
  isEditModal = false;
  userTicket: any = [];

  userTickets: any;
  userIdParams: any;

  requestTableDetails: any = {
    name: "request",
    pk: "id",
    needServerSidePagination: false,
    fields: [
      { name: "TICKET NO", attr: "tkt_number", type: "CLICK", clickFunction: (el: any) => this.openModalOpen(el) },
      { name: "TICKET TYPE", attr: "ticket_type" },
      { name: "CATEGORY", attr: "category" },
      { name: "DESCRIPTION", attr: "description" },
      { name: "CREATED ON", attr: "created_date" },
      { name: "ASSIGNEE", attr: "assign_edto" },
      { name: "STATUS", attr: "status" }
    ],
    getRecord: (params: any) => this.customer360UiService.getAllTicketsById(this.userIdParams, params),
    buildData: (requestList: any) => {
      return requestList.map((request: any) => {
        console.log(request);
        return {
          tkt_number: request.tkt_number,
          ticket_type: request.ticket_type,
          category: request.category,
          description: request.description,
          // created_on: this.datePipe.transform(request.created_on, this.customer360UiService.date_time_format),
          created_on: request.created_on,
          assignee: request.assignee,
          status: request.status
        };
      });
    }
  };

  campaignsChart: any = {
    series: [56, 42, 26, 18],
    colors: ['#f50c21', '#85016D', '#FE6E01', '#41C0BF'],
    chart: {
      type: 'donut',
      height: 100,
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

  initiatedTickets: any = {
    series: [86, 26],
    colors: ['#A1CAF9', ' #6495ED'],
    chart: {
      type: 'donut',
      height: 100,
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
                return 56 + 12;
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
    labels: ['Problem Ticket - 48', 'Service Request - 28'],
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


  @ViewChild('request_grid') requestGrid: TableComponent | undefined;
  constructor(
    public customer360UiService: Customer360UiService, private datePipe: DatePipe,
    private custmservice: Customer360UiService, private actRouter: ActivatedRoute) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.actRouter.paramMap.subscribe((param: Params) => {
      this.userIdParams = JSON.parse(param['get']('user_id'));
      console.log(this.userIdParams);
      // this.getAllTicketsById(this.userIdParams);
    });
  }
  // getAllTicketsById(id: any) {
  //   // this.custmservice.showLoader();
  //   this.custmservice.getAllTicketsById(id).subscribe({
  //     next: (ticket: any) => {
  //       // this.custmservice.hideLoader();
  //       this.userTickets = ticket;
  //     },
  //     error: (err: any) => {
  //       // this.custmservice.hideLoader();
  //       err = err.error || err;
  //       // this.custmservice.toster.error(err.message || 'Failed');
  //     }
  //   })
  // }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  async openModalOpen(el: any) {
    this.isEditModal = true;
    this.userTicket = el;
  }

}
