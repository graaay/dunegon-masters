// TableStyles.ts
import styled from 'styled-components';

export const BodyTable = styled.div`
    height: 100%;
    width: 90%;
    margin: auto;
`;

export const TitleTable = styled.h1`
    width: 50%;
    text-align: left;
`;

export const ListTables = styled.div`
    gap: 1rem;
    display: grid;
    padding-top: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
`;

export const CardTables = styled.div`
    height: 10.8rem;
    background-color: rgb(58, 58, 58);
    border-radius: 0.3rem;
    box-shadow: 0 0 3px #1c1c1ccc;
    cursor: pointer;
    transition: filter 0.3s, background-color 0.3s;
    filter: grayscale(0.6);

    &:hover {
        filter: grayscale(0);
        background-color: rgb(95, 54, 54);
    }
`;

export const CardTablesBody = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`;

export const NewTableCard = styled.div`
    height: 10.8rem;
    background-color: rgb(58, 58, 58);
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(126 123 123 / 56%);
    cursor: pointer;

    &:hover {
        filter: grayscale(0);
        background-color: rgba(0, 255, 200, 0.219);
    }
`;

export const CardTablesBodyInfo = styled.div`
    width: 60%;
    height: calc(100% - 1rem);
    padding: 0.5rem;
    display: flex;
    flex-direction: column;

    :nth-child(2) {
        margin-top: auto;
    }
`;

export const CardTablesBodyImage = styled.div<{ $backgroundImage: string }>`
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    background-image: url(${props => props.$backgroundImage});
    background-size: cover;
`;
