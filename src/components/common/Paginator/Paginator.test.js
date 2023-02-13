// @ts-nocheck
import React from 'react';
import Paginator from './Paginator';
import { create } from 'react-test-renderer';

describe('Paginator tests!', () => {

    test('if page count is more than 10 button "NEXT" should be present', ()=>{
        const component = create(
            <Paginator totalItems={11} pageSize={1} portionSize={10} />
        );
        const root = component.root;
        let button = root.findAllByType('button')
        expect (button.length).toBe(1)
    })
});
