import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Checkout from './modules/checkout';


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);


const App = () => {
  return (
    <Checkout/>
  );
};

export default App;
