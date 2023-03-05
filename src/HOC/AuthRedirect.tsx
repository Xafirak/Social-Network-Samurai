import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/reduxStore";

export function WithAuthRedirect(Component: React.ComponentType<mapStateToPropsforRedirectPropsType>) {
    class RedirectComponent extends React.Component<mapStateToPropsforRedirectPropsType> {
        render() {
            if (!this.props.isAuth) return <Navigate to={"/login"} />;
            return <Component {...this.props} />;
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsforRedirect)(
        RedirectComponent
    );
    return ConnectedAuthRedirectComponent;
};


type mapStateToPropsforRedirectPropsType = {
    isAuth: boolean
}


let mapStateToPropsforRedirect = (state: AppStateType): mapStateToPropsforRedirectPropsType => {
    return {
        isAuth: state.auth.isAuth,
    };
};
