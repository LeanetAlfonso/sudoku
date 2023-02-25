import { render, screen } from '@testing-library/react';
import GameDetails from '../GameDetails';

describe('GameDetails', () => {

    describe('icon', () => {
        it('should render a losing icon if game was lost not due to a challenge', () => {
            render(<GameDetails
                gameDetails={{ isOpen: true, date: new Date() }}
                movesTaken={4}
                elapsed={501}
                pressedSolve={true}
                mode="easy"
            />);
            const icon = screen.getByTestId('game_lost_icon');
            expect(icon).toBeInTheDocument();
        });

        it('should not render a losing icon if game was won not due to a challenge', () => {
            render(<GameDetails
                gameDetails={{ isOpen: true, date: new Date() }}
                movesTaken={4}
                elapsed={501}
                pressedSolve={false}
                mode="easy"
            />);
            const icon = screen.queryByTestId('game_lost_icon');
            expect(icon).not.toBeInTheDocument();
        });

        it('should not render a losing icon if game was won due to a challenge', () => {
            render(<GameDetails
                gameDetails={{ isOpen: true, date: new Date() }}
                movesTaken={4}
                elapsed={400}
                pressedSolve={false}
                mode="easy"
                URLdata={{ time: 500, moves: 10 }}
            />);
            const icon = screen.queryByTestId('game_lost_icon');
            expect(icon).not.toBeInTheDocument();
        });

        it('should not render a losing icon if game was a lost challenge because of time', () => {
            render(<GameDetails
                gameDetails={{ isOpen: true, date: new Date() }}
                movesTaken={4}
                elapsed={501}
                pressedSolve={false}
                mode="easy"
                URLdata={{ time: 500, moves: 10 }}
            />);
            const icon = screen.queryByTestId('game_lost_icon');
            expect(icon).not.toBeInTheDocument();
        });

        it('should not render a losing icon if game was a lost challenge because of moves', () => {
            render(<GameDetails
                gameDetails={{ isOpen: true, date: new Date() }}
                movesTaken={4}
                elapsed={500}
                pressedSolve={false}
                mode="easy"
                URLdata={{ time: 500, moves: 1 }}
            />);
            const icon = screen.queryByTestId('game_lost_icon');
            expect(icon).not.toBeInTheDocument();
        });
    });

    describe('title', () => {
        it('should render a wining title is game was won fairly', () => {
            render(<GameDetails
                gameDetails={{ isOpen: true, date: new Date() }}
                movesTaken={4}
                elapsed={500}
                pressedSolve={false}
                mode="easy"
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
        it('should render a losing title if game was a lost challenge because of time', () => {
            render(<GameDetails
                gameDetails={{ isOpen: true, date: new Date() }}
                movesTaken={4}
                elapsed={501}
                pressedSolve={false}
                mode="easy"
                URLdata={{ time: 500, moves: 10 }}
            />);
            const title = screen.queryByTestId('game_lost_title');
            expect(title).toBeInTheDocument();
        });

        it('should render a losing title if game was a lost challenge because of moves', () => {
            render(<GameDetails
                gameDetails={{ isOpen: true, date: new Date() }}
                movesTaken={4}
                elapsed={500}
                pressedSolve={false}
                mode="easy"
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

    describe('statistics', () => {
        describe('stats section', () => {
            it('should not render stats section if game was won not as part of a challenge', () => {
                render(<GameDetails
                    gameDetails={{ isOpen: true, date: new Date() }}
                    movesTaken={4}
                    elapsed={500}
                    pressedSolve={false}
                    mode="easy"
                />);
                const stats = screen.queryByTestId('stats');
                expect(stats).not.toBeInTheDocument();
            });

            it('should render stats if game was won as part of a challenge', () => {
                render(<GameDetails
                    gameDetails={{ isOpen: true, date: new Date() }}
                    movesTaken={1}
                    elapsed={400}
                    pressedSolve={true}
                    mode="easy"
                    URLdata={{ time: 500, moves: 1 }}
                />);
                const stats = screen.queryByTestId('stats');
                expect(stats).toBeInTheDocument();
            });

            it('should render stats if game was lost as part of a challenge', () => {
                render(<GameDetails
                    gameDetails={{ isOpen: true, date: new Date() }}
                    movesTaken={4}
                    elapsed={500}
                    pressedSolve={true}
                    mode="easy"
                    URLdata={{ time: 500, moves: 1 }}
                />);
                const stats = screen.queryByTestId('stats');
                expect(stats).toBeInTheDocument();
            });
        });
        describe('stats "you" subtitle', () => {
            it('should render a "you" subtitle if game was lost as part of a challenge', () => {
                render(<GameDetails
                    gameDetails={{ isOpen: true, date: new Date() }}
                    movesTaken={4}
                    elapsed={500}
                    pressedSolve={true}
                    mode="easy"
                    URLdata={{ time: 500, moves: 1 }}
                />);
                const youSubtitle = screen.getByTestId('you-subtitle');
                expect(youSubtitle).toBeInTheDocument();
            });

            it('should render a "you" subtitle if game was won as part of a challenge', () => {
                render(<GameDetails
                    gameDetails={{ isOpen: true, date: new Date() }}
                    movesTaken={4}
                    elapsed={500}
                    pressedSolve={true}
                    mode="easy"
                    URLdata={{ time: 500, moves: 50 }}
                />);
                const youSubtitle = screen.getByTestId('you-subtitle');
                expect(youSubtitle).toBeInTheDocument();
            });

            it('should not render a "you" subtitle if game was lost not as part of a challenge', () => {
                render(<GameDetails
                    gameDetails={{ isOpen: true, date: new Date() }}
                    movesTaken={4}
                    elapsed={500}
                    pressedSolve={true}
                    mode="easy"
                />);
                const youSubtitle = screen.queryByTestId('you-subtitle');
                expect(youSubtitle).not.toBeInTheDocument();
            });
        });
        describe('stats content', () => {
            it('should render only "you" stats if game was lost not as part of a challenge', () => {
                render(<GameDetails
                    gameDetails={{ isOpen: true, date: new Date() }}
                    movesTaken={4}
                    elapsed={500}
                    pressedSolve={true}
                    mode="easy"
                />);
                const youStats = screen.getByTestId('you-stats');
                expect(youStats).toBeInTheDocument();
                expect(youStats).not.toHaveClass("custom-details");
                const enemyStats = screen.queryByTestId('enemy-stats');
                expect(enemyStats).not.toBeInTheDocument();
            });

            it('should render both "you" and "enemy" stats if game was lost as part of a challenge', () => {
                render(<GameDetails
                    gameDetails={{ isOpen: true, date: new Date() }}
                    movesTaken={4}
                    elapsed={500}
                    pressedSolve={true}
                    mode="easy"
                    URLdata={{ time: 500, moves: 1 }}
                />);
                const youStats = screen.queryByTestId('you-stats');
                expect(youStats).toBeInTheDocument();
                expect(youStats).toHaveClass("custom-details");
                const enemyStats = screen.queryByTestId('enemy-stats');
                expect(enemyStats).toBeInTheDocument();
            });

            it('should render both "you" and "enemy" stats if game was won as part of a challenge', () => {
                render(<GameDetails
                    gameDetails={{ isOpen: true, date: new Date() }}
                    movesTaken={4}
                    elapsed={400}
                    pressedSolve={true}
                    mode="easy"
                    URLdata={{ time: 500, moves: 1 }}
                />);
                const youStats = screen.queryByTestId('you-stats');
                expect(youStats).toBeInTheDocument();
                expect(youStats).toHaveClass("custom-details");
                const enemyStats = screen.queryByTestId('enemy-stats');
                expect(enemyStats).toBeInTheDocument();
            });
        });

    });
    describe('leaderboard', () => {
        it('should render leaderboard (name input) if game was won as part of a challenge', () => {
            render(<GameDetails
                gameDetails={{ isOpen: true, date: new Date() }}
                movesTaken={4}
                elapsed={400}
                pressedSolve={true}
                mode="easy"
                URLdata={{ time: 500, moves: 1 }}
            />);
            const leaderboard = screen.queryByTestId('leaderboard');
            expect(leaderboard).toBeInTheDocument();
        });
        it('should render leaderboard (name input) if game was lost as part of a challenge (puzzle was technically solved)', () => {
            render(<GameDetails
                gameDetails={{ isOpen: true, date: new Date() }}
                movesTaken={4}
                elapsed={400}
                pressedSolve={true}
                mode="easy"
                URLdata={{ time: 500, moves: 1 }}
            />);
            const leaderboard = screen.queryByTestId('leaderboard');
            expect(leaderboard).toBeInTheDocument();
        });
        it('should not render leaderboard if game was lost not as part of a challenge', () => {
            render(<GameDetails
                gameDetails={{ isOpen: true, date: new Date() }}
                movesTaken={4}
                elapsed={400}
                pressedSolve={true}
                mode="easy"
            />);
            const leaderboard = screen.queryByTestId('leaderboard');
            expect(leaderboard).not.toBeInTheDocument();
        });
    });

});
