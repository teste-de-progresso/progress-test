import React, { FC } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

type Props = {
  children: React.ReactNode
}

export const ApolloContext: FC<Props> = ({ children }) => {
  const crfsToken = document
    .querySelector("[name='csrf-token']")
    ?.getAttribute('content')

  if (!crfsToken) {
    throw new Error('CSRF token not found')
  }

  const httpLink = createHttpLink({
    uri: '/graphql',
    headers: {
      'X-CSRF-Token': crfsToken,
    }
  })

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    credentials: "same-origin",
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};