import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Appbar } from "./components";
import { ApolloContext, UserContext } from "./contexts";
import { PrivateRoutes } from "./routes";
import { store } from "./services/store";

export const App = () => {
  return (
    <ApolloContext>
      <UserContext>
        <Provider store={store}>
          <BrowserRouter>
            <Appbar />
            <PrivateRoutes />
          </BrowserRouter>
        </Provider>
      </UserContext>
    </ApolloContext>
  );
};

const container = document.getElementById("app");

if (container) {
  const root = createRoot(container);

  root.render(<App />);
}
