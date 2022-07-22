import { ApolloQueryResult, gql, OperationVariables, useMutation } from "@apollo/client";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Prompt, useHistory } from "react-router";
import { Button, Card } from "../../../../components";
import { useCurrentUser } from "../../../../contexts";
import { NodeId } from "../../../../utils/graphql";
import { Mutation, Query, Question, ReviewMessageFeedbackType } from "../../../../__generated__/graphql-schema";

export const REVIEW_FEEDBACK = [
  {
    label: "Aprovada",
    description: "O revisor sugere que as observações enviadas no parecer sejam consideradas.",
    value: ReviewMessageFeedbackType.Approve,
  },
  {
    label: "Pendente de Alterações",
    description: "O autor deve efetuar as alterações solicitadas no parecer e reenviar a questão ao revisor.",
    value: ReviewMessageFeedbackType.RequestChanges,
  },
];

export const ReviewMessageFormFragments = gql`
  fragment ReviewMessageForm_question on Question {
    id
    status
    user {
      id
    }
  }
`

const CREATE_REVIEW_MESSAGE_MUTATION = gql`
  mutation($questionId: ID!, $feedbackType: ReviewMessageFeedbackType!, $text: String!) {
      createReviewMessage(
          input: {
              message: {
                  questionId: $questionId
                  feedbackType: $feedbackType
                  text: $text
              }
          }
      ) {
          reviewMessage {
              id
          }
      }
  }
`

export const ReviewMessageForm: FC<{
  question: Question
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<Query>>
}> = ({ question, refetch }) => {
  const [isChangesSaved, setIsChangesSaved] = useState(true)
  const { register, handleSubmit } = useForm()
  const history = useHistory();
  const { user } = useCurrentUser()

  const [createReviewMessage] = useMutation<Mutation['createReviewMessage']>(CREATE_REVIEW_MESSAGE_MUTATION)

  const hasFeebacks = !!question.reviewMessages.nodes.length
  const questionIsFromCurrentUser = user?.id === question.user.id

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== '') {
      setIsChangesSaved(false)
    } else {
      setIsChangesSaved(true)
    }
  }

  const handleSubmitClick = () => {
    setIsChangesSaved(true)
  }

  const formSubmit = async (inputs: {
    feedbackType: ReviewMessageFeedbackType
    text: string
  }) => {
    await createReviewMessage({
      variables: {
        text: inputs.text,
        feedbackType: questionIsFromCurrentUser ? ReviewMessageFeedbackType.Answer : inputs.feedbackType,
        questionId: NodeId.decode(question.id).id,
      },
    });

    await refetch()

    history.push('/questions')
  };

  if (!hasFeebacks && questionIsFromCurrentUser) return null

  return (
    <>
      <Prompt
        when={!isChangesSaved}
        message='O parecer ainda não foi enviado, deseja continuar?'
      />
      <Card title="Parecer" className="max-w-screen-md mx-auto">
        <form onSubmit={handleSubmit(formSubmit)}>
          <textarea
            onChange={(e) => handleTextChange(e)}
            className="w-full h-32 p-2 border-solid border-2 border-gray-700 rounded-md"
            ref={register}
            name="text"
          />
          {!questionIsFromCurrentUser && REVIEW_FEEDBACK.map((item, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="radio"
                id={item.value}
                name="feedbackType"
                ref={register({ required: true })}
                value={item.value}
                className="my-auto"
                defaultChecked={index === 0}
              />
              <label
                htmlFor={item.value}
                className="flex flex-col pl-2 w-full"
              >
                {item.label}
                <p className="text-gray-700 text-sm">{item.description}</p>
              </label>
            </div>
          ))}
          <div className="justify-end flex">
            <Button type="primary" htmlType="submit" className="mt-4" onClick={handleSubmitClick}>
              {questionIsFromCurrentUser ? 'Responder Parecer' : 'Enviar Parecer'}
            </Button>
          </div>
        </form>
      </Card>
    </>
  )
};
