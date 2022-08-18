import { fireEvent, render, screen } from '@testing-library/react';
import ShareURL from '../ShareURL';

describe('ShareURL', () => {
    jest.spyOn(window, 'prompt').mockImplementation(); // to prevent Error: Not implemented: window.prompt

    describe('Button Format', () => {
        it('should render a button to copy url', () => {
            render(<ShareURL url="/" btn={true} />);
            const shareURLbutton = screen.getByRole('button');
            expect(shareURLbutton).toBeInTheDocument();
        });

        it('should render a snackbar when button is clicked', () => {
            render(<ShareURL url="/" btn={true} />);
            const shareURLbutton = screen.getByRole('button');
            fireEvent.click(shareURLbutton);
            const snackbar = screen.getByTestId('snackbar');
            expect(snackbar).toBeInTheDocument();
        });
    });

    describe('Icon Format', () => {
        it('should render an icon to copy url', () => {
            render(<ShareURL url="/" btn={false} />);
            const shareURLicon = screen.getByTestId('share-url-icon');
            expect(shareURLicon).toBeInTheDocument();
        });

        it('should render a snackbar when clickable icon is clicked', () => {
            render(<ShareURL url="/" btn={false} />);
            const shareURLicon = screen.getByTestId('share-url-icon');
            fireEvent.click(shareURLicon);
            const snackbar = screen.getByTestId('snackbar');
            expect(snackbar).toBeInTheDocument();
        });
    });
});
