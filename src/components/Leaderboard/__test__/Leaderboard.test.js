import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Leaderboard from '../Leaderboard';

describe('Leaderboard', () => {
    it('should render a leaderboard', () => {
        render(<Leaderboard />);
        const leaderboard = screen.getByTestId('leaderboard');
        expect(leaderboard).toBeInTheDocument();
    });

    it('should change class of mode button when clicked', () => {
        render(<Leaderboard />);
        const hardBtn = screen.getByTestId('hard-mode-button');
        expect(hardBtn).not.toHaveClass("selected-mode");
        fireEvent.click(hardBtn);
        expect(hardBtn).toHaveClass("selected-mode");
    });

    it('should change class of submit button when name is not an empty string', () => {
        render(<Leaderboard
            hasWon={true}
            name="You"
            challenge={true}
            newRecord
        />);
        const submitBtn = screen.getByTestId('submit-record');
        const nameInput = screen.getByTestId('name-input');

        expect(submitBtn).toHaveClass("invalid-button");
        fireEvent.change(nameInput, { target: { value: 'Lucas' } });
        expect(submitBtn).not.toHaveClass("invalid-button");
    });

    it('should not display input name nor submit button if game not won', () => {
        render(<Leaderboard
            hasWon={false}
            name="You"
            challenge={true}
            newRecord
        />);
        const submitBtn = screen.queryByTestId('submit-record');
        const nameInput = screen.queryByTestId('name-input');
        expect(submitBtn).not.toBeInTheDocument();
        expect(nameInput).not.toBeInTheDocument();
    });

    it('should not display input name nor submit button if game is not a new record', () => {
        render(<Leaderboard
            hasWon={true}
            name="You"
            challenge={true}
        />);
        const submitBtn = screen.queryByTestId('submit-record');
        const nameInput = screen.queryByTestId('name-input');
        expect(submitBtn).not.toBeInTheDocument();
        expect(nameInput).not.toBeInTheDocument();
    });
});
