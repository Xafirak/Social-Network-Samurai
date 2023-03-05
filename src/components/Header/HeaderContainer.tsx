import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { getAuthData, Logout } from "../../redux/auth-reducer";
import { compose } from "redux";
import { AppStateType } from "../../redux/reduxStore";

class HeaderContainer extends React.Component<propsType> {
    render() {
        return <Header {...this.props} />
    }
}

type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

type mapDispatchPropsType = {
    Logout: () => void
}


type propsType = mapStateToPropsType & mapDispatchPropsType


const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default compose<React.ComponentType>(connect(mapStateToProps, { Logout }))(HeaderContainer);
