import React, { FC, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { Query } from "../../../../../__generated__/graphql-schema";
import { useFormProvider } from '../../FormContext'

type Props = {
  subjectId?: string
}

export const SubjectFragment = gql`
  fragment SubjectFields on Question {
    subject {
      id
    }
  }
`

const SUBJECTS_QUERY = gql`
  query SubjectQuery {
    subjects {
      nodes {
        id
        name
        axis {
          name
        }
      }
    }
  }
`

export const SubjectSelect: FC<Props> = () => {
  const { question, hooks: { register } } = useFormProvider()
  const [selectedId, setSelectedId] = useState(question?.subject?.id);

  const { loading, data } = useQuery<Query>(SUBJECTS_QUERY);

  if (loading) return null;

  const subjects = data?.subjects.nodes

  const selectedSubject = data?.subjects.nodes?.find((subject) => subject?.id === selectedId);

  return (
    <div className="flex flex-col h-full">
      <div>
        <h2>Assunto</h2>
        <select
          {...register('subjectId')}
          className="w-full rounded p-1 border-gray-400 border shadow-sm"
          defaultValue={question?.subject?.id ?? ""}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="" />
          {subjects?.map((subject) => (
            <option
              key={`${subject?.name}-${subject?.id}`}
              value={subject?.id}
            >
              {subject?.name}
            </option>
          ))}
        </select>
      </div>

      <span className="mt-4">
        Eixo de Formação
        <input
          className="block rounded p-1 w-full border-gray-400 border shadow-sm"
          disabled
          value={selectedSubject?.axis.name}
        />
      </span>
    </div>
  );
};
