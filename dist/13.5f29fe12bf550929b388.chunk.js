webpackJsonp([13],{Raou:function(t,e){t.exports=""},"e+jP":function(t,e){t.exports='<div id="pcoded" class="pcoded"\n     [attr.nav-type]="navType"\n     [attr.theme-layout]="themeLayout"\n     [attr.vertical-placement]="verticalPlacement"\n     [attr.vertical-layout]="verticalLayout"\n     [attr.pcoded-device-type]="pcodedDeviceType"\n     [attr.vertical-nav-type]="verticalNavType"\n     [attr.vertical-effect]="verticalEffect"\n     [attr.vnavigation-view]="vnavigationView"\n     [attr.fream-type]="freamType"\n     [attr.sidebar-img]="sidebarImg"\n     [attr.sidebar-img-type]="sidebarImgType"\n     [attr.layout-type]="layoutType"\n     (window:resize)="onResize($event)"\n>\n  <div class="pcoded-overlay-box"></div>\n  <div class="pcoded-container navbar-wrapper">\n    <nav class="navbar header-navbar pcoded-header" [attr.header-theme]="headerTheme" [attr.pcoded-header-position]="pcodedHeaderPosition">\n      <div class="navbar-wrapper">\n        <div class="navbar-logo">\n          <a [routerLink]="[\'/dashboard/default/\']">\n            <img class="img-fluid" src="assets/images/logo.png" alt="Theme-Logo" />\n          </a>\n          <a href="javascript:" class="mobile-options" (click)="toggleHeaderNavRight()">\n            <i class="ti-more"></i>\n          </a>\n        </div>\n        <div class="navbar-container container-fluid">\n          <ul class="nav-left">\n            <li>\n              <div class="sidebar_toggle"><a href="javascript:"><i class="ti-menu"></i></a></div>\n            </li>\n            <li class="header-search">\n              <div id="main-search" class="main-search morphsearch-search">\n                <div class="input-group">\n                  <span class="input-group-addon search-close" (click)="searchOff()"><i class="ti-close"></i></span>\n                  <input class="form-control" [style.width]="searchWidthString">\n                  <span class="input-group-addon search-btn" (click)="searchOn()"><i class="ti-search"></i></span>\n                </div>\n              </div>\n            </li>\n            <li appToggleFullScreen>\n              <a href="javascript:">\n                <i class="ti-fullscreen"></i>\n              </a>\n            </li>\n          </ul>\n          <ul [@mobileHeaderNavRight]="navRight" [ngClass]="navRight" class="nav-right">\n            <li (clickOutside)="notificationOutsideClick(\'live\')" class="header-notification" [ngClass]="liveNotificationClass" (click)="toggleLiveNotification()">\n              <a href="javascript:">\n                <i class="ti-bell"></i>\n                <span class="badge bg-c-pink"></span>\n              </a>\n              <ul [@notificationBottom]="liveNotification" class="show-notification">\n                <li>\n                  <h6>Notifications</h6>\n                  <label class="label label-danger">New</label>\n                </li>\n                <li>\n                  <div class="media">\n                    <img class="d-flex align-self-center img-radius" src="assets/images/avatar-2.jpg" alt="Generic placeholder image">\n                    <div class="media-body">\n                      <h5 class="notification-user">John Doe</h5>\n                      <p class="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>\n                      <span class="notification-time">30 minutes ago</span>\n                    </div>\n                  </div>\n                </li>\n                <li>\n                  <div class="media">\n                    <img class="d-flex align-self-center img-radius" src="assets/images/avatar-4.jpg" alt="Generic placeholder image">\n                    <div class="media-body">\n                      <h5 class="notification-user">Joseph William</h5>\n                      <p class="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>\n                      <span class="notification-time">30 minutes ago</span>\n                    </div>\n                  </div>\n                </li>\n                <li>\n                  <div class="media">\n                    <img class="d-flex align-self-center img-radius" src="assets/images/avatar-3.jpg" alt="Generic placeholder image">\n                    <div class="media-body">\n                      <h5 class="notification-user">Sara Soudein</h5>\n                      <p class="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>\n                      <span class="notification-time">30 minutes ago</span>\n                    </div>\n                  </div>\n                </li>\n              </ul>\n            </li>\n            <li (clickOutside)="notificationOutsideClick(\'profile\')" class="user-profile header-notification" [ngClass]="profileNotificationClass" (click)="toggleProfileNotification()">\n              <a href="javascript:">\n                <img src="assets/images/avatar-4.jpg" class="img-radius" alt="User-Profile-Image">\n                <span>John Doe</span>\n                <i class="ti-angle-down"></i>\n              </a>\n              <ul [@notificationBottom]="profileNotification" class="show-notification profile-notification">\n                <li>\n                  <a href="javascript:">\n                    <i class="ti-settings"></i> Settings\n                  </a>\n                </li>\n                <li>\n                  <a [routerLink]="[\'/user/profile/\']">\n                    <i class="ti-user"></i> Profile\n                  </a>\n                </li>\n                <li>\n                  <a [routerLink]="[\'/email/inbox/\']">\n                    <i class="ti-email"></i> My Messages\n                  </a>\n                </li>\n                <li>\n                  <a [routerLink]="[\'/authentication/lock-screen/\']">\n                    <i class="ti-lock"></i> Lock Screen\n                  </a>\n                </li>\n                <li>\n                  <a [routerLink]="[\'/authentication/login/\']">\n                    <i class="ti-layout-sidebar-left"></i> Logout\n                  </a>\n                </li>\n              </ul>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </nav>\n    <section class="login header d-flex pos-relative text-center bg-primary common-img-bg">\n      \x3c!-- Container-fluid starts --\x3e\n      <div class="container-fluid">\n        <div class="row">\n          <div class="col-sm-12">\n            \x3c!-- Authentication card start --\x3e\n            <div class="signup-card card-block auth-body mr-auto ml-auto">\n              <form class="md-float-material">\n                <div class="text-center">\n                  <img src="assets/images/logo.png" alt="Gradient Able">\n                </div>\n                <div class="auth-box">\n                  <div class="row m-b-20">\n                    <div class="col-md-12">\n                      <h3 class="text-center txt-primary">Sign up. It is fast and easy.</h3>\n                    </div>\n                  </div>\n                  <p class="text-inverse b-b-default text-left p-b-5">Sign in easily with your social account:</p>\n                  <div class="row m-b-5">\n                    <div class="col-sm-6">\n                      <button type="button" class="btn btn-facebook m-b-5"><i class="fa fa-facebook"></i>Sign in with facebook</button>\n                    </div>\n                    <div class="col-sm-6">\n                      <button type="button" class="btn btn-twitter m-b-0"><i class="fa fa-twitter"></i>Sign in with twitter</button>\n                    </div>\n                  </div>\n                  <p class="text-inverse b-b-default text-left p-b-5">Sign in with your regular account</p>\n                  <div class="input-group">\n                    <input type="text" class="form-control" placeholder="Choose Username">\n                    <span class="md-line"></span>\n                  </div>\n                  <div class="input-group">\n                    <input type="text" class="form-control" placeholder="Your Email Address">\n                    <span class="md-line"></span>\n                  </div>\n                  <div class="input-group">\n                    <input type="password" class="form-control" placeholder="Choose Password">\n                    <span class="md-line"></span>\n                  </div>\n                  <div class="input-group">\n                    <input type="password" class="form-control" placeholder="Confirm Password">\n                    <span class="md-line"></span>\n                  </div>\n                  <div class="row m-t-15 text-left">\n                    <div class="col-md-12">\n                      <div class="checkbox-fade fade-in-primary">\n                        <label>\n                          <input type="checkbox" value="">\n                          <span class="cr"><i class="cr-icon fa fa-check txt-primary"></i></span>\n                          <span class="text-inverse">I read and accept <a href="javascript:">Terms &amp; Conditions.</a></span>\n                        </label>\n                      </div>\n                    </div>\n                    <div class="col-md-12">\n                      <div class="checkbox-fade fade-in-primary">\n                        <label>\n                          <input type="checkbox" value="">\n                          <span class="cr"><i class="cr-icon fa fa-check txt-primary"></i></span>\n                          <span class="text-inverse">Send me the <a href="javascript:">Newsletter</a> weekly.</span>\n                        </label>\n                      </div>\n                    </div>\n                  </div>\n                  <div class="row m-t-15">\n                    <div class="col-md-12">\n                      <button type="button" class="btn btn-primary btn-md btn-block waves-effect text-center m-b-10">Sign up now</button>\n                    </div>\n                  </div>\n                  <hr/>\n                  <div class="row">\n                    <div class="col-md-10">\n                      <p class="text-inverse text-left m-b-0">Thank you and enjoy our website.</p>\n                      <p class="text-inverse text-left"><b>Your Authentication Team</b></p>\n                    </div>\n                    <div class="col-md-2">\n                      <img src="assets/images/auth/Logo-small-bottom.png" alt="Gradient Able">\n                    </div>\n                  </div>\n                </div>\n              </form>\n              \x3c!-- end of form --\x3e\n            </div>\n            \x3c!-- Authentication card end --\x3e\n          </div>\n          \x3c!-- end of col-sm-12 --\x3e\n        </div>\n        \x3c!-- end of row --\x3e\n      </div>\n      \x3c!-- end of container-fluid --\x3e\n    </section>\n    <div class="footer bg-inverse">\n      <p class="text-center">Copyright &copy; 2017 GRADIENT ABLE ADMIN , All rights reserved.</p>\n    </div>\n  </div>\n</div>\n'},z0hj:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("WT6e"),a=i("Xjw4"),s=i("WPXp"),o=this&&this.__decorate||function(t,e,i,n){var a,s=arguments.length,o=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(o=(s<3?a(o):s>3?a(e,i,o):a(e,i))||o);return s>3&&o&&Object.defineProperty(e,i,o),o},c=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},l=function(){function t(){this.navType="st2",this.themeLayout="vertical",this.verticalPlacement="left",this.verticalLayout="wide",this.pcodedDeviceType="desktop",this.verticalNavType="expanded",this.verticalEffect="shrink",this.vnavigationView="view1",this.freamType="theme1",this.sidebarImg="false",this.sidebarImgType="img1",this.layoutType="light",this.headerTheme="themelight5",this.pcodedHeaderPosition="fixed",this.liveNotification="an-off",this.profileNotification="an-off",this.searchWidth=0,this.navRight="nav-on",this.windowWidth=window.innerWidth,this.setHeaderAttributes(this.windowWidth)}return t.prototype.ngOnInit=function(){},t.prototype.onResize=function(t){this.windowWidth=t.target.innerWidth,this.setHeaderAttributes(this.windowWidth)},t.prototype.setHeaderAttributes=function(t){this.navRight=t<992?"nav-off":"nav-on"},t.prototype.toggleHeaderNavRight=function(){this.navRight="nav-on"===this.navRight?"nav-off":"nav-on"},t.prototype.toggleLiveNotification=function(){this.liveNotification="an-off"===this.liveNotification?"an-animate":"an-off",this.liveNotificationClass="an-animate"===this.liveNotification?"active":""},t.prototype.toggleProfileNotification=function(){this.profileNotification="an-off"===this.profileNotification?"an-animate":"an-off",this.profileNotificationClass="an-animate"===this.profileNotification?"active":""},t.prototype.notificationOutsideClick=function(t){"live"===t&&"an-animate"===this.liveNotification?this.toggleLiveNotification():"profile"===t&&"an-animate"===this.profileNotification&&this.toggleProfileNotification()},t.prototype.searchOn=function(){var t=this;document.querySelector("#main-search").classList.add("open");var e=setInterval(function(){if(t.searchWidth>=200)return clearInterval(e),!1;t.searchWidth=t.searchWidth+15,t.searchWidthString=t.searchWidth+"px"},35)},t.prototype.searchOff=function(){var t=this,e=setInterval(function(){if(t.searchWidth<=0)return document.querySelector("#main-search").classList.remove("open"),clearInterval(e),!1;t.searchWidth=t.searchWidth-15,t.searchWidthString=t.searchWidth+"px"},35)},t=o([Object(n.Component)({selector:"app-social-header-footer-reg",template:i("e+jP"),styles:[i("Raou")],animations:[Object(s.trigger)("notificationBottom",[Object(s.state)("an-off, void",Object(s.style)({overflow:"hidden",height:"0px"})),Object(s.state)("an-animate",Object(s.style)({overflow:"hidden",height:s.AUTO_STYLE})),Object(s.transition)("an-off <=> an-animate",[Object(s.animate)("400ms ease-in-out")])]),Object(s.trigger)("mobileHeaderNavRight",[Object(s.state)("nav-off, void",Object(s.style)({overflow:"hidden",height:"0px"})),Object(s.state)("nav-on",Object(s.style)({height:s.AUTO_STYLE})),Object(s.transition)("nav-off <=> nav-on",[Object(s.animate)("400ms ease-in-out")])])]}),c("design:paramtypes",[])],t)}(),r=i("bfOx"),d=this&&this.__decorate||function(t,e,i,n){var a,s=arguments.length,o=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(o=(s<3?a(o):s>3?a(e,i,o):a(e,i))||o);return s>3&&o&&Object.defineProperty(e,i,o),o},f=[{path:"",component:l,data:{title:"Social Header & Footer Registration"}}],p=function(){function t(){}return t=d([Object(n.NgModule)({imports:[r.g.forChild(f)],exports:[r.g]})],t)}(),h=i("fAE3");i.d(e,"SocialHeaderFooterRegModule",function(){return u});var v=this&&this.__decorate||function(t,e,i,n){var a,s=arguments.length,o=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(o=(s<3?a(o):s>3?a(e,i,o):a(e,i))||o);return s>3&&o&&Object.defineProperty(e,i,o),o},u=function(){function t(){}return t=v([Object(n.NgModule)({imports:[a.CommonModule,p,h.a],declarations:[l]})],t)}()}});