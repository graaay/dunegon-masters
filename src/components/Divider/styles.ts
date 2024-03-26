// Adicione isto ao seu arquivo SidebarStyles.ts ou a um arquivo de estilos global
import styled from 'styled-components';

// Tipagem das props para maior clareza e aproveitamento do TypeScript
interface DividerProps {
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  width?: string;
  color?: string;
}

// Componente Divider estilizado com props para personalização
export const Divider = styled.hr<DividerProps>`
  border: 0;
  height: 1px;
  background-color: ${(props) => props.color || '#9f9f9f'};
  margin-top: ${(props) => props.marginTop || '0rem'};
  margin-bottom: ${(props) => props.marginBottom || '0rem'};
  margin-left: ${(props) => props.marginLeft || '0rem'};
  margin-right: ${(props) => props.marginRight || '0rem'};
  width: ${(props) => props.width || '100%'};
`;
