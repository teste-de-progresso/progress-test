import React, { Dispatch, FC, SetStateAction } from 'react'

import { range } from '../../../../utils/math'
import { useFiltersProvider } from './QuestionsFilterProvider'

type Props = {
  register: any
  setChanged: Dispatch<SetStateAction<boolean>>
}

const CURRENT_YEAR = new Date().getFullYear()

const YEARS = range(1900, CURRENT_YEAR + 1).reverse().map(toString)

export const QuestionsAuthorshipTypeFilter: FC<Props> = ({ register, setChanged }) => {
  const { where, questionFilterOptions } = useFiltersProvider()

  const yearOptions = questionFilterOptions?.years ?? YEARS

  return (
    <div>
      <select
        {...register('authorshipYear')}
        className="w-full rounded p-1 border-gray-400 border shadow-sm"
        defaultValue={where.authorshipYear ?? ""}
        onClick={() => setChanged(true)}
      >
        <option value="" />
        {yearOptions.map((year) => (
          <option
            key={`questionYear-${year}`}
            value={year}
          >
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}