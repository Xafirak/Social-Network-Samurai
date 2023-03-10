import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users } from './Users';
import Preloader from '../common/Preloader/preloader';
import { getTotalUsers, getIsFetching, getPageSize, getCurrentPage, } from '../../redux/users-selectors';
import cl from './Users.module.css'
import { useEffect } from 'react';
import { AppStateType, DispatchType } from '../../redux/reduxStore';
import { getUsers } from './../../redux/usersReducer';
import { getUsersFilter } from './../../redux/users-selectors';


type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const totalUsers = useSelector(getTotalUsers)
    const isFetching = useSelector(getIsFetching)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)

    // Был бесконечный запрос юзеров, хз почему, пришлось useEffect вытащить
    // сюда из Users 
    useEffect(() => {
        dispatch(getUsers(pageSize, currentPage, filter));
    }, [])

    const dispatch: DispatchType = useDispatch()



    return (
        <>
            <h2 className={cl.h2}>{props.pageTitle} (Всего: {totalUsers} самурайчиков)</h2>
            {isFetching ? (
                <Preloader />
            ) : (
                <Users />
            )}
        </>
    )
}


