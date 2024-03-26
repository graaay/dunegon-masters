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
  ({ label,  borderColor, labelColor, focusLabelColor,  backgroundColor, value, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(value);
    const [isFilled, setIsFilled] = useState(false);

    const controllValue = (val: any) => {
      if (val === "" || val === null || val === undefined || isNaN(val)) {
        if (typeof val === "number" && isNaN(val)) {
          setInputValue(NaN);
        } else if (typeof val === "boolean") {
          // setInputValue(false);
        }
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      if (props.onChange) {
        props.onChange(event);
      }
    };

    useEffect(() => {
      setIsFilled(!!value);
      setInputValue(value);
      controllValue(value);
    }, [value]);

    return (
      <InputFloatingLabel
        borderColor={borderColor}
        labelColor={labelColor}
        focusLabelColor={focusLabelColor}
        backgroundColor={backgroundColor}
      >
        <input 
          ref={ref}
          {...props} placeholder=' '
          onChange={(e) => {
          if (props.onChange) {
            props.onChange(e);
          }
          handleChange
          setIsFilled(!!e.target.value);
        }} />
        {label &&
          <label className={isFilled ? 'filled' : ''}>{label}</label>
        }
      </InputFloatingLabel>
    );

  }

)

// const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
//   label,
//   borderColor,
//   labelColor,
//   focusLabelColor,
//   backgroundColor,
//   ...props
// }, ref) => {
//   const [isFilled, setIsFilled] = useState(false);

//   useEffect(() => {
//     setIsFilled(!!props.value);
//   }, [props.value]);

//   return (
//     <InputFloatingLabel
//       borderColor={borderColor}
//       labelColor={labelColor}
//       focusLabelColor={focusLabelColor}
//       backgroundColor={backgroundColor}
//     >
//       <input 
//         {...props} placeholder=' ' onChange={(e) => {
//         if (props.onChange) {
//           props.onChange(e);
//         }
//         setIsFilled(!!e.target.value);
//       }} />
//       {label &&
//         <label className={isFilled ? 'filled' : ''}>{label}</label>
//       }
//     </InputFloatingLabel>
//   );
// };

export default FloatingLabelInput;