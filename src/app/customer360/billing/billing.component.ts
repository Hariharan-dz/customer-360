import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Customer360UiService } from 'src/app/services/customer360-ui.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  isModalOpen = false;
  isEditModal = false;
  billDetails: any = [];

  userIdParams: any;
  isInitTriggered: any;

  account: any = {
    paymentPlan: [{}]
  };
  billSummary: any = {};

  billHistoryDetail: any = {
    name: "billHistory",
    pk: "id",
    search: "",
    needServerSidePagination: false,
    isPageNationDisable: false,
    isPopoverDisable: true,
    fields: [
      { name: "Bill number", attr: "bill_no", type: "CLICK", clickFunction: (el: any) => this.openModalOpen(el) },
      { name: "BILLING PERIOD", attr: "billing_period" },
      { name: "BILLING AMOUNT", attr: "billing_amount" },
      { name: "STATUS", attr: "status" },
      { name: "DUE DATE", attr: "due_date" },
      { name: "PAID DATE", attr: "paid_date" },
      { name: "", attr: "billingicon", type: "IMAGE_LIST" },
    ],
    getRecord: async (params: any) => {
      const billingResp: any = await this.customer360UiService.getBillingAccountDetailsByCustomer(this.userIdParams, params).toPromise();
      const customerBills = billingResp.financialAccount.customerBill;
      this.billSummary = customerBills.find((data: any) => data.state == "due");
      this.account = billingResp;
      return customerBills;
    },
    buildData: (billingtList: any) => {
      return billingtList.map((billing: any) => {
        return {
          id: billing.id,
          bill_no: billing.billNo,
          billing_period: this.datePipe.transform(billing.billing_period_start_time, this.customer360UiService.date_time_format),
          billing_amount: billing.amount_due_value,
          status: billing.state,
          due_date: this.datePipe.transform(billing.paymentDueDate, this.customer360UiService.date_time_format),
          paid_date: this.datePipe.transform(billing.paymentDueDate, this.customer360UiService.date_time_format),
          billingicon: [
            { title: "File", name: 'document-text-outline' },
            { title: "mail", name: 'mail-outline' }
          ],
          additionalData: { billing }
        };
      });
    }
  };

  constructor(private actRouter: ActivatedRoute, public customer360UiService: Customer360UiService, private datePipe: DatePipe) { }
  init() {
    this.actRouter.paramMap.subscribe((param: Params) => {
      this.userIdParams = JSON.parse(param['get']('user_id'));
      if (!this.isInitTriggered) {
        this.isInitTriggered = true;
      }
    })
  }
  ngOnInit() {
    this.init();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  async openModalOpen(el: any) {
    this.isEditModal = true;
    this.billDetails = el.additionalData.billing;
  }

}
