import React from "react";
import { create } from "react-test-renderer";
import {ProfileStatus} from "./ProfileStatus";


describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="frontend" updateStatus={()=>{}}/>);
        const instance = component.getInstance();
        // @ts-ignore
        expect(instance.state.status).toBe("frontend");
    });
    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatus status="frontend" updateStatus={()=>{}}/>);
        const root = component.root;
        const span = root.findByType('span')
        expect(span).not.toBeNull();
    });
    test("after creation input should`t be displayed", () => {
        const component = create(<ProfileStatus status="frontend" updateStatus={()=>{}}/>);
        const root = component.root;
        expect(() => {
            const input = root.findByType('input')
        }).toThrow()
    });
    test("after creation span should contains correct status", () => {
        const component = create(<ProfileStatus status="frontend" updateStatus={()=>{}}/>);
        const root = component.root;
        const span = root.findByType('span')
        expect(span.children[0]).toBe("frontend");
    });
    test("after doubleClick input should be displayed instead of span", () => {
        const component = create(<ProfileStatus status="frontend" updateStatus={()=>{}}/>);
        const root = component.root;
        const span = root.findByType('span');
        span.props.onDoubleClick();
        const input = root.findByType('input');
        expect(input.props.value).toBe("frontend");
    });
    // test("callback should be called", () => {
    //     const mockCallback = jest.fn();
    //     const component = create(<ProfileStatus status="frontend" updateStatus={mockCallback}/>);
    //     const instance = component.getInstance();
    //     instance.deActivateEditMode();
    //     expect(mockCallback.mock.calls.length).toBe(1);
    // });
});