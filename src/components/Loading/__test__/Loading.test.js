import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading', () => {
    it('should render a loading icon', () => {
        render(<Loading scale={5} />);
        const loading = screen.getByTestId('loading-icon');
        expect(loading).toBeInTheDocument();
    });
});
