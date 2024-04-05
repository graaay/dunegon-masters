
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin: auto;

    h2, label, h1 {
        color: white;
    }
`;

export const LoginConainter = styled.div`
    box-shadow: 0.5rem 0.5rem 1.5rem #0000008a;
    width: 60rem;
    height: 35.6rem;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    background-color: #2e2e2e;
    padding: 3rem;
`;
export const FormContainer = styled.form`
    width: 30rem;
    height: 100%;
    padding-right: 3rem;

`;

export const OauthContainer = styled.div`
    width: 30rem;
    height: 100%;
    border-left: 1px solid lightgray;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    button {
        min-width: 100%;
        align-items: end;
        justify-content: center;
        box-shadow: 2px 2px 1rem #0a0a0ab8;
    }
`;

export const WrapperItens = styled.div`
    min-width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const LogoContainer = styled.div`
    min-width: 100%;
    text-align: center;
    img {
        width: 8rem;
        margin: auto;
        border-radius: 10%;
        box-shadow: 5px 5px 5px #0000004a;
    }
`;