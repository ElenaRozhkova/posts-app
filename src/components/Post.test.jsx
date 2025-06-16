// Post.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import Post from './Post';


// Mock react-router-dom und überschreibe useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ postId: '1' }), // Hier gibst du den postId-Parameter vor
}));

// Fetch mocken (optional, wenn du fetch im Test kontrollieren willst)
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                id: 1,
                title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            }),
        })
    );
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('Post Komponente', () => {

    /*  test('lädt Postdetail asynchron', async () => {
          // Mock einer API-Antwort
          const mockUser = {
              id: 1,
              title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
              body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
          };
          // Asynchrone Operation ausführen
          const post = await fetchData(1);
          // Ergebnis überprüfen
          expect(post).toEqual(mockUser);
      });*/

    test('zeigt Post-Titel und Body an', async () => {
        render(<Post />);

        // Ladeanzeige prüfen
        expect(screen.getByText(/lade/i)).toBeInTheDocument();

        // Auf den Titel warten, der durch fetch gesetzt wird
        const postTitle = await screen.findByText(/sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i);
        expect(postTitle).toBeInTheDocument();

        // Body prüfen
        expect(screen.getByText(/quia et suscipit/i)).toBeInTheDocument();
    });
});
