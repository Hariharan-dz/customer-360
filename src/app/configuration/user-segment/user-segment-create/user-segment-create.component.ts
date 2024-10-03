import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationUiService } from 'src/app/services/notification-ui.service';

import { CdkDragStart, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDragMove, CdkDragRelease, CdkDropList } from '@angular/cdk/drag-drop';
import { AnyObject } from 'chart.js/dist/types/basic';
import { SegmentViewPopupComponent } from 'src/app/segment-view-popup/segment-view-popup.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-user-segment-create',
  templateUrl: './user-segment-create.component.html',
  styleUrls: ['./user-segment-create.component.scss'],
})
export class UserSegmentCreateComponent implements OnInit {

  myForm!: FormGroup;
  userSegment: any = {
    rules: []
  };
  userSegmentId: any;
  userCount: any = -1;
  showInitialView: boolean = false;

  segmentGroups: any = [
    {
      "groupKey": "Transit",
      "groupValue": [
        {
          "attr": "browser_type",
          "name": "Browser",
          //  "field": "browser_type",
          "type": "enum",
          "description": "User Tags",
          "isPredefiendTag": false
        },
        {
          "attr": "platform",
          "name": "Device Type",
          //  "field": "platform",
          "type": "enum",
          "description": "User Tags",
          "isPredefiendTag": false
        },
        {
          "attr": "tags",
          "name": "Traffic Source",
          "field": "Traffic_Source",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        },
        {
          "attr": "tags",
          "name": "Landing page URL",
          "field": "Landing_Page_URL",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        }
      ]
    },
    {
      "groupKey": "Behavior",
      "groupValue": [
        {
          "attr": "tags",
          "name": "Time Spent",
          "field": "Time_Spent",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        },
        {
          "attr": "tags",
          "name": "Logged In",
          "field": "Is_Loggedin_User",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        },
        {
          "attr": "tags",
          "name": "Scroll",
          "field": "Scroll",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        }
      ]
    },
    {
      "groupKey": "Visit History",
      "groupValue": [
        {
          "attr": "tags",
          "name": "# of visits in a week",
          "field": "Visits_Per_Week",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        },
        {
          "attr": "tags",
          "name": "Products viewed",
          "field": "Products_Viewed",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        },
        {
          "attr": "tags",
          "name": "Product category",
          "field": "Product_Category",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        },
        {
          "attr": "tags",
          "name": "Product price",
          "field": "Product_Price",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        }
      ]
    },
    {
      "groupKey": "Purhcase History",
      "groupValue": [
        {
          "attr": "tags",
          "name": "Total Spent",
          "field": "Total_Spent",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        },
        {
          "attr": "tags",
          "name": "Last purchase date",
          "field": "Last_Purchase_Date",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        },
        {
          "attr": "tags",
          "name": "Cart items",
          "field": "Cart_Items",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        },
        {
          "attr": "tags",
          "name": "Cart amount",
          "field": "Cart_Amount",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        },
        {
          "attr": "tags",
          "name": "AOV (Average order value) ",
          "field": "AOV",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        },
        {
          "attr": "tags",
          "name": "LTV (Life time value)",
          "field": "LTV",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        }
      ]
    },
    {
      "groupKey": "Device Profile",
      "groupValue": [
        {
          "attr": "platform",
          "name": "Platform",
          //  "field": "Total_Spend",
          "type": "enum",
          "description": "User Platform",
          "isPredefiendTag": false
        },
        {
          "attr": "device_model",
          "name": "Device Model",
          //  "field": "Total_Spend",
          "type": "text",
          "description": "User Device Model",
          "isPredefiendTag": false
        },
        {
          "attr": "device_make",
          "name": "Device Make",
          //  "field": "Total_Spend",
          "type": "text",
          "description": "User Device Make",
          "isPredefiendTag": false
        },
        {
          "attr": "device_os",
          "name": "Device OS",
          //  "field": "Total_Spend",
          "type": "text",
          "description": "User Device OS",
          "isPredefiendTag": false
        }
      ]
    },
    {
      "groupKey": "User Profile",
      "groupValue": [
        {
          "attr": "all_users",
          "name": "All User",
          //  "field": "Total_Spend",
          "type": "all_users",
          "description": "All Users",
          "isPredefiendTag": false
        },
        {
          "attr": "age",
          "name": "Age",
          //  "field": "Total_Spend",
          "type": "number",
          "description": "User Age",
          "isPredefiendTag": false
        },
        {
          "attr": "gender",
          "name": "Gender",
          //  "field": "Total_Spend",
          "type": "enum",
          "description": "User Gender",
          "isPredefiendTag": false
        },
        {
          "attr": "language",
          "name": "Language",
          //  "field": "Total_Spend",
          "type": "text",
          "description": "User Language",
          "isPredefiendTag": false
        },
        {
          "attr": "role",
          "name": "Role",
          //  "field": "Total_Spend",
          "type": "enum",
          "description": "User role",
          "isPredefiendTag": false
        }
      ]
    },
    {
      "groupKey": "Tags",
      "groupValue": [
        {
          "attr": "tags",
          "name": "Tag",
          //  "field": "Total_Spend",
          "type": "tag",
          "description": "User Tags",
          "isPredefiendTag": true
        }
      ]
    }
  ]

