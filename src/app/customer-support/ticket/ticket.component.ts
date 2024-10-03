import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Customer360UiService } from 'src/app/services/customer360-ui.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {

  ticket: any = {};
  isViewTicket = false;
  isCreateTicketModel = false;

  tickets: any = {
    name: "ticketList",
    pk: "id",
    search: "",
    needServerSidePagination: false,
    isPageNationDisable: true,
    fields: [
      { name: "TICKET NO", attr: "tkt_number", width: "135", type: "CLICK", clickFunction: (el: any) => this.setOpen() },
      { name: "TICKET TYPE", attr: "ticket_type", width: "135" },
      { name: "CATEGORY", attr: "category", width: "135" },
      { name: "DESCRIPTION", attr: "description", width: "175" },
      { name: "CREATED ON", attr: "created_date", width: "135" },
      { name: "ASSIGNEE", attr: "assignee", width: "135" },
      { name: "PRIORITY", attr: "priority", width: "100" },
      { name: "STATUS", attr: "status", width: "100" }
    ],
    actions: [
    ],
    getRecord: (params: any) => this.custmservice.getAllTicket(params),
    buildData: (ticketList: any) => {
      return ticketList.map((ticket: any) => {

        return {
          tkt_number: ticket.tkt_number,
          ticket_type: ticket.ticket_type,
          category: ticket.category,
          description: ticket.description,
          created_date: this.datePipe.transform(ticket.created_date, this.custmservice.date_format),
          assignee: ticket.assignee,
          priority: ticket.priority,
          status: ticket.status,
          click: {

          },
          link: {
            id: '/configuration/template/' + ticket.tkt_number
          },
          action: {
            edit: '//' + ticket.tkt_number,
            clone: '//' + ticket.tkt_number,
          },
          additionalData: {
            category_id: ticket.tkt_number
          }
        };
      });
    }
  };
  constructor(private datePipe: DatePipe, private custmservice: Customer360UiService, private actRouter: ActivatedRoute) { }


  ngOnInit() {
    this.init()
  }
  init() {

  }
  async setOpen(isOpen?: boolean) {
    this.isViewTicket = true;
  }

  saveTicket() {
  }
  cancel() {

  }
}
