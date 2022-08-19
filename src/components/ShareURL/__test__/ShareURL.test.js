import { fireEvent, render, screen } from '@testing-library/react';
import ShareURL from '../ShareURL';

describe('ShareURL', () => {
    jest.spyOn(window, 'prompt').mockImplementation(); // to prevent Error: Not implemented: window.prompt


    describe('Copy to Clipboard', () => {
        it('should render a clickable component to copy url', () => {
            render(<ShareURL />);
            const copyToClipboard = screen.getByTestId('copy-to-clipboard');
            expect(copyToClipboard).toBeInTheDocument();
        });

        it('should render a snackbar when clickable component is clicked', () => {
            render(<ShareURL />);
            const copyToClipboard = screen.getByTestId('copy-to-clipboard');
            fireEvent.click(copyToClipboard);
            const snackbar = screen.getByTestId('snackbar');
            expect(snackbar).toBeInTheDocument();
        });
    });

    describe('Button Format', () => {
        it('should render a button to copy url', () => {
            render(<ShareURL btn={true} />);
            const shareURLbutton = screen.getByRole('button');
            expect(shareURLbutton).toBeInTheDocument();
        });

        it('should render a snackbar when button is clicked', () => {
            render(<ShareURL btn={true} />);
            const shareURLbutton = screen.getByRole('button');
            fireEvent.click(shareURLbutton);
            const snackbar = screen.getByTestId('snackbar');
            expect(snackbar).toBeInTheDocument();
        });
    });

    describe('Icon Format', () => {
        it('should render a text to copy url', () => {
            render(<ShareURL text='Up for a challenge?' btn={false} />);
            const shareURLtext = screen.getByText('Up for a challenge?');
            expect(shareURLtext).toBeInTheDocument();
        });

        it('should render an icon to copy url', () => {
            render(<ShareURL btn={false} />);
            const shareURLicon = screen.getByTestId('share-url-icon');
            expect(shareURLicon).toBeInTheDocument();
        });

        it('should render a snackbar when clickable text is clicked', () => {
            render(<ShareURL text='Up for a challenge?' btn={false} />);
            const shareURLtext = screen.getByText('Up for a challenge?');
            fireEvent.click(shareURLtext);
            const snackbar = screen.getByTestId('snackbar');
            expect(snackbar).toBeInTheDocument();
        });

        it('should render a snackbar when clickable icon is clicked', () => {
            render(<ShareURL btn={false} />);
            const shareURLicon = screen.getByTestId('share-url-icon');
            fireEvent.click(shareURLicon);
            const snackbar = screen.getByTestId('snackbar');
            expect(snackbar).toBeInTheDocument();
        });
    });
});
