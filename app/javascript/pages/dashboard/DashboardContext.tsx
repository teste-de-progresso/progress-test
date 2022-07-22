import React, {
  createContext,
  useState,
  useMemo,
  FC,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import {QuestionWhereInput} from '../../__generated__/graphql-schema'
import {UserContext, useCurrentUser} from "../../contexts";

type ProviderValue = {
  where: QuestionWhereInput
  setWhere: Dispatch<SetStateAction<QuestionWhereInput>>
}

const DashboardContext = createContext<ProviderValue | null>(null)

export const useDashboardContext = () => {
  const context = useContext(DashboardContext)

  if (context === null) {
    throw new Error('You probably forgot to put <DashboardProvider>.')
  }

  return context
}

export const whereDefaultState = (userContext: UserContext) => (
  userContext.isOnlyTeacher ? {userId: userContext.user?.id} : {}
)

export const DashboardProvider: FC = ({children}) => {
  const userContext = useCurrentUser()
  const [where, setWhere] = useState<QuestionWhereInput>(whereDefaultState(userContext))
  const providerValue = useMemo(() => ({where, setWhere}), [
    where,
    setWhere,
  ])

  return (
    <DashboardContext.Provider value={providerValue}>
      {children}
    </DashboardContext.Provider>
  )
}
