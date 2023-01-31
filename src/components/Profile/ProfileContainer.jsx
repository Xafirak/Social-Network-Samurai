// @ts-nocheck
import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getStatus, showProfile } from "../../redux/profileReducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { compose } from 'redux';
import { updateStatus } from './../../redux/profileReducer';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) userId = 27645; //2
        this.props.showProfile(userId);
        this.props.getStatus(userId)
    }
    render() {
        ///----------

        //-----------
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    profilePage: state.profilePage,
    profile: state.profilePage.profile,
    status: state.profilePage.status,
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


export default compose(
    connect(mapStateToProps, {
        showProfile,
        getStatus,
        updateStatus,
    }),
    withRouter,
)(ProfileContainer);
