import React, { FC, PropsWithChildren } from "react";
import { SideBar } from "./SideBar";

interface Props extends PropsWithChildren {

}

export const SelectedQuestionsSideBar: FC<Props> = ({ children }) => {
    return (
        <SideBar>
            <h1>Questões Selecionadas</h1>
            <hr className="h-1 mt-2"/>
            <div>
                {children ??
                    <h2 className="text-gray-700 mt-3">
                        Nenhuma questão selecionada
                    </h2>
                }
            </div>
        </SideBar>
    )
}