import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Observable, subscribeOn, Subscriber } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class Customer360UiService {

  URL = environment.URL;
  date_format: string = 'dd-MMM yy';
  time_format: string = 'hh:mm a';
  date_time_format: string = 'dd-MMM yy hh:mm a';
  themeName: string = 'dot-mobile';

  constructor(private http: HttpClient) { }

  getAllRequestTicket(params: any) {
    return new Observable((subscriber: any) => {
      subscriber.next([
        {
          "ticket_no": "1", "ticket_type": "Incident", "category": "Network issue", "description": "Detailed description",
          "created_on": "01/01/2022", "assignee": "John Connor", "status": "Resolved"
        },
        {
          "ticket_no": "2", "ticket_type": "problem", "category": "Plan issue", "description": "Detailed description",
          "created_on": "01/01/2022", "assignee": "John Connor", "status": "Resolved"
        },
        {
          "ticket_no": "3", "ticket_type": "service request", "category": "Network issue", "description": "Detailed description",
          "created_on": "01/01/2022", "assignee": "John Connor", "status": "Inprogress"
        },
        {
          "ticket_no": "4", "ticket_type": "incident", "category": "Plan issue", "description": "Detailed description",
          "created_on": "01/01/2022", "assignee": "John Connor", "status": "Inprogress"
        },
        {
          "ticket_no": "5", "ticket_type": "service request", "category": "Plan issue", "description": "Detailed description",
          "created_on": "01/01/2022", "assignee": "John Connor", "status": "Inprogress"
        },
        {
          "ticket_no": "6", "ticket_type": "incident", "category": "Network issue", "description": "Detailed description",
          "created_on": "01/01/2022", "assignee": "John Connor", "status": "Resolved"
        }
      ]);
      subscriber.complete();
    });
  }
  getAllBillHistory(params: any) {
    return new Observable((Subscriber: any) => {
      Subscriber.next([
        { "bill_no": "90560809", "billing_period": "Febrary,2022", "billing_amount": "$199.00", "status": "pending", "due_date": "15/02/2022", "paid_date": "N/A" },
        { "bill_no": "90560809", "billing_period": "Febrary,2022", "billing_amount": "$199.00", "status": "pending", "due_date": "15/02/2022", "paid_date": "24/05/2022" },
        { "bill_no": "90560809", "billing_period": "Febrary,2022", "billing_amount": "$199.00", "status": "pending", "due_date": "15/02/2022", "paid_date": "N/A" },
        { "bill_no": "90560809", "billing_period": "Febrary,2022", "billing_amount": "$199.00", "status": "pending", "due_date": "15/02/2022", "paid_date": "N/A" },
        { "bill_no": "90560809", "billing_period": "Febrary,2022", "billing_amount": "$199.00", "status": "pending", "due_date": "15/02/2022", "paid_date": "N/A" },
        { "bill_no": "90560809", "billing_period": "Febrary,2022", "billing_amount": "$199.00", "status": "pending", "due_date": "15/02/2022", "paid_date": "N/A" },
      ]);
      Subscriber.complete();
    })
  }

  getAllTemplate(params: any) {
    return new Observable((subscriber: any) => {
      subscriber.next([
        {
          "id": 90560809,
          "trans_id": "152557537",
          "purs_item": "Extra data add-on plan",
          "amount": "CAD 240.00",
          "updatedAt": "2023-02-20T09:50:58.000Z",
          "status": "Completed",
        },
        {
          "id": 90560809,
          "trans_id": "152557537",
          "purs_item": "Extra data add-on plan",
          "amount": "CAD 240.00",
          "updatedAt": "2023-02-20T09:50:58.000Z",
          "status": "Completed",
        },
        {
          "id": 90560809,
          "trans_id": "152557537",
          "purs_item": "Extra data add-on plan",
          "amount": "CAD 240.00",
          "updatedAt": "2023-02-20T09:50:58.000Z",
          "status": "Completed",
        },
        {
          "id": 90560809,
          "trans_id": "152557537",
          "purs_item": "Extra data add-on plan",
          "amount": "CAD 240.00",
          "updatedAt": "2023-02-20T09:50:58.000Z",
          "status": "Completed",
        },
        {
          "id": 90560809,
          "trans_id": "152557537",
          "purs_item": "Extra data add-on plan",
          "amount": "CAD 240.00",
          "updatedAt": "2023-02-20T09:50:58.000Z",
          "status": "Completed",
        },
        {
          "id": 90560809,
          "trans_id": "152557537",
          "purs_item": "Extra data add-on plan",
          "amount": "CAD 240.00",
          "updatedAt": "2023-02-20T09:50:58.000Z",
          "status": "Completed",
        },
        {
          "id": 90560809,
          "trans_id": "152557537",
          "purs_item": "Extra data add-on plan",
          "amount": "CAD 240.00",
          "updatedAt": "2023-02-20T09:50:58.000Z",
          "status": "Completed",
        }
      ]);
      subscriber.complete();
    });
  }


  getAllcampaigns(params: any) {
    return new Observable((subscriber: any) => {
      subscriber.next([
        {
          "id": 90560809,
          "notificationType": "152557537",
          "description": "Extra data add-on plan",
          "channels": ["EMAIL"],
          "mode": "CAD 240.00",
          "datetime": "2023-02-20T09:50:58.000Z",
          "status": "Completed",
        },
        {
          "id": 90560809,
          "notificationType": "152557537",
          "description": "Extra data add-on plan",
          "channels": ["MOBILE_PUSH"],
          "mode": "CAD 240.00",
          "datetime": "2023-02-20T09:50:58.000Z",
          "status": "Completed",
        },
        {
          "id": 90560809,
          "notificationType": "152557537",
          "description": "Extra data add-on plan",
          "channels": ["EMAIL"],
          "mode": "CAD 240.00",
          "datetime": "2023-02-20T09:50:58.000Z",
          "status": "Completed",
        },
        {
          "id": 90560809,
          "notificationType": "152557537",
          "description": "Extra data add-on plan",
          "channels": ["WEB_PUSH"],
          "mode": "CAD 240.00",
          "datetime": "2023-02-20T09:50:58.000Z",
          "status": "Completed",
        },
        {
          "id": 90560809,
          "notificationType": "152557537",
          "description": "Extra data add-on plan",
          "channels": ["EMAIL"],
          "mode": "CAD 240.00",
          "datetime": "2023-02-20T09:50:58.000Z",
          "status": "Completed",
        },

      ]);
      subscriber.complete();
    });
  }


  getAlluserdetils(params: any) {
    return new Observable((subscriber: any) => {
      subscriber.next([
        {
          "id": 90560809,
          "username": "john doe",
          "email": "john@email.com",
          "phone": "phone",
          "dob": "20.04.1994",
          "address": "Houston, TX, United States",
        },
        {
          "id": 90560809,
          "username": "john doe",
          "email": "john@email.com",
          "phone": "phone",
          "dob": "20.04.1994",
          "address": "Houston, TX, United States",
        },
        {
          "id": 90560809,
          "username": "john doe",
          "email": "john@email.com",
          "phone": "phone",
          "dob": "20.04.1994",
          "address": "Houston, TX, United States",
        },
        {
          "id": 90560809,
          "username": "john doe",
          "email": "john@email.com",
          "phone": "phone",
          "dob": "20.04.1994",
          "address": "Houston, TX, United States",
        },
        {
          "id": 90560809,
          "username": "john doe",
          "email": "john@email.com",
          "phone": "phone",
          "dob": "20.04.1994",
          "address": "Houston, TX, United States",
        },
        {
          "id": 90560809,
          "username": "john doe",
          "email": "john@email.com",
          "phone": "phone",
          "dob": "20.04.1994",
          "address": "Houston, TX, United States",
        },
        {
          "id": 90560809,
          "username": "john doe",
          "email": "john@email.com",
          "phone": "phone",
          "dob": "20.04.1994",
          "address": "Houston, TX, United States",
        },
        {
          "id": 90560809,
          "username": "john doe",
          "email": "john@email.com",
          "phone": "phone",
          "dob": "20.04.1994",
          "address": "Houston, TX, United States",
        },
      ]);
      subscriber.complete();
    });
  }

  // overview pages
  // table 1
  openOrders(params: any) {
    return new Observable((subscriber: any) => {
      subscriber.next([
        {
          "task_nr": 9898989,
          "agent_id": 23440,
          "agent_name": "John Wick",
          "date_time": "16/03/2019 08:00:00",
          "test_summary": "Booking Appoinment",
          "status": "Open"
        },
        {
          "task_nr": 9898989,
          "agent_id": 23440,
          "agent_name": "John Wick",
          "date_time": "16/03/2019 08:00:00",
          "test_summary": "Booking Appoinment",
          "status": "Open"
        },
        {
          "task_nr": 9898989,
          "agent_id": 23440,
          "agent_name": "John Wick",
          "date_time": "16/03/2019 08:00:00",
          "test_summary": "Booking Appoinment",
          "status": "Open"
        },
        {
          "task_nr": 9898989,
          "agent_id": 23440,
          "agent_name": "John Wick",
          "date_time": "16/03/2019 08:00:00",
          "test_summary": "Booking Appoinment",
          "status": "Open"
        },
        {
          "task_nr": 9898989,
          "agent_id": 23440,
          "agent_name": "John Wick",
          "date_time": "16/03/2019 08:00:00",
          "test_summary": "Booking Appoinment",
          "status": "Open"
        },
        {
          "task_nr": 9898989,
          "agent_id": 23440,
          "agent_name": "John Wick",
          "date_time": "16/03/2019 08:00:00",
          "test_summary": "Booking Appoinment",
          "status": "Open"
        },
        {
          "task_nr": 9898989,
          "agent_id": 23440,
          "agent_name": "John Wick",
          "date_time": "16/03/2019 08:00:00",
          "test_summary": "Booking Appoinment",
          "status": "Open"
        },
        {
          "task_nr": 9898989,
          "agent_id": 23440,
          "agent_name": "John Wick",
          "date_time": "16/03/2019 08:00:00",
          "test_summary": "Booking Appoinment",
          "status": "Open"
        },
        {
          "task_nr": 9898989,
          "agent_id": 23440,
          "agent_name": "John Wick",
          "date_time": "16/03/2019 08:00:00",
          "test_summary": "Booking Appoinment",
          "status": "Open"
        },
        {
          "task_nr": 9898989,
          "agent_id": 23440,
          "agent_name": "John Wick",
          "date_time": "16/03/2019 08:00:00",
          "test_summary": "Booking Appoinment",
          "status": "Open"
        }
      ]);
      subscriber.complete();
    });
  }

  //customer360 -> overview
  getUserDetailsById(id: any) {
    return this.http.get(`${this.URL}/cdp/user/${id}`);
  }

  // last purchase date api
  lastPurchaseDate(id: any) {
    return this.http.get(`${this.URL}/sales-order/last-purchase/${id}`)
  }

  //open order status
  getAllOpenOrderStatusById(id: any, params = {}) {
    return this.http.get(`${this.URL}/sales-order/open-orders/${id}`, { params })
  }

  getTaskDetailsByAssignee(assignee: any, status: any) {
    return this.http.get(`${this.URL}/wqm/task/assignee/${assignee}/status/${status}`)
  }

  getCustomerOpenTask(id: any) {
    return this.http.get(`${this.URL}/wqm/task/customer-id/${id}`, { params: { status: 'Open' } });
  }


  // table 2
  gettaskOrders(params = {}) {
    return this.http.get<any>(`${this.URL}/wqm/task`, { params })
  }

  //ticket page
  getAllTicket(params: any) {
    return this.http.get(`${this.URL}/itsm/ticket`);
    // return new Observable((subscriber: any) => {
    //   subscriber.next([
    // {
    //   "ticket_no": 90560809,
    //   "ticket_type": "Incident",
    //   "category": "Network issue",
    //   "description": "Detailed description",
    //   "created_on": "01/01/2022",
    //   "assignee": "John Connor",
    //   "priority": "High",
    //   "status": "Resolved"
    // },
    //     {
    //       "tkt_number": "5",
    //       "ticket_type": "Service Request",
    //       "category": "Plan change",
    //       "status_reason": "High",
    //       "priority": null,
    //       "description": "Details taks description",
    //       "created_date": "2023-01-01",
    //       "assignee": "John Connor",
    //     },

    //   ]);
    //   subscriber.complete();
    // });
  }
  getTaskCount() {
    return this.http.get<any>(`${this.URL}/wqm/task/summary`)
  }

  // WQM work-queue
  saveWQM(data: any) {
    return this.http.post<any>(`${this.URL}/wqm/task/summary`, data);
  }

  //task
  createTask(data: any) {
    return this.http.post<any>(`${this.URL}/wqm/task`, data);
  }
  // user segment screen
  getAllUserSegment(params = {}) {
    return this.http.get(`${this.URL}/user-segment-rule`, { params });
  }

  createTicket(data: any) {
    return this.http.post<any>(`${this.URL}/ticket`, data)
  }

  //ticket page
  getAllTicketsById(id: any, params = {}) {
    return this.http.get(`${this.URL}/itsm/ticket/customer/${id}`, { params })
  }

  //notification page
  getNotificationHistoryByUserIdWithStatus(user_id: any, params: any) {
    return this.http.get(`${this.URL}/history/user-id/${user_id}`, { params });
  }

  // chart count api
  getNotificationSummary(id: any) {
    return this.http.get(`${this.URL}/notification/${id}/summary`);
  }

  getUserNotificationSummary(id: any) {
    return this.http.get(`${this.URL}/notification/user-id/${id}/summary`);
  }

  //order tab page
  getAllSalesOrder( params: any) {
    return this.http.get(`${this.URL}/sales-order`, { params });
  }

  getSalesOrderDetails(id: any, params: any) {
    return this.http.get(`${this.URL}/sales-order/customer/${id}`, { params });
  }

  getBillingAccountDetailsByCustomer(id: any, params: any) {
    return this.http.get(`${this.URL}/billing/account/customer/${id}`, { params });
  }

  getUsageDetailsByCustomerId(id: any, params: any) {
    return this.http.get(`${this.URL}/usage/customer/${id}`, { params });
  }

  getInteractionHistoryDetailsByCustomerId(userIdParams: any, params: any) {
    return this.http.get(`${this.URL}/sales-order/interaction-history/customer/${userIdParams}`, { params });
  }




  getAllBillHistoryDetail(params = {}) {
    return new Observable((subscriber: any) => {
      subscriber.next(
        {
          "id": 1,
          "amount_due_unit": "CAD",
          "amount_due_value": 234.00,
          "billDate": "2019-01-10T00:00Z",
          "billNo": "434mbb34439",
          "billing_period_starttime": "2019-01-10T00:00Z",
          "billing_period_end_time": "2019-01-10T00:00Z",
          "category": "normal",
          "href": "",
          "lastUpdate": "2019-01-10T00:00Z",
          "nextBillDate": "2019-01-10T00:00Z",
          "paymentDueDate": "2019-01-10T00:00Z",
          "remainingAmount_unit": "CAD",
          "remainingAmount_value": 10.00,
          "runType": "onCycle",
          "state": "due",
          "tax_ExcludedAmount_unit": "CAD",
          "tax_ExcludedAmount_value": 220.00,
          "tax_includedAmount_unit": "CAD",
          "tax_includedAmount_value": 234.00
        }
      );
      subscriber.complete();
    });
  }
}

