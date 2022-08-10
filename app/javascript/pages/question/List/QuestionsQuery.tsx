import React, { FC, useState } from 'react'

import { PageInfo, Query, Question, QuestionWhereInput, QuestionStatus } from '../../../__generated__/graphql-schema';
import { gql, useQuery } from '@apollo/client';
import { QuestionsList, QuestionsListFragments } from './QuestionsList'
import { useCurrentUser } from '../../../contexts';

const QUESTIONS_QUERY = gql`
  ${QuestionsListFragments}
  query QuestionsQuery($first: Int!, $after: String, $before: String, $where: QuestionWhereInput) {
    questions (
        first: $first,
        after: $after,
        before: $before,
        where: $where
    ) {
      nodes {
        ... QuestionFields
      }
    }
  }
`
const PAGE_SIZE = 4

type Props = {
  title: string
  where?: QuestionWhereInput
  status?: QuestionStatus
}

export const QuestionsQuery: FC<Props> = ({ title, where, status }) => {
  const { user } = useCurrentUser()

  const [questions, setQuestions] = useState<Question[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>()

  const updateQuestions = (queryResult: Query) => {
    const { questions: questionConnection } = queryResult

    setQuestions(questionConnection.nodes as Question[])
    setPageInfo(questionConnection.pageInfo)
  }

  const whereInput = {
    status,
    userId: user?.id,
    ...where
  }

  const { fetchMore } = useQuery<Query>(QUESTIONS_QUERY, {
    onCompleted: (response) => {
      updateQuestions(response)
    },
    variables: {
      first: PAGE_SIZE,
      where: whereInput,
    },
    fetchPolicy: "network-only",
  })

  const onNextPageClick = () => {
    fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: pageInfo?.endCursor,
      },
    }).then(({ data }) => {
      updateQuestions(data)
    })
  }

  const onPreviousPageClick = () => {
    fetchMore({
      variables: {
        first: PAGE_SIZE,
        before: pageInfo?.startCursor,
      },
    }).then(({ data }) => {
      updateQuestions(data)
    })
  }

  console.log(pageInfo)

  return (
    <QuestionsList
      title={title}
      questions={questions}
      pagination={{
        onNextPageClick: onNextPageClick,
        hasNextPage: pageInfo?.hasNextPage ?? false,
        hasPreviousPage: pageInfo?.hasPreviousPage ?? false,
        onPreviousPageClick: onPreviousPageClick
      }}
    />
  )
};
