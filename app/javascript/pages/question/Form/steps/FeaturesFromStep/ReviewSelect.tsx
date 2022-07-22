import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";

import { useFormProvider } from '../../FormContext'
import { Query, QuestionStatus, User } from "../../../../../__generated__/graphql-schema";

export const ReviewerFragment = gql`
  fragment ReviewerFields on Question {
    reviewer {
      id
    }
  }
`

const REVIEWERS_QUERY = gql`
  query ReviwersQuery {
    reviewers {
      nodes {
        id
        name
        email
      }
    }
  }
`

type Props = {
  reviewer?: User
}

export const ReviewerSelect: FC<Props> = () => {
  const { question, hooks: { register } } = useFormProvider()
  const { loading, data } = useQuery<Query>(REVIEWERS_QUERY);

  if (loading) return null;

  const reviewers = data?.reviewers.nodes

  return (
    <select
      {...register('reviewerUserId')}
      className="w-full rounded p-1 border-gray-400 border shadow-sm"
      defaultValue={question?.reviewer?.id}
    >
      {(question?.status === undefined || question?.status === QuestionStatus.Draft) && <option />}
      {reviewers?.map((review, index) => (
        <option key={index} value={review?.id}>
          {review?.name}
        </option>
      ))}
    </select>
  );
};
