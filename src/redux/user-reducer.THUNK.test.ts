import { toggleFollowUnfollow, actions } from './usersReducer';
import { usersAPI } from './../API/users-api';
import { APIResponseType, resultCodesEnum } from '../API/api';


jest.mock('./../API/users-api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(()=> {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.toggleFollowUser.mockClear();
    
})

const result: APIResponseType = {
    resultCode: resultCodesEnum.success,
    messages: [],
    data: {},
}


test('follow thunk work', async () => {

    userAPIMock.toggleFollowUser.mockReturnValue(Promise.resolve(result))

    const thunk = toggleFollowUnfollow(1, 'follow')    
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, (actions.toggleFollow(1)))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleProgress(false, 1))
})


test('UNfollow thunk work', async () => {

    userAPIMock.toggleFollowUser.mockReturnValue(Promise.resolve(result))

    const thunk = toggleFollowUnfollow(1, 'unfollow')


    
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, (actions.toggleFollow(1)))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleProgress(false, 1))
})