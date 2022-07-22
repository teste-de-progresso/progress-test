import { gql, useQuery } from "@apollo/client";
import React, { createContext, FC, useContext } from "react";

import { UnauthorizedAccess } from "../pages/session";
import { Loading } from "../pages/shared";
import { Query, UserRole } from "../__generated__/graphql-schema";

export type UserContext = {
  user?: Query["currentUser"];
  isOnlyTeacher: boolean;
};

const Context = createContext<UserContext>({
  isOnlyTeacher: false,
});

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
      avatarUrl
    }
  }
`;

type Props = {
  children: any;
};

export const UserContext: FC<Props> = ({ children }) => {
  const { loading, data } = useQuery<Query>(CurrentUserQuery);
  const user = data?.currentUser;
  const isOnlyTeacher = !!(
    user?.roles.includes(UserRole.Teacher) && user?.roles.length === 1
  );

  if (loading) return <Loading />;
  if (!user?.roles.length) return <UnauthorizedAccess />;

  return (
    <Context.Provider value={{ user, isOnlyTeacher }}>
      {children}
    </Context.Provider>
  );
};
