import { ApolloQueryResult, gql, OperationVariables } from "@apollo/client";
import {
  CheckCircleIcon,
  DocumentRemoveIcon
} from '@heroicons/react/outline';
import React, { FC } from "react";
import { Card } from "../../../../components";
import { Query, Question, ReviewMessage, ReviewMessageFeedbackType } from "../../../../__generated__/graphql-schema";
import { ReviewMessageForm, ReviewMessageFormFragments } from "./ReviewMessagesForm";


const feedbackIcon = {
  [ReviewMessageFeedbackType.Answer]: null,
  [ReviewMessageFeedbackType.Approve]: <CheckCircleIcon className="w-5 text-green-800" />,
  [ReviewMessageFeedbackType.RequestChanges]: <DocumentRemoveIcon className="w-5 text-red-800" />,
};

const ReviewMessageTitle: FC<{
  feedback: ReviewMessage
}> = ({ feedback }) => (
  <p className="flex">
    {feedback.user.name}{' '} - {' '}
    <span className="text-gray-700 pr-2">
      {new Date(feedback.createdAt).toLocaleString()}
    </span>
    {feedbackIcon[feedback.feedbackType]}
  </p>
)

export const ReviewMessagesFragments = gql`
  ${ReviewMessageFormFragments}
  fragment ReviewMessages_question on Question {
    id
    ...ReviewMessageForm_question
    user {
      id
    }
    reviewMessages {
      nodes {
        id
        feedbackType
        text
        user {
          name
          avatarUrl
        }
        createdAt
      }
    }
  }
`

export const ReviewMessages: FC<{
  question: Question
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<Query>>
}> = ({ question, refetch }) => {
  const reviewMessages = question.reviewMessages.nodes
  const hasFeebacks = !!reviewMessages.length

  return (
    <div>
      <Card className="mb-3" title="Histórico de Pareceres">
        {hasFeebacks
          ? reviewMessages.map((item) => (
            <div key={item.id}>
              <ReviewMessageTitle feedback={item} />
              <p className="p-2">
                {item.text}
              </p>
            </div>
          ))
          : 'Essa questão não tem nenhum parecer ainda.'}
      </Card>
      <ReviewMessageForm question={question} refetch={refetch} />
    </div>
  )
};
