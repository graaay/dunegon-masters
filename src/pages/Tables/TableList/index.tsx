import React, { useEffect, useState } from 'react';
import { Plus, Play, Pause } from "phosphor-react";
import { BodyTable, TitleTable, ListTables, CardTables, CardTablesBody, NewTableCard, CardTablesBodyInfo, CardTablesBodyImage } from './styles';
import { Divider } from '../../Home/styles';
import { useNavigate } from 'react-router-dom';
import { fetchMesas } from '../../../services/api';
import { Mesa } from '../../../services/types';
import { sistemas } from '../../../services/systens';

interface ActiveButtonProps {
    active: boolean;
}

function TablesList() {

    const navigate = useNavigate();

    const [mesas, setMesas] = useState<Array<Mesa>>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const goForNewTable = () => {
        navigate(`/Tables/new/`);
    }
    
    const goForEditTable = (mesa: Mesa) => {
        navigate(`/Tables/edit/${mesa.id}`);
    }
    

    useEffect(() => {
        const loadMesas = async () => {
            const fetchedMesas = await fetchMesas();
            if (fetchedMesas) setMesas(fetchedMesas);
            else console.error('Falha ao buscar mesas');
        };
    
        loadMesas();
    }, []);

    const ActiveButton: React.FC<ActiveButtonProps> = ({ active }) => {
        return (
            <div style={{marginTop: '0.15rem'}}>
                { active && 
                    <Play color='#09ff00' size={20}/>
                }
                { !active && 
                    <Pause color='#ffe700' size={20}/>
                }
            </div>
        );
    }

    return (
        <BodyTable>
            <TitleTable> Suas mesas </TitleTable>
            <Divider marginBottom='2rem' marginTop='1rem' />
            {/* <ListTables> */}
            <div className='grid'>
                {mesas.map((mesa, indice) => (
                    <div className='col-3' key={indice} onClick={() => goForEditTable(mesa)}> 
                        <CardTables>
                            <CardTablesBody>
                                <CardTablesBodyInfo>
                                    <h3>{mesa.nome}</h3>
                                    <span>{mesa.sistema.nome}</span>
                                    <span><ActiveButton active={mesa.mesaAtiva} /></span>
                                </CardTablesBodyInfo>
                                <CardTablesBodyImage $backgroundImage={mesa.sistema.imagem} />
                            </CardTablesBody>
                        </CardTables>
                    </div>
                ))}
                <div className='col-3' onClick={goForNewTable}>
                    <NewTableCard >
                        <Plus size={80} />
                    </NewTableCard>
                </div>
            {/* </ListTables> */}
            </div>
        </BodyTable>
    );

}

export default TablesList;
