import React from 'react';
import { ImageRadioWrapper, RadioButtonLabel, RadioInput } from './styles';

// Interface para os sistemas
interface Sistema {
    id: number;
    nome: string;
    imagem: string;
}

// Props do componente
interface ImageRadioButtonsProps {
    sistemas: Sistema[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedValue?: Sistema;
}

const ImageRadioButtons: React.FC<ImageRadioButtonsProps> = ({ sistemas, onChange, selectedValue }) => {
    return (
        <ImageRadioWrapper>
            {sistemas.map((sistema) => (
                <div key={sistema.id}>
                    <RadioInput
                        type="radio"
                        id={`option${sistema.id}`}
                        name="sistema"
                        value={sistema.id}
                        onChange={onChange}
                        checked={selectedValue && sistema.id === selectedValue.id}
                    />
                    <RadioButtonLabel htmlFor={`option${sistema.id}`}>
                        <img src={sistema.imagem} alt={sistema.nome} />
                    </RadioButtonLabel>
                </div>
            ))}
        </ImageRadioWrapper>
    );
};

export default ImageRadioButtons;