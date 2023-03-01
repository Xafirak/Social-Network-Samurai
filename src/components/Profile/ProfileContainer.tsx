
import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatus, showProfile, savePhoto } from '../../redux/profileReducer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { updateStatus, addActionCreator, saveProfile } from './../../redux/profileReducer';
import { Navigate } from 'react-router-dom';
import Preloader from '../common/Preloader/preloader';
import { AppStateType } from '../../redux/reduxStore';
import { profileType } from '../../types/types';







// Не используется! Переписал это классовую компоненту 
// в функциональную ProfileFUNC












class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    refreshProfile() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) return;
        }
        //////////////////попробовать переписать в классовую компоненту
        /// при загрузке авы - страница падает, найти ошибку
        // возможно потому что фотка отправляется 2 раза
        this.props.showProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.refreshProfile();
    }
    // старый метод для классовых компонент, сейчас юзают useEffect
    componentDidUpdate(prevProps: ProfileContainerPropsType, prevState: AppStateType, shot: any) {
        if (this.props.router.params.userId !== prevProps.router.params.userId)
            this.refreshProfile();
    }

    //     this.props.ProfilePage.profile, this.props.ProfilePage.status = ProfileAndStatus

    render() {
        if (!this.props.authorizedUserId && !this.props.router.params.userId) {
            return <Navigate to={'/login'} />;
        }

        console.log(this.props);

        return (
            <div>
                <Profile
                    isOwner={!this.props.router.params.userId}
                    {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    addMessage={this.props.addActionCreator}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile}
                    error={this.props.error}
                />
            </div>
        );
    }
}

//==================

type ProfileContainerPropsType = mapStateToPropsType & 
mapDispatchToPropsType & routerPropsType

type mapStateToPropsType = {
    profilePage: {}
    profile: profileType | boolean
    status: string | boolean
    authorizedUserId: number | null
    isAuth: boolean
    error: boolean | string,
}
type mapDispatchToPropsType = {
    showProfile: (a: number) => void
    getStatus: (a: number) => void
    updateStatus: (status: string | boolean) => void
    addActionCreator: () => void
    savePhoto: () => void
    saveProfile: () => void
}


let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profilePage: state.profilePage,
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    error: state.profilePage.error,

});

type routerPropsType = {
    props: any
    router: {
        location: () => void
        navigate: () => void
        params: {
            userId: number | null
        }
    }
}
// wrapper идентичный натуральному, без пальмового масла
let withRouter = (Comp: any) => {
    function ComponentWithRouterProp(props: routerPropsType) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Comp {...props} router={{ location, navigate, params }} />;
    }
    return ComponentWithRouterProp;
};



export default compose(
    connect(mapStateToProps, {
        showProfile,
        getStatus,
        updateStatus,
        addActionCreator,
        savePhoto,
        saveProfile,
    }),
    withRouter
    // WithAuthRedirect
)(ProfileContainer);
