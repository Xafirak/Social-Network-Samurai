// @ts-nocheck
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import DialogsContainter from "./components/Dialogs/DialogsContainter";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import Hooks from "./hooks/Hooks";
import Hover from './hooks/Hover';
import List from "./hooks/List";
import Shit from './hooks/Shit';
import AnothaSht from "./hooks/anothaSht";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from './components/Login/Login';

function App() {
    return (
        <div className="app-wrapper">
            <HeaderContainer />
            <NavbarContainer />
            <div className="app-wrapper-content">
                <Routes>                    
                    <Route path="/profile/:userId?" element={<ProfileContainer />} />
                    <Route path="/dialogs" element={<DialogsContainter />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/users" element={ <UsersContainer /> } />
                    <Route path="/login" element={ <Login /> } />
                    {/* <Route path="hooks" element={ <Hooks /> } /> */}
                    {/* <Route path="hover" element={ <Hover /> } /> */}
                    {/* <Route path="list" element={ <List /> } /> */}
                    {/* <Route path="shit" element={ <Shit /> } /> */}
                    {/* <Route path="anothasht" element={ <AnothaSht /> } /> */}
                </Routes>
            </div>
        </div>
    );
}
/// САМОМСТОЯТЕЛЬНО ПИДР СДЕЛАЙ ХОКККУ  HOC  гуглим
export default App;
