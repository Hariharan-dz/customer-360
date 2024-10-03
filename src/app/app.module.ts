import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Capacitor } from '@capacitor/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';

//Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SwiperModule } from 'swiper/angular';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { ConfigCategoryCreateUpdateComponent } from './configuration/config-category/config-category-create-update/config-category-create-update';
import { ConfigCategory } from './configuration/config-category/config-category';
import { ConfigNavigationCompComponent } from './configuration/config-navigation-comp/config-navigation-comp.component';
import { ConfigTemplate } from './configuration/config-template/config-template';
import { UserSegmentComponent } from './configuration/user-segment/user-segment.component';
import { TempCreate } from './configuration/config-template/temp-create/temp-create';
import { TempCreatePopupModalComponent } from './configuration/config-template/temp-create-popup-modal/temp-create-popup-modal.component';
import { QuillModule } from 'ngx-quill';
import { NotificationCreatePageComponent } from './notification-page/notification-create-page/notification-create-page.component';
import { FilterPipePipe } from './filter-pipe.pipe';
import { NotificationHistoryComponent } from './notification-history/notification-history.component';
import { ConfigCategoryDeleteModalComponent } from './configuration/config-category/config-category-delete-modal/config-category-delete-modal.component';
import { LoginComponent } from './login/login.component';
import { DynamicTagsModelComponent } from './configuration/config-template/dynamic-tags-model/dynamic-tags-model.component';
import { UserProfileviewComponent } from './user-profile/user-profileview/user-profileview.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { TemplatePageComponent } from './template-page/template-page.component';
import { UserBasedNotificationHistoryComponent } from './user-based-notification-history/user-based-notification-history.component';
import { UserSegmentCreateComponent } from './configuration/user-segment/user-segment-create/user-segment-create.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ViewAttributeComponent } from './user-profile/view-attribute/view-attribute.component';
import { SignupComponent } from './signup/signup.component';
import { AbTestingComponent } from './ab-testing/ab-testing.component';


import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AuthGuard } from './services/auth.guard';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DataTableComponent } from './data-table/data-table.component';
import { AbTestingResultComponent } from './ab-testing/ab-testing-result/ab-testing-result.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BillingComponent } from './customer360/billing/billing.component';
import { CampaignsComponent } from './customer360/campaigns/campaigns.component';
import { LandingpageComponent } from './customer360/landingpage/landingpage.component';
import { OverviewComponent } from './customer360/overview/overview.component';
import { PurchasesComponent } from './customer360/purchases/purchases.component';
import { RequestsComponent } from './customer360/requests/requests.component';
import { UsageandbalanceComponent } from './customer360/usageandbalance/usageandbalance.component';
import { TicketComponent } from './customer-support/ticket/ticket.component';
import { WorkQueueComponent } from './customer-support/work-queue/work-queue.component';
import { CustomerComponent } from './customer/customer.component';
import { InteractionHistoryComponent } from './interaction-history/interaction-history.component';
import { TableComponent } from './table/table.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { OrdersComponent } from './orders/orders.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { AdminConfigurationComponent } from './admin-configuration/admin-configuration.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { DeveloperGuideComponent } from './developer-guide/developer-guide.component';
import { ReportsComponent } from './reports/reports.component';
import { SegmentViewPopupComponent } from './segment-view-popup/segment-view-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    NotificationPageComponent,
    ConfigNavigationCompComponent,
    ConfigCategory,
    ConfigCategoryCreateUpdateComponent,
    ConfigCategoryDeleteModalComponent,
    ConfigTemplate,
    UserSegmentComponent,
    TempCreate,
    TempCreatePopupModalComponent,
    NotificationCreatePageComponent,
    FilterPipePipe,
    NotificationHistoryComponent,
    LoginComponent,
    SignupComponent,
    DynamicTagsModelComponent,
    UserProfileviewComponent,
    UserProfileComponent,
    ImageUploadComponent,
    TemplatePageComponent,
    UserBasedNotificationHistoryComponent,
    UserSegmentCreateComponent,
    ResetPasswordComponent,
    DataTableComponent,
    ViewAttributeComponent,
    AbTestingComponent,
    AbTestingResultComponent,
    // customer 360
    BillingComponent,
    CampaignsComponent,
    LandingpageComponent,
    OverviewComponent,
    PurchasesComponent,
    RequestsComponent,
    UsageandbalanceComponent,
    // customer support
    TicketComponent,
    WorkQueueComponent,
    CustomerComponent,
    InteractionHistoryComponent,
    TableComponent,
    //after
    NewTicketComponent,
    OrdersComponent,
    AdminConfigurationComponent,
    RecommendationsComponent,
    AdminProductComponent,
    DeveloperGuideComponent,
    ReportsComponent,
    SegmentViewPopupComponent,
  ],
  imports: [
    MatDatepickerModule,
    MatInputModule,
    NgxMatTimepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    BrowserModule,
    IonicModule.forRoot(),
    QuillModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    SwiperModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    ServiceWorkerModule.register('combined-sw.js', { enabled: Capacitor.getPlatform() == 'web' }),
    NgApexchartsModule,
    DragDropModule
  ],
  providers: [
    CookieService,
    AuthGuard,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
