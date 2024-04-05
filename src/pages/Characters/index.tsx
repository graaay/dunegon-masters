import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Divider, InputFloatingLabel, GlowingButton, Select } from '../../components/index';
import { Personagem } from '../../services/types';
import { fetchPersonagensById, editPersonagem, addPersonagem } from '../../services/api';
import { Container } from './styles';
import { Campfire, Heart, Drop, Eye, ArrowLeft} from "phosphor-react";
import { useAuth } from '../../contexts/AuthContext';

function CharactersForm() {

    const navigate = useNavigate();
    const { user } = useAuth();

    const { mesaId, personagemId } = useParams<string>();
    // const [personagemForm, setPersonagemForm] = useState<Personagem>({} as Personagem);
    const [personagemForm, setPersonagemForm] = useState<Personagem>({
        id: '',
        nome: '',
        tipo: '',
        ficha: '',
        status: {}
    } as Personagem);

    const tiposPersonagem = [
        {id: 1, name: 'Player', value: 'Player'},
        {id: 2, name: 'NPC', value: 'NPC'},
        {id: 3, name: 'Monstro', value: 'Monstro'},
    ]

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadCharacter = async () => {
            setLoading(true);
            const response = await fetchPersonagensById(mesaId!, personagemId!, user!.token!);
            const tipoEncontrado = tiposPersonagem.find(tipo => tipo.value === response['tipo']);
            const tipoCorrespondente: any = tipoEncontrado ? tipoEncontrado : tiposPersonagem[0];
            const personagem: Personagem = {...response, tipo: tipoCorrespondente};
            if (response) setPersonagemForm(personagem);
            else console.error('Falha ao buscar personagem');
            setLoading(false);
        }


        if (personagemId) loadCharacter();
    }, []);

    const handleChangePersonagem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'nome' || name === 'tipo' || name === 'ficha') {
            setPersonagemForm(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setPersonagemForm(prevState => ({
                ...prevState,
                status: {
                    ...prevState.status,
                    [name]: Number(value)
                }
            }));
        }    
        
    };

    const handleChangeTipo = (e: any) => {
        
        setPersonagemForm(prevState => ({
            ...prevState,
            tipo: e
        }));

        console.log(personagemForm)
        
    };
    
    const goBack = () => {
        navigate(-1);
    };

    const handleSubmit = async () => {


        if (!personagemForm.id) {
            await addPersonagem(montaPersonamge(personagemForm), user!.token!);
            goBack();
        }
    }

    const handleDelete = async () => {

        if (!personagemForm.id) {
            await addPersonagem(montaPersonamge(personagemForm), user!.token!);
            goBack();
        }
    }

    const montaPersonamge  = (perso: Personagem) => {
        const auxiliar: any = perso;
        const retorna = {
            nome: auxiliar.nome,
            tipo: auxiliar.tipo.value,
            ficha: auxiliar.ficha,
            status: auxiliar.status,
            id: ''
        }

        return retorna;
    }

    return (
        <>
        <Container>
            <div className='grid'>
                <div className='col-6'>
                    <div style={{display: 'flex'}}>
                        <span onClick={goBack} style={{ padding: '0.3rem', cursor: 'pointer', borderRadius: '50%', display: 'flex', backgroundColor: '#4f4f4f'}}>
                            <ArrowLeft  size={21}/>
                        </span>
                    </div>
                </div>

                <div className='col-6'>
                    <div style={{display: 'flex', justifyContent: 'right', gap: '0.4rem', fontSize: '1.1rem'}}>
                        <Campfire size={20} />
                        <span> Mesa x </span>
                    </div>
                </div>
            </div>

            <Divider marginTop='1rem' marginBottom='1rem' color='transparent'/>

            <div className='grid'>
                <div className='col-6'>
                    <InputFloatingLabel
                        label="Nome do personagem ( * )"
                        name="nome"
                        onChange={handleChangePersonagem}
                        type="text"
                        value={personagemForm.nome}
                    />
                </div>

                <div className='col-6'>
                    {/* <InputFloatingLabel
                        label="Tipo ( * )"
                        name="tipo"
                        onChange={handleChangePersonagem}
                        type="text"
                        value={personagemForm.tipo}
                    /> */}
                    <Select
                        label='Tipo (*)'
                        options={tiposPersonagem.map(tipo => ({id: tipo.id, label: tipo.name, value: tipo.value }))}
                        onChange={handleChangeTipo}
                        value={personagemForm.tipo}
                    />
                </div>

                <div className='col-12'>
                    <InputFloatingLabel
                        label="Ficha"
                        name="ficha"
                        onChange={handleChangePersonagem}
                        type="text"
                        value={personagemForm.ficha}
                    />
                </div>
            </div>

            <Divider marginTop='1rem' marginBottom='1rem'/>

            <div className='grid'>
                <div className='col-12'>
                    <h3> Status </h3>
                </div>
                <Divider marginBottom='1rem' color='transparent'/>
            </div>

            <div className='grid'>
                <div className='col-4'>
                    <InputFloatingLabel
                        label="Vida"
                        name="vida"
                        onChange={handleChangePersonagem}
                        type="number"
                        value={personagemForm.status['vida']}
                    />
                </div>

                <div className='col-4'>
                    <InputFloatingLabel
                        label="Mana"
                        name="mana"
                        onChange={handleChangePersonagem}
                        type="number"
                        value={personagemForm.status.mana}
                    />
                </div>

                <div className='col-4'>
                    <InputFloatingLabel
                        label="Sanidade"
                        name="sanidade"
                        onChange={handleChangePersonagem}
                        type="number"
                        value={personagemForm.status.sanidade}
                    />
                </div>

                <div className='col-4'>
                    <InputFloatingLabel
                        label="Percepção passiva"
                        name="percepcaoPassiva"
                        onChange={handleChangePersonagem}
                        type="number"
                        value={personagemForm.status.percepcaoPassiva}
                    />
                </div>

                <div className='col-4'>
                    <InputFloatingLabel
                        label="CA"
                        name="ca"
                        onChange={handleChangePersonagem}
                        type="number"
                        value={personagemForm.status.ca}
                    />
                </div>

                <div className='col-4'>
                    <InputFloatingLabel
                        label="ND (Nível de desafio)"
                        name="nd"
                        onChange={handleChangePersonagem}
                        type="number"
                        value={personagemForm.status.nd}
                    />
                </div>
                <div className='col-12'>
                    <div style={{gap: '12rem', display: 'flex', minWidth: '100%', justifyContent: 'center', marginTop: '2rem'}}>
                        <GlowingButton onClick={handleSubmit}>
                            <span className='glowing-txt'>
                                SA<span className='faulty-letter'>L</span>VAR
                            </span>
                        </GlowingButton>
                        { personagemId &&
                            <GlowingButton color="hsl(0, 100%, 69.01960784313725%)">
                                <span className='glowing-txt'>
                                    EXC<span className='faulty-letter'>L</span>UIR
                                </span>
                            </GlowingButton>
                        }
                    </div>
                </div>
            </div>
        </Container>
        </>
    )
}

export default CharactersForm;