import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';



import { DashboardComponent } from './views/global/dashboard/dashboard.component';

import { ModuleWithProviders } from "@angular/core";

import { ViewUserS1Component } from './views/user/view-user-s1/view-user-s1.component';


// =====================GOM =========================
import { ForgotPassComponent } from './views/global/forgot-pass/forgot-pass.component';
import { ResetPassComponent } from './views/global/reset-pass/reset-pass.component';
import { EmailOtpComponent } from './views/global/email-otp/email-otp.component';
import { RegisterHereComponent } from './views/global/register-here/register-here.component';
import { UserApplFormComponent } from './views/user/user-appl-form/user-appl-form.component';
import { AdminAppComponent } from './views/admin/admin-app/admin-app.component';
import { AdminAddAccountComponent } from './views/admin/admin-add-account/admin-add-account.component';
import { DatepickerComponent } from './views/global/datepicker/datepicker.component';
import { UserDashboardComponent } from './views/user/user-dashboard/user-dashboard.component';

import { UserPassportDetailsComponent } from './views/user/user-passport-details/user-passport-details.component';
import { UserContactDetailsComponent } from './views/user/user-contact-details/user-contact-details.component';
import { UserGuarantorDetailsComponent } from './views/user/user-guarantor-details/user-guarantor-details.component';
import { UserCurrentDesignationComponent } from './views/user/user-current-designation/user-current-designation.component';
import { UserUploadDocumentsComponent } from './views/user/user-upload-documents/user-upload-documents.component';

import { UserProfileComponent } from './views/user/user-profile/user-profile.component';
import { UserMandatoryDocumentsComponent } from './views/user/user-mandatory-documents/user-mandatory-documents.component';
import { UserSelectDateComponent } from './views/user/user-select-date/user-select-date.component';
import { AdminDashboardComponent } from './views/admin/admin-dashboard/admin-dashboard.component';
import { DeskOfficerDashboardComponent } from './views/desk_officer/desk-officer-dashboard/desk-officer-dashboard.component';
import { DeputySecDashboardComponent } from './views/deputy_secretary/deputy-sec-dashboard/deputy-sec-dashboard.component';
import { AdminViewDetailsComponent } from './views/admin/admin-view-details/admin-view-details.component';
import { DOViewDetailsComponent } from './views/desk_officer/do-view-details/do-view-details.component';
import { DSViewDetailsComponent } from './views/deputy_secretary/ds-view-details/ds-view-details.component';
import { AdminDODSDashboardComponent } from './views/admin/admin-do-ds-dashboard/admin-do-ds-dashboard.component';
import { SheduleResheduleComponent } from './views/user/shedule-reshedule/shedule-reshedule.component'
import { DoCalanderManagementComponent } from './views/desk_officer/do-calander-management/do-calander-management.component';
import { UserReceiptComponent } from './views/user/user-receipt/user-receipt.component'
import { UserCurrectionComponent } from './views/user/user-currection/user-currection.component'
import { UserCurrectionPassportComponent } from './views/user/user-currection-passport/user-currection-passport.component'
import { NewoneComponent } from './newone/newone.component'

import { DocVerificationComponent } from './views/global/doc-verification/doc-verification.component'
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth.guard';

import { GlobalContactUsComponent } from './views/global/global-contact-us/global-contact-us.component';
import { GlobalFaqComponent }  from'./views/global/global-faq/global-faq.component'
import { GlobalHelpCenterComponent } from './views/global/global-help-center/global-help-center.component'
import { GlobalSiteMapComponent } from './views/global/global-site-map/global-site-map.component'
import { GlobalTermsConditionComponent } from './views/global/global-terms-condition/global-terms-condition.component'
import { GlobalPoliciesComponent } from './views/global/global-policies/global-policies.component'

import { DoContactUsComponent } from './views/desk_officer/do-contact-us/do-contact-us.component'
import { DoFaqComponent } from './views/desk_officer/do-faq/do-faq.component'
import { DoHelpCenterComponent } from './views/desk_officer/do-help-center/do-help-center.component'
import { DoSiteMapComponent } from './views/desk_officer/do-site-map/do-site-map.component'
import { DoTermsConditionComponent } from './views/desk_officer/do-terms-condition/do-terms-condition.component'
import { DoPoliciesComponent } from './views/desk_officer/do-policies/do-policies.component'

