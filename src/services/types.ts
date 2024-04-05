
interface Sistema {
    id: number;
    nome: string;
    imagem: string;
    condicoes: Array<Condicao>;
}

interface Condicao {
    id: string;
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
    idMesa?: string;
    idUser?: string;
}


interface Combatente {
    id: string;
    nome: string;
    iniciativa: number;
    vida: number;
    status: Array<Condicao>;
    ca?: number;
    mana?: number;
    percepcaoPassiva?: number;
    sanidade?: number;
}

interface Combate {
    rodada: number;
    turno: string;
}

interface LoginForm {
    login: string;
    password: string;
    staySignedIn: boolean
}

interface User {
    id?: string;
    name?: string;
    email?: string;
    token?: string;
    password?: string;
    socialId?: string;
}



export type { Personagem, Mesa, Status, Combatente, Combate, Sistema, Condicao, LoginForm, User }