import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import {
    MDBInputGroup,
    MDBIcon
} from 'mdb-react-ui-kit';

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
        <div style={{fontFamily: 'Times New Roman' }}>
            <Row style={{ marginTop: '15%' }}>

                <Col xl={3}> </Col>

                <Col sm={12} md={12} lg={6} xl={6} style={{ color: 'white' }}>
                    <div className="container">
                    <MDBInputGroup className='mb-5' noBorder>
                        <input className='form-control' type='text' placeholder='Search' onChange={(e) => locationHandler(e)} />
                        <button onClick={searchBtn} className='searchBtn' style={{ border: 'none', background: 'transparent',color:'white' }}>
                            <MDBIcon fas icon='search' />
                        </button>                    
                    </MDBInputGroup></div>
                    {data.name != undefined && <div>

                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '25px' }}>{data.name}, {data.sys.country}</p>
                            {data.main ? <p style={{ fontWeight: 'bolder', fontSize: '50px',textShadow:'2px 2px 4px #000000' }}><span>{data.main.temp}</span>
                                <span style={{ fontSize: '50px', color: 'orange',textShadow:'2px 2px 4px #000000' }}> °C</span></p> : null}
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