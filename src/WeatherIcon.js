import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: #fff;
  @media (min-width: 768px) {
    font-size: 100px;
    justify-content: flex-end;
  }
  @media (min-width: 1024px) {
    font-size: 120px;
  }
  @media (min-width: 1440px) {
    font-size: 140px;
  }
`;

class WeatherIcon extends React.Component {
  render() {
    const Icon =
      (this.props.mode === "Clear") ? <FontAwesomeIcon icon={faSun} /> :
      (this.props.mode === "Clouds") ? <FontAwesomeIcon icon={faCloud} /> :
      (this.props.mode === "Rain") ? <FontAwesomeIcon icon={faCloudShowersHeavy} /> :
      (this.props.mode === "Drizzle") ? <FontAwesomeIcon icon={faCloudRain} /> :
      (this.props.mode === "Snow") ? <FontAwesomeIcon icon={faSnowflake} /> :
      (this.props.mode === "Thunderstorm") ? <FontAwesomeIcon icon={faBolt} /> :
      <FontAwesomeIcon icon={faSmog} />
    return (
      <Wrapper>{Icon}</Wrapper>
    );
  }
}

WeatherIcon.propTypes = {
  mode: PropTypes.string.isRequired
};

export default WeatherIcon;