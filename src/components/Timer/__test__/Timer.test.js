import { act, render, screen } from '@testing-library/react';
import Timer from '../Timer';

const mockHandleTurnOnRunningCallback = jest.fn();
const mockHandleResetCallback = jest.fn();
const mockHandleIsRunningCallback = jest.fn();
const mockHandleSecondsCallback = jest.fn();

describe('Timer', () => {
    describe('timer component', () => {
        it('should render a timer', () => {
            render(<Timer
                seconds={3}
                handleTurnOnRunningCallback={mockHandleTurnOnRunningCallback}
                handleResetCallback={mockHandleResetCallback}
                handleIsRunningCallback={mockHandleIsRunningCallback}
                handleSecondsCallback={mockHandleSecondsCallback}
            />);
            const timer = screen.getByTestId('timer');
            expect(timer).toBeInTheDocument();
        });
    });

    describe('time format', () => {
        it('should render the seconds in time format (only seconds)', () => {
            render(<Timer
                seconds={3}
                handleTurnOnRunningCallback={mockHandleTurnOnRunningCallback}
                handleResetCallback={mockHandleResetCallback}
                handleIsRunningCallback={mockHandleIsRunningCallback}
                handleSecondsCallback={mockHandleSecondsCallback}
            />);
            const secs = screen.getByText("00:03");
            expect(secs).toBeInTheDocument();
        });

        it('should render the seconds in time format (minutes and seconds)', () => {
            render(<Timer
                seconds={3001}
                handleTurnOnRunningCallback={mockHandleTurnOnRunningCallback}
                handleResetCallback={mockHandleResetCallback}
                handleIsRunningCallback={mockHandleIsRunningCallback}
                handleSecondsCallback={mockHandleSecondsCallback}
            />);
            const secs = screen.getByText("50:01");
            expect(secs).toBeInTheDocument();
        });

        it('should render the seconds in time format (hours, minutes, and seconds)', () => {
            render(<Timer
                seconds={6245}
                handleTurnOnRunningCallback={mockHandleTurnOnRunningCallback}
                handleResetCallback={mockHandleResetCallback}
                handleIsRunningCallback={mockHandleIsRunningCallback}
                handleSecondsCallback={mockHandleSecondsCallback}
            />);
            const secs = screen.getByText("01:44:05");
            expect(secs).toBeInTheDocument();
        });
    });

    describe('pause/play', () => {
        it('should render the play icon if game is paused', () => {
            render(<Timer
                isRunning={false}
                seconds={3}
                handleTurnOnRunningCallback={mockHandleTurnOnRunningCallback}
                handleResetCallback={mockHandleResetCallback}
                handleIsRunningCallback={mockHandleIsRunningCallback}
                handleSecondsCallback={mockHandleSecondsCallback}
            />);
            const play = screen.getByTestId('play-icon');
            expect(play).toBeInTheDocument();
        });

        it('should render the pause icon if game is not paused', () => {
            render(<Timer
                isRunning={true}
                seconds={3}
                handleTurnOnRunningCallback={mockHandleTurnOnRunningCallback}
                handleResetCallback={mockHandleResetCallback}
                handleIsRunningCallback={mockHandleIsRunningCallback}
                handleSecondsCallback={mockHandleSecondsCallback}
            />);
            const pause = screen.getByTestId('pause-icon');
            expect(pause).toBeInTheDocument();
        });

        it('should advance seconds if game is not paused', () => {
            jest.useFakeTimers();
            render(<Timer
                isRunning={true}
                seconds={5}
                hasWon={false}
                handleTurnOnRunningCallback={mockHandleTurnOnRunningCallback}
                handleResetCallback={mockHandleResetCallback}
                handleIsRunningCallback={mockHandleIsRunningCallback}
                handleSecondsCallback={mockHandleSecondsCallback}
            />);
            expect(screen.getByText('00:05')).toBeInTheDocument();
            act(() => jest.advanceTimersByTime(3000));
            expect(screen.getByText('00:08')).toBeInTheDocument();
        });

        it('should not advance seconds if game is paused', () => {
            jest.useFakeTimers();
            render(<Timer
                isRunning={false}
                seconds={5}
                hasWon={false}
                handleTurnOnRunningCallback={mockHandleTurnOnRunningCallback}
                handleResetCallback={mockHandleResetCallback}
                handleIsRunningCallback={mockHandleIsRunningCallback}
                handleSecondsCallback={mockHandleSecondsCallback}
            />);
            expect(screen.getByText('00:05')).toBeInTheDocument();
            act(() => jest.advanceTimersByTime(3000));
            expect(screen.getByText('00:05')).toBeInTheDocument();
        });
    });
});
