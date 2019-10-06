import React from 'react';
import { render } from '@testing-library/react';

import App from '../pages/load.js';

describe('With React Testing Library Snapshot', () => {
    it('Should match Snapshot', () => {
        const { asFragment } = render(<App/>);

        expect(asFragment()).toMatchSnapshot();
    })
});