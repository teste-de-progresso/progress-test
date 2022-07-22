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

type QuestionsByCheckTypeCountQuery = {
  uniqueAnswer: Query['questions']
  incompleteAffirmation: Query['questions']
  multipleAnswer: Query['questions']
  negativeFocus: Query['questions']
  assertionAndReason: Query['questions']
  gap: Query['questions']
  interpretation: Query['questions']
  association: Query['questions']
  orderingOrRanking: Query['questions']
  constantAlternatives: Query['questions']
}

const QuestionsByCheckTypeCount = gql`
    query QuestionsByCheckTypeCount(
        $uniqueAnswer: QuestionWhereInput!,
        $incompleteAffirmation: QuestionWhereInput!,
        $multipleAnswer: QuestionWhereInput!,
        $negativeFocus: QuestionWhereInput!,
        $assertionAndReason: QuestionWhereInput!,
        $gap: QuestionWhereInput!,
        $interpretation: QuestionWhereInput!,
        $association: QuestionWhereInput!,
        $orderingOrRanking: QuestionWhereInput!,
        $constantAlternatives: QuestionWhereInput!,
    ) {
        uniqueAnswer: questions(where: $uniqueAnswer) {
            totalCount
        }
        incompleteAffirmation: questions(where: $incompleteAffirmation) {
            totalCount
        }
        multipleAnswer: questions(where: $multipleAnswer) {
            totalCount
        }
        negativeFocus: questions(where: $negativeFocus) {
            totalCount
        }
        assertionAndReason: questions(where: $assertionAndReason) {
            totalCount
        }
        gap: questions(where: $gap) {
            totalCount
        }
        interpretation: questions(where: $interpretation) {
            totalCount
        }
        association: questions(where: $association) {
            totalCount
        }
        orderingOrRanking: questions(where: $orderingOrRanking) {
            totalCount
        }
        constantAlternatives: questions(where: $constantAlternatives) {
            totalCount
        }
    }
`

export const QuestionByCheckType: FC = () => {
  const {where} = useDashboardContext()
  const {loading, data} = useQuery<QuestionsByCheckTypeCountQuery>(
    QuestionsByCheckTypeCount, {
      variables: {
        uniqueAnswer: {checkType: ['UNIQUE_ANSWER'], ...where},
        incompleteAffirmation: {checkType: ['INCOMPLETE_AFFIRMATION'], ...where},
        multipleAnswer: {checkType: ['MULTIPLE_ANSWER'], ...where},
        negativeFocus: {checkType: ['NEGATIVE_FOCUS'], ...where},
        assertionAndReason: {checkType: ['ASSERTION_AND_REASON'], ...where},
        gap: {checkType: ['GAP'], ...where},
        interpretation: {checkType: ['INTERPRETATION'], ...where},
        association: {checkType: ['ASSOCIATION'], ...where},
        orderingOrRanking: {checkType: ['ORDERING_OR_RANKING'], ...where},
        constantAlternatives: {checkType: ['CONSTANT_ALTERNATIVES'], ...where},
      }
    })

  if (loading || !data) return null

  const mappedData: ResponsivePieData = [
    {
      id: "Asserção e Razão",
      label: "Asserção e Razão",
      value: data.assertionAndReason.totalCount ?? 0
    },
    {
      id: "Associação",
      label: "Associação",
      value: data.association.totalCount ?? 0
    },
    {
      id: "Alternativas Constantes",
      label: "Alternativas Constantes",
      value: data.constantAlternatives.totalCount ?? 0
    },
    {
      id: "Lacuna",
      label: "Lacuna",
      value: data.gap.totalCount ?? 0
    },
    {
      id: "Afirmação Incompleta",
      label: "Afirmação Incompleta",
      value: data.incompleteAffirmation.totalCount ?? 0
    },
    {
      id: "Interpretação",
      label: "Interpretação",
      value: data.interpretation.totalCount ?? 0
    },
    {
      id: "Resposta Múltipla",
      label: "Resposta Múltipla",
      value: data.multipleAnswer.totalCount ?? 0
    },
    {
      id: "Foco Negativo",
      label: "Foco Negativo",
      value: data.negativeFocus.totalCount ?? 0
    },
    {
      id: "Ordenação ou Seriação",
      label: "Ordenação ou Seriação",
      value: data.orderingOrRanking.totalCount ?? 0
    },
    {
      id: "Resposta Única",
      label: "Resposta Única",
      value: data.uniqueAnswer.totalCount ?? 0
    },
  ]
  const filteredData = mappedData.filter(item => item.value)

  return (
    <Pie title="Questões por Tipo" data={filteredData}/>
  )
}