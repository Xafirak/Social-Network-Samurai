// @ts-nocheck
import React from "react";
import SamuraiAppJS from "./App";
import { createRoot } from 'react-dom/client';

it ('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<SamuraiAppJS />, div);
    root.unmount();
})

