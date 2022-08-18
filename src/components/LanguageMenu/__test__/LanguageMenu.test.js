import { render, screen } from '@testing-library/react';
import LanguageMenu from '../LanguageMenu';

describe('LanguageMenu', () => {
    it('should render a drop down menu (combobox)', () => {
        render(<LanguageMenu />);
        const menu = screen.getByRole('combobox');
        expect(menu).toBeInTheDocument();
    });

    it('should render default language (English)', () => {
        render(<LanguageMenu />);
        expect(screen.getByRole('option', { name: 'English' }).selected).toBe(true);
    });

    it('should render the correct number of options (3)', () => {
        render(<LanguageMenu />);
        expect(screen.getAllByRole('option').length).toBe(3);
    });
});
