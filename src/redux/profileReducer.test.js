// @ts-nocheck

import profileReducer, { addActionCreator, deletePost } from './profileReducer';
let state = {
    postData: [
        { id: 1, message: 'HOWDY partner!', likes: 2 },
        { id: 2, message: "It's my first post", likes: 7 },
        { id: 3, message: 'Hahahhaha', likes: 1 },
        { id: 4, message: 'l2p nub', likes: 420 },
    ],

    profile: null,
    status: '',
};
test('length of posts should be incremented', () => {
    // 1. исходные данные
    let action = addActionCreator('test1');

    // 2. действие
    let newState = profileReducer(state, action);

    // 3. должно получится
    expect(newState.postData.length).toBe(5);
});

test('length of messages should be decremented after deleting', () => {
    // 1. исходные данные
    let action = deletePost(1);

    // 2. действие
    let newState = profileReducer(state, action);

    // 3. должно получится
    expect(newState.postData.length).toBe(3);
});

test('message should be correct', () => {
    // 1. исходные данные
    let action = addActionCreator('test1');

    // 2. действие
    let newState = profileReducer(state, action);

    // 3. должно получится
    expect(newState.postData[4].message).toBe('test1');
});

test('length must be the same if id is incorrect', () => {
    // 1. исходные данные
    let action = deletePost(1000);

    // 2. действие
    let newState = profileReducer(state, action);

    // 3. должно получится
    expect(newState.postData.length).toBe(4);
});
