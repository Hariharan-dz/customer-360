import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { type } from 'os';
import { NotificationUiService } from 'src/app/services/notification-ui.service';
import { SwiperOptions, Swiper } from 'swiper';
import { SwiperComponent } from 'swiper/angular';



@Component({
  selector: 'app-user-profileview',
  templateUrl: './user-profileview.component.html',
  styleUrls: ['./user-profileview.component.scss'],
})
export class UserProfileviewComponent implements OnInit {

  @ViewChild('swiper') swiper: any;
  config: SwiperOptions = {
    slidesPerView: 'auto',
    effect: 'fade',
    allowTouchMove: false
  };
  date: any;
  isShow = false;
  selectedPreference: string = 'EMAIL';
  user: any = {};
  userProfileId: any;
  isEditView: boolean = false;
  preferenceDetails: any = {
    email: 0,
    phone: 0,
    app: 0,
    address: 0,
  };
  attributes: any;
  attrListDetails: any = {
    EMAIL: "contact_email_list",
    PHONE: "contact_phone_list",
    PUSH: "contact_app_list",
    ADDRESS: "contact_address_list"
  }
  sliderIndex: number = 0;
  profile: any = {};
  fieldDetails: any = {
    EMAIL: [
      { name: "Email", attr: "email", type: "text" },
      { name: "Data Source", attr: "data_source", type: "text", isReadOnly: true },
      { name: "External Source Id", attr: "external_source_id", type: "text", isReadOnly: true },
      { name: "Is Active", attr: "is_active", type: "boolean", isDisable: true },
      { name: "Is Primary Email", attr: "is_primary_email", type: "boolean", isDisable: true },
      { name: "Is User for Shipping", attr: "is_used_for_shipping", type: "boolean" },
      { name: "Is Used for Billing", attr: "is_used_for_billing", type: "boolean" },
      { name: "Is Business Use", attr: "is_business_use", type: "boolean" },
      { name: "Is Personal Use", attr: "is_personal_use", type: "boolean" },
      { name: "Best Time Contact Start Time", attr: "best_time_contact_start_time", type: "time" },
      { name: "Best Time Contact End Time", attr: "best_time_contact_end_time", type: "time" },
      { name: "Best Time Contact Timezone", attr: "best_time_contact_timezone", type: "text" }
    ],
    PHONE: [
      { name: "Ext", attr: "extension_number", type: "text", isExt: true },
      { name: "Phone", attr: "telephone_number", type: "phone", isPhone: true },
      { name: "Data Source", attr: "data_source", type: "text", isReadOnly: true },
      { name: "External Source Id", attr: "external_source_id", type: "text", isReadOnly: true },
      { name: "Is Active", attr: "is_active", type: "boolean", isDisable: true },
      { name: "Is Primary Phone Number", attr: "is_primary_phone", type: "boolean", isDisable: true },
      { name: "Is User for Shipping", attr: "is_used_for_shipping", type: "boolean" },
      { name: "Is Used for Billing", attr: "is_used_for_billing", type: "boolean" },
      { name: "Is Business Use", attr: "is_business_use", type: "boolean" },
      { name: "Is Personal Use", attr: "is_personal_use", type: "boolean" },
      { name: "Best Time Contact Start Time", attr: "best_time_contact_start_time", type: "time" },
      { name: "Best Time Contact End Time", attr: "best_time_contact_end_time", type: "time" },
      { name: "Best Time Contact Timezone", attr: "best_time_contact_timezone", type: "text" }
    ],
    PUSH: [
      { name: "Identifier", attr: "identifier", type: "text" },
      { name: "Data Source", attr: "data_source", type: "text", isReadOnly: true },
      { name: "External Source Id", attr: "external_source_id", type: "text", isReadOnly: true },
      { name: "Channel", attr: "channel", type: "enum", options: [{ name: "Mobile", value: "MOBILE" }, { name: "Web", value: "WEB" }], isDisable: true },
      { name: "Platform", attr: "platform", type: "enum", options: [{ name: "Android", value: "ANDROID" }, { name: "IOS", value: "IOS" }], isDisable: true },
      {
        name: "Browser", attr: "browser_type", type: "enum",
        options: [
          { name: "Chrome", value: "CHROME" },
          { name: "Edge", value: "EDGE" },
          { name: "Safari", value: "SAFARI" },
          { name: "Firefox", value: "FIREFOX" },
          { name: "Opera", value: "OPERA" }
        ],
        isDisable: true
      },
      { name: "Is Active", attr: "is_active", type: "boolean", isDisable: true },
      { name: "Device Model", attr: "device_model", type: "text" },
      { name: "Device Make", attr: "device_make", type: "text" },
      { name: "Device OS", attr: "device_os", type: "text" },
      { name: "Geo Latitude", attr: "geo_latitude", type: "text" },
      { name: "Geo Longtitue", attr: "geo_longitude", type: "text" },
      { name: "Best Time Contact Start Time", attr: "best_time_contact_start_time", type: "time" },
      { name: "Best Time Contact End Time", attr: "best_time_contact_end_time", type: "time" },
      { name: "Best Time Contact Timezone", attr: "best_time_contact_timezone", type: "text" },
    ],
    ADDRESS: [
      { name: "Address 1", attr: "address_line_1", type: "text" },
      { name: "Address 2", attr: "address_line_2", type: "text", },
      { name: "Address 3", attr: "address_line_3", type: "text" },
      { name: "City", attr: "city", type: "text" },
      { name: "State", attr: "state_province", type: "text" },
      { name: "Country", attr: "country", type: "text" },
      { name: "Postal Code", attr: "postal_code", type: "text" },
      { name: "Latitude", attr: "geo_latitude", type: "text" },
      { name: "Longitude", attr: "geo_longitude", type: "text" },
      { name: "Is Active", attr: "is_active", type: "boolean" },
      { name: "Is Primary Address", attr: "is_primary_address", type: "boolean" },
      { name: "Is Used For Billing", attr: "is_used_for_billing", type: "boolean" },
      { name: "Is Used For Shipping", attr: "is_used_for_shipping", type: "boolean" },
      { name: "Is Business Use", attr: "is_business_use", type: "boolean" },
      { name: "Is Personal Use", attr: "is_personal_use", type: "boolean" },
      { name: "Best Time Contact Start Time", attr: "best_time_contact_start_time", type: "time" },
      { name: "Best Time Contact End Time", attr: "best_time_contact_end_time", type: "time" },
      { name: "Best Time Contact Timezone", attr: "best_time_contact_timezone", type: "text" },
    ]
  }

