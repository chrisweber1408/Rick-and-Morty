import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import axios from "axios"
import Gallery from "./Gallery"

test('that filter is working', async () => {
    // Mock GET Request
    jest.spyOn(axios, 'get').mockImplementation((url: string) => {
        expect(url).toEqual('https://rickandmortyapi.com/api/character');
        return Promise.resolve({
            data: {
                info: {},
                results: [
                    {
                        id: '4711',
                        name: 'Rick Sanchez',
                        image: '',
                        status: 'Alive',
                        species: 'Human'
                    },
                    {
                        id: '4712',
                        name: 'Morty Smith',
                        image: '',
                        status: 'Alive',
                        species: 'Human'
                    },
                    {
                        id: '4713',
                        name: 'Summer Smith',
                        image: '',
                        status: 'Alive',
                        species: 'Human'
                    }
                ]
            }
        })
    });

    // Render gallery component
    render(<Gallery />)

    // Check that all characters are rendered
    await waitFor(() => {
        expect(screen.getByTestId('character-4711')).toBeDefined()
        expect(screen.getByTestId('character-4712')).toBeDefined()
        expect(screen.getByTestId('character-4713')).toBeDefined()
    })

    // Filter characters
    const searchField = screen.getByTestId('search-field')
    fireEvent.change(searchField, { target: { value: 'smith' }});

    // Check that only two characters are rendered
    await waitFor(() => {
        expect(() => screen.getByTestId('character-4711')).toThrowError()
        expect(screen.getByTestId('character-4712')).toBeDefined()
        expect(screen.getByTestId('character-4713')).toBeDefined()
    })
})