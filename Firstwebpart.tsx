import * as React from 'react';
import styles from './Firstwebpart.module.scss';
import type { IFirstwebpartProps } from './IFirstwebpartProps';
import { IFirstwebpartState } from './IFirstwebpartState';
import axios from 'axios';

export default class Firstwebpart extends React.Component<IFirstwebpartProps, IFirstwebpartState> {
  constructor(props: IFirstwebpartProps) {
    super(props);
    this.state = {
      name: "",
      temp: 0,
      humidity: "",
      speed: "",
      currentDate: new Date().toLocaleDateString(),
      currentTime: new Date().toLocaleTimeString(),
      locationInput: "",
      location: "Melville"
    }
  }

  private _CurrentWeather = async () => {
    const { location } = this.state;
   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=0052bc480848232b1920edeb67e411f4`;

    const weatherData = await axios.get(url).then((response) => {
      console.log(response.data);
      console.log(response.data.main.temp);
      console.log(response.data.main.humidity);
      console.log(response.data.wind.speed);
      console.log(response.data.name)
      this.setState({
        name: response.data.name,
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        speed: response.data.wind.speed
      });
    });
    console.log(weatherData);
  }

  private handleLocationInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({locationInput: event.target.value});
  }

  private handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const{ locationInput } = this.state;
    this.setState({location: locationInput}, () => {
      this._CurrentWeather();
    });
  }
 
  public componentDidMount(): void {
    this._CurrentWeather();
    setInterval(() => {
      this.setState({
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString()
      });
    }, 1000);
    
  }

  public render(): React.ReactElement<IFirstwebpartProps> {
    
    return (
      <div className= {styles.container}>
          <div className= {styles.topbar}>
          <div className={styles.searchicon}>
            <img src={require('../assets/search.png')} alt= "" />
          </div>
          <input type="text"
          value={this.state.locationInput}
            onChange={this.handleLocationInputChange}
            placeholder='Enter Location'
            />
            <button onClick={this.handleSearch}>Search</button>
          </div>
          <div className= {styles.weatherimage}>
              <img src={require('../assets/cloud.png')} alt= "" />
          </div>
          <div className= {styles.weathertemp}>{Math.round(this.state.temp)}°F</div>
          <div className= {styles.weatherlocation}>{this.state.location}</div>
          <div className= {styles.datacontainer}>
            <div className= {styles.element}>
              <img src={require('../assets/humidity.png')} alt= ""/>
              <div className= {styles.data}>
                <div className= "humiditypercentage">{this.state.humidity}%</div>
                <div className= {styles.text}>Humidity</div>
              </div>
            </div>
            <div className= {styles.element}>
              <img src={require('../assets/wind.png')} alt= ""/>
              <div className= {styles.data}>
                <div className= "windrate">{this.state.speed} m/s</div>
                <div className= {styles.text}>Wind Speed</div>
              </div>
            </div>
            <div className={styles.timeanddate}>
            <div className={styles.timeanddate}>Time: {this.state.currentTime}</div>
            <div className={styles.timeanddate}>Date: {this.state.currentDate}</div>
          </div>
          </div>
      </div>

    );
  }
}
