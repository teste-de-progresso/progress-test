import React, { FC, useState, } from "react";
import { SideBar } from "./SideBar";
import { Button } from "../../../components";
import { SelectFilterField } from "./SelectFilterField";
import { RangeFilterField } from "./RangeFilterField";
import { BLOOM_TAXONOMY, CHECK_TYPE, DIFFICULTY } from "../../../utils/types";
import { gql, useQuery } from "@apollo/client";

const FILTERS_QUERY = gql`
  query {
    axes {
        nodes {
            id
            name
        }
    }
    subjects {
        nodes {
            id
            name
        }
    }
  }
`

type Props = {

}

export const FiltersSideBar: FC<Props> = () => {
    const [axis, setAxis] = useState<Axis[]>([])
    const [subjects, setSubjects] = useState<Subject[]>([])

    const difficulties = DIFFICULTY.map(item => ({id: item.value, label: item.label}))
    const bloomTaxonomyTypes = BLOOM_TAXONOMY.map(item => ({id: item.value, label: item.label}))
    const checkTypes = CHECK_TYPE.map(item => ({id: item.value, label: item.label}))
    const authorshipTypes = [
        {id: 1, label: 'Própria'},
        {id: 2, label: 'Outro'},
    ]

    useQuery<Query>(FILTERS_QUERY, {
        onCompleted: (response) => {
            const {
                axes: axisConnection,
                subjects: subjectConnection
            } = response
            setAxis(axisConnection.nodes as Axis[])
            setSubjects(subjectConnection.nodes as Subject[])
        },
        fetchPolicy: "network-only"
      })

    return (
        <SideBar header="Filtros">
            <div className="mt-3">
                <form className="flex flex-col gap-4">
                    <SelectFilterField label="Grau de Dificuldade:" options={difficulties}/>
                    <SelectFilterField label="Eixo de Formação:" options={
                            axis.map(item => ({id: item.id, label: item.name}))   
                        }/>
                    <SelectFilterField label="Assunto:" options={
                            subjects.map(item => ({id: item.id, label: item.name}))   
                        }/>
                    <SelectFilterField label="Habilidade Cognitiva:" options={bloomTaxonomyTypes}/>
                    <SelectFilterField label="Tipo:" options={checkTypes}/>
                    <SelectFilterField label="Autoria:" options={authorshipTypes}/>
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