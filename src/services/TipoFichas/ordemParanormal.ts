interface Personagem {
    origem: string;
    classe: string;
    pePorRodada: number;
    proteção: string;
    resistencias: Resistencias[] | string;
    perícias: Perícia[];
    ataques: Ataque[];
    habilidadesERituais: habilidadesPoderesRituais[];
    limiteDeItens: number;
    limiteDeCrédito: string;
    item: Item[];
    aparencia: string;
    personalidade: string;
    historico: string;
    cargaMax: number;
    objetivo: string;
}

interface Resistencias {
    id: string;
    nome: string;
    quantidade: number;
}

interface Perícia {
    id: number;
    nome: string;
    atributo: string;
    bônus: {
        treino: number;
        outros: number;
    };
}

interface Ataque {
    id: string;
    nome?: string;
    teste?: string;
    dano?: string;
    critico?: number;
    margemAmeaca?: number;
    alcance?: number;
}

interface habilidadesPoderesRituais {
    id: string;
    nome: string;
    custo: number;
    pagina?: string;
    descricao?: string;
}

interface Item {
    id: string;
    nome: string;
    categoria: string;
    espaços: number;
    descricao?: string;
}