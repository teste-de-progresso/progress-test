import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Axis, Query } from "../../__generated__/graphql-schema";
import { Button, Card, Input, Navigator } from '../../components';
import { SideBar } from "./components/SideBar";
import { QuestionCard } from "./components/QuestionCard";
import { Link } from "react-router-dom";
import { SelectedQuestionsSideBar } from "./components/SelectedQuestionsSideBar";
import { FiltersSideBar } from "./components/FiltersSideBar";
import { BottomBar } from "./components/BottomBar";

type NewAssessementManualForm = {
  axisWeights: Record<string, any>
}

const NEW_ASSESSEMENT_DATA_QUERY = gql`
  query NewAssessementDataQuery {
    axes {
      nodes {
        id
        name
      }
    }
  }
`

export const NewAssessementManual = () => {
  const { data } = useQuery<Query>(NEW_ASSESSEMENT_DATA_QUERY)
  const axes = data?.axes.nodes

  const [questions, setQuestions] = useState<{id: string, label: string, removeHandler: Function}[]>([])

  const [subjectsIds, setSubjectsIds] = useState<string[]>([])
  const { register, control, watch } = useForm<NewAssessementManualForm>({
    mode: 'onBlur'
  })
  

  const addAxisForm = useForm<{ axisId: string }>()
  
  const handleAddAxis = (formData: { axisId: string }) => {
    setSubjectsIds(prev => [...prev, formData.axisId])
    addAxisForm.reset();
  }

  const handleRemoveAxis = (axisId: string) => {
    setSubjectsIds(prev => prev.filter((axis => axis !== axisId)))
  }

  if (!axes?.length) return null

  const notSelectedAxis: Axis[] = axes.filter((axis) => !subjectsIds.includes(axis.id))
  const selectedAxis: Axis[] = axes.filter((axis) => subjectsIds.includes(axis.id))

  const addQuestion = (label: string, removeHandler: Function) => {
    const id: string = label.replace(/\s+/g, '')
    if (!questions.find(q => q.id === id)) {
      setQuestions(q => [...q, { id, label, removeHandler }])
    }
  }

  const removeQuestion = (id: string) => {
    setQuestions(q => q.filter(i => i.id !== id))
  }

  return (
    <>
        <Navigator home />
        <BottomBar/>
        <div className="grid grid-cols-5 gap-4 mt-4 mx-4 pb-20">
          <FiltersSideBar/>
          <div className="col-span-3 border-l-2 border-r-2 border-gray-300 px-6 pb-10">
            <QuestionCard title="Question 1"
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}/>
            <QuestionCard title="Question 2"
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}/>
            <QuestionCard title="Question 3"
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}/>
            <QuestionCard title="Question 4"
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}/>
            <QuestionCard title="Question 5"
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}/>
            <QuestionCard title="Question 6"
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}/>
            <QuestionCard title="Question 7"
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}/>
          </div>
          <SelectedQuestionsSideBar questions={questions}/>
        </div>
    </>
  )
}