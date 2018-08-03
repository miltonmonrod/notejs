import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

import {NotificationsService} from 'angular2-notifications';
declare const AmCharts: any;
@Component({
  selector: 'app-dasboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'    
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private chart: any;
  public seoCard1Data: any;
  public seoCard2Data: any;
  public seoCard1Option: any;
  public seoCard2Option: any;
  @ViewChild('seoCard1Chart') seoCard1Chart: ElementRef;
  @ViewChild('seoCard2Chart') seoCard2Chart: ElementRef;
  public seoCard1Tag: CanvasRenderingContext2D;
  public seoCard2Tag: CanvasRenderingContext2D;

  public feedbackData: any;
  public feedbackOption: any;

    options: any = {
      position: ['bottom', 'right'],
    };

    constructor(private servicePNotify: NotificationsService) {
    }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.options  = {
        position : ['bottom', 'right'],
        maxStack: 8,
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        lastOnBottom: true,
        clickToClose: true,
        preventDuplicates: false,
        preventLastDuplicates: false,
        theClass: 'bg-c-pink no-icon',
        rtl: false,
        animate: 'rotate'
      };

      this.servicePNotify.html(
        '<h4>Bienvenido!!</h4> <p>En este panel encontrará información estadistica para su gestión.</p>',
        'success'
      );    
      /* seo card end */
    }, 75);
  }

}




