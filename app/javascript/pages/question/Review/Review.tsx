import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { ViewMode, ViewModeFragments, ReviewMessages, ReviewMessagesFragments } from "../shared";
import { Navigator } from "../../../components";
import { Query, Question } from "../../../__generated__/graphql-schema";

export const GET_QUESTION = gql`
    ${ViewModeFragments}
    ${ReviewMessagesFragments}
    query Question($id: ID!) {
        node(id: $id) {
            __typename
            ... on Question {
                id
                ...QuestionReadOnlyFields
                ...ReviewMessages_question
            }
        }
    }
`

export const Review: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { loading, data, refetch } = useQuery<Query>(GET_QUESTION, {
    variables: {
      id,
    },
    fetchPolicy: "network-only"
  })

  const question = data?.node as Question | null

  if (loading || !question) return null;

  return (
    <>
      <Navigator home />
      <div className="bg-gray-100 h-full w-full my-2">
        <main className="flex px-5 max-w-screen-xl m-auto">
          <div className="w-3/5">
            <ViewMode questionData={question} />
          </div>
          <div className="w-2/5 ml-3">
            <div className="my-3" />
            <ReviewMessages question={question} refetch={refetch}/>
          </div>
        </main>
      </div>
    </>
  );
};
