import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MediumLabel, Label, SmallLabel } from './Result';

const Wrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

const List = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 20px;
  padding-bottom: 20px;
`;

const Card = styled.div`
  flex-shrink: none;
  flex-basis: 90px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, .75);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media (min-width: 768px) {
    flex-basis: 110px;
  }
  @media (min-width: 1024px) {
    flex-basis: 125px;
  }
  @media (min-width: 1440px) {
    flex-basis: 140px;
  }
`;

const Icon = styled.img`
  display: block;
  margin: 0 auto;
  width: 50px;
  height: 50px;
`;

class Forecast extends React.Component {
  render() {
    const Content = this.props.forecast.map(d => (
      <Card key={d.dt}>
        <Label align="center" color="#000">
          {d.dt_txt.slice(8, 10)}/{d.dt_txt.slice(5, 7)}
        </Label>
        <Label align="center" color="#000">{d.dt_txt.slice(11, 13)}:00</Label>
        <Icon src={`https://openweathermap.org/img/w/${d.weather[0].icon}.png`} />
        <SmallLabel align="center" weight="normal" color="#000">
          {Math.floor(d.main.temp)}&deg;
        </SmallLabel>
        <Label align="center" color="#000" marginTop="10px" fontSize=".9em">
          {d.main.humidity}%
        </Label>
        <Label align="center" color="#000" marginTop="10px" fontSize=".9em">
          {d.main.pressure}hPa
        </Label>
        <Label align="center" color="#000" marginTop="10px" fontSize=".9em">
          {d.wind.speed}m/s
        </Label>
        <Label align="center" color="#000" marginTop="10px" fontSize=".9em">
          {d.rain ? d.rain["3h"]+"mm" : "-"}
        </Label>
      </Card>
    ));

    return (
      <Wrapper>
        <MediumLabel weight="normal">Forecast</MediumLabel>
        <List>
          {Content}
        </List>
      </Wrapper>
    );
  }
}

Forecast.propTypes = {
  forecast: PropTypes.array.isRequired
}

export default Forecast; 