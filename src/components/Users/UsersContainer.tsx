import React from 'react';
import { connect } from 'react-redux';
import { getUsers, toggleFollowUnfollow } from '../../redux/usersReducer';
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
import { userType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';
import cl from './Users.module.css'

type ownPropsPtype = {
    pageTitle: string

}
type mapDispatchPropsType = {

    getUsers: (pageSize: number, currentPage: number) => void
    toggleFollowUnfollow: () => void

}
type mapStatePropsType = {

    pageSize: number
    currentPage: number
    totalUsers: number
    isFetching: boolean
    users: Array<userType>
    onProgress: Array<number>
}

type PropsType = mapStatePropsType & mapDispatchPropsType & ownPropsPtype

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const { pageSize, currentPage } = this.props;
        this.props.getUsers(pageSize, currentPage);
    }

    onPageChanged(page: number) {
        const { pageSize } = this.props;
        this.props.getUsers(pageSize, page);
    }

    render() {
        return (
            <>
                <h2 className={cl.h2}>{this.props.pageTitle}</h2>
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

let mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        users: getAllUsers(state),
        pageSize: getPageSize(state),
        totalUsers: getTotalUsers(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        onProgress: getOnProgress(state),
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUsers,
        toggleFollowUnfollow,
    })
)(UsersContainer);
