import { render, screen } from '@testing-library/react';
import GameDetails from '../GameDetails';

describe('GameDetails', () => {
    it('should render a wining title is game was won fairly', () => {
        render(<GameDetails
            gameDetails={{ isOpen: true, date: new Date() }}
            movesTaken={4}
            elapsed={500}
            pressedSolve={false}
            mode="easy"
            url={null}
            URLdata={null}
        />);
        const title = screen.getByText('game_won_title');
        expect(title).toBeInTheDocument();
    });

    it('should render a losing title is game was lost or not won fairly', () => {
        render(<GameDetails
            gameDetails={{ isOpen: true, date: new Date() }}
            movesTaken={4}
            elapsed={500}
            pressedSolve={true}
            mode="easy"
        />);
        const title = screen.getByText('game_lost_title');
        expect(title).toBeInTheDocument();
    });

    it('should render a winning title is game was a won challenge', () => {
        render(<GameDetails
            gameDetails={{ isOpen: true, date: new Date() }}
            movesTaken={4}
            elapsed={400}
            pressedSolve={false}
            mode="easy"
            URLdata={{ time: 500, moves: 4 }}
        />);
        const title = screen.queryByTestId('game_won_title');
        expect(title).toBeInTheDocument();
    });

    it('should render a winning title is game was a lost challenge because of time', () => {
        render(<GameDetails
            gameDetails={{ isOpen: true, date: new Date() }}
            movesTaken={4}
            elapsed={501}
            pressedSolve={false}
            mode="easy"
            url={null}
            URLdata={{ time: 500, moves: 10 }}
        />);
        const icon = screen.queryByTestId('game_lost_icon');
        expect(icon).not.toBeInTheDocument();
        const title = screen.queryByTestId('game_lost_title');
        expect(title).toBeInTheDocument();
    });

    it('should render a winning title is game was a lost challenge because of moves', () => {
        render(<GameDetails
            gameDetails={{ isOpen: true, date: new Date() }}
            movesTaken={4}
            elapsed={500}
            pressedSolve={false}
            mode="easy"
            url={null}
            URLdata={{ time: 500, moves: 1 }}
        />);
        const icon = screen.queryByTestId('game_lost_icon');
        expect(icon).not.toBeInTheDocument();
        const title = screen.queryByTestId('game_lost_title');
        expect(title).toBeInTheDocument();
    });

    it('should render a losing icon and title if game was lost not as part of a challenge', () => {
        render(<GameDetails
            gameDetails={{ isOpen: true, date: new Date() }}
            movesTaken={4}
            elapsed={500}
            pressedSolve={true}
            mode="easy"
        />);
        const icon = screen.queryByTestId('game_lost_icon');
        expect(icon).toBeInTheDocument();
        const title = screen.queryByTestId('game_lost_title');
        expect(title).toBeInTheDocument();
    });
});
