import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

interface SliderCheckboxProps {
    name: string;
    control?: any;
    onChange: (checked: boolean) => void;
    value?: boolean; // Adicionado para controle direto do estado
}

const CheckboxContainer = styled.label`
    position: relative;
    display: inline-block;
    width: 2.5rem;
    height: 1.5rem;
`;

const Checkbox = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

const Slider = styled.span<{ isChecked: boolean }>`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => (props.isChecked ? '#d7c200' : '#696969')};
    transition: .4s;
    border-radius: 1.5rem;

    &:before {
        position: absolute;
        content: "";
        height: 1rem;
        width: 1rem;
        left: 0.25rem;
        bottom: 0.25rem;
        background-color: ${props => (props.isChecked ? 'rgb(39, 39, 39)' : 'white')};
        transition: .4s;
        border-radius: 50%;
        transform: ${props => (props.isChecked ? 'translateX(1rem)' : 'translateX(0)')};
    }
`;

const SliderCheckbox: React.FC<SliderCheckboxProps> = ({ name, control, onChange, value: initialValue }) => {
    // Estado local para quando não estiver usando react-hook-form
    const [isChecked, setIsChecked] = useState(initialValue || false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (control) {
            onChange(event.target.checked);
        } else {
            setIsChecked(event.target.checked);
            onChange(event.target.checked);
        }
    };

    if (control) {
        // Quando estiver usando react-hook-form
        return (
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <CheckboxContainer>
                        <Checkbox type="checkbox" {...field} onChange={handleChange} />
                        <Slider isChecked={field.value}></Slider>
                    </CheckboxContainer>
                )}
            />
        );
    } else {
        // Quando estiver usando useState
        return (
            <CheckboxContainer>
                <Checkbox type="checkbox" checked={isChecked} onChange={handleChange} />
                <Slider isChecked={isChecked}></Slider>
            </CheckboxContainer>
        );
    }
};

export default SliderCheckbox;