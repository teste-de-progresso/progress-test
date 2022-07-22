import React, { Dispatch, FC, SetStateAction } from 'react'

import { range } from '../../../../utils/math'
import { useFiltersProvider } from './QuestionsFilterProvider'

type Props = {
  register: any
  setChanged: Dispatch<SetStateAction<boolean>>
}

const CURRENT_YEAR = new Date().getFullYear()

const YEARS = range(1900, CURRENT_YEAR + 1).reverse()

export const QuestionsAuthorshipTypeFilter: FC<Props> = ({ register, setChanged }) => {
  const { where } = useFiltersProvider()

  return (
    <div>
      <select
        ref={register}
        className="w-full rounded p-1 border-gray-400 border shadow-sm"
        name="authorshipYear"
        defaultValue={where.authorshipYear ?? ""}
        onClick={() => setChanged(true)}
      >
        <option value="" />
        {YEARS.map((year) => (
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