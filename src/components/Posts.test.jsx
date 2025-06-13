import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Posts from './Posts';

test('zeigt Posts nach erfolgreichem Laden ', async () => {
    render(
        <MemoryRouter>
            <Posts />
        </MemoryRouter>
    );

    // Hier warten wir auf einen bestimmten Post-Titel aus der echten API
    expect(
        await screen.findByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
    ).toBeInTheDocument();

    expect(await screen.findByText('qui est esse')).toBeInTheDocument();
});
