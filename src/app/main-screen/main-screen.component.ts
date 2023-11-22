import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { fetchWeatherApi } from 'openmeteo';
import { Router } from '@angular/router';
import { AppStateService } from '../app-state.service';
import { EventTrafficService } from '../event-traffic.service';
@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],

})
export class MainScreenComponent {
  cityName: string = '';
  weatherDetails: any;
  weeklyForecast: any[] = [];
  constructor(private http: HttpClient,private router: Router,private appStateService: AppStateService,private eventTrafficService: EventTrafficService) { }
  dailyForecastData: any[] = [];
  hourly : any
  public currentTemperature!: number | 0; // Set this value based on your data
  topTrafficUpdates: any[] = [];
  temperatureBackgrounds = [
    { min: -10.0, max: 0.0, background: 'url("https://p1.pxfuel.com/preview/801/688/48/snowflake-ice-frozen-cold-winter.jpg")' },
    { min: 1.0, max: 10.9, background: 'url("https://i.etsystatic.com/5157128/r/il/fdd609/675891069/il_570xN.675891069_846e.jpg")' },
    { min: 11.0, max: 20.9, background: 'url("https://images.freejpg.com.ar/900/0904/soft-pastel-clouds-sky-nature-outdoors-climate-F100018615.jpg")' },
    { min: 21.0, max: 30.9, background: 'url("https://i.pinimg.com/originals/a7/0e/47/a70e477921675d874de0ff743803d700.png")' },
    { min: 31.0, max: 40.9, background: 'url("https://media.istockphoto.com/photos/rising-sun-in-a-cloudy-blue-sky-picture-id822060428?b=1&k=20&m=822060428&s=170667a&w=0&h=LvUGMNFhdkd7M55FiG4Zd4mNfKL0sbggK8eq9kS17YQ=")' },
    // Add more ranges as needed
  ];
  ngOnInit(): void {
      this.router.navigate(['/main']);
  }
  searchWeather() {





      const geocodingApiUrl = `https://nominatim.openstreetmap.org/search`;
    this.http.get(geocodingApiUrl, {
      params: {
        q: this.cityName,
        format: 'json',
        limit: '1'
      }
    }).subscribe(
      (geocodingData: any): void => {
        if (geocodingData.length === 0) {
          alert('City not found');
          return;
        }

        const latitude = geocodingData[0].lat;
        const longitude = geocodingData[0].lon;
        alert("Latitude :"+latitude + " & " + "Longitud :"+longitude)

        // Use the coordinates to fetch weather data from the Open Meteo API
        const openMeteoApiUrl = 'https://api.open-meteo.com/v1/forecast?forecast=hourly_7days&timezone=GMT&daily=sunrise,sunset&latitude=' + latitude + '&longitude=' + longitude + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,precipitation,rain,showers,snowfall,visibility,wind_speed_10m,wind_direction_10m&daily=weather_code,sunrise,sunset,uv_index_max,rain_sum,snowfall_sum,precipitation_hours'
        const openMeteoSpiUrl14daysForcast = 'https://api.open-meteo.com/v1/forecast?forecast=hourly_7days&timezone=GMT&daily=sunrise,sunset&latitude=' + latitude + '&longitude=' + longitude + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,precipitation,rain,showers,snowfall,visibility,wind_speed_10m,wind_direction_10m&daily=weather_code,sunrise,sunset,uv_index_max,rain_sum,snowfall_sum,precipitation_hours&forecast_days=14'

        this.http.get(openMeteoApiUrl
        ).subscribe(
          (data: any) => {
            if (data.error) {
              console.error('Error fetching weather data:', data.reason);
              return;
            }
         //  this.appStateService.setSelectedDay(this.weeklyForecast[0]?.time);

            this.weatherDetails = data.current;
            this.hourly= data.hourly


           // this.weeklyForecast = Object.keys(data.hourly.relative_humidity_2m).map(key => data.hourly.relative_humidity_2m[key]);
           this.weeklyForecast = data.daily && data.daily.time ? data.daily.time.map((day: any, index: number) => {
            const dailyIndex = index < data.daily.sunrise.length ? index : 0; // Ensure index is within bounds


            return {
              time: day,
              sunrise: data.daily.sunrise[dailyIndex],
              sunset: data.daily.sunset[dailyIndex],
              weather_code: data.daily.weather_code && data.daily.weather_code[dailyIndex],
              temperature_2m: data.hourly.temperature_2m && data.hourly.temperature_2m[dailyIndex],
              rain: data.hourly.rain && data.hourly.rain[dailyIndex],
              wind_speed_10m: data.hourly.wind_speed_10m && data.hourly.wind_speed_10m[dailyIndex],
              relative_humidity_2m: data.hourly.relative_humidity_2m && data.hourly.relative_humidity_2m[dailyIndex],
              // Add more properties as needed
            };
          }) : [];
           // console.log(this.weatherDetails)
            //console.log(this.weeklyForecast)
            //alert (data.hourly.relative_humidity_2m)
this.currentTemperature = Number(data.hourly.temperature_2m[1])
console.log('current')
console.log(this.currentTemperature)
          },
          (error) => {
            console.error('Error fetching weather data', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching geocoding data', error);
      }
    );
  }
  showDetails(day: any){
    alert(day)
 // Navigate to details screen and pass day details as query parameters
 this.router.navigate(['/dailyForecast'], { queryParams: day });
  }
// Navigate to details page with the selected day
openDetailsPage(day: any): void {
 // this.router.navigate(['/details', selectedDay]);
 console.log('main')
  if (day) {
    const selectedDayData = this.weeklyForecast.find(item => item.time === day.time);
    this.appStateService.setSelectedDay(this.weeklyForecast[0]?.time);

console.log(this.hourly)
this.router.navigate(['/details', day.time], {
  state: { data: { daily: day, hourly: this.hourly } },
});
   // this.router.navigate(['/details', day.time],    {state: { data: { daily: day, hourly: this.weeklyForecast } }} );
    // { state: { data: selectedDayData } }

    //this.router.navigate(['/details'], {state: { data: { daily: day, hourly: this.weeklyForecast } },});

  // this.router.navigate(['/details', day.time], { state: { data: this.weeklyForecast } });

  }
}

getBackgroundStyle() {
  const range = this.temperatureBackgrounds.find(
    (tempRange) =>
      this.currentTemperature >= tempRange.min &&
      this.currentTemperature <= tempRange.max
  );

  return range ? { 'background-image': range.background } : {};
}


reset(): void {
  this.weeklyForecast = [];
 this.weatherDetails = null
  this.cityName = '';
  // Clear the detail screen
  //this.router.navigate(['/details']);

 // this.router.navigate(['/main']);
 this.router.navigate(['/main'], { replaceUrl: true });
}



}

