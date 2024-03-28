import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, InputFloatingLabel, Modal, Select, SliderCheckbox } from '../../components/index'
import { TurnoWrapper, Button, Input, TableCombat, ColunasMenoresCombatTh, ColunasMenoresCombatTd, FloatingCombatentes, CondicoesChip, CondicoesWaraper, DividerWrapper } from './styles'
import { SlidersHorizontal, List, X, PlusMinus, ArrowCounterClockwise, Plus, Minus, Timer } from "phosphor-react";
import { Combatente, Combate, Mesa, Personagem, Condicao, Sistema } from '../../services/types';
import { sistemas } from '../../services/systens';
import { fetchMesaById } from '../../services/api';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid';

interface DisplayPersonagensProps {
    tipo: string;
}

interface ItemPersonagemProps {
    personagem: Personagem;
}

function Combat() {

    const { mesaId } = useParams<string>();
    const [combateOrder, setCombateOrder] = useState<Array<Combatente>>([]);
    const [combatente, setCombatente] = useState<Combatente>({
        id: '',
        iniciativa: 0,
        nome: "",
        status: [],
        vida: 0
    } as Combatente);
    const [combate, setCombate] = useState<Combate>({ rodada: 1, turno: "" } as Combate);
    const [mesa, setMesa] = useState<Mesa>({} as Mesa);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sistema, setSistema] = useState({} as Sistema);
    const [condicoesModal, setCondicoesModal] = useState<Array<Condicao>>([]);
    const namespace = uuidv4();
    const [selectedPlayer, setSelectedPlayer] = useState<String>('');
    const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);
    const [config, setConfig] = useState({
        exibirCa: false,
        exibirSanidade: false,
        exibirPercepcao: false,
        exibirDano: false,
        exibirMana: false
    });

    const { control, getValues, setValue } = useForm({
        // exibirCa: false,
        // exibirSanidade: false,
        // exibirPercepcao: false,
        // exibirDano: false,
        // exibirMana: false
    }); // Formulário para o controle do formulario das configurações
    
    const handleCheckboxChange = (fieldName: string) => {
        const value = getValues(fieldName);
        setValue(fieldName, !value);
    };
    

    useEffect(() => {

        const returnSistema = (sistema: Sistema): Sistema => {
            return sistemas.find(sis => sis.id === sistema.id) || sistemas[0];
        }

        const loadMesa = async () => {
            const response = await fetchMesaById(mesaId!);
            const mesaRequest: Mesa = response[0];
            if (response) {
                setMesa(mesaRequest);
                setSistema(
                    returnSistema(mesaRequest.sistema)
                );
            }
            else console.error('Falha ao buscar mesas');
        };

        if (mesaId) loadMesa();
    }, []);

    
    function isEquivalent(a: any, b: any): boolean {
        
        const aProps = Object.getOwnPropertyNames(a);
        const bProps = Object.getOwnPropertyNames(b);
    
        
        if (aProps.length != bProps.length) {
            return false;
        }
    
        for (let i = 0; i < aProps.length; i++) {
            const propName = aProps[i];
    
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
    
        return true;
    }


    useEffect(() => {
        const validateConfig = getValues();
        const configCofigurated = {
            exibirCa: validateConfig.exibirCa ?? false,
            exibirSanidade: validateConfig.exibirSanidade ?? false,
            exibirPercepcao: validateConfig.exibirPercepcao ?? false,
            exibirDano: validateConfig.exibirDano ?? false,
            exibirMana: validateConfig.exibirMana ?? false
        }

        if (!isEquivalent(configCofigurated, config)) {
            setConfig(configCofigurated)
        }

    }, [isModalConfigOpen]);


    const handleChangeCombatente = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCombatente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInputChange = (index: number, field: 'iniciativa' | 'vida' | 'mana' | 'ca' | 'percepcaoPassiva' | 'sanidade', value: number) => {
        setCombateOrder(prevState => {
            const newState = [...prevState];
            const combatente = { ...newState[index] };
            combatente[field] = value;
            newState[index] = combatente;
            return newState;
        });
    };

    const openModal = (personagem: Combatente) => {
        setIsModalOpen(true);
        setCondicoesModal(personagem.status);
        setSelectedPlayer(personagem.id);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsModalConfigOpen(false);
    };

    const ordenarPorIniciativa = () => {
        const aux = [...combateOrder].sort(function (a, b) {
            return b.iniciativa - a.iniciativa;
        });

        setCombateOrder(aux);
    };

    const resetCombateForm = () => {
        const zero: Combatente = {
            id: '',
            iniciativa: 0,
            nome: "",
            status: [],
            vida: 0
        };

        setCombatente(zero);
    }

    const adicionarAoCombate = () => {
        let aux: Array<Combatente> = [...combateOrder];
        const teste = { ...combatente, id: uuidv5(combatente.nome + String(combateOrder.length), namespace) }
        aux.push(teste);
        setCombateOrder(aux);
        resetCombateForm();
    }

    const adicionarAoCombateExistentes = (personagem: Personagem) => {

        const count = combateOrder.filter(item => item.nome.startsWith(personagem.nome)).length;

        const temp: Combatente = {
            id: uuidv5(personagem.nome + String(combateOrder.length) + String(count + 1) , namespace),
            iniciativa: 0,
            nome: (count > 0 ? personagem.nome + ' ' + String(count + 1) : personagem.nome),
            status: [],
            vida: personagem.status.vida!,
            ca: personagem.status?.ca,
            sanidade: personagem.status?.sanidade,
            percepcaoPassiva: personagem.status?.percepcaoPassiva,
            mana: personagem.status?.mana,
        }

        let aux: Array<Combatente> = [...combateOrder];
        aux.push(temp);
        setCombateOrder(aux);
    }

    const removerDoCombate = (index: number) => {
        let aux = [...combateOrder]
        aux.splice(index, 1);
        setCombateOrder(aux);
    };

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(combateOrder);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setCombateOrder(items);
        let novoIndice = combateOrder.findIndex((_, i) => combateOrder[i].nome === combate.turno);
        if (novoIndice !== -1) {
            atualizarTurno();
        }
    };

    const atualizarTurno = () => {
        let novoIndice = combateOrder.findIndex((_, i) => combateOrder[i].nome === combate.turno);

        // Se é o último jogador ou não foi encontrado, começa do início
        if (novoIndice === -1 || novoIndice === combateOrder.length - 1) {
            setCombate(prev => ({
                ...prev,
                turno: combateOrder[0]?.nome,
                rodada: novoIndice !== -1 ? prev.rodada + 1 : prev.rodada,
            }));
            const combatentesAtualizados = atualizarDebuffs(combateOrder);
            setCombateOrder(combatentesAtualizados);
        } else {
            setCombate(prev => ({
                ...prev,
                turno: combateOrder[novoIndice + 1]?.nome,
            }));
        }
    };

    const atualizarDebuffs = (combatentes: Array<Combatente>) => {
        return combatentes.map(combatente => {
            // Filtra os debuffs para remover aqueles cujas rodadas chegaram a 0
            const debuffsAtualizados = combatente.status.filter(debuff => {
                debuff.rodadas! -= 1; // Decrementa as rodadas
                return debuff.rodadas! > 0; // Mantém o debuff se ainda tiver rodadas restantes
            });
    
            return {
                ...combatente,
                status: debuffsAtualizados // Atualiza os debuffs do combatente
            };
        });
    };

    const reiniciarCombate = () => {
        setCombate({ rodada: 1, turno: '' });
    }

    const retornaAtual = (index: number) => {
        return combateOrder.findIndex((_, i) => combateOrder[i].nome === combate.turno) === index;
    }

    const abrirFicha = async (personagem: Personagem) => {

        try {
            if (!navigator.clipboard) {
                // Caso o navegador não suporte navigator.clipboard
                const tempInput = document.createElement('input');
                tempInput.value = personagem.ficha!;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            } else {
                await navigator.clipboard.writeText(personagem.ficha!);
            }
        } catch (error) {
            console.error('nundeu nao')
        }
        // navigator.clipboard.writeText(personagem.ficha);

        const newTab = window.open();

        if (newTab) {
            // Define o conteúdo HTML da nova aba, incluindo estilos
            const content = `
                <html>
                <head>
                <title> Abrir Ficha </title>
                <style>
                    * { margin: 0; padding: 0; color: white; }
                    body{ font-family: Arial; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: #272727; }
                    div { display: block; }
                    h1 { box-shadow: 0 0 10px rgba(0, 0, 0, 0.616); width: 100%; text-align: center; padding: 0.5rem; border-radius: 5px; background-color: #404040; margin-top: 2rem; }
                    h1 > b { color: #ffe600; transform: scale(1.1); }
                    h2 { width: 100%; text-align: center; padding: 0 0.5rem; margin-top: 2rem; }
                    span { padding: 0.6rem; border: 1px solid rgb(163, 163, 163); border-radius: 5px; background-color: #363636; width: 100%; display: block; text-align: center; margin-top: 2rem; }
                </style>
                </head>
                <body>
                <div>
                    <h1>
                    A ficha já esta no seu <b>CTRL + V.</b>
                    </h1>
                    <h2>
                    Basta colar no topo dessa pagina (Navegador) para ir até ela
                    <br/>
                    ou copiar o endereço dela novamente a baixo.
                    </h2>
                    <span>
                    ${personagem.ficha}
                    </span>
                </div>
                </body>
            </html>
            `;
            newTab.document.write(content);
            newTab.document.close(); // Encerra a escrita no documento
        }
    }

    const DisplayPersonagens: React.FC<DisplayPersonagensProps> = () => {
        if (mesa?.personagens?.length > 0) {
            return (
                <div className="grid">
                    {mesa.personagens.map((personagem) => (
                        <ItemPersonagem key={personagem.id} personagem={personagem} />
                    ))}
                </div>
            );
        } else {
            return (
                <div>
                    <label>Os personagens pré cadastrados na mesa aparecerão aqui.</label>
                </div>
            );
        }
    };

    const ItemPersonagem: React.FC<ItemPersonagemProps> = ({ personagem }) => {
        return (
            <div className='col-3'>
                <FloatingCombatentes>
                    <section>
                        <h1>{personagem.nome}</h1>
                        <Divider color='transparent' marginTop='0.5rem' />
                        <div className='grid'>
                            <div className='col-6'>
                                ND
                                <h3> {personagem.status.nd ?? ''} </h3>
                            </div>
                            <div className='col-6'>
                                Vida
                                <h3> {personagem.status.vida ?? ''} </h3>
                            </div>
                            <div className='col-6'>
                                <Button backgroundColor='#ffe600' color='black' onClick={() => adicionarAoCombateExistentes(personagem)}> Combate </Button>
                            </div>
                            <div className='col-6'>
                                <Button backgroundColor='#0261de' color='white' onClick={() => abrirFicha(personagem)}> Abrir ficha </Button>
                            </div>
                        </div>
                    </section>
                </FloatingCombatentes>
            </div>
        );
    };

    const StatusPersonagem: React.FC = () => {
        const { 
            control, 
            handleSubmit, 
            register,
            getValues,
        } = useForm<Condicao>();
        
        const updateCombateOrder = (aux: Condicao[]) => {
            if (selectedPlayer) {
                const updatedCombatentes = combateOrder.map(combatente => {
                    if (combatente.id === selectedPlayer) {
                        return { ...combatente, status: aux };
                    }
                    return combatente;
                });
                setCombateOrder(updatedCombatentes);
            }
        }

        const onSubmit: SubmitHandler<Condicao> = data => {
            let aux: Array<Condicao> = [...condicoesModal]
            aux.push(
                montaCondicaoModal(data)
            );
            setCondicoesModal(aux);
            updateCombateOrder(aux);
        };

        const addMinusTime = (index: number, type: 'plus' | 'minus') => {
            let aux = [...condicoesModal];
            if(aux[index]) {
                if(type === 'minus') {
                    aux[index].rodadas! -= 1;
                } else {
                    aux[index].rodadas! += 1;
                }
            }
            setCondicoesModal(aux);
            updateCombateOrder(aux);
        }

        const removerCondicao = (index: number) => {
            let aux = [...condicoesModal];
            aux.splice(index, 1);
            setCondicoesModal(aux);
            updateCombateOrder(aux);
        }

        const montaCondicaoModal = (data: Condicao): Condicao => {
            const auxiliar = sistema.condicoes.find(item => item.label === data.label);
            const condicao: Condicao = {
                id: uuidv5(auxiliar?.label ?? 'guacamole', namespace),
                rodadas: Number(data.rodadas) ?? 0,
                label: auxiliar?.label ?? 'A',
                value: auxiliar?.value ?? 'A',
                descricao: auxiliar?.descricao ?? 'A'
            }
            return condicao;
        }

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid'>
                    <div className='col-4'>
                        <Controller
                            name="label"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label='Condição'
                                    options={sistema.condicoes.map(condicao => ({ label: condicao.label, value: condicao.label }))} // Ajuste conforme a estrutura de seus dados
                                    onChange={(option) => field.onChange(option?.label)}
                                    value={sistema.condicoes.find(option => option.label === field.value)}
                                />
                            )}
                        />
                    </div>
                    <div className='col-3'>
                        <InputFloatingLabel
                            label='Rodadas'
                            {...register('rodadas')}
                            type='number'
                            value={getValues("rodadas")}
                        // Se você estiver recebendo um erro relacionado ao valor inicial, tente definir defaultValue como uma string vazia ou o valor inicial desejado.
                        />
                    </div>
                    <div className='col-2'>
                        <Button backgroundColor='purple' color='white' padding='0.5rem 0.8rem' type='submit'>
                            Adicionar
                        </Button>
                    </div>
                </div>
                <Divider color='transparent' marginTop='1rem' />
                <div className='grid'>
                    <div className='col-12'>
                        <TableCombat>
                            <thead>
                                <tr>
                                    <td> Efeito </td>
                                    <td> Rodadas restantes </td>
                                    <td> </td>
                                </tr>
                            </thead>
                            <tbody>
                                {condicoesModal?.length && condicoesModal.map((item: Condicao, index: number) => {
                                    return (
                                        <>
                                            <tr>
                                                <td> {item.label} </td>
                                                <td style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}> 
                                                    <Button
                                                        backgroundColor='#ffe600'
                                                        padding='0.4rem 0.4rem 0.4rem 0.6rem;'
                                                        borderRadius='50% 0px 0px 50%' 
                                                        width='auto'
                                                            onClick={() => addMinusTime(index, 'minus')}
                                                    >
                                                        <Minus
                                                            color='black'
                                                            size={'1.2rem'}
                                                        />
                                                    </Button>
                                                    <span style={{ width: '3rem', textAlign: 'center' }}>
                                                        {item.rodadas  ?? 'Até ser removido' } 
                                                    </span>
                                                    <Button
                                                        backgroundColor='#ffe600'
                                                        padding='0.4rem 0.6rem 0.4rem 0.4rem;'
                                                        borderRadius='0px 50% 50% 0px' 
                                                        width='auto'
                                                            onClick={() => addMinusTime(index, 'plus')}
                                                    >
                                                        <Plus
                                                            color='black'
                                                            size={'1.2rem'}
                                                        />
                                                    </Button>
                                                </td>
                                                <td style={{ width: '3.4rem' }}>
                                                    <Button
                                                        backgroundColor='#272727'
                                                        border='1px solid lightgray'
                                                        padding='0.4rem;'
                                                        borderRadius='50%'
                                                        width='auto'
                                                        onClick={() => removerCondicao(index)}
                                                    >
                                                        <X
                                                            fill='white'
                                                            size={'1.2rem'}
                                                        />
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}>
                                                    {item.descricao}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}

                                {condicoesModal?.length == 0 &&
                                    <>Vazio</>
                                }
                            </tbody>
                        </TableCombat>
                    </div>
                </div>
            </form>
        )
    };

    const ConfiguracoesModal: React.FC = () => {
        
        return (
            <>
                <h3 style={{textAlign: 'center'}}>
                    Configurações do combate
                </h3>
                <Divider marginTop='0.5rem' marginBottom="0.5rem" color='transparent' />
    
                <form>
                    <div className='grid'>
                        <div className='col-12'>
                            <h4> Exibição de dados no combate </h4>
                            <Divider marginTop='0.5rem' marginBottom="0.5rem" />
                        </div>
                        <div className='col-12'>
                            <DividerWrapper>
                                <label>CA no combate</label>
                                <SliderCheckbox name="exibirCa" control={control} onChange={() => handleCheckboxChange('exibirCa')} />
                            </DividerWrapper>
                            <Divider marginTop='0.5rem' color='transparent' />
                        </div>
                        <div className='col-12'>
                            <DividerWrapper>
                                <label>Sanidade no combate</label>
                                <SliderCheckbox name="exibirSanidade" control={control} onChange={() => handleCheckboxChange('exibirSanidade')} />
                            </DividerWrapper>
                            <Divider marginTop='0.5rem' color='transparent' />
                        </div>
                        <div className='col-12'>
                            <DividerWrapper>
                                <label>Percepção no combate</label>
                                <SliderCheckbox name="exibirPercepcao" control={control} onChange={() => handleCheckboxChange('exibirPercepcao')} />
                            </DividerWrapper>
                            <Divider marginTop='0.5rem' color='transparent' />
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='col-12'>
                            <Divider marginTop='0.5rem' marginBottom="0.5rem" color='transparent' />
                            <h4> Controle de dados no combate </h4>
                            <Divider marginTop='0.5rem' marginBottom="0.5rem" />
                        </div>
                        <div className='col-12'>
                            <DividerWrapper>
                                <label> Dano causado </label>
                                <SliderCheckbox name="exibirDano" control={control} onChange={() => handleCheckboxChange('exibirDano')} />
                            </DividerWrapper>
                            <Divider marginTop='0.5rem' color='transparent' />
                        </div>
                        <div className='col-12'>
                            <DividerWrapper>
                                <label> Mana atual </label>
                                <SliderCheckbox name="exibirMana" control={control} onChange={() => handleCheckboxChange('exibirMana')} />
                            </DividerWrapper>
                            <Divider marginTop='0.5rem' color='transparent' />
                        </div>
                    </div>
                </form>
            </>
        );
    };

    return (
        <>
            <div className='grid'>
                <div className='col-4'>
                    <TurnoWrapper>
                        Turno de: <h2> {combate.turno} </h2>
                    </TurnoWrapper>
                    <Divider color='transparent' marginTop="0.4rem" />
                    <Button
                        fontSize='1rem'
                        width='auto'
                        padding='0.2rem 0.4rem'
                        backgroundColor='#ffe600'
                        color='black'
                        onClick={() => atualizarTurno()}
                    >
                        <span>
                            Próximo turno
                        </span>
                    </Button>
                </div>
                <div className="col-4">
                    <TurnoWrapper justifyContent='center'>
                        Rodada: <h2> {combate.rodada} </h2>
                    </TurnoWrapper>
                </div>
                <div className='col-4'>
                    <TurnoWrapper justifyContent='right'>
                        <Button
                            width='auto'
                            borderRadius='50%'
                            backgroundColor='#ffe600'
                            color='black'
                            padding='0.5rem 0.5rem;'
                            onClick={() => setIsModalConfigOpen(true)}
                        >
                            <SlidersHorizontal
                                fill='white'
                                size={'1.2rem'}
                            />
                        </Button>

                        <Button
                            width='auto'
                            borderRadius='50%'
                            backgroundColor='#ffe600'
                            color='black'
                            padding='0.5rem 0.5rem;'
                            onClick={reiniciarCombate}
                            transform={"rotateZ(-360deg) scale(1.1)"}
                        >
                            <ArrowCounterClockwise
                                fill='white'
                                size={'1.2rem'}
                            />
                        </Button>
                    </TurnoWrapper>
                </div>
            </div>

            <Divider color='transparent' marginTop='0.8rem' marginBottom='0.8rem' />

            <div className='grid'>
                <div className='col-3'>
                    <Input
                        label='Nome'
                        type='text'
                        name='nome'
                        onChange={handleChangeCombatente}
                        value={combatente.nome}
                    />
                </div>
                <div className='col-2'>
                    <Input
                        label='Vida'
                        type='number'
                        name='vida'
                        onChange={handleChangeCombatente}
                        value={combatente.vida}
                    />
                </div>
                <div className='col-2'>
                    <Input
                        label='Iniciativa'
                        type='number'
                        name='iniciativa'
                        onChange={handleChangeCombatente}
                        value={combatente.iniciativa}
                    />
                </div>
                <div className='col-3'>
                    <Button
                        width='auto'
                        backgroundColor='#ffe600'
                        color='black'
                        padding='0.5rem 0.8rem;'
                        onClick={adicionarAoCombate}
                    >
                        Adicionar
                    </Button>
                </div>
            </div>

            <Divider color='transparent' marginTop='0.8rem' marginBottom='0.8rem' />

            <div className='grid'>
                <div className='col-12'>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="combateOrder">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    <TableCombat>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '1.875rem' }}>  </th>
                                                <th style={{ width: '13rem' }}> Nome </th>
                                                <ColunasMenoresCombatTh> Vida </ColunasMenoresCombatTh>
                                                
                                                {config.exibirMana && 
                                                    <ColunasMenoresCombatTh> Mana </ColunasMenoresCombatTh>
                                                }

                                                <ColunasMenoresCombatTh> Iniciativa </ColunasMenoresCombatTh>
                                                
                                                {config.exibirCa && 
                                                    <ColunasMenoresCombatTh> CA </ColunasMenoresCombatTh>
                                                }

                                                {config.exibirSanidade && 
                                                    <ColunasMenoresCombatTh> Sanidade </ColunasMenoresCombatTh>
                                                }

                                                {config.exibirPercepcao && 
                                                    <ColunasMenoresCombatTh> Percepção </ColunasMenoresCombatTh>
                                                }
                                                <th> Status </th>
                                                <th style={{ width: '3.4rem' }}>  </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {combateOrder?.length > 0 && combateOrder.map((item, index) => {
                                                return (
                                                    <Draggable key={item.id} draggableId={String(item.id)} index={index} >
                                                        {(provided) => (
                                                            <tr
                                                                className={retornaAtual(index) ? 'player-atual' : ''}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    // Estilos para o item sendo arrastado...
                                                                }}
                                                            >
                                                                {/* Alteração aqui: Aplicar dragHandleProps somente no ícone */}
                                                                <td style={{ width: '1.875rem' }} {...provided.dragHandleProps}>
                                                                    <List size={'1.6rem'} />
                                                                </td>
                                                                <td style={{ width: '13rem' }}> {item.nome} </td>
                                                                <ColunasMenoresCombatTd>
                                                                    <Input
                                                                        type='number'
                                                                        name='vida'
                                                                        value={item.vida}
                                                                        borderColor='#7a7a7a'
                                                                        onChange={(e) => handleInputChange(index, 'vida', Number(e.target.value))}
                                                                    />
                                                                </ColunasMenoresCombatTd>

                                                                {config.exibirMana && 
                                                                    <ColunasMenoresCombatTd>
                                                                        <Input
                                                                            type='number'
                                                                            name='mana'
                                                                            value={item.mana}
                                                                            borderColor='#7a7a7a'
                                                                            onChange={(e) => handleInputChange(index, 'mana', Number(e.target.value))}
                                                                        />
                                                                    </ColunasMenoresCombatTd>
                                                                }

                                                                <ColunasMenoresCombatTd>
                                                                    <Input
                                                                        type='number'
                                                                        name='iniciativa'
                                                                        value={item.iniciativa}
                                                                        borderColor='#7a7a7a'
                                                                        onChange={(e) => handleInputChange(index, 'iniciativa', Number(e.target.value))}
                                                                    />
                                                                </ColunasMenoresCombatTd>

                                                                {config.exibirCa && 
                                                                    <ColunasMenoresCombatTd>
                                                                        <Input
                                                                            type='number'
                                                                            name='ca'
                                                                            value={item.ca}
                                                                            borderColor='#7a7a7a'
                                                                            onChange={(e) => handleInputChange(index, 'ca', Number(e.target.value))}
                                                                        />
                                                                    </ColunasMenoresCombatTd>
                                                                }

                                                                {config.exibirSanidade && 
                                                                    <ColunasMenoresCombatTd>
                                                                        <Input
                                                                            type='number'
                                                                            name='sanidade'
                                                                            value={item.sanidade}
                                                                            borderColor='#7a7a7a'
                                                                            onChange={(e) => handleInputChange(index, 'sanidade', Number(e.target.value))}
                                                                        />
                                                                    </ColunasMenoresCombatTd>
                                                                }

                                                                {config.exibirPercepcao && 
                                                                    <ColunasMenoresCombatTd>
                                                                        <Input
                                                                            type='number'
                                                                            name='percepcaoPassiva'
                                                                            value={item.percepcaoPassiva}
                                                                            borderColor='#7a7a7a'
                                                                            onChange={(e) => handleInputChange(index, 'percepcaoPassiva', Number(e.target.value))}
                                                                        />
                                                                    </ColunasMenoresCombatTd>
                                                                }
                                                                <td>
                                                                    <div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
                                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', width: '90%', flexDirection: 'row' }}>
                                                                            {item.status?.length > 0 &&
                                                                                item.status.map((condicao: Condicao) => {
                                                                                    return (
                                                                                        <CondicoesWaraper>
                                                                                            <CondicoesChip
                                                                                                onClick={() => openModal(item)}
                                                                                            >
                                                                                                {condicao.label} / <Timer size={'1rem'} color='white'/> {condicao.rodadas}
                                                                                            </CondicoesChip>
                                                                                        </CondicoesWaraper>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                        <div style={{ width: '10%' }}>
                                                                            <Button
                                                                                backgroundColor='#ffe600'
                                                                                color='black'
                                                                                padding='0.5rem 0.6rem'
                                                                                width='auto'
                                                                                onClick={() => openModal(item)}
                                                                                borderRadius='50%'
                                                                            >
                                                                                <PlusMinus size={'1.6rem'} />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Button
                                                                        backgroundColor='#272727'
                                                                        border='1px solid lightgray'
                                                                        padding='0.4rem;'
                                                                        borderRadius='50%'
                                                                        width='auto'
                                                                        onClick={() => removerDoCombate(index)}
                                                                    >
                                                                        <X
                                                                            fill='white'
                                                                            size={'1.2rem'}
                                                                        />
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {combateOrder?.length === 0 &&
                                                <tr>
                                                    <td style={{ textAlign: 'center' }} colSpan={6}>
                                                        Você pode adicionar os personagens que irão participar do combate tanto pelos campos a cima clicando no botão "Adicionar", quanto pelos Monstros, NPCS e personagens pré cadastrados que estarão a baixo daqui.
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </TableCombat>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>


                    <Divider marginTop='1rem' marginBottom='0.5rem' color='transparent' />

                    <Button
                        backgroundColor='#4d4d4d'
                        padding='0.5rem 0.8rem'
                        color='white'
                        hoverBackgroundColor='#ffe600'
                        hoverColor='black'
                        onClick={ordenarPorIniciativa}
                    >
                        Ordenar por Iniciativa
                    </Button>
                </div>
            </div>

            <Divider color='lightgray' marginTop='0.8rem' marginBottom='0.8rem' />

            <div>
                <h3>Combatentes para adicionar ao combate</h3>
                <Divider marginTop='0.5rem' marginBottom="0.5rem" color='transparent' />
                <DisplayPersonagens tipo={"tipo"} />
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} width='55rem'>
                <StatusPersonagem />
            </Modal>

            <Modal isOpen={isModalConfigOpen} onClose={closeModal} width='35rem'>
                <ConfiguracoesModal/>
            </Modal>

        </>
    )
}

export default Combat;