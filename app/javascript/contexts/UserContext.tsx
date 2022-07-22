import React, {
  createContext, useContext, useState, FC
} from "react";
import { useQuery, gql } from "@apollo/client";

import { Query, UserRole } from "../__generated__/graphql-schema";
import { UnauthorizedAccess } from "../pages/session";
import { Loading } from "../pages/shared";

export type UserContext = {
  user?: Query['currentUser']
  refetch: () => void
  isOnlyTeacher: boolean
}

const Context = createContext<UserContext>({
  refetch: () => {
  },
  isOnlyTeacher: false,
})

export const useCurrentUser = (): UserContext => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("You probably forgot to put <UserContext>.");
  }

  return context;
};

const CurrentUserQuery = gql`
    query CurrentUserQuery {
        currentUser {
            id
            name
            email
            roles
        }
    }
`;

type Props = {
  children: any
}

export const UserContext: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<Query['currentUser']>();
  const isOnlyTeacher = !!(user?.roles.includes(UserRole.Teacher) && user?.roles.length === 1)

  const { refetch: refetchUserQuery, loading } = useQuery<Query>(CurrentUserQuery, {
    onCompleted: ({ currentUser }) => {
      setUser(currentUser)
    }
  })

  const refetch = async () => {
    const { data: { currentUser } } = await refetchUserQuery()
    setUser(currentUser)
  }

  if (loading) return <Loading />

  if (!user) return <UnauthorizedAccess />

  return (
    <Context.Provider value={{ user, refetch, isOnlyTeacher }}>
      {children}
    </Context.Provider>
  );
};
