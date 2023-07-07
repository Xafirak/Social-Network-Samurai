import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { HeaderContainerFunctional } from './components/Header/HeaderContainer';
import { LoginPage } from './components/Login/Login';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/preloader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { AppStateType } from './redux/reduxStore';
import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import ErrorCatch from './ErrorCatch';
import { UsersPage } from './components/Users/UsersContainer';
import { Grid, StyledEngineProvider } from '@mui/material';
import { Footer } from './components/Footer/Footer';
import ChatPage from './pages/chat/ChatPage';
import Page404 from './components/page404/Page404';
import Navbar from './components/Navbar/Navbar';




type mapAppPropsType = ReturnType<typeof MapStateToProps>

type dispatchAppPropsType = {
    initializeApp: () => void
}
/// Косяки
// ProfileDataForm
// TextInputWithButton

class App extends Component<mapAppPropsType & dispatchAppPropsType> {

    // promiseRejectionEvent - хз какой тип ставить
    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
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
            <Grid className="app-wrapper">

                <HeaderContainerFunctional />
                <Navbar />
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
                                        <Dialogs />
                                    </Suspense>
                                }
                            />
                            <Route path="/news" element={<News />} />
                            <Route path="/music" element={<Music />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/users" element={<UsersPage pageTitle={'Самураи!'} />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/chat" element={
                                <Suspense fallback={<Preloader />}>
                                    <ChatPage />
                                </Suspense>
                            } />
                            <Route
                                path="*"
                                element={<Page404 />}
                            />
                        </Routes>
                    </ErrorCatch>
                </div>
                <Footer />
            </Grid>
        );
    }
}

const Dialogs = React.lazy(() =>
    import('./components/Dialogs/Dialogs')
);
const ProfileFUNC = React.lazy(() =>
    import('./components/Profile/ProfileFUNC')

        .then(({ ProfileFUNC }) => ({ default: ProfileFUNC })),
);



export type routerPropsType = {
    props: any
    router: {
        location: () => void
        navigate: () => void
        params: {
            userId: number | null
        }
    }

}

let withRouter = (Comp: React.FC) => {
    function ComponentWithRouterProp(props: routerPropsType) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        //@ts-ignore
        return <Comp {...props} router={{ location, navigate, params }} />;
    }
    return ComponentWithRouterProp;
};



const MapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(MapStateToProps, { initializeApp })
)(App);



const SamuraiAppJS: React.FC = () => {
    return (
        <BrowserRouter basename="/">
            <StyledEngineProvider injectFirst>
                <Provider store={store}>
                    <AppContainer />
                </Provider>
            </StyledEngineProvider>
        </BrowserRouter>
    );
};

export default SamuraiAppJS;