import {DsContactUsComponent } from './views/deputy_secretary/ds-contact-us/ds-contact-us.component'
import { DsFaqComponent } from './views/deputy_secretary/ds-faq/ds-faq.component'
import { DsHelpCenterComponent } from './views/deputy_secretary/ds-help-center/ds-help-center.component'
import { DsSiteMapComponent } from './views/deputy_secretary/ds-site-map/ds-site-map.component'
import { DsTermsConditionComponent } from './views/deputy_secretary/ds-terms-condition/ds-terms-condition.component'
import { DsPoliciesComponent } from './views/deputy_secretary/ds-policies/ds-policies.component'

import { AdminContactUsComponent } from './views/admin/admin-contact-us/admin-contact-us.component'
import { AdminFaqComponent } from './views/admin/admin-faq/admin-faq.component'
import { AdminHelpCenterComponent } from './views/admin/admin-help-center/admin-help-center.component'
import { AdmitSiteMapComponent } from './views/admin/admit-site-map/admit-site-map.component'
import { AdminTermsConditionComponent } from './views/admin/admin-terms-condition/admin-terms-condition.component'
import { AdminPoliciesComponent } from './views/admin/admin-policies/admin-policies.component'

import { UserContactUsComponent } from './views/user/user-contact-us/user-contact-us.component'
import { UserFaqComponent } from './views/user/user-faq/user-faq.component'
import { UserHelpCenterComponent } from './views/user/user-help-center/user-help-center.component'
import { UserSiteMapComponent } from './views/user/user-site-map/user-site-map.component'
import { UserTermsConditionComponent } from './views/user/user-terms-condition/user-terms-condition.component'
import { UserPoliciesComponent } from './views/user/user-policies/user-policies.component'

import { DownloadDocComponent } from "./views/user/download-doc/download-doc.component"

import { AdminPasswordUpdateComponent  } from "./views/admin/admin-password-update/admin-password-update.component"
import { DsPasswordUpdateComponent } from "./views/deputy_secretary/ds-password-update/ds-password-update.component"
import { DoPasswordUpdateComponent } from "./views/desk_officer/do-password-update/do-password-update.component"
import { UserPasswordUpdateComponent  } from "./views/user/user-password-update/user-password-update.component"
import { DisclimerComponent } from './views/user/disclimer/disclimer.component'

import { GlobalSearchComponent } from './views/global/global-search/global-search.component'
import { ChkComponent  } from '../app/chk/chk.component'
import { CheckComponent } from '../app/check/check.component';

import { from } from 'rxjs';

