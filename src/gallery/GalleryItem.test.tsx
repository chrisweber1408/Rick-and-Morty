import { render, screen } from "@testing-library/react"
import { Character } from "../model"
import GalleryItem from "./GalleryItem"

test('that character is rendered', () => {

    // Given
    const character: Character = {
        id: '4711',
        name: 'Rick Sanchez',
        image: 'http://imageurl/',
        status: 'Alive',
        species: 'Human'
    }
    
    // When
    render(<GalleryItem character={character} />)

    // Then
    expect((screen.getByTestId('image') as HTMLImageElement).src).toEqual('http://imageurl/')
    expect(screen.getByTestId('name').textContent).toEqual('Rick Sanchez')
    expect(screen.getByTestId('status').textContent).toEqual('Alive')
    expect(screen.getByTestId('species').textContent).toEqual('Human')
})