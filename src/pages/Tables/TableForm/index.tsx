import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ImageRadioButtons, InputFloatingLabel, Button, SliderCheckbox, Divider } from '../../../components/index'
import { sistemas } from '../../../services/systens'
import { MainTableForm, StyledForm, CardTables  } from './styles';
import { FloppyDisk, Sword, User, Note,  Heart, Eye, Pencil } from "phosphor-react";
import { Mesa, Personagem, Sistema } from '../../../services/types';
import { fetchMesaById, editMesa, addMesa } from '../../../services/api';

function TableForm() {

    const navigate = useNavigate();

    const { mesaId } = useParams<string>();
    const [mesaForm, setMesaForm] = useState<Mesa>({} as Mesa);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadMesa = async () => {
            setLoading(true);
            const response = await fetchMesaById(mesaId!);
            const mesa: Mesa = response[0];
            if (response) setMesaForm(mesa);
            else console.error('Falha ao buscar mesas');
            setLoading(false);
            console.log(mesa);
            // mesa.sistema
        };
    
        if (mesaId) loadMesa();
    }, []);

    const handleChangeMesa = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        if (e.target.type === 'checkbox') {
            setMesaForm({ ...mesaForm, mesaAtiva: e.target.checked });
        } else {
            setMesaForm(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleCheckBox = (campo: string, value: boolean) => {

        setMesaForm(prevState => ({
            ...prevState,
            [campo]: !value
        }));
    };

    const handleChangeSistema = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sistemaId = Number(e.target.value);
    
        const selectedSistema: Sistema = sistemas.find(sistema => sistema.id === sistemaId) || sistemas[0];
        
    
        if (selectedSistema) {
            console.log(selectedSistema);
            setMesaForm(prevState => ({
                ...prevState,
                sistema: selectedSistema
            }));
        }
    };
    

    const handleSubmit = async () => {
        console.log(mesaForm);

        if (!mesaForm.id) {
            const response = await addMesa(
                montaObjeto(mesaForm.sistema)
            );
            navigate(`/Tables/edit/${response.id}`);
        }

        if (mesaForm.id) {
            reassignment(
                await editMesa(
                    mesaForm.id, montaObjeto(mesaForm.sistema)
                )
            );
        }
    }

    const reassignment = (response: Mesa) => {
        setMesaForm(response);
    }
    
    const goForBatle = () => {
        navigate(`/Combat/${mesaForm.id}`);
    }

    const goForCharacters = () => {
        navigate(`/Characters/${mesaForm.id}W`);
    }

    const goForCharactersEdit = (personagemId: string) => {
        navigate(`/Characters/${mesaForm.id}/${personagemId}`);
    }

    const montaObjeto = (sistema: Sistema): Mesa => {
        const objSistema: Sistema = {
            id: sistema.id,
            nome: sistema.nome,
            condicoes: [],
            imagem: sistema.imagem
        }

        return {
            ...mesaForm,
            sistema: objSistema
        }
    }

    return(
        <MainTableForm>
            {!loading && (
                <div>
                    <StyledForm>
                        <ImageRadioButtons sistemas={sistemas} onChange={handleChangeSistema} selectedValue={mesaForm.sistema} />
                        <InputFloatingLabel
                            label="Nome da mesa"
                            name="nome"
                            onChange={handleChangeMesa}
                            type="text"
                            value={mesaForm.nome}
                        />
                        <InputFloatingLabel
                            label="Nível da mesa"
                            name="nivel"
                            onChange={handleChangeMesa}
                            type="number"
                            value={mesaForm.nivel}
                        />
                        <div>
                            <label style={{display: 'block'}}> Mesa ativa </label>
                            <Divider color='transparent' marginTop='0.2rem' marginBottom='0.4rem'/>
                            <SliderCheckbox
                                name="mesaAtiva"
                                onChange={() => handleCheckBox('mesaAtiva', mesaForm.mesaAtiva)}
                                value={mesaForm.mesaAtiva}
                            />
                        </div>
                        {/* Outros FormGroup e elementos */}
                        <div style={{display: "flex", gap: "1rem"}}>
                            <Button onClick={handleSubmit} type='button' backgroundColor='#0073ff' fontSize='1.3rem'> 
                                <FloppyDisk size={'1.8rem'}/> 
                                { mesaId && "Editar" } 
                                { !mesaId && "Salvar" } 
                            </Button>
                            { mesaId &&
                                <>
                                    <Button onClick={goForBatle} backgroundColor='#00ff008f' fontSize='1.3rem'> <Sword size={'1.8rem'}/> Iniciar </Button>
                                    <Button onClick={goForCharacters} backgroundColor='#6767678f' fontSize='1.3rem'> <User size={'1.8rem'}/> Cadastrar </Button>
                                </>
                            }
                        </div>
                        {/* Botões Start e Create */}
                    </StyledForm>
                    { mesaForm?.personagens?.length > 0 &&
                        <div>
                            <Divider marginTop='2rem' marginBottom='1rem'/>
                            <div style={{gap: '1rem', display: 'grid'}}>
                                <h1> Personagens </h1>
                                <h4> Players </h4>
                                <div className='grid'>
                                    {
                                        mesaForm.personagens.map((personagem: Personagem) => {
                                            if ( personagem.tipo === 'Player') {
                                                return (
                                                    <div className="col-4">
                                                        <CardTables>
                                                            <div className='table-form-div-wrapper'>
                                                                <div className='head-character'>
                                                                    <h1> 
                                                                        {personagem.nome} 
                                                                    </h1>
                                                                    <Button 
                                                                        backgroundColor='#057df5' 
                                                                        borderRadius='50%' 
                                                                        width='auto' 
                                                                        padding='0.1rem 0.5rem 0.5rem 0.5rem' 
                                                                        onClick={() => goForCharactersEdit(personagem.id)}
                                                                    > 
                                                                        <Pencil size={'1.5rem'}/>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </CardTables>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                                <h4> NPC's </h4>
                                <div className='grid'>
                                    {
                                        mesaForm.personagens.map((personagem: Personagem) => {
                                           if ( personagem.tipo === 'NPC') {
                                                return (
                                                    <div className="col-4">
                                                        <CardTables>
                                                            <div className='table-form-div-wrapper'>
                                                                <div className='grid'>
                                                                    <div className="col-12">
                                                                        <div className='head-character'>
                                                                            <h1> 
                                                                                {personagem.nome} 
                                                                            </h1>
                                                                            <Button 
                                                                                backgroundColor='#057df5' 
                                                                                borderRadius='50%' 
                                                                                width='auto' 
                                                                                padding='0.1rem 0.5rem 0.5rem 0.5rem' 
                                                                                onClick={() => goForCharactersEdit(personagem.id)}
                                                                                > 
                                                                                <Pencil size={'1.5rem'}/>
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                    <Divider color='transparent' marginTop='0.2rem' marginBottom='0.4rem' />
                                                                    <div className='col-4'>
                                                                        <span style={{display: 'flex', gap: '0.4rem'}}>ND &nbsp;{personagem.status.nd}</span>
                                                                    </div>
                                                                    <div className='col-4'>
                                                                        <span style={{display: 'flex', gap: '0.4rem', justifyContent: 'center'}}> <Heart color='#ff5050' size={20} /> {personagem.status.vida}</span>
                                                                    </div>
                                                                    <div className='col-4'>
                                                                        <span style={{display: 'flex', gap: '0.4rem',  justifyContent: 'right'}}> <Eye color='#50e5ff' size={20} /> {personagem.status.percepcaoPassiva}</span>
                                                                    </div>
                                                                    <Divider color='transparent' marginTop='0.2rem' marginBottom='0.4rem' />
                                                                    <div className='col-12'>
                                                                        <Button backgroundColor='#0261de'>
                                                                            <Note size={20}/> Abrir ficha
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardTables>
                                                    </div>
                                                )
                                           }
                                        })
                                    }
                                </div>
                                <h4> Monstros </h4>
                                <div className='grid'>
                                    {
                                        mesaForm.personagens.map((personagem: Personagem) => {
                                            if ( personagem.tipo === 'Monstro') {
                                                return (
                                                    <div className="col-4">
                                                        <CardTables>
                                                            <div className='table-form-div-wrapper'>
                                                                <div className='grid'>
                                                                    <div className="col-12">
                                                                        <div className='head-character'>
                                                                            <h1> 
                                                                                {personagem.nome} 
                                                                            </h1>
                                                                            <Button 
                                                                                backgroundColor='#057df5' 
                                                                                borderRadius='50%' 
                                                                                width='auto' 
                                                                                padding='0.1rem 0.5rem 0.5rem 0.5rem' 
                                                                                // onClick={() => goForCharactersEdit(personagem.id)}
                                                                                > 
                                                                                <Pencil size={'1.5rem'}/>
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                    <Divider color='transparent' marginTop='0.2rem' marginBottom='0.4rem' />
                                                                    <div className='col-4'>
                                                                        <span style={{display: 'flex', gap: '0.4rem'}}>ND &nbsp;{personagem.status.nd}</span>
                                                                    </div>
                                                                    <div className='col-4'>
                                                                        <span style={{display: 'flex', gap: '0.4rem', justifyContent: 'center'}}> <Heart color='#ff5050' size={20} /> {personagem.status.vida}</span>
                                                                    </div>
                                                                    <div className='col-4'>
                                                                        <span style={{display: 'flex', gap: '0.4rem',  justifyContent: 'right'}}> <Eye color='#50e5ff' size={20} /> {personagem.status.percepcaoPassiva}</span>
                                                                    </div>
                                                                    <Divider color='transparent' marginTop='0.2rem' marginBottom='0.4rem' />
                                                                    <div className='col-12'>
                                                                        <Button backgroundColor='#0261de'>
                                                                            <Note size={20}/> Abrir ficha
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardTables>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            )}
        </MainTableForm>
    )
}
export default TableForm;