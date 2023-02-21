// @ts-nocheck

import React from 'react';
import { connect } from 'react-redux';
import { getUsers, toggleFollowUnfollow } from './../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/Preloader/preloader';
import { compose } from 'redux';
import {
    getAllUsers,
    getCurrentPage,
    getOnProgress,
    getPageSize,
    getTotalUsers,
    getIsFetching,
} from '../../redux/users-selectors';


class UsersContainer extends React.Component {
    componentDidMount() {
        const { pageSize, currentPage } = this.props;
        this.props.getUsers(pageSize, currentPage);
    }

    onPageChanged(page) {
        const { pageSize } = this.props;
        this.props.getUsers(pageSize, page);
    }

    render() {
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
        users: getAllUsers(state),
        pageSize: getPageSize(state),
        totalUsers: getTotalUsers(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        onProgress: getOnProgress(state),
    };
};

export default compose(
    connect(mapStateToProps, {
        getUsers,
        toggleFollowUnfollow,
    })
)(UsersContainer);
