import React, { FC } from "react";
import { Button, Card } from "../../../components";

interface Props {
    title: string
}

export const QuestionCard: FC<Props> = ({ title }) => {
    return (
        <div id={title.replace(/\s+/g, '')}>
            <Card title={title} className="mb-5">
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <span className="text-gray-700">Grau de Dificuldade: </span>
                            <span>Media</span>
                        </div>
                        <div>
                            <span className="text-gray-700">Categoria: </span>
                            <span>Modelagem</span>
                        </div>
                        <div>
                            <span className="text-gray-700">Eixo de Formacao: </span>
                            <span>Infra Sistemas</span>
                        </div>
                        <div>
                            <span className="text-gray-700">Assunto: </span>
                            <span>Fisica</span>
                        </div>
                        <div>
                            <span className="text-gray-700">Habilidade Cogn: </span>
                            <span>Compreender</span>
                        </div>
                        <div>
                            <span className="text-gray-700">Ano: </span>
                            <span>2023</span>
                        </div>
                        <div>
                            <span className="text-gray-700">Autoria: </span>
                            <span>UNIFESO</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-gray-700">Enunciado:</span>
                            <div>
                                ijodsjidsoifidfsiojsdfiojdsfiodfs ijdf iodsf iosd iojdf sijodsf iojdsf ioj sdfiojdf sioj dfsiojsdf iojdfs ijodsfijoidfsijodfsijdfsijo dsiofd ijosdfjiofdsidsfio
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <hr className="h-4"/>
                        <div className="flex justify-end">
                            <Button type="primary">
                                Adicionar
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}