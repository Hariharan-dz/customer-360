import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Customer360UiService } from 'src/app/services/customer360-ui.service';

@Component({
  selector: 'app-interaction-history',
  templateUrl: './interaction-history.component.html',
  styleUrls: ['./interaction-history.component.scss'],
})
export class InteractionHistoryComponent implements OnInit {

  historyData: any = [
    /*
    {
      "id": 1, "channel": "EMAIL", "title": "Email Raised",
      "summary": "Internet not working for last two days",
      "event_date": "23rd Feb, 20:12", "customer_id": 1,
    },
    {
      "id": 2, "channel": "PHONE", "title": "Ticket Raised",
      "summary": "Internet not working for last two days",
      "event_date": "23rd Feb, 20:12", "customer_id": 1,
      tags: [{ 'key': 'Ticket Status', 'value': 'Completed' }]
    },
    {
      "id": 3, "channel": "TWEET", "title": "Tweet",
      "summary": "Internet not working for last two days",
      "event_date": "23rd Feb, 20:12", "customer_id": 1,
    },
    {
      "id": 3, "channel": "CHATBOT", "title": "Chatbot",
      "summary": "Internet not working for last two days",
      "event_date": "23rd Feb, 20:12", "customer_id": 1,
      tags: [{ 'key': 'Ticket Status', 'value': 'Pending' }]
    },
    */

  ]
  userIdParams: any;

  constructor(private actRouter: ActivatedRoute, public custmservice: Customer360UiService) { }

  ngOnInit() {
    this.init();
   }
   
  init() {
    this.actRouter.paramMap.subscribe((param: Params) => {
      this.userIdParams = JSON.parse(param['get']('user_id'));
      // console.log(this.userIdParams);
      this.getInteractionHistoryDetails();
    })
  }
  getInteractionHistoryDetails() {
    this.custmservice.getInteractionHistoryDetailsByCustomerId(this.userIdParams, null).subscribe({
      next: (data: any) => {
        // this.custmservice.hideLoader();
        this.historyData = data;
      },
      error: (err: any) => {
        // this.custmservice.hideLoader();
        err = err.error || err;
        // this.custmservice.toster.error(err.message || 'Failed');
      }
    });
  }

}
