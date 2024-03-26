import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Reset padrão para remover margens e paddings */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* Adiciona box-sizing para uma melhor manipulação de padding e bordas */
  }

  /* Definição de font-face para Westsac */
  @font-face {
    font-family: 'Westsac';
    src: url('./assets/fonts/Westsac Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  /* Estilos padrão do corpo */
  body {
    font-family: 'Montserrat', sans-serif; /* 'Poppins', sans-serif; se preferir */
    background-color: #272727;
    color: white;
    /* Adiciona transição suave para mudanças de tamanho de fonte causadas pelo ajuste do rem */
    transition: font-size 0.25s ease-in-out;
  }

  /* Ajustes de tamanho de rem baseados na largura da tela */
  html {
    font-size: 16px; /* Tamanho padrão para dispositivos de largura maior */

    @media (max-width: 1600px) {
      font-size: 15px; /* Ajusta para dispositivos com largura até 1200px */
    }

    @media (max-width: 1400px) {
      font-size: 14px; /* Ajusta para dispositivos com largura até 1200px */
    }

    @media (max-width: 1200px) {
      font-size: 13px; /* Ajusta para dispositivos com largura até 992px */
    }

    @media (max-width: 992px) {
      font-size: 12px; /* Ajusta para dispositivos com largura até 992px */
    }

    @media (max-width: 768px) {
      font-size: 11px; /* Ajusta para dispositivos com largura até 768px */
    }

    @media (max-width: 576px) {
      font-size: 10px; /* Ajusta para dispositivos com largura até 576px */
    }
  }
`;

export default GlobalStyle;
