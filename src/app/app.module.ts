import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { ViewUserS1Component } from './views/user/view-user-s1/view-user-s1.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DashboardComponent } from './views/global/dashboard/dashboard.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {PopupModule} from 'ng2-opd-popup';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';







import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { environment } from '../environments/environment.prod';


// import {
//   MatToolbarModule,
//   MatButtonModule,
//   MatIconModule
// } from '@angular/material';

import { RegisterHereComponent } from './views/global/register-here/register-here.component';
import { ForgotPassComponent } from './views/global/forgot-pass/forgot-pass.component';
import { ResetPassComponent } from './views/global/reset-pass/reset-pass.component';
import { UserApplFormComponent } from './views/user/user-appl-form/user-appl-form.component';
import { from } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdminAppComponent } from './views/admin/admin-app/admin-app.component';
import { AdminAddAccountComponent } from './views/admin/admin-add-account/admin-add-account.component';
import { DatepickerComponent } from './views/global/datepicker/datepicker.component';
import { UserDashboardComponent } from './views/user/user-dashboard/user-dashboard.component';
import { UserPassportDetailsComponent } from './views/user/user-passport-details/user-passport-details.component';
import { UserContactDetailsComponent } from './views/user/user-contact-details/user-contact-details.component';
import { UserGuarantorDetailsComponent } from './views/user/user-guarantor-details/user-guarantor-details.component';
import { UserCurrentDesignationComponent } from './views/user/user-current-designation/user-current-designation.component';
import { UserUploadDocumentsComponent } from './views/user/user-upload-documents/user-upload-documents.component';
import { EmailOtpComponent } from './views/global/email-otp/email-otp.component';
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
import { DoCalanderManagementComponent } from './views/desk_officer/do-calander-management/do-calander-management.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './header/navbar/navbar.component';
// import { DoViewDetailsComponent } from './do-view-details/do-view-details.component';
import { DoHeaderComponent } from './header/do-header/do-header.component';
import { DsHeaderComponent } from './header/ds-header/ds-header.component';
import { AdminHeaderComponent } from './header/admin-header/admin-header.component';
import { UserReceiptComponent } from './views/user/user-receipt/user-receipt.component'
import { BigHeaderComponent } from './header/big-header/big-header.component';
import { UserHeadComponent } from './header/user-head/user-head.component';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { UserCurrectionComponent } from './views/user/user-currection/user-currection.component';
import { UserCurrectionPassportComponent } from './views/user/user-currection-passport/user-currection-passport.component';

import { AppFooterComponent } from './app-footer/app-footer.component';
import { NewoneComponent } from './newone/newone.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth.guard';
import { SimpleHeaderComponent } from './header/simple-header/simple-header.component';
import { FontSetComponent } from './header/font-set/font-set.component';
import { DocVerificationComponent } from './views/global/doc-verification/doc-verification.component';
import { GlobalViewDetailsComponent } from './views/global-view-details/global-view-details.component';
import{ Translate } from './app.translate';
import { SiteMapComponent } from './header/site-map/site-map.component';
import { ContactUsComponent } from './header/contact-us/contact-us.component';
import { HelpCenterComponent } from './header/help-center/help-center.component';
import { FaqComponent } from './header/faq/faq.component';
import { UserContactUsComponent } from './views/user/user-contact-us/user-contact-us.component';
import { UserFaqComponent } from './views/user/user-faq/user-faq.component';
// import { UserHerpCenterComponent } from './views/user-herp-center/user-herp-center.component';
import { UserHelpCenterComponent } from './views/user/user-help-center/user-help-center.component';
import { UserSiteMapComponent } from './views/user/user-site-map/user-site-map.component';
import { DoContactUsComponent } from './views/desk_officer/do-contact-us/do-contact-us.component';
import { DoFaqComponent } from './views/desk_officer/do-faq/do-faq.component';
import { DoHelpCenterComponent } from './views/desk_officer/do-help-center/do-help-center.component';
import { DoSiteMapComponent } from './views/desk_officer/do-site-map/do-site-map.component';
import { DsSiteMapComponent } from './views/deputy_secretary/ds-site-map/ds-site-map.component';
import { AdmitSiteMapComponent } from './views/admin/admit-site-map/admit-site-map.component';
import { DsHelpCenterComponent } from './views/deputy_secretary/ds-help-center/ds-help-center.component';
import { AdminHelpCenterComponent } from './views/admin/admin-help-center/admin-help-center.component';
import { AdminFaqComponent } from './views/admin/admin-faq/admin-faq.component';
import { DsFaqComponent } from './views/deputy_secretary/ds-faq/ds-faq.component';
import { DsContactUsComponent } from './views/deputy_secretary/ds-contact-us/ds-contact-us.component';
import { AdminContactUsComponent } from './views/admin/admin-contact-us/admin-contact-us.component';
import { DoFooterComponent } from './footer/do-footer/do-footer.component';
import { DsFooterComponent } from './footer/ds-footer/ds-footer.component';
import { AdminFooterComponent } from './footer/admin-footer/admin-footer.component';
import { LoginFooterComponent } from './footer/login-footer/login-footer.component';
import { LoginHeaderComponent } from './header/login-header/login-header.component';
import { GlobalContactUsComponent } from './views/global/global-contact-us/global-contact-us.component';
import { GlobalFaqComponent } from './views/global/global-faq/global-faq.component';
import { GlobalHelpCenterComponent } from './views/global/global-help-center/global-help-center.component';
import { GlobalSiteMapComponent } from './views/global/global-site-map/global-site-map.component';
import { UserFooterComponent } from './footer/user-footer/user-footer.component';
import { TermsConditionComponent } from './header/terms-condition/terms-condition.component';
import { AdminTermsConditionComponent } from './views/admin/admin-terms-condition/admin-terms-condition.component';
import { AdminPoliciesComponent } from './views/admin/admin-policies/admin-policies.component';
import { DoTermsConditionComponent } from './views/desk_officer/do-terms-condition/do-terms-condition.component';
import { DoPoliciesComponent } from './views/desk_officer/do-policies/do-policies.component';
import { DsTermsConditionComponent } from './views/deputy_secretary/ds-terms-condition/ds-terms-condition.component';
import { DsPoliciesComponent } from './views/deputy_secretary/ds-policies/ds-policies.component';
import { GlobalTermsConditionComponent } from './views/global/global-terms-condition/global-terms-condition.component';
import { GlobalPoliciesComponent } from './views/global/global-policies/global-policies.component';
import { PoliciesComponent } from './header/policies/policies.component';
import { UserTermsConditionComponent } from './views/user/user-terms-condition/user-terms-condition.component';
import { UserPoliciesComponent } from './views/user/user-policies/user-policies.component';
import { DownloadDocComponent } from './views/user/download-doc/download-doc.component';
import { UserPasswordUpdateComponent } from './views/user/user-password-update/user-password-update.component';
import { DsPasswordUpdateComponent } from './views/deputy_secretary/ds-password-update/ds-password-update.component';
import { AdminPasswordUpdateComponent } from './views/admin/admin-password-update/admin-password-update.component';
import { DoPasswordUpdateComponent } from './views/desk_officer/do-password-update/do-password-update.component';
import { PasswordUpdateComponent } from './header/password-update/password-update.component';
import { GlobalSearchComponent } from './views/global/global-search/global-search.component';
import { DoSearchComponent } from './views/desk_officer/do-search/do-search.component';
import { DsSearchComponent } from './views/deputy_secretary/ds-search/ds-search.component';
import { UserSearchComponent } from './views/user/user-search/user-search.component';
import { SearchComponent } from './header/search/search.component';
import { ChkComponent } from './chk/chk.component';
import { DisclimerComponent } from './views/user/disclimer/disclimer.component';
import { CheckComponent } from './check/check.component'

