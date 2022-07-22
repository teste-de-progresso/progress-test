import React, {FC} from 'react'
import {gql, useQuery} from '@apollo/client'

import {Query} from '../../../__generated__/graphql-schema'
import {Pie} from '../components/charts'
import {useDashboardContext} from "../DashboardContext";

type ResponsivePieData = {
  id: string
  label: string
  value: number
}[]

type QuestionsByBloomTaxonomyCountQuery = {
  remember: Query['questions']
  understand: Query['questions']
  apply: Query['questions']
  analyze: Query['questions']
  evaluate: Query['questions']
  create: Query['questions']
}

const QuestionsByBloomTaxonomyCount = gql`
    query QuestionsByBloomTaxonomyCount (
        $rememberWhere: QuestionWhereInput!,
        $understandWhere: QuestionWhereInput!,
        $applyWhere: QuestionWhereInput!,
        $analyzeWhere: QuestionWhereInput!,
        $evaluateWhere: QuestionWhereInput!,
        $createWhere: QuestionWhereInput!,
    ) {
        remember: questions(where: $rememberWhere) {
            totalCount
        }
        understand: questions(where: $understandWhere) {
            totalCount
        }
        apply: questions(where: $applyWhere) {
            totalCount
        }
        analyze: questions(where: $analyzeWhere) {
            totalCount
        }
        evaluate: questions(where: $evaluateWhere) {
            totalCount
        }
        create: questions(where: $createWhere) {
            totalCount
        }
    }
`

export const QuestionByBloomTaxonomy: FC = () => {
  const {where} = useDashboardContext()
  const {loading, data} = useQuery<QuestionsByBloomTaxonomyCountQuery>(
    QuestionsByBloomTaxonomyCount, {
      variables: {
        rememberWhere: {bloomTaxonomy: ['REMEMBER'], ...where},
        understandWhere: {bloomTaxonomy: ['UNDERSTAND'], ...where},
        applyWhere: {bloomTaxonomy: ['APPLY'], ...where},
        analyzeWhere: {bloomTaxonomy: ['ANALYZE'], ...where},
        evaluateWhere: {bloomTaxonomy: ['EVALUATE'], ...where},
        createWhere: {bloomTaxonomy: ['CREATE'], ...where},
      }
    })

  if (loading || !data) return null

  const mappedData: ResponsivePieData = [
    {
      id: "Recordar",
      label: "Recordar",
      value: data.remember.totalCount ?? 0
    },
    {
      id: "Compreender",
      label: "Compreender",
      value: data.understand.totalCount ?? 0
    },
    {
      id: "Aplicar",
      label: "Aplicar",
      value: data.apply.totalCount ?? 0
    },
    {
      id: "Analisar",
      label: "Analisar",
      value: data.analyze.totalCount ?? 0
    },
    {
      id: "Avaliar",
      label: "Avaliar",
      value: data.evaluate.totalCount ?? 0
    },
    {
      id: "Criar",
      label: "Criar",
      value: data.create.totalCount ?? 0
    },
  ]
  const filteredData = mappedData.filter(item => item.value)

  return (
    <Pie title="Questões por Habilidade Cognitiva" data={filteredData}/>
  )
}