  possibleEnumValue: any = {
    gender: [
      { name: "Male", value: "MALE" },
      { name: "Female", value: "FEMALE" }
    ],
    platform: [
      { name: "Android", value: "ANDROID" },
      { name: "IOS", value: "IOS" }
    ],
    role: [
      { name: "Admin", value: "ADMIN" },
      { name: "User", value: "USER" }
    ],
    browser_type: [
      { name: "Chrome", value: "CHROME" },
      { name: "Edge", value: "EDGE" },
      { name: "Safari", value: "SAFARI" },
      { name: "Firefox", value: "FIREFOX" },
      { name: "Opera", value: "OPERA" },
    ]
  };

  addFltr: boolean = true;
  orFltr: boolean = false;
  listOfTags: any; //attribut tags list
  isEditView: boolean = false;
  isCloneView: boolean = false;
  // showAddFilterIndex: number = -1;

  constructor(private notifiService: NotificationUiService, private actRouter: ActivatedRoute, private router: Router, private modalController: ModalController) { }

  isInitTriggered: boolean = false;
  ngOnInit() {
    this.init();
    this.getAllAttribute();
  }

  ionViewWillEnter() {
    this.init();
  }

  ionViewWillLeave() {
    this.notifiService.closeAllAlertCtrl();
  }

  init() {
    if (this.isInitTriggered) return;
    this.isInitTriggered = true;
    this.validateForm();
    this.actRouter.paramMap.subscribe((param: Params) => {
      this.userSegmentId = JSON.parse(param['get']('user_segment_id'));

      if (!this.userSegmentId) {
        this.userSegmentId = JSON.parse(param['get']('clone_user_segment_id'));
        if (this.userSegmentId) this.isCloneView = true;
      }
      if (this.userSegmentId != null) {
        if (!this.isCloneView) this.isEditView = true;
        this.getUserSegmentById(this.userSegmentId);
      } else this.showInitialView = true;
    })
  }

  getUserSegmentById(userSegmentId: any) {
    this.notifiService.showLoader();
    this.notifiService.getUserSegmentById(userSegmentId).subscribe({
      next: (userSegment: any) => {
        console.log(userSegment, 'sad')
        this.showInitialView = true;
        this.notifiService.hideLoader();
        if (this.isCloneView) this.notifiService.cleanClonedObject(userSegment, 'userSegment');
        this.userSegment = userSegment;
        this.getUserCountByRule();
        // this.openSegmentViewPopup(userSegment.rules, userSegment.name)
      },
      error: (err: any) => {
        this.notifiService.hideLoader();
        err = err.error || err;
        this.notifiService.toster.error(err.message || 'Failed');
      }
    });
  }

  async openSegmentViewPopup() {
    const modal = await this.modalController.create({
      component: SegmentViewPopupComponent,
      cssClass: 'view-user',
      componentProps: {
        usersegementRules: this.userSegment.rules,
        userName: this.userSegment.name
      },
      backdropDismiss: true
    });
    await modal.present();
  }


