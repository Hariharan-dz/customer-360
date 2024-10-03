import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { ConfigCategory } from './configuration/config-category/config-category';
import { ConfigCategoryCreateUpdateComponent } from './configuration/config-category/config-category-create-update/config-category-create-update';
import { ConfigTemplate } from './configuration/config-template/config-template';
import { UserSegmentComponent } from './configuration/user-segment/user-segment.component';
import { TempCreate } from './configuration/config-template/temp-create/temp-create';
import { NotificationHistoryComponent } from './notification-history/notification-history.component';
import { NotificationCreatePageComponent } from './notification-page/notification-create-page/notification-create-page.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileviewComponent } from './user-profile/user-profileview/user-profileview.component';
import { AuthorizeComponent } from './authorize/authorize.component';
import { UserBasedNotificationHistoryComponent } from './user-based-notification-history/user-based-notification-history.component';
import { UserSegmentCreateComponent } from './configuration/user-segment/user-segment-create/user-segment-create.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ViewAttributeComponent } from './user-profile/view-attribute/view-attribute.component';
import { AbTestingComponent } from './ab-testing/ab-testing.component';
import { AbTestingResultComponent } from './ab-testing/ab-testing-result/ab-testing-result.component';
import { LandingpageComponent } from './customer360/landingpage/landingpage.component';
import { WorkQueueComponent } from './customer-support/work-queue/work-queue.component';
import { TicketComponent } from './customer-support/ticket/ticket.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminConfigurationComponent } from './admin-configuration/admin-configuration.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { DeveloperGuideComponent } from './developer-guide/developer-guide.component';
import { ReportsComponent } from './reports/reports.component';
// import { SegmentViewPopupComponent } from './segment-view-popup/segment-view-popup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'authorize', component: AuthorizeComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },

  { path: 'customers', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'customer/view/:user_id', component: LandingpageComponent, canActivate: [AuthGuard] },
  { path: 'customer/:user_id', component: UserProfileviewComponent, canActivate: [AuthGuard] },
  { path: 'customer/:user_id/history', component: UserBasedNotificationHistoryComponent, canActivate: [AuthGuard] },


  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },

  { path: 'segment', component: UserSegmentComponent, canActivate: [AuthGuard] },
  { path: 'segment/create', component: UserSegmentCreateComponent, canActivate: [AuthGuard] },
  { path: 'segment/:user_segment_id', component: UserSegmentCreateComponent, canActivate: [AuthGuard] },
  { path: 'segment/clone/:clone_user_segment_id', component: UserSegmentCreateComponent, canActivate: [AuthGuard] },

  { path: 'tickets', component: NewTicketComponent, canActivate: [AuthGuard] },

  { path: 'wqm', component: WorkQueueComponent, canActivate: [AuthGuard] },

  {
    path: 'notifications',
    children: [
      { path: 'category', component: ConfigCategory, canActivate: [AuthGuard] },
      { path: 'category/create', component: ConfigCategoryCreateUpdateComponent, canActivate: [AuthGuard] },
      { path: 'category/:category_id', component: ConfigCategoryCreateUpdateComponent, canActivate: [AuthGuard] },
      { path: 'category/clone/:clone_category_id', component: ConfigCategoryCreateUpdateComponent, canActivate: [AuthGuard] },

      { path: 'template', component: ConfigTemplate, canActivate: [AuthGuard] },
      { path: 'template/create', component: TempCreate, canActivate: [AuthGuard] },
      { path: 'template/:template_id', component: TempCreate, canActivate: [AuthGuard] },
      { path: 'template/clone/:clone_template_id', component: TempCreate, canActivate: [AuthGuard] },

      { path: 'ab-testing', component: AbTestingComponent, canActivate: [AuthGuard] },
      { path: 'ab-testing/create', component: NotificationCreatePageComponent, canActivate: [AuthGuard] },
      { path: 'ab-testing/:notification_id', component: NotificationCreatePageComponent, canActivate: [AuthGuard] },
      { path: 'ab-testing/clone/:clone_notification_id', component: NotificationCreatePageComponent, canActivate: [AuthGuard] },
      { path: 'ab-testing/:notification_id/history/:variant_id', component: NotificationHistoryComponent, canActivate: [AuthGuard] },
      { path: 'ab-testing/result/:notification_id', component: AbTestingResultComponent, canActivate: [AuthGuard] },

      { path: '', component: NotificationPageComponent, canActivate: [AuthGuard] },
      { path: 'create', component: NotificationCreatePageComponent, canActivate: [AuthGuard] },
      { path: ':notification_id', component: NotificationCreatePageComponent, canActivate: [AuthGuard] },
      { path: 'clone/:clone_notification_id', component: NotificationCreatePageComponent, canActivate: [AuthGuard] },
      { path: ':notification_id/history', component: NotificationHistoryComponent, canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard]
  },

  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },

  {
    path: 'admin',
    children: [
      { path: '', component: UserProfileComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UserProfileComponent, canActivate: [AuthGuard] },
      { path: 'user/view_attribute', component: ViewAttributeComponent, canActivate: [AuthGuard] },
      { path: 'user/:user_id', component: UserProfileviewComponent, canActivate: [AuthGuard] },
      { path: 'user/:user_id/history', component: UserBasedNotificationHistoryComponent, canActivate: [AuthGuard] },

      { path: 'configurations', component: AdminConfigurationComponent, canActivate: [AuthGuard] },

      { path: 'recommendations', component: RecommendationsComponent, canActivate: [AuthGuard] },

      { path: 'products', component: AdminProductComponent, canActivate: [AuthGuard] },

    ],
    canActivate: [AuthGuard]
  },

  { path: 'developer', component: DeveloperGuideComponent, canActivate: [AuthGuard] },

  { path: 'home', redirectTo: 'customers' },
  { path: '', redirectTo: 'customers', pathMatch: 'full' }
  // { path: '', component: SegmentViewPopupComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
