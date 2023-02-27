// @ts-nocheck
import React, { Component } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import NavbarContainer from './components/Navbar/NavbarContainer';

// import DialogsContainter from './components/Dialogs/DialogsContainter';
// import ProfileContainer from './components/Profile/ProfileContainer';

import UsersContainer from './components/Users/UsersContainer';
import Hooks from './hooks/Hooks';
import Hover from './hooks/Hover';
import List from './hooks/List';
import Shit from './hooks/Shit';
import AnothaSht from './hooks/anothaSht';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/preloader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/reduxStore';
import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import ErrorCatch from './ErrorCatch';

class App extends Component {


    // поставил встроенный механизм, на роуты - предохранитель(Error Boundaries) 
    // ErrorCatch, но не знаю как получить ошибку, чтобы проверить работоспособность
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert('Error happens');
        console.error(promiseRejectionEvent);
    };
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandled', this.catchAllUnhandledErrors);
    }
    componentWillUnmount() {
        window.removeEventListener('unhandled', this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) return <Preloader />;

        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <NavbarContainer />
                <div className="app-wrapper-content">
                    <ErrorCatch>
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/profile" />}
                            />
                            <Route
                                path="/profile/:userId?"
                                element={
                                    <Suspense fallback={<Preloader />}>
                                        <ProfileFUNC />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/dialogs"
                                element={
                                    <Suspense fallback={<Preloader />}>
                                        <DialogsContainter />
                                    </Suspense>
                                }
                            />
                            <Route path="/news" element={<News />} />
                            <Route path="/music" element={<Music />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/users" element={<UsersContainer pageTitle={'Самураи'} />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="*"
                                element={<div>404 NOT FOUND xD</div>}
                            />
                            {/* <Route path="hooks" element={ <Hooks /> } /> */}
                            {/* <Route path="hover" element={ <Hover /> } /> */}
                            {/* <Route path="list" element={ <List /> } /> */}
                            {/* <Route path="shit" element={ <Shit /> } /> */}
                            {/* <Route path="anothasht" element={ <AnothaSht /> } /> */}
                        </Routes>
                    </ErrorCatch>
                </div>
            </div>
        );
    }
}

const DialogsContainter = React.lazy(() =>
    import('./components/Dialogs/DialogsContainter')
);
const ProfileFUNC = React.lazy(() =>
    import('./components/Profile/ProfileFUNC')
);

let withRouter = (Comp) => {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Comp {...props} router={{ location, navigate, params }} />;
    }
    return ComponentWithRouterProp;
};

const MapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

let AppContainer = compose(
    withRouter,
    connect(MapStateToProps, { initializeApp })
)(App);

const SamuraiAppJS = (props) => {
    return (
        <BrowserRouter basename="/">
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default SamuraiAppJS;
