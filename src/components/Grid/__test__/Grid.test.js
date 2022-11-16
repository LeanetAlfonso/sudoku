import { render, screen } from '@testing-library/react';
import Grid from '../Grid';


const mockOnChange = jest.fn();
const mockGrid = {
    rows: [
        {
            cols: [{ row: 0, col: 0, value: 1, readOnly: true, isInvalid: false, isInvalidValue: false, isInvalidValueCause: false, isHighlighted: false },
            { row: 0, col: 1, value: null, readOnly: false, isInvalid: false, isInvalidValue: false, isInvalidValueCause: false, isHighlighted: false }],
        },
        {
            cols: [{ row: 1, col: 0, value: 3, readOnly: true, isInvalid: false, isInvalidValue: false, isInvalidValueCause: false, isHighlighted: false },
            { row: 1, col: 1, value: 4, readOnly: false, isInvalid: false, isInvalidValue: false, isInvalidValueCause: false, isHighlighted: false }],
        }
    ]
};

describe('Grid', () => {
    it('should render a grid', () => {
        render(<Grid />);
        const grid = screen.getByTestId('grid');
        expect(grid).toBeInTheDocument();
    });

    it('should render a grid of 4 cells', () => {
        render(<Grid
            grid={mockGrid}
            onChange={mockOnChange}
            isPaused={true}
        />);
        const cell = screen.getAllByTestId('cell');
        expect(cell.length).toEqual(4);
    });

    it('should render a grid of cells with their respective values when not paused', () => {
        render(<Grid
            grid={mockGrid}
            onChange={mockOnChange}
            isPaused={false}
        />);
        const cell = screen.getAllByTestId('cell');
        expect(cell[0]).toHaveValue('1');
        expect(cell[1]).toHaveValue('');
        expect(cell[2]).toHaveValue('3');
        expect(cell[3]).toHaveValue('4');
    });

    it('should render a grid of only empty cells when paused', () => {
        render(<Grid
            grid={mockGrid}
            onChange={mockOnChange}
            isPaused={true}
        />);
        const cell = screen.getAllByTestId('cell');
        expect(cell[0]).toHaveValue('');
        expect(cell[1]).toHaveValue('');
        expect(cell[2]).toHaveValue('');
        expect(cell[3]).toHaveValue('');
    });

    it('should render a grid of cells with their respective read-only property when not paused', () => {
        render(<Grid
            grid={mockGrid}
            onChange={mockOnChange}
            isPaused={false}
        />);
        const cell = screen.getAllByTestId('cell');
        expect(cell[0].readOnly).toBeTruthy();
        expect(cell[1].readOnly).toBeFalsy();
        expect(cell[2].readOnly).toBeTruthy();
        expect(cell[3].readOnly).toBeFalsy();
    });

    it('should render a grid of only read-only cells when paused', () => {
        render(<Grid
            grid={mockGrid}
            onChange={mockOnChange}
            isPaused={true}
        />);
        const cell = screen.getAllByTestId('cell');
        expect(cell[0].readOnly).toBeTruthy();
        expect(cell[1].readOnly).toBeTruthy();
        expect(cell[2].readOnly).toBeTruthy();
        expect(cell[3].readOnly).toBeTruthy();
    });
});
