import { fireEvent, render, screen } from '@testing-library/react';
import DarkMode from '../DarkMode';


const localStorageMock = (function () {
    let store = {};

    return {
        getItem(key) {
            return store[key];
        },

        setItem(key, value) {
            store[key] = value;
        },

        clear() {
            store = {};
        },

        removeItem(key) {
            delete store[key];
        },

        getAll() {
            return store;
        },
    };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, data);
};

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

    it('should toggle theme in local storage', () => {
        render(<DarkMode />);
        const toggle = screen.getByRole('checkbox');
        expect(localStorage.getItem('theme')).toEqual('light');
        expect(toggle).not.toBeChecked();
        fireEvent.click(toggle);
        expect(localStorage.getItem('theme')).toEqual('dark');
        expect(toggle).toBeChecked();
        fireEvent.click(toggle);
        expect(localStorage.getItem('theme')).toEqual('light');
        expect(toggle).not.toBeChecked();
    });

    it("switch theme in local storage", () => {
        render(<DarkMode />);
        setLocalStorage('theme', 'dark');
        expect(localStorage.getItem('theme')).toEqual('dark');
        setLocalStorage('theme', 'light');
        expect(localStorage.getItem('theme')).toEqual('light');
    });
});
