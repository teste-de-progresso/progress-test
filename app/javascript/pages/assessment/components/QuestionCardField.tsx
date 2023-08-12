import React, { FC } from "react";

interface Props {
    label: string,
    value: string
}

export const QuestionCardField: FC<Props> = ({ label, value }) => {
    return (
        <div>
            <span className="text-gray-700">{`${label}: `}</span>
            <span>{value}</span>
        </div>    
    )
}