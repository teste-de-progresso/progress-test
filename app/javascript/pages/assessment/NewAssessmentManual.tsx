import React, { useState } from "react";
import { Navigator } from '../../components';
import { SelectedQuestionsSideBar } from "./components/SelectedQuestionsSideBar";
import { FiltersSideBar } from "./components/FiltersSideBar";
import { BottomBar } from "./components/BottomBar";
import { QuestionArea } from "./components/QuestionArea";
import { gql, useQuery } from "@apollo/client";
import { Query, Question } from "../../__generated__/graphql-schema";

const QuestionFragments = gql`
  fragment QuestionFields on Question {
    id
    authorship
    authorshipYear
    bloomTaxonomy
    body
    checkType
    difficulty
    status
    subject {
      axis {
        name
      }
      name
    }
  }
`

const QUESTIONS_QUERY = gql`
  ${QuestionFragments}
  query {
    questions {
      nodes {
        ...QuestionFields
      }
    }
  }
`

export const NewAssessementManual = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedQuestions, setSelectedQuestions] = useState<{id: string, label: string, removeHandler: Function}[]>([]) 

  useQuery<Query>(QUESTIONS_QUERY, {
    onCompleted: (response) => {
      const { questions: questionConnection } = response
      setQuestions(questionConnection.nodes as Question[])
    },
    fetchPolicy: "network-only"
  })

  const addQuestion = (label: string, removeHandler: Function) => {
    const id: string = label.replace(/\s+/g, '_')
    if (!selectedQuestions.find(q => q.id === id)) {
      setSelectedQuestions(q => [...q, { id, label, removeHandler }])
    }
  }

  const removeQuestion = (id: string) => {
    setSelectedQuestions(q => q.filter(i => i.id !== id))
  }

  const clearSelectedQuestions = () => {
    setSelectedQuestions([])
  }

  return (
    <>
        <Navigator home />
        <BottomBar/>
        <div className="grid grid-cols-5 gap-4 mt-4 mx-4 pb-20">
          <FiltersSideBar/>
          <QuestionArea questions={questions}
            onAddQuestion={addQuestion} onRemoveQuestion={removeQuestion}/>
          <SelectedQuestionsSideBar
            questions={selectedQuestions}
            onClearSelectedQuestions={clearSelectedQuestions}
            />
        </div>
    </>
  )
}