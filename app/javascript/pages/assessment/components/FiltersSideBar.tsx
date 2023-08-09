import React, { FC, } from "react";
import { SideBar } from "./SideBar";
import { SelectedQuestionCard } from "./SelectedQuestionCard";
import { Button } from "../../../components";
import { SelectFilterField } from "./SelectFilterField";
import { RangeFilterField } from "./RangeFilterField";

type Props = {
    questions?: {
        id: string, label: string, removeHandler: Function
    }[]
}

export const FiltersSideBar: FC<Props> = () => {
    return (
        <SideBar header="Filtros">
            <div className="mt-3">
                <form className="flex flex-col gap-4">
                    <SelectFilterField label="Grau de Dificuldade:" options={[
                        {id: 1, label: 'Fácil'},
                        {id: 2, label: 'Média'},
                        {id: 3, label: 'Difícil'}
                    ]}/>
                    <SelectFilterField label="Categoria:" options={[
                        {id: 1, label: 'Conhecimentos Básicos'},
                        {id: 2, label: 'Redes e Sistemas Computacionais'},
                        {id: 3, label: 'Modelagem e Simulacao'}
                    ]}/>
                    <SelectFilterField label="Eixo de Formação:" options={[
                        {id: 1, label: 'Infraestrutura de Sistemas Computacionais'},
                        {id: 2, label: 'Sistemas de Software'},
                        {id: 3, label: 'Algoritmos de Alto Desempenho'}
                    ]}/>
                    <SelectFilterField label="Assunto:" options={[
                        {id: 1, label: 'Cálculo'},
                        {id: 2, label: 'Pesquisa Operacional'},
                        {id: 3, label: 'Sistemas Digitais'}
                    ]}/>
                    <SelectFilterField label="Habilidade Cognitiva:" options={[
                        {id: 1, label: 'Recordar'},
                        {id: 2, label: 'Compreender'},
                        {id: 3, label: 'Criar'}
                    ]}/>
                    <SelectFilterField label="Tipo:" options={[
                        {id: 1, label: 'Resposta Multipla'},
                        {id: 2, label: 'Lacuna'},
                        {id: 3, label: 'Foco Negativo'}
                    ]}/>
                    <SelectFilterField label="Autoria:" options={[
                        {id: 1, label: 'Própria'},
                        {id: 2, label: 'Outro'},
                    ]}/>
                    <RangeFilterField label="Ano:"/>  
                    <div className="w-full flex flex-col mt-2 gap-3">
                        <Button type="primary" htmlType="submit">
                            Aplicar Filtro
                        </Button>
                        <Button htmlType="submit">
                            Limpar Filtro
                        </Button>
                    </div>                                         
                </form>
            </div>
        </SideBar>
    )
}