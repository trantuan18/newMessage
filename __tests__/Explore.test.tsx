/**
 * @format
 */

import 'react-native';
import React from 'react';
import Explore from '../src/Screens/Explore';

// Note: import explicitly to use the types shipped with jest.
import { it } from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Explore', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = renderer.create(
                <Explore />
            ).toJSON();
            expect(component).toMatchSnapshot()
        });
    });
});