
interface Sistema {
    id: number;
    nome: string;
    imagem: string;
    condicoes: Array<Condicao>;
}

interface Condicao {
    id: number;
    label: string;
    value: string;
    descricao: string;
    rodadas?: number;
}

interface Mesa {
    id: string;
    nome: string;
    sistema: Sistema;
    mesaAtiva: boolean;
    nivel?: number;
    personagens: Array<Personagem>;
}

interface Status {
    vida?: number;
    mana?: number;
    sanidade?: number;
    percepcaoPassiva?: number;
    ca?: number;
    nd?: number;
}

interface Personagem {
    id: string;
    nome: string;
    tipo: string;
    ficha?: string;
    status: Status;
    statusAtuais?: Status;
}

interface PersonagemRequest {
    id: string;
    personagem: Personagem;
}

interface Combatente {
    id: number;
    nome: string;
    iniciativa: number;
    vida: number;
    status: Array<Condicao>;
}

interface Combate {
    rodada: number;
    turno: string;
}

export type { Personagem, Mesa, PersonagemRequest, Status, Combatente, Combate, Sistema, Condicao }