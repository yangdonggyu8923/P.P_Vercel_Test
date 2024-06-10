import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userReducer from "@/app/components/user/service/user-slice"
import lawyerReducer from "@/app/components/lawyer/service/lawyer-slice"


const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const lawyerPersistConfig = {
  key: "lawyer",
  storage,
  whitelist: ["lawyerState"],
};
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["userState"],
};



const persistedLawyerReducer = persistReducer(lawyerPersistConfig, lawyerReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer)

export const rootReducer = combineReducers({  // combineReducers({})는 키(상태)를 합치는 것
  lawyer: persistedLawyerReducer,               // count, article, user
  user: persistedUserReducer,
});