  constructor(public notifiService: NotificationUiService, private actRouter: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
    this.init();
    console.log(this.sliderIndex);

  }
  ionViewWillEnter() {

  }
  init() {
    this.actRouter.paramMap.subscribe((param: Params) => {
      this.userProfileId = JSON.parse(param['get']('user_id'));
      if (this.userProfileId) {
        this.isEditView = true;
        this.getAllUserProfileByID(this.userProfileId);
      }
    });
  }

  ionViewWillLeave() {
    this.notifiService.closeAllAlertCtrl();
  }
  resetAll() {
    this.preferenceDetails.email = 0;
    this.preferenceDetails.phone = 0;
    this.preferenceDetails.app = 0;
    this.preferenceDetails.address = 0;
  }
  numericOnly(event: any): boolean {
    let pattern = /^([0-9])$/;
    let result = pattern.test(event.key);
    return result;
  }
  getAttribute() {
    this.notifiService.showLoader();
    this.notifiService.getAllAttribute().subscribe({
      next: (attribute: any) => {
        this.notifiService.hideLoader();
        this.attributes = attribute;
      },
      error: (err: any) => {
        this.notifiService.hideLoader();
        err = err.error || err;
        this.notifiService.toster.error(err.message || 'Failed');
      }
    })
  }

  getAllUserProfileByID(profileId: any) {
    this.notifiService.showLoader();
    this.notifiService.getAllUserProfileByID(profileId).subscribe({
      next: async (profile: any) => {
        this.user = profile;
        this.countValue();
        var tagObj: any = {};
        (this.user.tags || []).forEach((tag: any) => tagObj[tag.field] = tag.value);
        this.attributes = await this.notifiService.getAllAttribute().toPromise();
        this.attributes.forEach((attribute: any) => attribute.value = tagObj[attribute.name]);
        this.notifiService.hideLoader();
      },
      error: (err: any) => {
        this.notifiService.hideLoader();
        err = err.error || err;
        this.notifiService.toster.error(err.message || 'Failed');
      }
    });
  }

