import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  todayDate : Date = new Date();
  details:any;
  data:any;
  success:any;
  local_deaths:any;
  local_total_cases:any;
  local_recovered:any;
  local_active_cases:any;
  public doughnutChartLabels:string[] = ['Local Total Cases','Local Deaths', 'Local Active Cases','Local Recovered Cases'];
  public demodoughnutChartData :number[]=[];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartColors: Array < any > = [{
    backgroundColor: ['rgb(104, 139, 196)','rgb(252, 78, 93)','rgb(3, 148, 78)', 'orange']
 }];

  constructor(private http:HttpClient) { }

  labels =  [];

  // OBJECT FOR datasets WITH EMPTY data.
  chartData =[
    {
      barThickness: 20,
      maxBarThickness: 25,
      label: 'Covid-19 patients',
      data: [], 
    }
  ];

   // CHART COLOR.
   colors = [
    { // 1st Year.
      backgroundColor: 'rgb(235, 49, 49)'
    }
   ]
   ngOnInit(): void {
    this.getJSON().subscribe(data => {
      console.log(data.length);
      for(var i=0;i<data.length;i++){
        this.chartData[0].data.push(data[i].no_of_patients);
        this.labels.push(data[i].date);
      }
    });
    this.showData();
    console.log(this.todayDate);
    
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  getData(){
     return this.http.get('https://hpb.health.gov.lk/api/get-current-statistical');
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/data.json");
}

  showData(){
    this.getData().subscribe(
      data=>{
        this.details=data['data'];
        this.success=data['success']
        console.log(this.details);
        this.local_deaths=data['data'].local_deaths;
        this.demodoughnutChartData.push(this.details.local_total_cases,this.details.local_deaths,this.details.local_recovered,this.details.local_active_cases);
      },
      err=>{
        console.log(err);
      }
    )
  }
}
