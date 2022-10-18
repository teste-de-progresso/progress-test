import React from "react";
import { Assessment } from '../mock'

type AssessmentListItemProps = {
    assessment: Assessment;
}

export const AssessmentListItem = ({ assessment }: AssessmentListItemProps) => {
    return (
        <div
            key={`question-${assessment.id}`}
            className="mx-1 sm:mx-0 mb-4 sm:mb-0 border-l-8 border-primary-light flex bg-white hover:bg-unifeso-50 rounded shadow hover:shadow-md cursor-pointer group transition-all duration-500"
        >
            <div
                className="flex flex-col w-full px-3 py-2"
            >
                <h2>
                    {assessment.title}
                </h2>
                <div className="text-sm text-gray-700 flex flex-col flex-wrap justify-between">
                    <span>
                        Gerado em:
                        {" "}
                        {assessment.updatedAt}
                    </span>
                </div>
            </div>
        </div>
    )
}