import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { NavbarContainer } from './components/Navbar/NavbarContainer';
import Hooks from './hooks(not part of project)/Hooks';
import Hover from './hooks(not part of project)/Hover';
import List from './hooks(not part of project)/List';
import Shit from './hooks(not part of project)/Shit';
import AnothaSht from './hooks(not part of project)/anothaSht';
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
import { Button, Grid, StyledEngineProvider } from '@mui/material';
import { Footer } from './components/Footer/Footer';






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
                            <Route path="/users" element={<UsersPage pageTitle={'Самураи!'} />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="*"
                                element={<div>
                                    404 NOT FOUND xD
                                    <Button variant="contained" color='error'> OK</Button>
                                </div>}
                            />
                            {/* <Route path="hooks" element={ <Hooks /> } /> */}
                            {/* <Route path="hover" element={ <Hover /> } /> */}
                            {/* <Route path="list" element={ <List /> } /> */}
                            {/* <Route path="shit" element={ <Shit /> } /> */}
                            {/* <Route path="anothasht" element={ <AnothaSht /> } /> */}
                        </Routes>
                    </ErrorCatch>
                </div>
                <Footer />                   
            </Grid>
        );
    }
}

const DialogsContainter = React.lazy(() =>
    import('./components/Dialogs/DialogsContainter')
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