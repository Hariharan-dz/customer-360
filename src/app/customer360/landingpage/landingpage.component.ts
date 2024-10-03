import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Customer360UiService } from 'src/app/services/customer360-ui.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
})
export class LandingpageComponent implements OnInit {

  userType: any = 'NEW_USER';
  userDetails: any = 1;
  userIdParams: any;
  customer360Tab: any = ['Overview', 'Usage and Balance', 'Billing', 'Tickets', 'Notifications', 'Orders'];
  selectedList: any;
  
  constructor(private custmservice: Customer360UiService, private actRouter: ActivatedRoute) {
    this.selectedList = 'Overview';
  }

  ngOnInit() {
    this.init();
  }
  
  init() {
    this.actRouter.paramMap.subscribe((param: Params) => {
      this.userIdParams = JSON.parse(param['get']('user_id'));
      this.getUserDetailsById(this.userIdParams);
    })
  }

  showComponent(value: any) {
    this.selectedList = value;
  }

  getUserDetailsById(id: any) {
    // this.custmservice.showLoader();
    this.custmservice.getUserDetailsById(id).subscribe({
      next: (userDetails: any) => {
        // this.custmservice.hideLoader();
        this.userDetails = userDetails;
        this.userType = ((userDetails.tags || []).find((tag: any) => tag.field == "User_Type" ) || {}).value || "NEW_USER";

      },
      error: (err: any) => {
        // this.custmservice.hideLoader();
        err = err.error || err;
        // this.custmservice.toster.error(err.message || 'Failed');
      }
    })
  }

}
