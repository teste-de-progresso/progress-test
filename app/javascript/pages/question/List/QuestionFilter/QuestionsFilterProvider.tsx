import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

import { Query, QuestionWhereInput } from '../../../../__generated__/graphql-schema'

type ProviderValue = {
  where: QuestionWhereInput
  setWhere: Dispatch<SetStateAction<QuestionWhereInput>>
  questionFilterOptions?: Query['questionFilterOptions']
}

const FiltersContext = createContext<ProviderValue | null>(null)

export const useFiltersProvider = () => {
  const context = useContext(FiltersContext)

  if (context === null) {
    throw new Error('You probably forgot to put <FiltersProvider>.')
  }

  return context
}

type FiltersProviderProps = {
  children: React.ReactNode
  questionFilterOptions?: Query['questionFilterOptions']
}

export const FiltersProvider = ({ children, questionFilterOptions }: FiltersProviderProps) => {
  const [where, setWhere] = useState<QuestionWhereInput>({})

  const providerValue = useMemo(() => ({ where, setWhere, questionFilterOptions }), [
    where,
    setWhere,
    questionFilterOptions,
  ])

  return (
    <FiltersContext.Provider value={providerValue}>
      {children}
    </FiltersContext.Provider>
  )
}