export const routes: Routes = [
  
//  {path: '', redirectTo: '404'},

  { path: '',  redirectTo: 'dashboard', pathMatch: 'full',},
  {path:'check', component:CheckComponent},
   {path:'user-disclimer', component:DisclimerComponent},
  {path:'search', component:GlobalSearchComponent},
  {path:'chk', component:ChkComponent},
  {path:'contact-us', component: GlobalContactUsComponent},
  {path:'faq', component: GlobalFaqComponent},
  {path:'help-center', component: GlobalHelpCenterComponent},
  {path:'site-map', component: GlobalSiteMapComponent},
  {path:'policies', component: GlobalPoliciesComponent},
  {path:'terms-condition', component: GlobalTermsConditionComponent},

  {path:'ds-contact-us', component: DsContactUsComponent},
  {path:'ds-faq', component: DsFaqComponent},
  {path:'ds-site-map', component: DsSiteMapComponent},
  {path:'ds-help-center', component: DsHelpCenterComponent},
  {path:'ds-policies', component: DsPoliciesComponent},
  {path:'ds-terms-condition', component: DsTermsConditionComponent},

  {path:'user-password-update', component: UserPasswordUpdateComponent },
  {path:'do-password-update', component:DoPasswordUpdateComponent },
  {path:'ds-password-update', component:DsPasswordUpdateComponent },
  {path:'admin-password-update', component: AdminPasswordUpdateComponent },

  {path:'do-contact-us', component: DoContactUsComponent},
  {path:'do-faq', component: DoFaqComponent},
  {path:'do-site-map', component: DoSiteMapComponent},
  {path:'do-help-center', component: DoHelpCenterComponent},
  {path:'do-policies', component: DoPoliciesComponent},
  {path:'do-terms-condition', component: DoTermsConditionComponent},

  {path:'user-contact-us', component: UserContactUsComponent},
  {path:'user-faq', component: UserFaqComponent},
  {path:'user-site-map', component: UserSiteMapComponent},
  {path:'user-help-center', component: UserHelpCenterComponent},
  {path:'user-policies', component: UserPoliciesComponent},
  {path:'user-terms-condition', component: UserTermsConditionComponent},

  {path:'admin-contact-us', component: AdminContactUsComponent},
  {path:'admin-faq', component: AdminFaqComponent},
  {path:'admin-site-map', component: AdmitSiteMapComponent},
  {path:'admin-help-center', component: AdminHelpCenterComponent},
  {path:'admin-policies', component: AdminPoliciesComponent},
  {path:'admin-terms-condition', component: AdminTermsConditionComponent},


  { path: 'shedule-reshedule', component: SheduleResheduleComponent },
  { path: 'chk', component: NewoneComponent },
  {path: 'do-calander-management', component: DoCalanderManagementComponent},
  {path: 'admin-viwe-details',component: AdminViewDetailsComponent},
  {path: 'admin-viwe-details',component: AdminViewDetailsComponent},
  {path: 'chk',component: AdminViewDetailsComponent},
  { path: 'dashboard',component: DashboardComponent,
    data: { title: 'Dashboard Page'},
  },
  { path:'user-receipt',  component :UserReceiptComponent, },
  { path:'user-currection',  component :UserCurrectionComponent },
  { path:'user-currection-passport',  component :UserCurrectionPassportComponent },
  { path:'forgot-pass',  component :ForgotPassComponent, },

  { path:'reset-pass', component :ResetPassComponent, },
  { path:'doc-verification', component: DocVerificationComponent },

  { path:'email-otp',  component :EmailOtpComponent,  },

  { path:'register-here', component :RegisterHereComponent, },
  
  { path:'user-dashboard', component :UserDashboardComponent},
  { path:'download-doc', component :DownloadDocComponent},
  { path:'user-appl-form',  component :UserApplFormComponent ,},

  { path:'user-passport-details/:application_no',  component : UserPassportDetailsComponent ,},

  { path:'user-passport-details',  component : UserPassportDetailsComponent ,},

  { path:'user-contact-details', component : UserContactDetailsComponent ,},
  
  { path:'user-guarantor-details',  component : UserGuarantorDetailsComponent,},

  { path:'user-current-designation',  component : UserCurrentDesignationComponent,},

  { path:'user-upload-documents', component : UserUploadDocumentsComponent,},

  { path:'admin-app', component :AdminAppComponent,},

  { path:'admin-add-account',component :AdminAddAccountComponent},

  { path:'date-picker', component :DatepickerComponent},

  { path:'user-profile', component :UserProfileComponent},

  { path:'user-mandatory-documents', component :UserMandatoryDocumentsComponent},

  { path:'user-select-date', component :UserSelectDateComponent},

  { path:'view-user-s1', component : ViewUserS1Component, },

  { path:'admin-dashboard',  component : AdminDashboardComponent,},

  { path:'desk-officer-dashboard',   component : DeskOfficerDashboardComponent },

 
  {

    path:'user-upload-documents/:application_no',
  
    component : UserUploadDocumentsComponent,

  },
  {

    path:'user-upload-documents',
  
    component : UserUploadDocumentsComponent,

  },
  { path:'deputy-sec-dashboard', component : DeputySecDashboardComponent, },

  { path:'admin-view-details', component : AdminViewDetailsComponent, },

  { path:'do-view-details', component : DOViewDetailsComponent, },

  { path:'ds-view-details', component :  DSViewDetailsComponent, },

  { path:'admin-do-ds-dashboard', component : AdminDODSDashboardComponent, },
  {path: '**', component:ErrorComponent},
 
];


export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({

  imports: [ RouterModule.forRoot(routes)],

  exports: [ RouterModule ]

})

export class AppRoutingModule {}

