interface Personagem {
    raça: string;
    origem: string;
    classe: Classe[];
    bônusNo: number;
    penalidadeTotalDeArmadura: number;
    pontosDeExperiência: number;
    tamanho: string;
    deslocamento: number;
    nivel: number;
    divindade: string;
    atributos: Atributos;
    inventário: Item[];
    tesouro: Tesouro;
    magias: Magia[];
    habilidadesDeRaçaEOrigem: string;
    habilidadesDeClasseEPoderes: string;
    anotacoes: Anotacoes;
    multiClasse: boolean;
}

interface Classe {
    nome: string;
    nivel: number;
}

interface Nivel {
    nivelAtual: number;
    
}

interface Atributos {
    força: number;
    destreza: number;
    constituição: number;
    inteligência: number;
    sabedoria: number;
    carisma: number;
}

interface Item {
    item: string;
    quantidade: number;
    slots: number;
}

interface Tesouro {
    total: number;
    limiteDeCarga: number;
    cargaUsada: number;
}

interface Magia {
    descrição: string;
    escola: string;
    execução: string;
    alcance: string;
    área: string;
    duração: string;
    resistência: string;
    efeito: string;
}

interface Anotacoes {
    histórico: string;
    aliados: string;
    tesouros: string;
}

export type { Personagem, Atributos, Anotacoes, Classe, Item, Magia, Nivel, Tesouro }