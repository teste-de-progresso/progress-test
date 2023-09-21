import React, { FC } from "react";
import { Maybe } from "../../../__generated__/graphql-schema";

interface Props {
    label: string,
    value?: Maybe<string>
}

export const QuestionCardField: FC<Props> = ({ label, value }) => {
    return (
        <div>
            <span className="text-gray-700">{`${label}: `}</span>
            <span>{value ?? ''}</span>
        </div>    
    )
}