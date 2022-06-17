import { render, screen } from "@testing-library/react"
import { Character } from "../model"
import GalleryItem from "./GalleryItem"
import {MemoryRouter} from "react-router-dom";

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
    render(<MemoryRouter><GalleryItem character={character} /></MemoryRouter>)

    // Then
    expect((screen.getByTestId('image') as HTMLImageElement).src).toEqual('http://imageurl/')
    expect(screen.getByTestId('name').textContent).toEqual('Rick Sanchez')
    expect(screen.getByTestId('status').textContent).toEqual('Alive')
    expect(screen.getByTestId('species').textContent).toEqual('Human')
})