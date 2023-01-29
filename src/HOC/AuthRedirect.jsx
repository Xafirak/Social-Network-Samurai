import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

export const WithAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
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

let mapStateToPropsforRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth,
    };
};
