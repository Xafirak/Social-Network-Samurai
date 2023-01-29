// @ts-nocheck

import React from "react";
import { connect } from "react-redux";
import {
    follow,
    unfollow,
    toggleProgress,
    getUsers,
    toggleFollowUnfollow,
} from "./../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/preloader";
import { Navigate } from "react-router-dom";
import { WithAuthRedirect } from "./../../HOC/AuthRedirect";
import { compose } from "redux";

//как пофиксить вечную "загрузку" юзеров
//если поменять страницу и снова вернутся в users

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    onPageChanged(page) {
        this.props.getUsers(this.props.pageSize, page);
    }

    render() {
        ///----------
        if (!this.props.isAuth) return <Navigate to={"/login"} />;
        ///----------
        return (
            <>
                {this.props.isFetching ? (
                    <Preloader />
                ) : (
                    <Users
                        totalUsers={this.props.totalUsers}
                        pageSize={this.props.pageSize}
                        // Этот метод теряет this, когда передается в ф-ую компоненту, поэтому биндим, либо НЕ используем классовые компоненты!
                        //
                        onPageChanged={this.onPageChanged.bind(this)}
                        //
                        currentPage={this.props.currentPage}
                        users={this.props.users}
                        // follow={this.props.follow}
                        // unfollow={this.props.unfollow}
                        // toggleProgress={this.props.toggleProgress}
                        onProgress={this.props.onProgress}
                        toggleFollowUnfollow={this.props.toggleFollowUnfollow}
                    />
                )}
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsers: state.usersPage.totalUsers,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        onProgress: state.usersPage.onProgress,
    };
};

export default compose(
    WithAuthRedirect,
    connect(mapStateToProps, {
        follow,
        unfollow,
        toggleProgress,
        getUsers,
        toggleFollowUnfollow,
    })
)(UsersContainer);
