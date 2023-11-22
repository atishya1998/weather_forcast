import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartDataset } from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { AppStateService } from '../app-state.service';
//import * as Chart from 'chart.js/auto';

import { ChartOptions } from 'chart.js';
@Component({
  selector: 'app-details-screen',
  templateUrl: './details-screen.component.html',
  styleUrls: ['./details-screen.component.css']
})
export class DetailsScreenComponent implements OnInit, OnDestroy {

  selectedDay!: string;
  details: any = {}; // Variable to store detailed information
  dailyForecast: any;
  hourlyData: any = {};
  selectedDayData: any;
  data: any
  @ViewChild('hourlyChart') hourlyChartRef!: ElementRef;
  chart!: Chart; // Add this line
  private routeSubscription: Subscription | undefined;
  private hourlyChartData: any;

  public chartTest: any;
  constructor(private route: ActivatedRoute,
    private appStateService: AppStateService) { }
  ngOnInit(): void {
    this.createChartTest();
    // Subscribe to route params to get the selected day
    this.route.params.subscribe(params => {
      this.selectedDay = params['day'];
      console.log(params)

      // this.data = this.route.snapshot.data['data'];
      // Retrieve daily forecast data from the route state
      this.selectedDayData = history.state.data;
      this.selectedDay = params['day'];
      //this.details = this.route.snapshot.data['data'].daily;

      //this.selectedDayData = this.appStateService.selectedDay$;
      //this.details = history.state.data.daily;
      this.hourlyData = history.state.data.hourly;
      console.log('Selected Day:', this.selectedDay);
      console.log('Selected Day Data:', this.selectedDayData);
      console.log('Day Data:', this.hourlyData);

      //this.hourlyChartData = this.route.snapshot.data['data'];
      // Find the selected day's details
      // console.log(this.selectedDayData.hourly)
      //console.log(this.selectedDayData.hourly.time)
      //this.dailyForecast =  history.state.data;

      // Render the hourly chart for the selected day
      // Function to filter hourly data based on the selected date
      this.filterHourlyData(this.selectedDay); // Function to create the chart


    });
  }


  createChartTest(){

    this.chartTest = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  ngOnDestroy(): void {
    // Destroy the chart to prevent memory leaks
    if (this.chart) {
      this.chart.destroy();
    }
  }
  filterHourlyData(selectedDate: string): void {
    const hourlyData = this.hourlyData;
    const startIndex = hourlyData.time.indexOf(selectedDate + "T00:00");
    const endIndex = hourlyData.time.indexOf(selectedDate + "T23:00");
    console.log(startIndex + '--' + endIndex + '--' + selectedDate + "T00:00")
    if (startIndex >= 0 && endIndex >= 0) {
      const temperatureData = hourlyData.temperature_2m.slice(startIndex, endIndex + 1);
      const timeLabels = hourlyData.time.slice(startIndex, endIndex + 1);
      const rainData = hourlyData.rain.slice(startIndex, endIndex + 1);
      const wind_speed_10m = hourlyData.wind_speed_10m.slice(startIndex, endIndex + 1);
      const chartData: ChartDataset[] = [
        {
          label: "Temperature",
            data: temperatureData,
            backgroundColor: 'green'
        },
        {
          label: "Rain",
          data: rainData,
          backgroundColor: 'blue'
        },
        {
          label: "Wind Speed - 10m",
          data: wind_speed_10m,
          backgroundColor: 'brown'
        }

        // Add more datasets as needed
      ];




      if (this.chart) {
        this.chart.data.labels = timeLabels;
        this.chart.data.datasets = chartData;
        this.chart.options = {aspectRatio:2.5};
        this.chart.update();
        console.log(timeLabels)
        console.log(chartData)
      } else {
        const canvas = this.hourlyChartRef.nativeElement;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          console.error("Canvas context not found.");
          return;
        }

        this.chart = new Chart(ctx, {
          type: 'line',

          data: {

            labels: timeLabels,
            datasets: chartData
          },
          options: {aspectRatio:2.5},


        });
        console.log('Chart Options:');
      }
    }
  }



  /*
    renderHourlyChart(): void {
      const hourlyData = this.hourlyChartData;
     console.log(hourlyData)

      if (this.hourlyChartRef) {
        const ctx = this.hourlyChartRef.nativeElement.getContext('2d');


        if (hourlyData && hourlyData.chart) {
          hourlyData.chart.destroy();
        }


        hourlyData.chart = new Chart(ctx, {
          type: 'line',
          data: hourlyData,
          options: {}, // You can add options as needed
        });


      }
    } */
}
