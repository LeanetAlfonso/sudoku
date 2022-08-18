import { fireEvent, render, screen } from '@testing-library/react';
import DarkMode from '../DarkMode';

describe('DarkMode', () => {
    it('should render a checkbox (toggle)', () => {
        render(<DarkMode />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });

    it('should toggle between checked and unchecked when clicked', () => {
        render(<DarkMode />);
        const toggle = screen.getByRole('checkbox');
        expect(toggle).not.toBeChecked();
        fireEvent.click(toggle);
        expect(toggle).toBeChecked();
        fireEvent.click(toggle);
        expect(toggle).not.toBeChecked();
    });
});

