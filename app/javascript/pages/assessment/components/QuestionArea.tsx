import React, { FC } from "react";
import { QuestionCard } from "./QuestionCard";
import { Question } from "../../../__generated__/graphql-schema";

interface Props {
    questions: Question[]
    onAddQuestion: Function,
    onRemoveQuestion: Function
}

export const QuestionArea: FC<Props> = ({ questions, onAddQuestion, onRemoveQuestion }) => {
    return (
        <div className="col-span-3 border-l-2 border-r-2 border-gray-300 px-6">
            {questions.map(question => 
                <QuestionCard key={question.id} question={question}
                    onAddQuestion={onAddQuestion}
                    onRemoveQuestion={onRemoveQuestion}/>)}
          </div>
    )
}