import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageMenu from '../LanguageMenu';
import i18n from 'i18next';

describe('LanguageMenu', () => {
    it('should render a globe icon', () => {
        render(<LanguageMenu />);
        const globeIcon = screen.getByTestId('globe-icon');
        expect(globeIcon).toBeInTheDocument();
    });

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

    it('should change the language when a new language is selected', async () => {
        render(<LanguageMenu />);
        const dropdown = screen.getByRole('combobox');
        await userEvent.selectOptions(dropdown, 'es');
        expect(i18n.changeLanguage).toHaveBeenCalledWith('es');
        i18n.changeLanguage('es');
    });
});
