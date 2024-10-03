import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Customer360UiService } from '../services/customer360-ui.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss'],
})
export class NewTicketComponent implements OnInit {
  newTicketTableDetails: any = {
    name: "ticketList",
    pk: "id",
    search: "",
    needServerSidePagination: false,
    isPageNationDisable: true,
    fields: [
      { name: "TICKET NO", attr: "tkt_number", width: "135", type: "LINK" },
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
  constructor(private datePipe: DatePipe, public custmservice: Customer360UiService) { }

  ngOnInit() { }
  numericOnly(event: any): boolean {
    let pattern = /^([0-9])$/;
    let result = pattern.test(event.key);
    return result;
  }
}
