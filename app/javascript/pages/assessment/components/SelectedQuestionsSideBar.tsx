import React, { FC, } from "react";
import { SideBar } from "./SideBar";
import { SelectedQuestionCard } from "./SelectedQuestionCard";

type Props = {
    questions: {
        id: string, label: string, removeHandler: Function
    }[]
}

export const SelectedQuestionsSideBar: FC<Props> = ({ questions }) => {
    return (
        <SideBar header="Questões Selecionadas">
            <div>
                {questions.length ?
                    questions.map(q => <SelectedQuestionCard
                            key={q.id} id={q.id} label={q.label}
                            onRemoveQuestion={q.removeHandler}/>) :
                    <h2 className="text-gray-700 mt-3">
                        Nenhuma questão selecionada
                    </h2>
                }
            </div>
        </SideBar>
    )
}