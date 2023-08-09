import React, { FC, } from "react";

type Props = {
    options: {id: number, label: string,}[]
    label: string
}

export const SelectFilterField: FC<Props> = ({ options, label }) => {
    return (
        <div className="flex flex-col gap-1">
            <span>{label}</span>
            <select className="w-full rounded p-1 border-gray-400 border shadow-sm">
                {
                    options.map(o => <option value={o.id} key={o.id}>{o.label}</option>)
                }
            </select>
        </div>
    )
}