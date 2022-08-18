import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
    it('should render a button', () => {
        render(<Button />);
        const buttonElement = screen.getByRole("button");
        expect(buttonElement).toBeInTheDocument();
    });

    it('should render a button with the same text passed into text prop', () => {
        render(<Button text="Click Me" />);
        const buttonElement = screen.getByRole("button");
        expect(buttonElement.textContent).toBe("Click Me");
    });
});
