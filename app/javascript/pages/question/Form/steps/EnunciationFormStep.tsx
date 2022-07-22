import { gql } from "@apollo/client";
import React, { FC } from "react";

import { Card } from "../../../../components";
import { TextEditor } from '../components/TextEditor'
import { useFormProvider } from '../FormContext'

export const EnunciationFragment = gql`
  fragment EnunciationFields on Question {
    instruction
    support
    body
  }
`

export const EnunciationFormStep: FC = () => {
  const { question } = useFormProvider()

  return (
    <>
      <Card className="h-full mb-3" title="Instrução (opcional)">
        <TextEditor name="instruction" defaultValue={question?.instruction ?? ""} />
      </Card>
      <Card className="h-full mb-3" title="Suporte (opcional)">
        <TextEditor name="support" defaultValue={question?.support ?? ""} />
      </Card>
      <Card className="h-full mb-3" title="Enunciado">
        <TextEditor name="body" defaultValue={question?.body ?? ""} />
      </Card>
    </>
  );
};
