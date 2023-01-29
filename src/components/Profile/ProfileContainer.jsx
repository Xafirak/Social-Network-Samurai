// @ts-nocheck
import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { showProfile } from "../../redux/profileReducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WithAuthRedirect } from "../../HOC/AuthRedirect";
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) userId = 27645; //2

        this.props.showProfile(userId);
    }
    render() {
        ///----------

        //-----------
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    profilePage: state.profilePage,
    profile: state.profilePage.profile,
});

// wrapper идентичный натуральному, без пальмового масла
let withRouter = (Comp) => {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Comp {...props} router={{ location, navigate, params }} />;
    }
    return ComponentWithRouterProp;
};

// const enhance = compose(withRouter, connect(mapStateToProps, { showProfile }));
// export default  enhancedProfile = enhance(ProfileContainer)

export default compose(
    connect(mapStateToProps, {
        showProfile,
    }),
    withRouter,
    // WithAuthRedirect
)(ProfileContainer);
