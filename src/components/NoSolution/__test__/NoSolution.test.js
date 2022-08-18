import { render, screen } from '@testing-library/react';
import NoSolution from '../NoSolution';

describe('NoSolution', () => {
    it('should render the no solution dialog', () => {
        render(<NoSolution noSolution={{ isOpen: true }} />);
        const dialog = screen.getByTestId('no-solution');
        expect(dialog).toBeInTheDocument();
    });
});
