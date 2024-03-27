import React from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

interface SliderCheckboxProps {
    name: string;
    control: any;
    onChange: () => void;
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

const SliderCheckbox: React.FC<SliderCheckboxProps> = ({ name, control, onChange }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <CheckboxContainer>
                    <Checkbox type="checkbox" {...field} onChange={onChange} />
                    <Slider isChecked={field.value}></Slider>
                </CheckboxContainer>
            )}
        />
    );
};

export default SliderCheckbox;