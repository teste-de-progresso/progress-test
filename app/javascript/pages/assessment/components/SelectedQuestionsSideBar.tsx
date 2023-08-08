import React, { FC, PropsWithChildren } from "react";
import { SideBar } from "./SideBar";
import { SelectedQuestionCard } from "./SelectedQuestionCard";

type Props = {
    questions: {id: string, label: string}[],
    onRemoveQuestion: Function
}

export const SelectedQuestionsSideBar: FC<Props> = ({ questions, onRemoveQuestion }) => {
    return (
        <SideBar>
            <h1>Questões Selecionadas</h1>
            <hr className="h-1 mt-2"/>
            <div>
                {questions.length ?
                    questions.map(q => <SelectedQuestionCard
                            key={q.id} id={q.id} label={q.label}
                            onRemoveQuestion={onRemoveQuestion}/>) :
                    <h2 className="text-gray-700 mt-3">
                        Nenhuma questão selecionada
                    </h2>
                }
            </div>
        </SideBar>
    )
}