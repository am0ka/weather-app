import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Form = styled.form`
  top: 0%;
  position: relative;
  margin: 0 auto;
  max-width: 500px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: #fff;
  font-size: 1.25em;
  padding: 10px 20px 10px 20px;
  color: rgb(197, 197, 197);
  border-radius: 10px;
  transition: .2s;
  &:focus {
    color: rgb(25, 25, 25);
    outline: none;
  }
`;

const Search = ({value, onchange, onsubmit, prev}) => {
  return (
    <Form onSubmit={onsubmit}>
      <Input
        type="text"
        onChange={onchange}
        value={value}
        placeholder={prev || "Enter city, region or country"}
        autoFocus={true}
      />
    </Form>
  );
};

// PropTypes are easier to use than native bindings
Search.propTypes = {
  value: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  onsubmit: PropTypes.func.isRequired,
  prev: PropTypes.string.isRequired
}

export default Search;