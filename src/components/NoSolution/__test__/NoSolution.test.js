import { render, screen } from '@testing-library/react';
import NoSolution from '../NoSolution';

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

describe('NoSolution', () => {
    it('should render the no solution dialog', () => {
        render(<NoSolution noSolution={{ isOpen: true }} />);
        const dialog = screen.getByTestId('no-solution');
        expect(dialog).toBeInTheDocument();
    });
});
