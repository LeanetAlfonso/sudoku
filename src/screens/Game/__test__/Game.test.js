import { fireEvent, render, screen, act } from '@testing-library/react';
import Game from '../Game';
import { mockUnsolvabledGrid } from '../mocks/mockUnsolvabledGrid';
import { mockAlmostSolvedGrid } from '../mocks/mockAlmostSolvedGrid';

describe('Game', () => {
    const getFirstEmptyCell = (arr) => {
        for (let elem of arr) {
            if (elem.value === '') {
                return elem;
            }
        }
        return null;
    };
    describe('cell change', () => {
        it('should change the value of a writable cell', () => {
            render(<Game />);
            const cells = screen.getAllByTestId('cell');
            const cell = getFirstEmptyCell(cells);
            const key = screen.getByTestId('key-4');
            const deleteBtn = screen.getByTestId('delete-button');

            expect(cell).toHaveValue('');
            fireEvent.focusIn(cell);

            fireEvent.click(key);
            expect(cell).toHaveValue('4');

            fireEvent.change(cell, { target: { value: '6' } });
            expect(cell).toHaveValue('6');

            fireEvent.change(cell, { target: { value: '9' } });
            expect(cell).toHaveValue('9');

            fireEvent.click(deleteBtn);
            expect(cell).toHaveValue('');
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

    describe('solve game', () => {
        it('should close solve confirmation dialog when cancel button is clicked', () => {
            render(<Game />);
            const solveBtn = screen.getByTestId('btn-solve');
            fireEvent.click(solveBtn);

            const cancelBtn = screen.getByTestId('cancel');
            fireEvent.click(cancelBtn);
            expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
        });

        it('should close game details modal on ok', () => {
            render(<Game />);

            const solveBtn = screen.getByTestId('btn-solve');
            expect(solveBtn).toBeInTheDocument();
            fireEvent.click(solveBtn);

            const continueBtn = screen.getByTestId('continue');
            expect(continueBtn).toBeInTheDocument();

            expect(screen.queryByTestId('game-details')).not.toBeInTheDocument();

            fireEvent.click(continueBtn);
            expect(screen.getByTestId('game-details')).toBeInTheDocument();

            const okBtn = screen.getByTestId('ok');
            expect(okBtn).toBeInTheDocument();
            fireEvent.click(okBtn);
            expect(screen.queryByTestId('game-details')).not.toBeInTheDocument();
        });

        it('should render game details modal when game is won', () => {
            render(<Game grid={mockAlmostSolvedGrid} />);

            expect(screen.queryByTestId('game-details')).not.toBeInTheDocument();

            const cells = screen.getAllByTestId('cell');
            const cell = cells[0];

            expect(cell).toHaveValue('');
            fireEvent.focusIn(cell);
            // last entry to win game (on change trigger)
            fireEvent.change(cell, { target: { value: '9' } });
            expect(screen.getByTestId('game-details')).toBeInTheDocument();
        });

        it('should render dont save score button until name is submitted', () => {
            render(<Game grid={mockAlmostSolvedGrid} />);

            expect(screen.queryByTestId('game-details')).not.toBeInTheDocument();

            const cells = screen.getAllByTestId('cell');
            const cell = cells[0];

            expect(cell).toHaveValue('');
            fireEvent.focusIn(cell);
            // last entry to win game (on change trigger)
            fireEvent.change(cell, { target: { value: '9' } });
            expect(screen.getByTestId('game-details')).toBeInTheDocument();
            expect(screen.getByTestId('ranks')).toBeInTheDocument();
            const nameInput = screen.getByTestId('name-input');
            const nameInputContainer = screen.getByTestId('name-input-container');
            const okBtn = screen.getByTestId('ok');
            const submitBtn = screen.getByTestId('submit-record');

            expect(nameInputContainer).toBeInTheDocument();
            expect(okBtn).toHaveTextContent("unsaved");
            fireEvent.change(nameInput, { target: { value: 'Ron' } });
            fireEvent.click(submitBtn);
            expect(nameInputContainer).not.toBeInTheDocument();
            expect(okBtn).toHaveTextContent("ok");
        });

        it('should change cell class if cell becomes invalid', () => {
            render(<Game grid={mockAlmostSolvedGrid} />);

            const cells = screen.getAllByTestId('cell');
            const cell = cells[0];
            expect(cell).not.toHaveClass('cell-highlighted');
            fireEvent.focusIn(cell);
            expect(cell).toHaveClass('cell-highlighted');
            expect(cell).not.toHaveClass('cell-invalid');
            expect(cell).not.toHaveClass('cell-invalid-value');
            expect(cell).not.toHaveClass('cell-invalid-value-cause');

            // cause row and box to be invalid, hence cell must become invalid in all senses
            fireEvent.change(cell, { target: { value: '5' } });
            expect(cell).toHaveClass('cell-invalid');
            expect(cell).toHaveClass('cell-invalid-value');
            expect(cell).toHaveClass('cell-invalid-value-cause');
        });

        it('should not highlight cells if won', () => {
            render(<Game grid={mockAlmostSolvedGrid} />);
            const cells = screen.getAllByTestId('cell');
            const cell = cells[0];
            expect(cell).not.toHaveClass('cell-highlighted');
            fireEvent.focusIn(cell);
            expect(cell).toHaveClass('cell-highlighted');
            fireEvent.change(cell, { target: { value: '9' } });
            const okBtn = screen.getByTestId('ok');
            expect(okBtn).toBeInTheDocument();
            fireEvent.click(okBtn);
            expect(cell).not.toHaveClass('cell-highlighted');
            fireEvent.focusIn(cell);
            expect(cell).not.toHaveClass('cell-highlighted');
        });

        it('should not highlight cells if solved', () => {
            render(<Game grid={mockAlmostSolvedGrid} />);
            const cells = screen.getAllByTestId('cell');
            const cell = cells[0];
            expect(cell).not.toHaveClass('cell-highlighted');
            fireEvent.focusIn(cell);
            expect(cell).toHaveClass('cell-highlighted');

            const solveBtn = screen.getByTestId('btn-solve');
            fireEvent.click(solveBtn);

            const continueBtn = screen.getByTestId('continue');
            fireEvent.click(continueBtn);

            expect(cell).not.toHaveClass('cell-highlighted');
            fireEvent.focusIn(cell);
            expect(cell).not.toHaveClass('cell-highlighted');
        });
    });

    describe('no solution', () => {
        it('should close no solution modal when ok is clicked', () => {
            render(<Game unsolvable />);
            const noSolBtn = screen.getByTestId('btn-no-sol');
            fireEvent.click(noSolBtn);
            expect(screen.getByTestId('no-solution')).toBeInTheDocument();
            const okBtn = screen.getByTestId('ok-no-solution');
            fireEvent.click(okBtn);
            expect(screen.queryByTestId('no-solution')).not.toBeInTheDocument();
        });

        it('should render a no solution modal if board is unsolvable', () => {
            render(<Game grid={mockUnsolvabledGrid} unsolvable />);
            const solveBtn = screen.getByTestId('btn-solve');
            fireEvent.click(solveBtn);

            const continueBtn = screen.getByTestId('continue');
            fireEvent.click(continueBtn);
            expect(screen.getByTestId('no-solution')).toBeInTheDocument();
        });

    });

    describe('high scores', () => {
        describe('open/close high scores modal', () => {
            it('should open high scores modal when the high scores button is clicked', () => {
                render(<Game />);
                expect(screen.queryByTestId('high-scores')).not.toBeInTheDocument();
                const leaderboardBtn = screen.getByTestId('btn-leaderboard');
                fireEvent.click(leaderboardBtn);
                expect(screen.getByTestId('high-scores')).toBeInTheDocument();
            });
            it('should close high scores modal when ok button is clicked', () => {
                render(<Game />);
                expect(screen.queryByTestId('high-scores')).not.toBeInTheDocument();
                const leaderboardBtn = screen.getByTestId('btn-leaderboard');
                fireEvent.click(leaderboardBtn);
                expect(screen.getByTestId('high-scores')).toBeInTheDocument();

                const rank = screen.queryByTestId('ranks');
                expect(rank).toBeInTheDocument();
                const nameInput = screen.queryByTestId('name-input');
                expect(nameInput).not.toBeInTheDocument();

                const okBtn = screen.getByTestId('leaderboard-ok');
                fireEvent.click(okBtn);
                expect(screen.queryByTestId('high-scores')).not.toBeInTheDocument();
            });
        });
    });

    describe('new game', () => {
        describe('open/close new game modal', () => {
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

        describe('cell values', () => {
            const getValuesFromCells = (cells) => {
                return cells.map(cell => cell.value);
            };
            describe('new game on mode dropdown select', () => {

                it('should generate a new board when a different mode is selected from mode dropdown', () => {
                    render(<Game />);
                    const menus = screen.getAllByRole('combobox');
                    const menu = menus[1]; // second select is mode dropdown

                    var oldCells = getValuesFromCells(screen.getAllByTestId('cell'));

                    fireEvent.change(menu, { target: { value: 'hard' } });
                    var newCells = getValuesFromCells(screen.getAllByTestId('cell'));
                    expect(newCells).not.toEqual(oldCells);

                    fireEvent.change(menu, { target: { value: 'easy' } });
                    oldCells = getValuesFromCells(screen.getAllByTestId('cell'));
                    expect(newCells).not.toEqual(oldCells);

                    fireEvent.change(menu, { target: { value: 'expert' } });
                    newCells = getValuesFromCells(screen.getAllByTestId('cell'));
                    expect(newCells).not.toEqual(oldCells);
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

                it('should stop and continue seconds when pressing pause/play button if game is not over', () => {
                    jest.useFakeTimers();
                    render(<Game />);
                    expect(screen.getByText('00:00')).toBeInTheDocument();
                    act(() => jest.advanceTimersByTime(3000));
                    expect(screen.getByText('00:03')).toBeInTheDocument();
                    const pause = screen.getByTestId('pause-icon');
                    fireEvent.click(pause);
                    act(() => jest.advanceTimersByTime(3000));
                    expect(screen.getByText('00:03')).toBeInTheDocument();
                    const play = screen.getByTestId('play-icon');
                    fireEvent.click(play);
                    act(() => jest.advanceTimersByTime(6000));
                    expect(screen.getByText('00:09')).toBeInTheDocument();
                });

                it('should not execute any action when pressing pause/play button if game is over', () => {
                    render(<Game grid={mockAlmostSolvedGrid} />);
                    const cells = screen.getAllByTestId('cell');
                    const cell = cells[0];
                    fireEvent.focusIn(cell);
                    fireEvent.change(cell, { target: { value: '9' } });
                    const okBtn = screen.getByTestId('ok');
                    expect(okBtn).toBeInTheDocument();
                    fireEvent.click(okBtn);
                    const play = screen.getByTestId('play-icon');
                    fireEvent.click(play);
                    expect(play).toBeInTheDocument();
                    expect(play).toHaveClass("fa-play-circle");
                });

                it('should keep cell values hidden while help modal is open', () => {
                    render(<Game />);
                    expect(hiddenValues((screen.queryAllByTestId('cell')))).not.toBeTruthy();
                    expect(screen.queryByTestId('game-instructions')).not.toBeInTheDocument();

                    const helpBtn = screen.getByTestId('btn-help');
                    fireEvent.click(helpBtn);
                    expect(screen.getByTestId('game-instructions')).toBeInTheDocument();
                    expect(hiddenValues((screen.getAllByTestId('cell')))).toBeTruthy();

                    const okBtn = screen.getByTestId('help-ok');
                    fireEvent.click(okBtn);
                    expect(screen.queryByTestId('game-instructions')).not.toBeInTheDocument();
                    expect(hiddenValues((screen.queryAllByTestId('cell')))).not.toBeTruthy();
                });

                it('should keep cell values hidden while clear confirmation modal is open', () => {
                    render(<Game />);
                    expect(hiddenValues((screen.queryAllByTestId('cell')))).not.toBeTruthy();
                    expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();

                    const clearBtn = screen.getByTestId('btn-clear');
                    fireEvent.click(clearBtn);
                    expect(screen.getByTestId('confirmation-dialog')).toBeInTheDocument();
                    expect(hiddenValues((screen.getAllByTestId('cell')))).toBeTruthy();

                    const cancelBtn = screen.getByTestId('cancel');
                    fireEvent.click(cancelBtn);
                    expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
                    expect(hiddenValues((screen.queryAllByTestId('cell')))).not.toBeTruthy();
                });

                it('should clear the board after clear continue is selected', () => {
                    render(<Game />);
                    const cells = screen.getAllByTestId('cell');
                    const key = screen.getByTestId('key-4');

                    const firstCell = getFirstEmptyCell(cells);
                    expect(firstCell).toHaveValue('');
                    fireEvent.focusIn(firstCell);
                    fireEvent.click(key);
                    expect(firstCell).toHaveValue('4');

                    const secondCell = getFirstEmptyCell(cells);
                    expect(secondCell).toHaveValue('');
                    fireEvent.focusIn(secondCell);
                    fireEvent.click(key);
                    expect(secondCell).toHaveValue('4');

                    const clearBtn = screen.getByTestId('btn-clear');
                    fireEvent.click(clearBtn);

                    const continueBtn = screen.getByTestId('continue');
                    fireEvent.click(continueBtn);

                    expect(firstCell).toHaveValue('');
                    expect(secondCell).toHaveValue('');
                });
            });

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

            it('should change the old cell values when clicking on new game and selecting hard mode', () => {
                render(<Game />);
                var oldCells = getValuesFromCells(screen.getAllByTestId('cell'));

                const newGameBtn = screen.getByTestId('btn-new');
                fireEvent.click(newGameBtn);
                const continueBtn = screen.getByTestId('continue');
                fireEvent.click(continueBtn);

                // switch to hard mode
                fireEvent.click(screen.getByTestId('hard'));
                var newCells = getValuesFromCells(screen.getAllByTestId('cell'));
                expect(newCells).not.toEqual(oldCells);
            });

            it('should change the old cell values when clicking on new game and selecting medium mode', () => {
                render(<Game />);
                var oldCells = getValuesFromCells(screen.getAllByTestId('cell'));

                const newGameBtn = screen.getByTestId('btn-new');
                fireEvent.click(newGameBtn);
                const continueBtn = screen.getByTestId('continue');
                fireEvent.click(continueBtn);

                // switch to medium mode
                fireEvent.click(screen.getByTestId('medium'));
                var newCells = getValuesFromCells(screen.getAllByTestId('cell'));
                expect(newCells).not.toEqual(oldCells);
            });

            it('should change the old cell values when clicking on new game and selecting easy mode', () => {
                render(<Game />);
                var oldCells = getValuesFromCells(screen.getAllByTestId('cell'));

                const newGameBtn = screen.getByTestId('btn-new');
                fireEvent.click(newGameBtn);
                const continueBtn = screen.getByTestId('continue');
                fireEvent.click(continueBtn);

                // switch to medium mode
                fireEvent.click(screen.getByTestId('easy'));
                var newCells = getValuesFromCells(screen.getAllByTestId('cell'));
                expect(newCells).not.toEqual(oldCells);
            });
            it('should change the old cell values when clicking on new game and selecting expert mode', () => {
                render(<Game />);
                var oldCells = getValuesFromCells(screen.getAllByTestId('cell'));

                const newGameBtn = screen.getByTestId('btn-new');
                fireEvent.click(newGameBtn);
                const continueBtn = screen.getByTestId('continue');
                fireEvent.click(continueBtn);

                // switch to medium mode
                fireEvent.click(screen.getByTestId('expert'));
                var newCells = getValuesFromCells(screen.getAllByTestId('cell'));
                expect(newCells).not.toEqual(oldCells);
            });
        });

        describe('generate sudoku board', () => {
            it('should render challenge a friend modal if valid url present', () => {
                global.window = Object.create(window);
                const url = 'http://localhost:3000/?sudoku=eyJyYXdCb2FyZCI6W251bGwsbnVsbCwxLG51bGwsNCxudWxsLG51bGwsbnVsbCxudWxsLDYsbnVsbCwyLG51bGwsbnVsbCxudWxsLG51bGwsOSw0LG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLDYsbnVsbCwyLG51bGwsbnVsbCxudWxsLG51bGwsMyxudWxsLG51bGwsNixudWxsLDIsMyw4LDEsOSxudWxsLDcsbnVsbCxudWxsLDQsbnVsbCw2LG51bGwsbnVsbCw4LDEsbnVsbCxudWxsLG51bGwsNixudWxsLG51bGwsbnVsbCxudWxsLG51bGwsMyw5LG51bGwsbnVsbCw1LG51bGwsNixudWxsLG51bGwsbnVsbCxudWxsLDMsbnVsbCxudWxsLDQsNyxudWxsLG51bGwsbnVsbCxudWxsXSwidGltZSI6NDIwLCJtb3ZlcyI6NTMsIm1vZGUiOiJoYXJkIn0';

                Object.defineProperty(window, 'location', {
                    value: {
                        href: url
                    }
                });
                render(<Game />);
                expect(window.location.href).toEqual(url);
                expect(screen.getByTestId('friend-challenge')).toBeInTheDocument();
                const challengeBtnOk = screen.getByTestId('challenge-btn-ok');
                fireEvent.click(challengeBtnOk);
                expect(screen.queryByTestId('friend-challenge')).not.toBeInTheDocument();
            });
        });
    });
});
