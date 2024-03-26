import React from 'react';
import { Sword, User, Campfire } from "phosphor-react";
import {
  ContainerHome,
  ContainerHomeComponent,
  TitleApresentation,
  DestaqueFontHome,
  Section,
  HomeCardContainer,
  CardHomeApresentation,
  FloatingCardApresentation,
  FloatingCardBody,
  Divider
} from './styles'; // Ajuste o caminho conforme necessário

function HomePage() {

    return (
        <ContainerHome>
            <ContainerHomeComponent>
                <TitleApresentation> BEM VINDO AO
                    <DestaqueFontHome> DUNGEON MASTER</DestaqueFontHome>
                </TitleApresentation>
                <Divider marginTop="1rem" marginBottom="2rem" />
                <Section>
                    <span> Aqui você pode gerenciar suas mesas por sistema, criando um ambiente dinâmico e envolvente para mestres de RPG. </span>
                    <span> Você tem o poder de configurar batalhas, controlar ordens de iniciativa e aplicar efeitos exclusivos com facilidade, garantindo que cada sessão seja única e memorável.</span>
                    <span>Além disso, pode pré configurar NPCs, personagens e jogadores, permitindo que você monte encontros rapidamente sem perder tempo com configurações repetitivas.</span>
                </Section>
                <Divider marginTop="1rem" marginBottom="2rem" />
                <HomeCardContainer>
                    <CardHomeApresentation>
                        <FloatingCardApresentation>
                            <FloatingCardBody>
                                <Sword size={30} />
                                <Divider marginTop="1rem" marginBottom="1rem" color="#000" />
                                <span> É nesse icone que você está, e também é onde você vai ter o controle dos combates. </span>
                            </FloatingCardBody>
                        </FloatingCardApresentation>
                        <FloatingCardApresentation>
                            <FloatingCardBody>
                                <Campfire size={30} />
                                <Divider marginTop="1rem" marginBottom="1rem" color="#000" />
                                <span> É nesse icone que você vai criar suas mesas, selecionar sistema e definir se ainda está tendo jogo. </span>
                            </FloatingCardBody>
                        </FloatingCardApresentation>
                        <FloatingCardApresentation>
                            <FloatingCardBody>
                                <User size={30} />
                                <Divider marginTop="1rem" marginBottom="1rem" color="#000" />
                                <span> É nesse icone que você cadastra os personagens, e vincula as suas mesas, para aparecer durante os combates. </span>
                            </FloatingCardBody>
                        </FloatingCardApresentation>
                    </CardHomeApresentation>
                </HomeCardContainer>
            </ContainerHomeComponent>
        </ContainerHome>
    );
}

export default HomePage;
