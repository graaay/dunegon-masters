import styled from 'styled-components';

export const ImageRadioWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const RadioInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;

  & ~ label {
    filter: grayscale(1);
  }

  &:hover ~ label {
    filter: grayscale(0.4);
  }

  &:checked ~ label {
    filter: grayscale(0);
  }
`;

export const RadioButtonLabel = styled.label`
  display: inline-block;
  cursor: pointer;
  transition: 0.3s;
  img {
    width: 14rem; // Flexível com base nas necessidades, pode ser ajustado via props
    height: 20rem; // Idem
    transition: transform 0.2s;
    object-fit: cover;
    border-radius: 0.3rem;
    box-shadow: 0 0 0.3rem black;


  }
  /* Adicione estados hover e checked com base na classe anterior */
`;