import { combineReducers, createStore } from "redux";

import { reducer as unsavedChanges } from "./unsavedChanges/reducer";

const rootReducer = combineReducers({
  unsavedChanges,
});

export type RootState = ReturnType<typeof store.getState>;

export const store = createStore(rootReducer);
