import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import './weather.css'
function Weather() {

    const [location, setLocation] = useState('')
    const [data, setData] = useState({})
    const [url, setUrl] = useState('')

    const API_KEY = '59dac662600b6f269298b677e9ca5fba';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
    const locationHandler = (e) => {
        setLocation(e.target.value);
    }

    const fetchData = async () => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setData(data);
            setUrl(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            console.log(data);
        } catch (err) {
            alert('Oops! Unable to fetch weather data for the provided location')
        }
    }

    const searchBtn = () => {
        setData({})
        fetchData()
    }

    return (
        <div style={{ fontFamily: 'Times New Roman' }}>
            <Row style={{ marginTop: '15%' }}>

                <Col xl={3}> </Col>

                <Col sm={12} md={12} lg={6} xl={6} style={{ color: 'white' }}>
                    <div className="container">
                        <div className="search-container">
                            <input className="input" type="text" placeholder='Search for weather by location' onChange={(e) => locationHandler(e)}/>
                            <svg viewBox="0 0 24 24" className="search__icon" onClick={searchBtn}>
                                <g>
                                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 
                                    4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                                    </path>
                                </g>
                            </svg>
                        </div>
                    </div>
                  
                    {data.name != undefined && <div>

                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '25px' }} className='mt-4'>{data.name}, {data.sys.country}</p>
                            {data.main ? <p style={{ fontWeight: 'bolder', fontSize: '50px', textShadow: '2px 2px 4px #000000' }}><span>{data.main.temp}</span>
                                <span style={{ fontSize: '50px', color: 'orange', textShadow: '2px 2px 4px #000000' }}> °C</span></p> : null}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            {data.weather ? <img src={url} width={'80px'} alt="" /> : null}
                            {data.weather ? <p>{data.weather[0].description}</p> : null}
                            <div>
                                <p> {data.main ? <span>Wind Speed: {data.wind.speed} km/h</span> : null} <br />
                                    {data.main ? <span> Humidity: {data.main.humidity}% </span> : null}</p>
                            </div>
                        </div>


                    </div>}

                </Col>

                <Col xl={3}> </Col>
            </Row>
        </div>
    )
}

export default Weather