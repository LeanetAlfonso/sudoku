import { render, screen } from '@testing-library/react';
import Cell from '../Cell';

describe('Cell', () => {
    it('should render a cell (textbox)', () => {
        render(<Cell cell={{
            row: 0,
            col: 0,
            value: '',
            readOnly: false,
            isInvalid: false,
            isInvalidValue: false,
            isInvalidValueCause: false,
            isHighlighted: false,
        }} />);
        const cell = screen.getByRole('textbox');
        expect(cell).toBeInTheDocument();
    });

    it('should render a cell with the same value passed into value attribute of cell prop', () => {
        render(<Cell cell={{ value: '3' }} />);
        const cell = screen.getByRole('textbox');
        expect(cell).toHaveValue('3');
    });
});
