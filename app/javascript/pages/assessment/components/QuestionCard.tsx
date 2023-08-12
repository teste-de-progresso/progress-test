import React, { FC, useState } from "react";
import { Button, Card } from "../../../components";
import { QuestionCardField } from "./QuestionCardField";

interface Props {
    title: string
    onAddQuestion: Function,
    onRemoveQuestion: Function
}

export const QuestionCard: FC<Props> = ({ title, onAddQuestion, onRemoveQuestion }) => {
    const [collapsed, setCollapsed] = useState(false)
    
    const questionId = title.replace(/\s+/g, '')
    
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
        onRemoveQuestion(questionId)
    }

    const [buttonState, setButtonState] = useState({
        bg: '', label: 'Adicionar', method: handleAddQuestion
    })

    return (
        <div id={questionId}>
            <Card title={title} className="mb-5">
                <div>
                    {!collapsed && <div className="grid grid-cols-2 gap-2">
                        <QuestionCardField label="Grau de Dificuldade" value="Média"/>
                        <QuestionCardField label="Categoria" value="Modelagem"/>
                        <QuestionCardField label="Eixo de Formação" value="Infra Sistemas"/>
                        <QuestionCardField label="Assunto" value="Fisica"/>
                        <QuestionCardField label="Habilidade Cognitiva" value="Compreender"/>
                        <QuestionCardField label="Tipo" value="Resposta Multipla"/>
                        <QuestionCardField label="Autoria" value="UNIFESO" />
                        <QuestionCardField label="Ano" value="2023"/>
                        <div className="col-span-2">
                            <span className="text-gray-700">Enunciado:</span>
                            <div>
                                ijodsjidsoifidfsiojsdfiojdsfiodfs ijdf iodsf iosd iojdf sijodsf iojdsf ioj sdfiojdf sioj dfsiojsdf iojdfs ijodsfijoidfsijodfsijdfsijo dsiofd ijosdfjiofdsidsfio
                            </div>
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