// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/reduxStore';
import { Provider } from 'react-redux';
import SamuraiAppJS from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<SamuraiAppJS />);
