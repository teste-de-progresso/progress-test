import React, {FC, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import {MdDeleteForever, MdEdit, MdSave} from "react-icons/md";
import {useQuery, useMutation, gql} from "@apollo/client";

import {ViewMode, ViewModeFragments, ReviewMessages, ReviewMessagesFragments} from "../shared";
import {Navigator, Dialog} from "../../../components";
import {Mutation, Query, Question, QuestionStatus} from "../../../__generated__/graphql-schema";
import {AlertV2Props, AlertV2} from "../../../components/AlertV2";
import {NodeId} from "../../../utils/graphql";
import {QuestionRoutePaths} from "../../../routes";

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

const FINISH_QUESTION = gql`
    mutation FinishQuestion($id: ID!) {
        finishQuestion (
            input: {
                questionId: $id
            }
        ) {
            question {
                id
                status
            }
            errors
        }
    }
`

const DESTROY_QUESTION = gql`
    mutation DestroyQuestion($id: ID!) {
        destroyQuestion(
            input: {
                questionId: $id
            }
        ) {
            deletedQuestionId
            errors
        }
    }
`

export const Show: FC = () => {
  const history = useHistory();
  const {id} = useParams<{ id: string }>();
  const [confirmRegister, setConfirmRegister] = useState(false)
  const [confirmDestroy, setConfirmDestroy] = useState(false)
  const [alert, setAlert] = useState<AlertV2Props>()
  const [finishQuestion] = useMutation<Mutation>(FINISH_QUESTION)
  const [destroyQuestion] = useMutation<Mutation>(DESTROY_QUESTION)
  const {loading, data, refetch} = useQuery<Query>(GET_QUESTION, {
    variables: {
      id,
    },
    fetchPolicy: "network-only",
  });
  const question = data?.node as Question | null

  if (loading || !question) return null;

  const recordId = NodeId.decode(question.id).id

  const confirmEditQuestion = () => {
    history.push(`/questions/${id}/edit`);
  };

  const handleEditQuestion = () => {
    confirmEditQuestion()
  };

  const handleRegisterQuestion = async () => {
    try {
      await finishQuestion({variables: {id: recordId}})

      setAlert({
        text: 'Questão registrada com sucesso!',
        severity: 'success',
      })
    } catch(error){
        setAlert({
          text: 'Algo inesperado aconteceu ao tentar registrar a questão.',
          severity: 'error',
        })
    }
    setConfirmRegister(false)
  };

  const handleDestroyQuestion = async () => {
    const {data: questionDestroyData } = await destroyQuestion({variables: {id: recordId}})

    if (questionDestroyData?.destroyQuestion?.deletedQuestionId) {
      history.push(QuestionRoutePaths.index)
    } else {
      setAlert({
        text: 'Algo inesperado aconteceu ao tentar excluir a questão.',
        severity: 'error',
      })
      setConfirmDestroy(false)
    }
  };

  const ACTIONS = {
    edit: {
      icon: <MdEdit className="my-auto"/>,
      label: "Editar",
      action: handleEditQuestion,
    },
    register: {
      icon: <MdSave className="my-auto"/>,
      label: "Registrar",
      action: () => setConfirmRegister(true),
    },
    destroy: {
      icon: <MdDeleteForever className="my-auto"/>,
      label: 'Excluir',
      action: () => setConfirmDestroy(true),
    }
  }

  const options = (() => {
    switch (question.status) {
      case QuestionStatus.Registered:
        return ([]);
      case QuestionStatus.Approved:
        return ([ACTIONS.edit, ACTIONS.register, ACTIONS.destroy])
      default:
        return ([ACTIONS.edit, ACTIONS.destroy])
    }
  })()

  return (
    <>
      <Dialog
        isOpen={confirmDestroy}
        setIsOpen={(value) => setConfirmDestroy(value)}
        title="Confirmação de Exclusão"
        text="Após a exclusão, a questão não poderá ser recuperada. Deseja continuar?"
        onConfirmation={handleDestroyQuestion}
      />
      <Dialog
        isOpen={confirmRegister}
        setIsOpen={(value) => setConfirmRegister(value)}
        title="Confirmação de Registro"
        text="Após o registro, a questão estará disponível para uso e não poderá mais ser editada ou excluída. Deseja continuar?"
        onConfirmation={handleRegisterQuestion}
      />
      <Navigator home>
        {options.map((option, index) => (
          <div key={`navigation-item-${index}`} className={`hover:text-white ${index === 0 ? "ml-auto" : ""}`}>
            <button onClick={option.action} className="flex pl-4">
              {option.icon}
              <span className="pl-2">{option.label}</span>
            </button>
          </div>
        ))}
      </Navigator>
      <div className="bg-gray-100 w-full my-2">
        <main className="max-w-screen-xl m-auto">
          <div className="flex">
            {alert && <AlertV2 severity={alert.severity} text={alert.text}/>}
          </div>
          <div className="flex px-5">
            <div className="w-3/5">
              <ViewMode questionData={question}/>
            </div>
            <div className="w-2/5 ml-3">
              <ReviewMessages question={question} refetch={refetch}/>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
