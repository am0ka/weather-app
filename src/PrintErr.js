import React from 'react'
import styled, { keyframes } from 'styled-components';

export const FadeIn = keyframes`
  to {
    top: 0;
    opacity: 1;
    visibility: visible;
  }
`;

const Wrapper = styled.div`
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px auto 0;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  position: relative;
  border-radius: 10px;
  top: 20px;
  background-color: rgba(255, 255, 255, 0.75);
  animation: ${FadeIn} 0.5s 0.75s forwards;
`;

const Text = styled.span`
  color: #000;
  font-size: 1.2em;
`;

export default class PrintErr extends React.Component {
  render() {
    return (
      // Not actually a wrapper, but a frame for the error message
      <Wrapper>
        <Text>Sorry, the specified city was not found.</Text>
      </Wrapper>
    );
  }
}
