"use client";
import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from "next/app"; 
import { store } from '../redux/store';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