  // save action
  onSave() {
    try {
      if (!this.userSegment.name) throw "Please enter Name";
      for (let obj of this.userSegment.rules) {
        for (let data of obj) {
          if (data.attr === 'age' && ((data.cond == 'BETWEEN' && data.end_value < 0 && data.start_value < 0) || (data.cond != 'BETWEEN' && data.value < 0))) throw "Age should be positive"
        }
      }
      this.isValidUserSegmentRule(this.userSegment);
      if (this.isEditView) {
        this.notifiService.updateUserSegmentById(this.userSegmentId, this.userSegment).subscribe({
          next: (e: any) => {
            this.notifiService.hideLoader();
            this.notifiService.toster.success('User Segment Updated Successfully!');
            this.router.navigate(['/segments']);
          },
          error: (err: any) => {
            this.notifiService.hideLoader();
            err = err.error || err;
            this.notifiService.toster.error(err.message || 'User Segment Update Failed');
          }
        });
      } else {
        this.notifiService.createUserSegment(this.userSegment).subscribe({
          next: (e: any) => {
            this.notifiService.hideLoader();
            this.notifiService.toster.success('User Segment Created Successfully!');
            this.router.navigate(['/segments']);
          },
          error: (err: any) => {
            this.notifiService.hideLoader();
            err = err.error || err;
            this.notifiService.toster.error(err.message || 'User Segment Create Failed');
          }
        })
      }
    } catch (e) {
      this.notifiService.toster.error(e);
    }
  }



  //onCancel popup
  async onCancel() {
    this.notifiService.showCancelConfirmation(['/segments']);
  }


  // logics for and and or conditions -------------------------

  addAndCondition(data: any, filterIndex: number) {
    var obj: any = { name: data.name, attr: data.attr, type: data.type };
    if (data.field) {
      obj.field = data.field;
      obj.isPredefiendTag = true;
      this.updateFieldType(obj);
    }
    if (filterIndex == -1) {
      this.userSegment.rules.push([obj]);
    } else {
      this.userSegment.rules[filterIndex].push(obj);
    }
    this.getUserCountByRule();
  }

  // addFilter(parentIndex: number) {
  //   this.addFltr = true;
  //   this.orFltr = false;
  //   if (this.showAddFilterIndex != -1) {
  //     if (this.userSegment.rules[this.showAddFilterIndex].length == 0) {
  //       this.userSegment.rules.splice(this.showAddFilterIndex, 1);
  //     }
  //   }
  //   this.showAddFilterIndex = parentIndex;
  // }

  addOrCond() {
    // this.orFltr = true;
    // this.addFltr = false;
    if (this.userSegment.rules.find((rule: any) => rule.length == 0) == null) {
      this.userSegment.rules.push([]);
    }
    // this.showAddFilterIndex = this.userSegment.rules.length - 1;
  }

  removeOrCond(index: number) {
    this.userSegment.rules.splice(index, 1);
  }

  removeAndCondition(parIndex: any, currIndex: any) {
    this.userSegment.rules[parIndex].splice(currIndex, 1);
    if (this.userSegment.rules[parIndex].length == 0) {
      // if (this.showAddFilterIndex != -1 && parIndex != this.showAddFilterIndex
      //   && this.userSegment.rules[this.showAddFilterIndex].length == 0) {
      //   this.userSegment.rules.splice(this.showAddFilterIndex, 1);
      // }
      this.userSegment.rules.splice(parIndex, 1);
      // this.showAddFilterIndex = -1;
    }
    this.getUserCountByRule();
  }

  removeCardContainer(parIndex: number) {
    if (this.userSegment.rules[parIndex].length == 0) {
      this.userSegment.rules.splice(parIndex, 1);
    }
    // this.showAddFilterIndex = -1;
  }

  // validation process***

