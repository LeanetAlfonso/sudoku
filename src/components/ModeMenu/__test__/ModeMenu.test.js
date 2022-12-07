import { render, screen } from '@testing-library/react';
import ModeMenu from '../ModeMenu';


describe('ModeMenu', () => {
    it('should render a drop down menu (combobox)', () => {
        render(<ModeMenu />);
        const menu = screen.getByRole('combobox');
        expect(menu).toBeInTheDocument();
    });

    it('should render default mode (easy)', () => {
        render(<ModeMenu />);
        expect(screen.getByRole('option', { name: 'easy' }).selected).toBe(true);
    });

    it('should render the correct number of options (4)', () => {
        render(<ModeMenu />);
        expect(screen.getAllByRole('option').length).toBe(4);
    });
});
