import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer } from "./root-reducer";

/**
 * @description 配置 redux store
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

/**
 * @description 导出 store 的类型
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * @description 导出 dispatch 的类型
 */
export type AppDispatch = typeof store.dispatch;

/**
 * @description useSelector 的类型
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * @description  useDispatch 的类型
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
