import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Customer360UiService } from '../services/customer360-ui.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  campaignsTableDetails: any = {
    name: "userdetails",
    pk: "id",
    search: "",
    needServerSidePagination: false,
    fields: [
      { name: "ID", attr: "id", width: "75", type: "LINK" },
      { name: "Username", attr: "username", width: "175" },
      { name: "Email", attr: "email", width: "175" },
      { name: "Phone", attr: "phone", width: "175" },
      { name: "DOB", attr: "dob", width: "175" },
      { name: "Address", attr: "address", width: "175" },
    ],
    actions: [
      { name: 'Edit', attr: "edit" },
      { name: 'Clone', attr: "clone" },
      // { name: 'Disable', clickFunction: (el: any) => this.confirmDelete(el, 'disabled') }
    ],

    getRecord: (params: any) => this.custmservice.getAlluserdetils(params),
    buildData: (userdetails: any) => {
      return userdetails.map((userdetails: any) => {
        return {
          id: userdetails.id,
          username: userdetails.username,
          email: userdetails.email,
          phone: userdetails.phone,
          dob: userdetails.dob,
          address: userdetails.address,
          link: {
            id: '/customer'
          },
          action: {
            // edit: '/configuration/campaigns/' + userdetails.id,
            // clone: '/configuration/campaigns/clone/' + userdetails.id,
          },
          additionalData: {
            category_id: userdetails.category_id
          }
        };
      });
    }
  };
  constructor(private datePipe: DatePipe, private custmservice: Customer360UiService) { }

  ngOnInit() { }

}
