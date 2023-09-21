import React, { FC, } from "react";

type Props = {
    label: string
}

export const RangeFilterField: FC<Props> = ({ label }) => {
    return (
        <div className="flex flex-col gap-1">
            <span>{label}</span>
            <div className="flex gap-3 w-full">
                <div className="flex w-1/2 gap-1 justify-center items-center">
                    <span>Início</span>
                    <input type="number" className="block rounded p-1 w-16 border-gray-400 border shadow-sm"/>
                </div>
                <div className="flex w-1/2 gap-1 justify-center items-center">
                    <span>Fim</span>
                    <input type="number" className="block rounded p-1 w-16 border-gray-400 border shadow-sm"/>
                </div>
            </div>
        </div>
    )
}