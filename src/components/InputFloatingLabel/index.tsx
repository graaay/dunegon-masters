import React, { useState, useEffect, forwardRef } from 'react';
import { InputFloatingLabel } from './styles'; // Ajuste o caminho de importação conforme necessário

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  borderColor?: string;
  labelColor?: string;
  focusLabelColor?: string;
  backgroundColor?: string;
}

const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, borderColor, labelColor, focusLabelColor, backgroundColor, value, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(value);
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
      setIsFilled(!!value);
      setInputValue(value); // Isso garante que o estado interno seja atualizado quando o valor prop muda
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      setIsFilled(!!event.target.value);
      if (props.onChange) {
        props.onChange(event);
      }
    };

    return (
      <InputFloatingLabel
        borderColor={borderColor}
        labelColor={labelColor}
        focusLabelColor={focusLabelColor}
        backgroundColor={backgroundColor}
      >
        <input 
          ref={ref}
          {...props} 
          value={inputValue || ''} // Usa o estado inputValue como o valor do input
          placeholder=' '
          onChange={handleChange} // Corrige a chamada da função
        />
        {label &&
          <label className={isFilled ? 'filled' : ''}>{label}</label>
        }
      </InputFloatingLabel>
    );
  }
)

export default FloatingLabelInput;