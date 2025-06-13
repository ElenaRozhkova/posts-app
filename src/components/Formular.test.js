import { fireEvent, render, screen } from '@testing-library/react';
import Formular from './Formular';

test('zeigt Validierungsfehler an, wenn Formular leer abgesendet wird', () => {
    render(<Formular />);

    fireEvent.click(screen.getByText(/absenden/i));

    expect(screen.getByText(/Titel darf nicht leer sein/i)).toBeInTheDocument();
    expect(screen.getByText(/Inhalt darf nicht leer sein./i)).toBeInTheDocument();
});

test('aktualisiert Eingabefelder beim Tippen', () => {
    render(<Formular />);

    const titleInput = screen.getByLabelText(/titel/i);
    const bodyTextarea = screen.getByLabelText(/text/i);

    fireEvent.change(titleInput, { target: { value: 'Mein Titel' } });
    fireEvent.change(bodyTextarea, { target: { value: 'Mein Text' } });

    expect(titleInput.value).toBe('Mein Titel');
    expect(bodyTextarea.value).toBe('Mein Text');
});
