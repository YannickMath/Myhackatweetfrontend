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
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  console.log("isSmallScreen value in parent:", isSmallScreen);



  const updateScreenSize = () => {
    const mediaQuery = window.matchMedia("(max-width: 768px) and (orientation: portrait)");
    setIsSmallScreen(mediaQuery.matches);
  };

  useEffect(() => {
    updateScreenSize(); // Call the function once to set the initial value
    window.addEventListener("resize", updateScreenSize); // Listen for window resize events

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return (
    <Provider store={store} >
      <PersistGate persistor={persistor}>
      <Head></Head>
      <Component {...pageProps}  isSmallScreen={isSmallScreen} />
    </PersistGate>
    </Provider>
  );
}