  saveTags() {
    var tagList: any = [];
    this.attributes.forEach((attribute: any) => {

      if (attribute.value || typeof(attribute.value)=="boolean") {
        tagList.push({ field: attribute.name, value: attribute.value })
      }
    });

    console.log(tagList, 'tafg')
    this.notifiService.showLoader();
    this.notifiService.updateTagsById(this.user.id, { tags: tagList }).subscribe({
      next: async (e: any) => {
        this.notifiService.hideLoader();
        this.notifiService.toster.success("Tags Updated Successfully!");
        this.getAllUserProfileByID(this.userProfileId);
      },
      error: (err: any) => {
        this.notifiService.hideLoader();
        err = err.error || err;
        this.notifiService.toster.error(err.message || "Tags Update Failed");
      }
    });
  }
  countValue() {
    this.resetAll();
    (this.user.contact_email_list || []).forEach((obj: any) => {
      if (obj.is_active) this.preferenceDetails.email++;
    });
    (this.user.contact_phone_list || []).forEach((obj: any) => {
      if (obj.is_active) this.preferenceDetails.phone++;
    });
    (this.user.contact_app_list || []).forEach((obj: any) => {
      if (obj.is_active) this.preferenceDetails.app++;
    });
    (this.user.contact_address_list || []).forEach((obj: any) => {
      if (obj.is_active) this.preferenceDetails.address++;
    });
  }
  slidePrevious() {
    this.swiper.swiperRef.slidePrev(500);
    this.sliderIndex--;
  }

  slideNext() {
    this.swiper.swiperRef.slideNext(500);
    this.sliderIndex++;
  }

