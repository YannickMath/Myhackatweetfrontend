import "../styles/globals.css";
import { useState } from "react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Head from "next/head";
import tweet from "../reducers/tweet.slice";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import user from"../reducers/user.slice";


const reducers = combineReducers({ tweet, user });
const persistConfig = { key: "hackatweet", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);



export default function App({ Component, pageProps}) {
 
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor}>
      <Head></Head>
      <Component {...pageProps}   />
    </PersistGate>
    </Provider>
  );
}
