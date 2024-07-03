import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../features/Notifcations/NotificationSlice";
import authReducer from "../features/Auth/AuthSlice";
import queryParamsReducer from "../features/QueryParams/QueryParamsSlice";
import departmentsReducer from "../features/Departments/DepartmentsSlice"

export const store = configureStore({
  reducer: {
    notificaton: notificationReducer,
    auth: authReducer,
    queryParams: queryParamsReducer,
    departments:departmentsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
