import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { gql } from "@apollo/client";

import { Card } from "../../../../components";
import { TextEditor } from "../components/TextEditor";
import { useFormProvider } from '../FormContext'

export const DistractorsFragment = gql`
  fragment DistractorsFields on Question {
    alternatives {
      correct
      text
    }
  }
`

export const DistractorsFormStep: FC = () => {
  const { question, hooks: { control } } = useFormProvider()

  const incorrectAnswers = question?.alternatives?.filter(
    (alternative) => alternative.correct === false,
  ) || [
      { text: "", correct: false },
      { text: "", correct: false },
      { text: "", correct: false },
      { text: "", correct: false },
    ];

  return (
    <>
      <Card title="Distratores">
        <div className="flex flex-col">
          <div className="">
            {incorrectAnswers.map(({ text }, index) => (
              <div className="w-full mb-3" key={index}>
                <TextEditor
                  name={`alternatives[${index + 1}].text`}
                  defaultValue={text ?? ""}
                />
                <Controller
                  name={`alternatives[${index + 1}].correct`}
                  control={control}
                  defaultValue={false}
                  render={() => (<></>)}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
};
