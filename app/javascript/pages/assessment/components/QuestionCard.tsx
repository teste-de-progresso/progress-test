import React, { FC, useState } from "react";
import { Button, Card } from "../../../components";
import { QuestionCardField } from "./QuestionCardField";
import { Question } from "../../../__generated__/graphql-schema";
import { NodeId } from "../../../utils/graphql";
import { BLOOM_TAXONOMY, CHECK_TYPE, DIFFICULTY } from "../../../utils/types";

interface Props {
    question: Question
    onAddQuestion: Function,
    onRemoveQuestion: Function
}

export const QuestionCard: FC<Props> = ({ question, onAddQuestion, onRemoveQuestion }) => {
    const [collapsed, setCollapsed] = useState(false)
    
    const title = `Questão ${NodeId.decode(question.id).id}`
    const htmlId = title.replace(/\s+/g, '_')
    const difficulty = DIFFICULTY.find(item => item.value === question.difficulty)?.label
    const bloomTaxonomy = BLOOM_TAXONOMY.find(item => item.value === question.bloomTaxonomy)?.label
    const checkType = CHECK_TYPE.find(item => item.value === question.checkType)?.label

    const handleAddQuestion = () => {
        setButtonState({
            bg: 'bg-red-700', label: 'Remover', method: handleRemoveQuestion
        })
        onAddQuestion(title, handleRemoveQuestion)
    }
    
    const handleRemoveQuestion = () => {
        setButtonState({
            bg: '', label: 'Adicionar', method: handleAddQuestion
        })
        onRemoveQuestion(htmlId)
    }

    const [buttonState, setButtonState] = useState({
        bg: '', label: 'Adicionar', method: handleAddQuestion
    })

    return (
        <div id={htmlId}>
            <Card title={title} className="mb-5">
                <div>
                    {!collapsed && <div className="grid grid-cols-2 gap-2">
                        <QuestionCardField label="Grau de Dificuldade" value={difficulty}/>
                        <QuestionCardField label="Eixo de Formação" value={question.subject?.axis.name}/>
                        <QuestionCardField label="Assunto" value={question.subject?.name}/>
                        <QuestionCardField label="Habilidade Cognitiva" value={bloomTaxonomy}/>
                        <QuestionCardField label="Tipo" value={checkType}/>
                        <QuestionCardField label="Autoria" value={question.authorship} />
                        <QuestionCardField label="Ano" value={question.authorshipYear}/>
                        <div className="col-span-2">
                            <span className="text-gray-700">Enunciado:</span>
                            <div dangerouslySetInnerHTML={{__html: question.body ?? ''}}></div>
                        </div>
                    </div>}
                    <div className="mt-6">
                        <hr className="h-4"/>
                        <div className="flex justify-between w-full">
                            <Button type="default" onClick={() => setCollapsed(!collapsed)}>
                                {collapsed ? 'Mostrar Mais' : 'Mostrar Menos'}
                            </Button>
                            <Button type="primary" className={buttonState.bg}
                                onClick={buttonState.method}>
                                {buttonState.label}
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}