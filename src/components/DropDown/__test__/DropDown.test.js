import { render, screen } from '@testing-library/react';
import DropDown from '../DropDown';

const mockContent = [
    {
        name: '1',
        value: 'option1'
    }, {
        name: '2',
        value: 'option2'
    },
    {
        name: '3',
        value: 'option3'
    }
];

describe('DropDown', () => {
    it('should render a drop down menu (combobox)', () => {
        render(<DropDown content={mockContent} />);
        const menu = screen.getByRole('combobox');
        expect(menu).toBeInTheDocument();
    });

    it('should set selected prop as selected option', () => {
        render(<DropDown content={mockContent} selected='2' />);
        expect(screen.getByRole('option', { name: '1' }).selected).toBe(true);
    });

    it('should render the correct number of options (3)', () => {
        render(<DropDown content={mockContent} />);
        expect(screen.getAllByRole('option').length).toBe(3);
    });
});
