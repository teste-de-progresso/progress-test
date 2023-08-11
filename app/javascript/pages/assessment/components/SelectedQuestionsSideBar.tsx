import React, { FC, } from "react";
import { SideBar } from "./SideBar";
import { SelectedQuestionCard } from "./SelectedQuestionCard";
import { Button } from "../../../components";

type Props = {
    questions: {
        id: string, label: string, removeHandler: Function
    }[]
    onClearSelectedQuestions: Function
}

export const SelectedQuestionsSideBar: FC<Props> = ({ questions, onClearSelectedQuestions }) => {
    return (
        <SideBar header="Questões Selecionadas">
            <div>
                {questions.length ?
                    <>
                        <div>
                            {questions.map(q => <SelectedQuestionCard
                                key={q.id} id={q.id} label={q.label}
                                onRemoveQuestion={q.removeHandler}/>)}
                        </div>
                        <div className="flex justify-center mt-6">
                            <Button type="primary" onClick={() => onClearSelectedQuestions()}>
                                Limpar Seleção
                            </Button>
                        </div>
                    </> :
                        <h2 className="text-gray-700 mt-3">
                            Nenhuma questão selecionada
                        </h2>
                }
            </div>
        </SideBar>
    )
}