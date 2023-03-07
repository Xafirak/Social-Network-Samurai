import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SamuraiAppJS from './App';


// добавляем '!', чтобы сказать ТСу, что значение никогда не будет null
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(<SamuraiAppJS />);

