import { gql } from "@apollo/client";
import React, { FC } from "react";
import { Controller } from "react-hook-form";

import { Card } from "../../../../components/Card/Card";
import { TextEditor } from "../components/TextEditor";
import { useFormProvider } from '../FormContext'

export const AnswerFragment = gql`
  fragment AnswerFields on Question {
    alternatives {
      correct
      text
    }
    explanation
    references
  }
`

export const AnswerFormStep: FC = () => {
  const { question, hooks: { control } } = useFormProvider()

  const alternativesMaped = question?.alternatives || [
    { text: "", correct: true },
  ];

  const correctAlternative = alternativesMaped.find(
    (alternative) => alternative.correct === true,
  );

  return (
    <>
      <Card title="Resposta Correta" className="mb-3">
        <div className="flex flex-col">
          <div className="w-full">
            <TextEditor
              name={`alternatives[0].text`}
              defaultValue={correctAlternative?.text ?? ''}
            />
            <Controller
              name={`alternatives[0].correct`}
              control={control}
              defaultValue={true}
              render={() => (<></>)}
            />
          </div>
          <div className="flex flex-col w-full border border-gray-300 rounded p-4 mt-4 shadow-sm">
            <div>
              <h2 className="text-xl font-medium">Explicação</h2>
              <TextEditor name="explanation" defaultValue={question?.explanation ?? ''} />
            </div>
            <div>
              <h2 className="text-xl font-medium">Referências</h2>
              <TextEditor defaultValue={question?.references ?? ''} name="references" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
