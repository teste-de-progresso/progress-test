import React, { FC, useState } from 'react'

import { PageInfo, Query, Question, ReviewRequest, User } from '../../../__generated__/graphql-schema';
import { gql, useQuery } from '@apollo/client';
import { QuestionsList, QuestionsListFragments } from './QuestionsList'

const QUESTIONS_QUERY = gql`
  ${QuestionsListFragments}
  query QuestionsWaitingReviewQuery($first: Int!, $after: String) {
    currentUser {
      id
      activeReviewRequests(
        first: $first,
        after: $after
      ) {
        nodes {
          id
          question {
            ... QuestionFields
          }
        }
      }
    }
  }
`
const PAGE_SIZE = 4

type Props = {
  title: string
}

export const QuestionsWaitingReviewQuery: FC<Props> = ({ title }) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>()

  const updateQuestions = (queryResult: Query) => {
    if (!queryResult.currentUser) return

    const { activeReviewRequests } = queryResult.currentUser
    const reviewRequests = activeReviewRequests.nodes as ReviewRequest[]

    setQuestions(reviewRequests.map(item => item.question))
    setPageInfo(activeReviewRequests.pageInfo)
  }

  const { fetchMore } = useQuery<Query>(QUESTIONS_QUERY, {
    onCompleted: (response) => {
      updateQuestions(response)
    },
    variables: {
      first: PAGE_SIZE,
    },
    fetchPolicy: "network-only"
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
