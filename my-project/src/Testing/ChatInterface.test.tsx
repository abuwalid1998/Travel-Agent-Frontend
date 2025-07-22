import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatInterface from '../pages/Home';
import { streamChatResponse } from '../Services/chatService';

// Mock dependencies
jest.mock('../Services/chatService');
jest.mock('../components/NavBar.tsx', () => () => <div>NavBar</div>);

const mockStream = streamChatResponse as jest.Mock;

beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
    });
    window.localStorage.getItem = jest.fn().mockReturnValue('test-token');
});

describe('ChatInterface', () => {
    it('renders correctly', () => {
        render(<ChatInterface />);
        expect(screen.getByText('💬 AI Assistant')).toBeInTheDocument();
    });

    it('loads chat history', async () => {
        const mockHistory = [{ prompt: 'Hi', response: 'Hello' }];
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockHistory),
        });

        render(<ChatInterface />);
        await waitFor(() => {
            expect(screen.getByText('Q: Hi')).toBeInTheDocument();
        });
    });

    it('submits and displays chat', async () => {
        mockStream.mockImplementation(async (_, callback) => {
            callback('Mock response');
        });

        render(<ChatInterface />);
        fireEvent.change(screen.getByPlaceholderText('Ask me anything...'), {
            target: { value: 'Test question' },
        });
        fireEvent.click(screen.getByText('Ask'));

        await waitFor(() => {
            expect(mockStream).toHaveBeenCalled();
            expect(screen.getByText('Mock response')).toBeInTheDocument();
        });
    });

    it('shows loading state', async () => {
        mockStream.mockImplementation(() => new Promise(() => {})); // Never resolves

        render(<ChatInterface />);
        fireEvent.change(screen.getByPlaceholderText('Ask me anything...'), {
            target: { value: 'Test' },
        });
        fireEvent.click(screen.getByText('Ask'));

        expect(screen.getByText('Asking...')).toBeInTheDocument();
    });
});