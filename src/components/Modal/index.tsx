import React, { useState, useEffect } from 'react';
import { ModalCloseButton, ModalContent, ModalOverlay } from './styles'; // Ajuste o caminho de importação conforme necessário
import { X } from 'phosphor-react';

interface ModalProps {
    isOpen: boolean; 
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
    height?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, width, height }) => {
    if (!isOpen) return null;
  
    const style = {
      width: width || 'auto',
      height: height || 'auto',
    };
  
    return (
      <ModalOverlay>
        <ModalContent onClick={e => e.stopPropagation()} style={style}>
          <ModalCloseButton onClick={onClose}>
            <X size={18}/>
          </ModalCloseButton>
          {children}
        </ModalContent>
      </ModalOverlay>
    );
  };

export default Modal;