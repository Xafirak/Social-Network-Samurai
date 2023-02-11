// @ts-nocheck
import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status="ITS STATUS BRO" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('ITS STATUS BRO');
    });

    test('after mounting span must appear with status ', () => {
        const component = create(<ProfileStatus status="ITS STATUS BRO" />);
        const instance = component.root;
        let span = instance.findByType('span');
        expect(span).not.toBeNull();
    });

    test('after mounting INPUT must be hidden ', () => {
        const component = create(<ProfileStatus status="ITS STATUS BRO" />);
        const instance = component.root;

        expect(() => {
            let input = instance.findByType('input');
        }).toThrow();
    });

    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status="ITS STATUS BRO" />);
        const instance = component.root;
        let span = instance.findByType('span');
        span.props.onDoubleClick();
        let input = instance.findByType('input');

        expect(input.props.value).toBe('ITS STATUS BRO');
    });

    test('callback should be executed', () => {
        const mockCallback = jest.fn();
        const component = create(
            <ProfileStatus
                status="ITS STATUS BRO"
                updateStatus={() => {
                    mockCallback;
                }}
            />
        );
        const instance = component.getInstance();
        instance.toggleActivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
        // не пашет потому, что у меня toggle, и в зависимости от editMode
        // у меня не обновляется статус
    });
});
