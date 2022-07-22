import React, {FC, useState} from 'react'
import {useHistory, useParams} from 'react-router';
import {gql, useMutation, useQuery} from '@apollo/client';

import {Mutation, Query, Question} from '../../../__generated__/graphql-schema';
import {AlertV2Props, Navigator} from '../../../components';
import {Form, FormFragments} from '../Form'
import {NodeId} from '../../../utils/graphql';
import {QuestionRoutePaths} from "../../../routes";

const GET_QUESTION = gql`
    ${FormFragments}
    query Question ($id: ID!) {
        node (id: $id) {
            __typename
            ...on Question {
                id
                ...FormFields
            }
        }
    }
`;

const UPDATE_QUESTION_MUTATOIN = gql`
    mutation($input: UpdateQuestionInput!) {
        updateQuestion(input: $input) {
            question {
                id
            }
            errors
        }
    }
`

export const Edit: FC = () => {
  const history = useHistory()
  const [alert, setAlert] = useState<AlertV2Props>()
  const params = useParams<{ id: string }>()
  const [updateQuestion] = useMutation<Mutation>(UPDATE_QUESTION_MUTATOIN)
  const {loading, data} = useQuery<Query>(
    GET_QUESTION, {
      variables: {
        id: params.id,
        fetchPolicy: "no-cache"
      }
    }
  )
  const question = data?.node as Question | null

  if (loading || !question) return null

  const recordId = NodeId.decode(question.id).id

  const onSubmit = (inputs: any) => {
    updateQuestion({
      variables: {
        input: {
          question: {
            ...inputs,
            id: recordId,
          },
        },
      },
    }).then(() => {
      history.push(QuestionRoutePaths.index)
    }).catch((error: string) => {
      setAlert({
        severity: "error",
        text: `Erro ao atualizar questão. ${error}. Por favor, tente novamente.`,
      });

      setTimeout(
        () => setAlert({severity: "error", text: ""}),
        3000
      );
    })
  }

  const onDraftSubmit = (inputs: any) => {
    updateQuestion({
      variables: {
        input: {
          question: {
            ...inputs,
            id: recordId,
          },
        },
      }
    }).then(() => {
      setAlert({
        severity: "success",
        text: "Rascunho atualizado com sucesso",
      });

      setTimeout(() => {
        setAlert(undefined)
      }, 3000);

    }).catch((error: string) => {
      setAlert({
        severity: "error",
        text: `Erro ao atualizar rascunho. ${error}`,
      });

      setTimeout(
        () => setAlert(undefined),
        8000
      );
    })
  }

  return (
    <>
      <Navigator home/>
      <div className="bg-gray-100 w-full my-2">
        <main>
          <Form
            question={question}
            onSubmit={onSubmit}
            onDraftSubmit={onDraftSubmit}
            alert={alert}
          />
        </main>
      </div>
    </>
  )
}
