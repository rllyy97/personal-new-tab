import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { reducer as appStatusReducer } from "./appStatus/slice"
import { reducer as linksReducer } from "./links/slice"
import { reducer as modalsReducer } from "./modals/slice"
import { reducer as authReducter } from "./auth/slice"

const reducer = combineReducers({
  appStatus: appStatusReducer,
  links: linksReducer,
  modals: modalsReducer,
  auth: authReducter,
})

export const store = configureStore({
  reducer,
  devTools: true,
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch