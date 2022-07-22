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

type QuestionsByDifficultyCountQuery = {
  easy: Query['questions']
  medium: Query['questions']
  hard: Query['questions']
}

const QuestionsByDifficultyCount = gql`
    query QuestionsByDifficultyCount(
        $easyWhere: QuestionWhereInput!,
        $mediumWhere: QuestionWhereInput!,
        $hardWhere: QuestionWhereInput!,
    ) {
        easy: questions(where: $easyWhere) {
            totalCount
        }
        medium: questions(where: $mediumWhere) {
            totalCount
        }
        hard: questions(where: $hardWhere) {
            totalCount
        }
    }
`

export const QuestionsByDifficulty: FC = () => {
  const {where} = useDashboardContext()
  const {loading, data} = useQuery<QuestionsByDifficultyCountQuery>(
    QuestionsByDifficultyCount, {
      variables: {
        easyWhere: {difficulty: ['EASY'], ...where},
        mediumWhere: {difficulty: ['MEDIUM'], ...where},
        hardWhere: {difficulty: ['HARD'], ...where},
      },
    })

  if (loading || !data) return null

  const mappedData: ResponsivePieData = [
    {
      id: "Fácil",
      label: "Fácil",
      value: data.easy.totalCount ?? 0
    },
    {
      id: "Difícil",
      label: "Difícil",
      value: data.hard.totalCount ?? 0
    },
    {
      id: "Média",
      label: "Média",
      value: data.medium.totalCount ?? 0
    },
  ]
  const filteredData = mappedData.filter(item => item.value)

  return (
    <Pie title="Questões por Dificuldade" data={filteredData}/>
  )
}