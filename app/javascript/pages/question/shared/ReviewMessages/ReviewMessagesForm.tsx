import { ApolloQueryResult, gql, OperationVariables, useMutation } from "@apollo/client";
import React, { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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
  const { register, handleSubmit, formState: {
    isDirty
  } } = useForm()
  const history = useHistory();
  const { user } = useCurrentUser()

  const [createReviewMessage] = useMutation<Mutation['createReviewMessage']>(CREATE_REVIEW_MESSAGE_MUTATION)

  const hasFeebacks = !!question.reviewMessages.nodes.length
  const questionIsFromCurrentUser = user?.id === question.user.id

  const formSubmit: SubmitHandler<FieldValues> = async ({
    feedbackType,
    text
  }) => {
    await createReviewMessage({
      variables: {
        text: text,
        feedbackType: questionIsFromCurrentUser ? ReviewMessageFeedbackType.Answer : feedbackType,
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
        when={!isDirty}
        message='O parecer ainda não foi enviado, deseja continuar?'
      />
      <Card title="Parecer" className="max-w-screen-md mx-auto">
        <form onSubmit={handleSubmit(formSubmit)}>
          <textarea
            className="w-full h-32 p-2 border-solid border-2 border-gray-700 rounded-md"
            {...register('text')}
            name="text"
          />
          {!questionIsFromCurrentUser && REVIEW_FEEDBACK.map((item, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="radio"
                id={item.value}
                {...register("feedbackType", { required: true })}
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
            <Button type="primary" htmlType="submit" className="mt-4">
              {questionIsFromCurrentUser ? 'Responder Parecer' : 'Enviar Parecer'}
            </Button>
          </div>
        </form>
      </Card>
    </>
  )
};
