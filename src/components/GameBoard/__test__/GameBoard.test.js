import { fireEvent, render, screen } from '@testing-library/react';
import GameBoard from '../GameBoard';

const mockHandlePausePlay = jest.fn();
const mockHandleSecondsCallback = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleResetCallback = jest.fn();
const mockHandleIsRunningCallback = jest.fn();
const mockHandleTurnOnRunningCallback = jest.fn();
const mockHandleChangeModeCallback = jest.fn();

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

describe('GameBoard', () => {
    describe('timer', () => {
        it('should switch between pause/play icons when clicked', () => {
            render(<GameBoard
                seconds={4}
                isRunning={true}
                reset={false}
                hasWon={false}
                handlePausePlay={mockHandlePausePlay}
                handleSecondsCallback={mockHandleSecondsCallback}
                handleChange={mockHandleChange}
                handleResetCallback={mockHandleResetCallback}
            />);
            const pause = screen.getByTestId('pause-icon');
            expect(pause).toBeInTheDocument();
            fireEvent.click(pause);
            const play = screen.getByTestId('play-icon');
            expect(play).toBeInTheDocument();
            fireEvent.click(play);
            expect(screen.getByTestId('pause-icon')).toBeInTheDocument();
        });
    });

    describe('mode menu', () => {
        it('should set the selected option as the current mode', () => {
            render(<GameBoard
                mode='expert'
                handleSecondsCallback={mockHandleSecondsCallback}
                handleChangeModeCallback={mockHandleChangeModeCallback}
            />);
            expect(screen.getByRole('option', { name: 'expert' }).selected).toBe(true);
        });

        it('should change modes', () => {
            render(<GameBoard
                handleSecondsCallback={mockHandleSecondsCallback}
                handleChangeModeCallback={mockHandleChangeModeCallback}
            />);
            const menu = screen.getByRole('combobox');

            fireEvent.change(menu, { target: { value: 'hard' } });
            expect(screen.getByRole('option', { name: 'hard' }).selected).toBe(true);

            fireEvent.change(menu, { target: { value: 'medium' } });
            expect(screen.getByRole('option', { name: 'medium' }).selected).toBe(true);
        });
    });

    describe('highlight toggle', () => {
        it('should render highlight toggle', () => {
            render(<GameBoard
                seconds={4}
                isRunning={true}
                reset={false}
                hasWon={false}
                handlePausePlay={mockHandlePausePlay}
                handleSecondsCallback={mockHandleSecondsCallback}
                handleChange={mockHandleChange}
                handleResetCallback={mockHandleResetCallback}
            />);
            const highlightToggle = screen.getByRole('checkbox');
            expect(highlightToggle).toBeInTheDocument();
        });

        it('should switch between highlight and no highlight when clicked', () => {
            render(<GameBoard
                seconds={4}
                isRunning={true}
                reset={false}
                hasWon={false}
                handlePausePlay={mockHandlePausePlay}
                handleSecondsCallback={mockHandleSecondsCallback}
                handleChange={mockHandleChange}
                handleResetCallback={mockHandleResetCallback}
            />);
            const highlightToggle = screen.getByRole('checkbox');

            expect(highlightToggle).toBeChecked();
            fireEvent.click(highlightToggle);
            expect(highlightToggle).not.toBeChecked();
            fireEvent.click(highlightToggle);
            expect(highlightToggle).toBeChecked();
        });
    });

    describe('grid', () => {
        it('should render grid with only empty cells when paused', () => {
            render(<GameBoard
                seconds={4}
                isRunning={true}
                handleSecondsCallback={mockHandleSecondsCallback}
                hasWon={false}
                handleIsRunningCallback={mockHandleIsRunningCallback}
                handleResetCallback={mockHandleResetCallback}
                reset={false}
                handleTurnOnRunningCallback={mockHandleTurnOnRunningCallback}
                handlePausePlay={mockHandlePausePlay}
                startingGrid={mockGrid}
                handleChange={mockHandleChange}
            />);
            const cell = screen.getAllByTestId('cell');

            expect(cell[0].value).toBe("1");
            expect(cell[1].value).toBe("");
            expect(cell[2].value).toBe("3");
            expect(cell[3].value).toBe("4");

            const pause = screen.getByTestId('pause-icon');
            fireEvent.click(pause);

            expect(cell[0].value).toBe("");
            expect(cell[1].value).toBe("");
            expect(cell[2].value).toBe("");
            expect(cell[3].value).toBe("");

            const play = screen.getByTestId('play-icon');
            fireEvent.click(play);

            expect(cell[0].value).toBe("1");
            expect(cell[1].value).toBe("");
            expect(cell[2].value).toBe("3");
            expect(cell[3].value).toBe("4");
        });

        it('should render grid with only read-only cells when paused', () => {
            render(<GameBoard
                seconds={4}
                isRunning={true}
                handleSecondsCallback={mockHandleSecondsCallback}
                hasWon={false}
                handleIsRunningCallback={mockHandleIsRunningCallback}
                handleResetCallback={mockHandleResetCallback}
                reset={false}
                handleTurnOnRunningCallback={mockHandleTurnOnRunningCallback}
                handlePausePlay={mockHandlePausePlay}
                startingGrid={mockGrid}
                handleChange={mockHandleChange}
            />);
            const cell = screen.getAllByTestId('cell');

            expect(cell[0].readOnly).toBe(true);
            expect(cell[1].readOnly).toBe(false);
            expect(cell[2].readOnly).toBe(true);
            expect(cell[3].readOnly).toBe(false);

            const pause = screen.getByTestId('pause-icon');
            fireEvent.click(pause);

            expect(cell[0].readOnly).toBe(true);
            expect(cell[1].readOnly).toBe(true);
            expect(cell[2].readOnly).toBe(true);
            expect(cell[3].readOnly).toBe(true);

            const play = screen.getByTestId('play-icon');
            fireEvent.click(play);

            expect(cell[0].readOnly).toBe(true);
            expect(cell[1].readOnly).toBe(false);
            expect(cell[2].readOnly).toBe(true);
            expect(cell[3].readOnly).toBe(false);
        });
    });
});
