import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FadeIn } from './PrintErr';
import Forecast from './Forecast';
import WeatherIcon from './WeatherIcon';

export const Label = styled.span`
  color: ${({ color }) => color || '#FFFFFF'};
  display: block;
  font-size: ${({ fontSize }) => fontSize || '.75em'};
  text-align: ${({ align }) => align || 'left'};
  margin-top: ${({ marginTop }) => marginTop || '0'};
  ${({ capitalize }) => capitalize && `
    &:first-letter {
      text-transform: uppercase;
    }`}
  @media (max-width: 525px) {
    text-align: ${({ special }) => special && 'left'};
  }
  @media (min-width: 768px) {
    font-size: ${({ fontSize }) => fontSize || '.9em'};
  }
  @media (min-width: 1024px) {
    font-size: ${({ fontSize }) => fontSize || '1.1em'};
  }
  @media (min-width: 1440px) {
    font-size: ${({ fontSize }) => fontSize || '1.2em'};
  }
`;

// Some kind of heritance in components
export const SmallLabel = styled(Label)`
  font-weight: ${({ weight }) => weight || '600'};
  font-size: ${({ fontSize }) => fontSize || '.9em'};
  padding: 5px 0;
  @media (min-width: 768px) {
    font-size: ${({ fontSize }) => fontSize || '1.25em'};
  }
  @media (min-width: 1024px) {
    font-size: ${({ fontSize }) => fontSize || '1.44em'};
  }
  @media (min-width: 1440px) {
    font-size: ${({ fontSize }) => fontSize || '1.625em'};
  }
`;

export const MediumLabel = styled(SmallLabel)`
font-size: ${({ fontSize }) => fontSize || '1.25em'};
@media (min-width: 768px) {
  font-size: ${({ fontSize }) => fontSize || '1.44em'};
}
@media (min-width: 1024px) {
  font-size: ${({ fontSize }) => fontSize || '1.625em'};
}
@media (min-width: 1440px) {
  font-size: ${({ fontSize }) => fontSize || '1.8125em'};
}
`;

export const BigLabel = styled(SmallLabel)`
  font-size: ${({ fontSize }) => fontSize || '1.875em'};
  @media (min-width: 768px) {
    font-size: ${({ fontSize }) => fontSize || '2.3em'};
  }
  @media (min-width: 1024px) {
    font-size: ${({ fontSize }) => fontSize || '2.7em'};
  }
  @media (min-width: 1440px) {
    font-size: ${({ fontSize }) => fontSize || '3.25em'};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 40px;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${FadeIn} 0.5s 0.75s forwards;
`;

const Location = styled.div`
  flex-basis: 100%;
`;

const Weather = styled.div`
  flex-basis: 100%;
  display: grid;
  justify-content: center;
  align-items:center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  @media (min-width: 525px) {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;

const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: normal;
  color: #fff;
  @media (min-width: 768px) {
    font-size: 70px;
  }
  @media (min-width: 1024px) {
    font-size: 90px;
  }
  @media (min-width: 1440px) {
    font-size: 110px;
  }
`;

const Details = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, .75);
  border-radius: 10px;
  align-self: flex-start;
  @media (min-width: 525px) {
    flex-basis: 50%;
  }
`;

const Card = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media (min-width: 1024px) {
    padding: 20px 10px;
  }
`;

class Result extends React.Component {
  render() {
    const { city, country, today, desc, main, temp, max, min,
    humidity, wind_speed, wind_dir, forecast, pres, prec} = this.props.data;
    return (
      <Wrapper>
        {/* Selected city with today's date */}
        <Location>
          <BigLabel align="center" special>{city}, {country}</BigLabel>
          <SmallLabel weight="normal" align="center" special>{today}</SmallLabel>
        </Location>
        {/* Current temperature with small description */}
        <Weather>
          <WeatherIcon mode={main}/>
          <div>
            <Temperature>{Math.round(temp)}&deg;</Temperature>
            <SmallLabel weight="normal" capitalize>{desc}</SmallLabel>
          </div>
        </Weather>
        {/* Details about today's weather */}
        <Details>
          <Card>
            <SmallLabel align="center" weight="normal" color="#000">
              {Math.round(max) + 1}&deg;
            </SmallLabel>
            <Label align="center" color="#000">Maximum</Label>
          </Card>
          <Card>
            <SmallLabel align="center" weight="normal" color="#000">
              {humidity}%
            </SmallLabel>
            <Label align="center" color="#000">Humidity</Label>
          </Card>
          <Card>
            <SmallLabel align="center" weight="normal" color="#000">
              {pres}hPa
            </SmallLabel>
            <Label align="center" color="#000">Pressure</Label>
          </Card>
          <Card>
            <SmallLabel align="center" weight="normal" color="#000">
              {Math.round(min) - 1}&deg;
            </SmallLabel>
            <Label align="center" color="#000">Minimum</Label>
          </Card>
          <Card>
            <SmallLabel align="center" weight="normal" color="#000">
            {wind_dir} {wind_speed}m/s
            </SmallLabel>
            <Label align="center" color="#000">Wind</Label>
          </Card>
          <Card>
            <SmallLabel align="center" weight="normal" color="#000">
              {prec + (prec !== '-' ? "mm/h" : '')}
            </SmallLabel>
            <Label align="center" color="#000">Precipitation</Label>
          </Card>
        </Details>
        {/* Forecast in another file to shorten the code */}
        <Forecast forecast={forecast} />
      </Wrapper>
    );
  }
}

Result.propTypes = {
  data: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    today: PropTypes.string,
    desc: PropTypes.string,
    main: PropTypes.string,
    temp: PropTypes.number,
    humidity: PropTypes.number,
    wind_speed: PropTypes.number,
    wind_dir: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    forecast: PropTypes.array,
    pres: PropTypes.number,
    prec: PropTypes.any
  }).isRequired
};

export default Result;