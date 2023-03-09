import usersReducer, { actions, initialStateType } from "./usersReducer"
let state: initialStateType


beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Dimych0', followed: false, photos: {
                    small: null,
                    large: null,
                }, status: 'status 0'
            },
            {
                id: 1, name: 'Dimych1', followed: false, photos: {
                    small: null,
                    large: null,
                }, status: 'status 1'
            },
            {
                id: 2, name: 'Dimych2', followed: true, photos: {
                    small: null,
                    large: null,
                }, status: 'status 2'
            },
            {
                id: 3, name: 'Dimych3', followed: true, photos: {
                    small: null,
                    large: null,
                }, status: 'status 3'
            },
            {
                id: 0, name: 'Dimych4', followed: false, photos: {
                    small: null,
                    large: null,
                }, status: 'status 4'
            },
        ],
        pageSize: 10,
        totalUsers: 0,
        currentPage: 1,
        isFetching: false,
        onProgress: [],
        filter: { term: '', friend: null }
    }

})

test('follow success', () => {

    const newState = usersReducer(state, actions.toggleFollow(1))
    expect(newState.users[1].followed).toBeTruthy()

})
test('unfollow success', () => {

    const newState = usersReducer(state, actions.toggleFollow(3))
    expect(newState.users[3].followed).toBeFalsy()

})