/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as Utils from '../utils.js';

describe('Menu Utils - getSharedProps', () => {
  test('successfully maps', () => {
    const props = {
      someStyletronProps: 'styletron',
      normalProps: 'normal',
    };
    const mapper = {
      someStyletronProps: true,
    };
    expect(Utils.getSharedProps(props, mapper)).toEqual({
      $someStyletronProps: 'styletron',
      normalProps: 'normal',
    });
  });
});

describe('Menu Utils - scrollItemIntoView', () => {
  test('scrolling down', () => {
    const mockNode = {
      current: {
        getBoundingClientRect: jest
          .fn()
          .mockReturnValue({bottom: 100})
          .mockReturnValueOnce({bottom: 0}),
        scrollIntoView: jest.fn(),
      },
    };
    const mockParentNode = {
      current: {
        getBoundingClientRect: jest.fn().mockReturnValue({
          bottom: 50,
          height: 50,
        }),
        scrollHeight: 50,
        scrollTop: 100,
      },
    };

    // First call
    Utils.scrollItemIntoView({
      // $FlowFixMe
      node: mockNode,
      // $FlowFixMe
      parentNode: mockParentNode,
    });
    expect(mockNode.current.scrollIntoView).not.toHaveBeenCalled();

    // Subsequent calls
    Utils.scrollItemIntoView({
      // $FlowFixMe
      node: mockNode,
      // $FlowFixMe
      parentNode: mockParentNode,
    });
    expect(mockNode.current.scrollIntoView).toHaveBeenCalledWith(false);

    // Last item
    Utils.scrollItemIntoView({
      // $FlowFixMe
      node: mockNode,
      // $FlowFixMe
      parentNode: mockParentNode,
      isLast: true,
    });
    expect(mockParentNode.current.scrollTop).toBe(0);
  });

  test('scrolling up', () => {
    const mockNode = {
      current: {
        getBoundingClientRect: jest
          .fn()
          .mockReturnValue({top: 0})
          .mockReturnValueOnce({top: 100}),
        scrollIntoView: jest.fn(),
      },
    };
    const mockParentNode = {
      current: {
        getBoundingClientRect: jest.fn().mockReturnValue({top: 50}),
        scrollTop: 100,
      },
    };

    // First call
    Utils.scrollItemIntoView({
      // $FlowFixMe
      node: mockNode,
      // $FlowFixMe
      parentNode: mockParentNode,
    });
    expect(mockNode.current.scrollIntoView).not.toHaveBeenCalled();

    // Subsequent calls
    Utils.scrollItemIntoView({
      // $FlowFixMe
      node: mockNode,
      // $FlowFixMe
      parentNode: mockParentNode,
    });
    expect(mockNode.current.scrollIntoView).toHaveBeenCalled();
    expect(mockNode.current.scrollIntoView.mock.calls[0][0]).toBe(undefined);

    // First item
    Utils.scrollItemIntoView({
      // $FlowFixMe
      node: mockNode,
      // $FlowFixMe
      parentNode: mockParentNode,
      isFirst: true,
    });
    expect(mockParentNode.current.scrollTop).toBe(0);
  });
});
