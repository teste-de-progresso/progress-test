import React, { Dispatch, FC, SetStateAction } from 'react'
import { gql, useQuery } from '@apollo/client'

import { Query } from '../../../../__generated__/graphql-schema'
import { useFiltersProvider } from './QuestionsFilterProvider'

const SUBJECTS_QUERY = gql`
  query {
    subjects {
      nodes {
        id
        name
      }
    }
  }
`

type Props = {
  register: any
  setChanged: Dispatch<SetStateAction<boolean>>
}

export const QuestionsSubjectFilter: FC<Props> = ({ register, setChanged }) => {
  const { where } = useFiltersProvider();
  const { loading, data } = useQuery<Query>(SUBJECTS_QUERY)

  if (loading) return null

  const subjects = data?.subjects.nodes

  return (
    <div>
      <select
        {...register('subjectId')}
        className="w-full rounded p-1 border-gray-400 border shadow-sm"
        defaultValue={where.subjectId ?? ""}
        onClick={() => setChanged(true)}
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
  )
}