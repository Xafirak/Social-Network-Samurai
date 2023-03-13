import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users } from './Users';
import Preloader from '../common/Preloader/preloader';
import { getTotalUsers, getIsFetching, getPageSize, getCurrentPage, } from '../../redux/users-selectors';
import cl from './Users.module.css'
import { useEffect } from 'react';
import { DispatchType } from '../../redux/reduxStore';
import { getUsers } from './../../redux/usersReducer';
import { getUsersFilter } from './../../redux/users-selectors';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';





export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const totalUsers = useSelector(getTotalUsers)
    const isFetching = useSelector(getIsFetching)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)



    //============ продвинутый вариант в коментах 1.0
    // const useNavigateSearch = () => {
    //     return (pathname: string, params: QueryParamsType) => {
    //         navigate(`${pathname}?${createSearchParams(params)}`)
    //     }
    // }
    // const navigateSearch = useNavigateSearch()
    //=========
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams(location.search)
    let parsed = Object.fromEntries([...searchParams]) as QueryParamsType

    // Был бесконечный запрос юзеров, хз почему, пришлось useEffect вытащить
    // сюда из Users 
    useEffect(() => {
        let actualPage = currentPage
        let actualFilter = filter
        if (!!parsed.page) actualPage = +parsed.page
        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term }
        if (!!parsed.friend) actualFilter = {
            ...actualFilter,
            friend: parsed.friend === 'null' ? null
                : parsed.friend === 'true' ? true : false
        }

        dispatch(getUsers(pageSize, actualPage, actualFilter));
    }, [])


    useEffect(() => {
        //============ продвинутый вариант в коментах 1.0
        // navigateSearch('/users', {
        //     term: `${filter.term}`,
        //     friend: `${filter.friend}`,
        //     page: `${currentPage}`,
        // })
        //=========

        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)
        const queryString = new URLSearchParams(query).toString()

        navigate('/users/?' + queryString)
    }, [filter, currentPage])
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

type UsersPagePropsType = {
    pageTitle: string
}

type QueryParamsType = { term?: string, page?: string, friend?: string }
