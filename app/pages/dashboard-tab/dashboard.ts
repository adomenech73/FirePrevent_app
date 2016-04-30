import {Page} from 'ionic-angular';
import * as c3 from 'c3';

@Page({
  templateUrl: 'build/pages/dashboard-tab/dashboard.html',
})
export class PageDashboard{
    constructor() { }

  ngAfterViewInit(){
  var chart = c3.generate({
    data: {
        x: 'x',
// xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
            ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06', '2013-01-07', '2013-01-08'],
            ['data1', 30, 200, 100, 400, 150, 250, 300, 250] //,
            //['data2', 130, 340, 200, 500, 250, 350]
        ],
        types: {
            data1: 'area-spline'//,
            //data2: 'area-spline'
        },
        size: { 
            height: 100, 
            width: 600 
        }
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                //format: '%Y-%m-%d'
                rotate: 90,
                format: '%Y-%m-%d'
                //format: function (x) { return x.getFullYear(); }
            },
            height: 100
        },
        y: {
            //max: .1,
            //min: 0,
            padding: { top: 0, bottom: 0}//, left:0, rigth:0 }
        }

    }
});

setTimeout(function () {
    chart.load({
        columns: [
            ['data2', 400, 500, 450, 700, 600, 500, 450, 550]
        ],
        types: {
            data2: 'area-spline'
        }
    });
   }, 1000);
  }  
}