@NgModule({
  imports: [
    BrowserModule,NgbModule, NgxUiLoaderModule,
    NgSelectModule,
    AppRoutingModule,   NgxLoadingModule.forRoot({}),
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    HttpModule,
    FormsModule, ReactiveFormsModule ,
    NgxPaginationModule,
    CarouselModule.forRoot(),
    PopupModule.forRoot(),
   BrowserAnimationsModule,
   RecaptchaModule,
   BsDatepickerModule.forRoot()
  
  ],
  declarations: [
    AppComponent,
    Translate,
    DashboardComponent,
    
    SheduleResheduleComponent,
    
    DoCalanderManagementComponent,
   
    RegisterHereComponent,
   
    ForgotPassComponent,
   
    ResetPassComponent,
   
    UserApplFormComponent,
   
    AdminAppComponent,
    AdminAddAccountComponent,
    DatepickerComponent, 
    UserDashboardComponent, 
    UserPassportDetailsComponent, 
    UserContactDetailsComponent,
     UserGuarantorDetailsComponent,
      UserCurrentDesignationComponent,
      UserUploadDocumentsComponent
    ,ViewUserS1Component, EmailOtpComponent, UserProfileComponent,
     UserMandatoryDocumentsComponent, UserSelectDateComponent,
      AdminDashboardComponent, DeskOfficerDashboardComponent, 
      DeputySecDashboardComponent, AdminViewDetailsComponent, 
      DOViewDetailsComponent, DSViewDetailsComponent,
       AdminDODSDashboardComponent, NavbarComponent,  
       DoHeaderComponent, DsHeaderComponent, AdminHeaderComponent, UserReceiptComponent, 
       AdminDODSDashboardComponent, NavbarComponent, 
       DoHeaderComponent, DsHeaderComponent, AdminHeaderComponent, BigHeaderComponent, 
       UserHeadComponent, UserCurrectionComponent, UserCurrectionPassportComponent
       , AppFooterComponent, NewoneComponent
       , AppFooterComponent, ErrorComponent, SimpleHeaderComponent, FontSetComponent, DocVerificationComponent, GlobalViewDetailsComponent, SiteMapComponent, ContactUsComponent, HelpCenterComponent, FaqComponent, UserContactUsComponent, UserFaqComponent,
         UserHelpCenterComponent, UserSiteMapComponent, DoContactUsComponent, DoFaqComponent, DoHelpCenterComponent, DoSiteMapComponent, DsSiteMapComponent, AdmitSiteMapComponent, DsHelpCenterComponent, AdminHelpCenterComponent, AdminFaqComponent, DsFaqComponent, DsContactUsComponent, AdminContactUsComponent, DoFooterComponent, DsFooterComponent, AdminFooterComponent, LoginFooterComponent, LoginHeaderComponent, GlobalContactUsComponent, GlobalFaqComponent, GlobalHelpCenterComponent, GlobalSiteMapComponent, UserFooterComponent, TermsConditionComponent, AdminTermsConditionComponent, AdminPoliciesComponent, DoTermsConditionComponent, DoPoliciesComponent, DsTermsConditionComponent, DsPoliciesComponent, GlobalTermsConditionComponent, GlobalPoliciesComponent, PoliciesComponent, UserTermsConditionComponent, UserPoliciesComponent, DownloadDocComponent, UserPasswordUpdateComponent, DsPasswordUpdateComponent, AdminPasswordUpdateComponent, DoPasswordUpdateComponent, PasswordUpdateComponent, GlobalSearchComponent, DoSearchComponent, DsSearchComponent, UserSearchComponent, SearchComponent, ChkComponent, DisclimerComponent, CheckComponent
      
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