  validateForm() {
    this.myForm = new FormGroup({
      name: new FormControl(this.userSegment.name, [Validators.required]),
      age: new FormControl(this.userSegment.age, {
        validators: [Validators.min(0)]
      }),
      ageStart: new FormControl(this.userSegment.age, {
        validators: [Validators.min(0)]
      }),
      ageEnd: new FormControl(this.userSegment.age, {
        validators: [Validators.min(0)]
      })
    });
  }

  isValidUserSegmentRule(userSegment: any) {
    if (userSegment.rules.length > 0) {
      userSegment.rules.forEach((rule: any) => {
        if (rule.length > 0) {
          rule.forEach((obj: any) => {
            console.log("This is count" + obj.cond + "this is value" + obj.value);

            switch (obj.type) {
              case "text":
              case "enum":
                if (!obj.cond) throw "Please select condition for the rule. Attribute Name = " + obj.name;
                if (!obj.value) throw "Please enter value for the rule. Attribute Name = " + obj.name;
                break;

              case "tag":
                if (!obj.field) throw "Please select field for the rule. Attribute Name = " + obj.name;
                if (!obj.cond) throw "Please select condition for the rule. Attribute Name = " + obj.name;
                if (obj.cond == 'BETWEEN') {
                  if (!obj.start_value) throw "Please select start value for the rule. Tag Name = " + obj.name;
                  if (!obj.end_value) throw "Please select end value for the rule. Tag Name = " + obj.name;
                } else if (!(obj.cond == 'EXISTS' || obj.value || typeof(obj.value)=="boolean")) throw "Please enter value for the rule. Attribute Name = " + obj.name;
                break;

              case "number":
                if (obj.cond == 'BETWEEN') {
                  if (!obj.start_value) throw "Please select start value for the rule. Attribute Name = " + obj.name;
                  if (!obj.end_value) throw "Please select end value for the rule. Attribute Name = " + obj.name;
                } else {
                  if (!obj.cond) throw "Please select condition for the rule. Attribute Name = " + obj.name;
                  if (!obj.value) throw "Please enter value for the rule. Attribute Name = " + obj.name;
                }
                break;

              case "all_users":
                break;

              default: throw "Invalid Type";
            }
          });
        } else throw "Please select rule for OR condition";
      });
    } else throw "Please select rule";
    return true;
  }

  getUserCountByRule() {
    try {
      this.isValidUserSegmentRule(this.userSegment);
      this.userCount = null;
      this.notifiService.getUserCountByRules(this.userSegment).subscribe({
        next: (data: any) => {
          this.userCount = data.userCount;
        },
        error: (err: any) => {
          err = err.error || err;
          this.notifiService.toster.error(err.message);
        }
      });
    }
    catch (e) {
      this.userCount = -1;
    }
  }

  // get all attributes for tags dropdown
  getAllAttribute() {
    this.notifiService.getAllAttribute().subscribe({
      next: (data: any) => {
        this.listOfTags = data;
      },
      error: (err: any) => {
        err = err.error || err;
      }
    });
  }

  updateFieldType(data?: any) {
    console.log(data, 'ddd');
    data.field_type = ((this.listOfTags.find(item => item.name === data.field) || {}).type) || "TEXT";
  }
  formatDate(date) {
    this.notifiService.dateFormat(date);
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      //moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    // if (event.previousContainer.data) {
    //   this.userSegmentDetails = this.userSegmentDetails.filter((f) => !f.temp);
    // }
  }

  dragStarted(event: any) {

  }

  dragEnded(event: any, attr: any) {
    var target = event.event.target;

    if (target.classList.contains("drop-area")) {
      this.addAndCondition(attr, parseInt(target.querySelector("span").innerHTML));
    }

  }

  dragMoved(event: any) {
    console.log("dragMoved");
  }


  // exited(event: any) {
  //   const currentIdx = event.container.data.findIndex(
  //     (f) => f.id === event.item.data.id
  //   );
  //   this.userSegmentDetails.splice(currentIdx + 1, 0, {
  //     ...event.item.data,
  //     temp: true,
  //   });
  // }
  // entered() {
  //   this.userSegmentDetails = this.userSegmentDetails.filter((f) => !f.temp);
  // }
}
