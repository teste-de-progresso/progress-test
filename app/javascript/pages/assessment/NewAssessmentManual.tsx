import React, { useState } from "react";
import { Navigator } from '../../components';
import { SelectedQuestionsSideBar } from "./components/SelectedQuestionsSideBar";
import { FiltersSideBar } from "./components/FiltersSideBar";
import { BottomBar } from "./components/BottomBar";
import { QuestionArea } from "./components/QuestionArea";

export const NewAssessementManual = () => {
  const [questions, setQuestions] = useState([
    "Question 1", "Question 2", "Question 3", "Question 4",
    "Question 5", "Question 6", "Question 7"])
  const [selectedQuestions, setSelectedQuestions] = useState<{id: string, label: string, removeHandler: Function}[]>([]) 

  const addQuestion = (label: string, removeHandler: Function) => {
    const id: string = label.replace(/\s+/g, '')
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