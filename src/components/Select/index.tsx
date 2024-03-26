import { useEffect, useRef, useState } from "react";
import makeAnimated from "react-select/animated";
import { Container, ErrorMessage, Label, StyledSelect } from "./styles";
import { forwardRef } from "react";

interface SelectProps {
  options: Array<any>;
  label?: string;
  error?: any;
  isMultiple?: boolean;
  closeMenuOnSelect?: boolean;
  value?: any;
  onChange: (value: any) => void;
}

const SelectComponent = forwardRef(
  (
    {
      options,
      label,
      error,
      isMultiple = false,
      closeMenuOnSelect = true,
      value,
      onChange,
    }: SelectProps,
    ref
  ) => {
    const selectRef = useRef<any>(ref);
    const [selectedValue, setSelectedValue] = useState(value);
    const animatedComponents = makeAnimated();

    useEffect(() => {
      if (value) {
        setSelectedValue(value);
      } else {
        setSelectedValue(null);
      }
    }, [value]);

    const handleChange = (selectedOption: any) => {
      setSelectedValue(selectedOption);
      onChange(selectedOption);
    };

    const customStyles = {
      control: (provided: any, state: any) => ({
        ...provided,
        boxShadow: state.isFocused ? `0 0 0 1px black` : 0,
        borderColor: 'lightgray',
        backgroundColor: '#272727',
        color: 'ligthgray'
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? '#555555'
          : '#272727',
      }),
      multiValueLabel: (provided: any) => ({
        ...provided,
        fontSize: "1rem",
      }),
      placeholder: (provided: any) => ({
        ...provided,
        color: "lightgray",
      }),
    };

    return (
      <Container>
        {label && <Label>{label}</Label>}
        <StyledSelect
          ref={selectRef}
          value={selectedValue}
          onChange={handleChange}
          options={options}
          placeholder="Selecione"
          isClearable
          isSearchable
          styles={customStyles}
          components={animatedComponents}
          isMulti={isMultiple}
          closeMenuOnSelect={closeMenuOnSelect}
          noOptionsMessage={() => "Não há registros disponíveis"}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Container>
    );
  }
);

export default SelectComponent;
