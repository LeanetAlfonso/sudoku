import { fireEvent, render, screen } from '@testing-library/react';
import Game from '../Game';

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str) => str,
            i18n: {
                changeLanguage: () => new Promise(() => { /* mock changeLanguage */ }),
            },
        };
    },
}));

describe('Game', () => {
    describe('cell change', () => {
        const getFirstEmptyCell = (arr) => {
            for (let elem of arr) {
                if (elem.value === '') {
                    return elem;
                }
            }
            return null;
        };

        it('should change the value of a writable cell', () => {
            render(<Game />);
            const cells = screen.getAllByTestId('cell');
            const cell = getFirstEmptyCell(cells);

            expect(cell).toHaveValue('');
            fireEvent.change(cell, { target: { value: '4' } });
            expect(cell).toHaveValue('4');
            fireEvent.change(cell, { target: { value: '9' } });
            expect(cell).toHaveValue('9');
        });

        it('should not change the value of a write-only cell', () => {
            render(<Game />);
            const getFirstWriteOnlyCell = (arr) => {
                for (let elem of arr) {
                    if (elem.value !== '') {
                        return elem;
                    }
                }
                return null;
            };
            const cells = screen.getAllByTestId('cell');
            const cell = getFirstWriteOnlyCell(cells);
            const value = cell.value;
            const newValue = (value + 1) % 9;

            fireEvent.change(cell, { target: { value: newValue } });
            expect(cell).not.toHaveValue(newValue);
            expect(cell).toHaveValue(value);
        });

        it('should not allow more than 1 digit to be inputted', () => {
            render(<Game />);
            const cells = screen.getAllByTestId('cell');
            const cell = getFirstEmptyCell(cells);
            expect(cell.maxLength).toBe(1);
        });

        it('should only allow 1-9 digits to be inputted', () => {
            render(<Game />);
            const cells = screen.getAllByTestId('cell');
            const cell = getFirstEmptyCell(cells);

            expect(cell).toHaveValue('');
            fireEvent.change(cell, { target: { value: '0' } });
            expect(cell).toHaveValue('');
            fireEvent.change(cell, { target: { value: 'a' } });
            expect(cell).toHaveValue('');
            fireEvent.change(cell, { target: { value: '$' } });
            expect(cell).toHaveValue('');
            fireEvent.change(cell, { target: { value: '/' } });
            expect(cell).toHaveValue('');
            fireEvent.change(cell, { target: { value: '-' } });
            expect(cell).toHaveValue('');
        });
    });


    describe('action container', () => {
        it('should only render a share link button if game is won', () => {
            render(<Game />);
            const solveBtn = screen.getByTestId('btn-solve');
            fireEvent.click(solveBtn);
            const shareLinkBtn = screen.queryByTestId('btn-share');
            expect(shareLinkBtn).not.toBeInTheDocument();
        });

        it('should always render a help button unless game is over', () => {
            render(<Game />);
            const helpBtn = screen.queryByTestId('btn-help');
            expect(helpBtn).toBeInTheDocument();

            const solveBtn = screen.getByTestId('btn-solve');
            fireEvent.click(solveBtn);

            const continueBtn = screen.getByTestId('continue');
            fireEvent.click(continueBtn);

            expect(screen.queryByTestId('btn-help')).not.toBeInTheDocument();
        });

        it('should always render a clear button unless game is over', () => {
            render(<Game />);
            const clearBtn = screen.queryByTestId('btn-clear');
            expect(clearBtn).toBeInTheDocument();

            const solveBtn = screen.getByTestId('btn-solve');
            fireEvent.click(solveBtn);

            const continueBtn = screen.getByTestId('continue');
            fireEvent.click(continueBtn);

            expect(screen.queryByTestId('btn-clear')).not.toBeInTheDocument();
        });

        it('should always render a solve button unless game is over or game is a challenge', () => {
            render(<Game />);
            const solveBtn = screen.getByTestId('btn-solve');
            expect(solveBtn).toBeInTheDocument();
            fireEvent.click(solveBtn);

            const continueBtn = screen.getByTestId('continue');
            fireEvent.click(continueBtn);

            expect(screen.queryByTestId('btn-solve')).not.toBeInTheDocument();
        });

        it('should always render a new game button', () => {
            render(<Game />);
            const newGameBtn = screen.getByTestId('btn-new');
            expect(newGameBtn).toBeInTheDocument();
        });
    });

    describe('new game', () => {

        const getValuesFromCells = (cells) => {
            return cells.map(cell => cell.value);
        };

        describe('open/close modal', () => {
            it('should open a confirmation dialog when the new game button is clicked', () => {
                render(<Game />);
                const newGameBtn = screen.getByTestId('btn-new');
                expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
                fireEvent.click(newGameBtn);
                expect(screen.getByTestId('confirmation-dialog')).toBeInTheDocument();
            });

            it('should close confirmation dialog when cancel button is clicked', () => {
                render(<Game />);
                const newGameBtn = screen.getByTestId('btn-new');
                fireEvent.click(newGameBtn);

                const cancelBtn = screen.getByTestId('cancel');
                fireEvent.click(cancelBtn);
                expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
            });

            it('should close confirmation dialog when continue button is clicked', () => {
                render(<Game />);
                const newGameBtn = screen.getByTestId('btn-new');
                fireEvent.click(newGameBtn);

                const continueBtn = screen.getByTestId('continue');
                fireEvent.click(continueBtn);
                expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
            });

            it('should close confirmation dialog and open game modes modal when continue is clicked', () => {
                render(<Game />);
                const newGameBtn = screen.getByTestId('btn-new');
                fireEvent.click(newGameBtn);

                const continueBtn = screen.getByTestId('continue');
                fireEvent.click(continueBtn);

                expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
                expect(screen.getByTestId('game-modes')).toBeInTheDocument();
            });
        });

        describe('hide/show cell values', () => {

            const hiddenValues = (cells) => {
                const values = getValuesFromCells(cells);
                for (let val of values) {
                    if (val !== '') {
                        return false;
                    }
                }
                return true;
            };

            it('should hide cell values when confirmation dialog is open and unhide them when closed', () => {
                render(<Game />);
                expect(hiddenValues((screen.queryAllByTestId('cell')))).not.toBeTruthy();

                const newGameBtn = screen.getByTestId('btn-new');
                fireEvent.click(newGameBtn);
                expect(hiddenValues((screen.getAllByTestId('cell')))).toBeTruthy();

                const cancelBtn = screen.getByTestId('cancel');
                fireEvent.click(cancelBtn);
                expect(hiddenValues((screen.queryAllByTestId('cell')))).not.toBeTruthy();
            });

            it('should keep cell values hidden before and after opening/closing confirmation dialog if game is paused', () => {
                render(<Game />);

                expect(hiddenValues((screen.queryAllByTestId('cell')))).not.toBeTruthy();

                const pause = screen.getByTestId('pause-icon');
                fireEvent.click(pause);
                expect(hiddenValues((screen.getAllByTestId('cell')))).toBeTruthy();

                const newGameBtn = screen.getByTestId('btn-new');
                fireEvent.click(newGameBtn);
                expect(hiddenValues((screen.getAllByTestId('cell')))).toBeTruthy();

                const cancelBtn = screen.getByTestId('cancel');
                fireEvent.click(cancelBtn);
                expect(hiddenValues((screen.getAllByTestId('cell')))).toBeTruthy();
            });
        });

        describe('cell values', () => {
            it('should not change the old cell values when clicking on new game and selecting cancel', () => {
                render(<Game />);
                const oldCells = getValuesFromCells(screen.getAllByTestId('cell'));

                const newGameBtn = screen.getByTestId('btn-new');
                fireEvent.click(newGameBtn);

                const cancelBtn = screen.getByTestId('cancel');
                fireEvent.click(cancelBtn);

                const newCells = getValuesFromCells(screen.getAllByTestId('cell'));
                expect(newCells).toEqual(oldCells);
            });

            it('should change the old cell values when clicking on new game and selecting a mode', () => {
                render(<Game />);
                const oldCells = getValuesFromCells(screen.getAllByTestId('cell'));

                const newGameBtn = screen.getByTestId('btn-new');
                fireEvent.click(newGameBtn);

                const continueBtn = screen.getByTestId('continue');
                fireEvent.click(continueBtn);

                const modeBtn = screen.getByTestId('hard');
                fireEvent.click(modeBtn);

                const newCells = getValuesFromCells(screen.getAllByTestId('cell'));
                expect(newCells).not.toEqual(oldCells);
            });
        });
    });
});
