import { toggleFollowUnfollow } from './usersReducer';




test ('dispatch work', async()=> {
    const thunk = toggleFollowUnfollow(1, 'follow')
    const dispatchMock = jest.fn();

   //@ts-ignore
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)


})