  scrollContent(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  async selectedPrefer(preference: string) {
    if (this.selectedPreference != preference) {
      await this.notifiService.showLoader();
      this.selectedPreference = preference;
      this.swiper.swiperRef.slideTo(0);
      this.sliderIndex = 0;
      setTimeout(() => { this.notifiService.hideLoader() });
    }
  }


  save() {
    if (this.isEditView) {
      this.notifiService.showLoader();
      this.profile = JSON.parse(JSON.stringify(this.user));
      delete (this.profile.contact_email_list);
      delete (this.profile.contact_phone_list);
      delete (this.profile.contact_app_list);
      delete (this.profile.contact_address_list);
      this.notifiService.updateUserProfileById(this.userProfileId, this.profile).subscribe({
        next: (e: any) => {
          this.notifiService.hideLoader();
          this.notifiService.toster.success("Profile Updated Successfully!");
        },
        error: (err: any) => {
          this.notifiService.hideLoader();
          err = err.error || err;
          this.notifiService.toster.error(err.message || "UserProfile Update Failed");
        }
      });
    }
  }
  savePreference(data: any, isNewUser?: any) {
    if (this.isShow || this.isEditView) {
      this.notifiService.showLoader();
      if (this.selectedPreference == 'EMAIL') {
        if (isNewUser) {
          this.notifiService.createUserEmailChennal(this.userProfileId, data).subscribe({
            next: (e: any) => {
              this.notifiService.hideLoader();
              this.notifiService.toster.success("Email Preference Added Successfully!");
              window.location.reload();

            },
            error: (err: any) => {
              this.notifiService.hideLoader();
              err = err.error || err;
              this.notifiService.toster.error(err.message || "UserProfile Added Failed");
            }
          });
        }
        else {
          this.notifiService.updateEmailProfileById(this.userProfileId, data.id, data).subscribe({
            next: (e: any) => {
              this.notifiService.hideLoader();
              console.log(data)
              this.notifiService.toster.success("Email Preference Updated Successfully!");
            },
            error: (err: any) => {
              this.notifiService.hideLoader();
              err = err.error || err;
              this.notifiService.toster.error(err.message || "UserProfile Update Failed");
            }
          });
        }
      }
      if (this.selectedPreference == 'PHONE') {
        if (isNewUser) {
          this.notifiService.createUserPhoneChennal(this.userProfileId, data).subscribe({
            next: (e: any) => {
              this.notifiService.hideLoader();
              this.notifiService.toster.success("Phone Preference Added Successfully!");
              window.location.reload();
            },
            error: (err: any) => {
              this.notifiService.hideLoader();
              err = err.error || err;
              this.notifiService.toster.error(err.message || "UserProfile Added Failed");
            }
          });
        }
        else {
          this.notifiService.updatePhoneProfileById(this.userProfileId, data.id, data).subscribe({
            next: (e: any) => {
              this.notifiService.hideLoader();
              this.notifiService.toster.success("Phone Preference Updated Successfully!");
            },
            error: (err: any) => {
              this.notifiService.hideLoader();
              err = err.error || err;
              this.notifiService.toster.error(err.message || "UserProfile Update Failed");
            }
          });
        }

      }
      if (this.selectedPreference == 'PUSH') {
        if (isNewUser) {
          this.notifiService.createUserWebChennal(this.userProfileId, data).subscribe({
            next: (e: any) => {
              this.notifiService.hideLoader();
              this.notifiService.toster.success("Phone Preference Added Successfully!");
              window.location.reload();

            },
            error: (err: any) => {
              this.notifiService.hideLoader();
              err = err.error || err;
              this.notifiService.toster.error(err.message || "UserProfile Added Failed");
            }
          });
        }
        else {
          this.notifiService.updateWebPushProfileById(this.userProfileId, data.id, data).subscribe({
            next: (e: any) => {
              this.notifiService.hideLoader();
              this.notifiService.toster.success("Push Preference Updated Successfully!");
            },
            error: (err: any) => {
              this.notifiService.hideLoader();
              err = err.error || err;
              this.notifiService.toster.error(err.message || "UserProfile Update Failed");
            }
          });
        }
      }
      if (this.selectedPreference == 'ADDRESS') {
        if (isNewUser) {
          this.notifiService.createUserAddresChennal(this.userProfileId, data).subscribe({
            next: (e: any) => {
              this.notifiService.hideLoader();
              this.notifiService.toster.success("Address Added Successfully!");
              window.location.reload();

            },
            error: (err: any) => {
              this.notifiService.hideLoader();
              err = err.error || err;
              this.notifiService.toster.error(err.message || "UserProfile Added Failed");
            }
          });
        }
        else {
          this.notifiService.updateAddressProfileById(this.userProfileId, data.id, data).subscribe({
            next: (e: any) => {
              this.notifiService.hideLoader();
              this.notifiService.toster.success("Address Updated Successfully!");
            },
            error: (err: any) => {
              this.notifiService.hideLoader();
              err = err.error || err;
              this.notifiService.toster.error(err.message || "UserProfile Update Failed");
            }
          });
        }
      }
    }
  }

  async activatePreference(is_active: boolean, data: any) {
    this.notifiService.showLoader();
    try {
      if (this.selectedPreference == 'EMAIL') {
        this.preferenceDetails.email++;
        await this.notifiService.activateEmailById(this.userProfileId, data.id).toPromise();
        this.notifiService.toster.success("Email Activated Successfully!");
      } else if (this.selectedPreference == 'PHONE') {
        this.preferenceDetails.phone++;
        await this.notifiService.activatePhoneById(this.userProfileId, data.id).toPromise();
        this.notifiService.toster.success("Phone Number Activated Successfully!");
      } else if (this.selectedPreference == 'PUSH') {
        this.preferenceDetails.app++;
        await this.notifiService.activateAppById(this.userProfileId, data.id).toPromise();
        this.notifiService.toster.success("Push Channel Activated Successfully!");
      } else if (this.selectedPreference == 'ADDRESS') {
        this.preferenceDetails.address++;
        await this.notifiService.activateAddressById(this.userProfileId, data.id).toPromise();
        this.notifiService.toster.success("Address Activated Successfully!");
      }
      this.notifiService.hideLoader();
      data.is_active = is_active;
    } catch (err: any) {
      this.notifiService.hideLoader();
      err = err.error || err;
      this.notifiService.toster.error(err.message || "Failed");
    }
  }
  async deactivatePreference(is_active: boolean, data: any) {
    this.notifiService.showLoader();
    try {
      if (this.selectedPreference == 'EMAIL') {
        this.preferenceDetails.email--;
        await this.notifiService.inactivateEmailById(this.userProfileId, data.id).toPromise();
        this.notifiService.toster.success("Email De-Activated Successfully!");
      } else if (this.selectedPreference == 'PHONE') {
        this.preferenceDetails.phone--;
        await this.notifiService.inactivatePhoneById(this.userProfileId, data.id).toPromise();
        this.notifiService.toster.success("Phone number De-Activated Successfully!");
      } else if (this.selectedPreference == 'PUSH') {
        this.preferenceDetails.app--;
        await this.notifiService.inactivateAppById(this.userProfileId, data.id).toPromise();
        this.notifiService.toster.success("Push channel De-Activated Successfully!");
      } else if (this.selectedPreference == 'ADDRESS') {
        this.preferenceDetails.address--;
        await this.notifiService.inactivateAddressById(this.userProfileId, data.id).toPromise();
        this.notifiService.toster.success("Address De-Activated Successfully!");
      }
      this.notifiService.hideLoader();
      data.is_active = is_active;
    } catch (err: any) {
      this.notifiService.hideLoader();
      err = err.error || err;
      this.notifiService.toster.error(err.message || "Failed");
    }
  }
  formatDate(date: Date) {
    this.notifiService.dateFormat(date);
  }

  addSlider(data: any, isBoolean: boolean) {
    this.isShow = isBoolean;
    if (this.selectedPreference == 'EMAIL') {
      this.user.contact_email_list.push({});
      this.preferenceDetails.email++;
      this.sliderIndex = this.preferenceDetails.email;
      this.swiper.swiperRef.slideTo(this.sliderIndex);
    } else if (this.selectedPreference == 'PHONE') {
      this.user.contact_phone_list.push({})
      this.preferenceDetails.phone++;
      this.sliderIndex = this.preferenceDetails.phone;
      this.swiper.swiperRef.slideTo(this.sliderIndex);
      alert(this.sliderIndex)
    } else if (this.selectedPreference == 'PUSH') {
      this.user.contact_app_list.push({})
      this.preferenceDetails.app++;
      this.sliderIndex = this.preferenceDetails.app;
      this.swiper.swiperRef.slideTo(this.sliderIndex);
      alert(this.sliderIndex)
    }
    else if (this.selectedPreference == 'ADDRESS') {
      this.user.contact_address_list.push({})
      this.preferenceDetails.address++;
      this.sliderIndex = this.preferenceDetails.address;
      this.swiper.swiperRef.slideTo(this.sliderIndex);
      alert(this.sliderIndex)
    }
  }

}




