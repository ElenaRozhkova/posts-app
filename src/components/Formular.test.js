import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Formular from './Formular';

beforeEach(() => {
    global.fetch = jest.fn();
});



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

test('Formular-Submission funktioniert', async () => {
    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 123 }),
    });

    render(<Formular />);

    fireEvent.change(screen.getByLabelText(/titel/i), {
        target: { value: 'Test Titel' },
    });
    fireEvent.change(screen.getByLabelText(/text/i), {
        target: { value: 'Test Text' },
    });

    fireEvent.click(screen.getByText(/absenden/i));

    await waitFor(() => {
        expect(screen.getByText(/post erfolgreich gesendet/i)).toBeInTheDocument();
    });
});

test('zeigt Fehlermeldung bei Fehler beim Absenden', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Netzwerkfehler'));

    render(<Formular />);

    fireEvent.change(screen.getByLabelText(/titel/i), {
        target: { value: 'Fehlertest' },
    });
    fireEvent.change(screen.getByLabelText(/text/i), {
        target: { value: 'Fehlertext' },
    });

    fireEvent.click(screen.getByText(/absenden/i));

    await waitFor(() => {
        expect(screen.getByText(/fehler beim senden/i)).toBeInTheDocument();
    });
});
