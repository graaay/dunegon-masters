import styled from "styled-components";
import Select from "react-select";

export const Container = styled.div`

`;

export const StyledSelect = styled(Select)`
  input {
    border: none;
    outline: none;
    box-shadow: none !important;
    color: lightgray !important;
    padding: 0.475rem 0 !important;
  }

  .css-13cymwt-control {
    background: #272727;
    border-radius: 6px;
  }

  .css-1nmdiq5-menu {
    background: #272727;
  }

  .css-1dimb5e-singleValue {
    color: lightgray
  }
`;

export const Label = styled.label`
  display: flex;
  color: lightgray;
  background: #272727;
  position: absolute;
  z-index: 9;
  transform: translate(1rem, -0.6rem);
  padding: 0 0.4rem;
`;

export const ErrorMessage = styled.span`
  font-size: 0.875rem;
  color: red;
`;
