import GalleryItem from './GalleryItem';
import './Gallery.css';
import { useEffect, useState } from 'react';
import { Character, Info, PageData } from '../model';
import axios, { AxiosResponse } from 'axios';

export default function Gallery() {

    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [characters, setCharacters] = useState<Array<Character>>([]);
    const [info, setInfo] = useState<Info>();

    useEffect(() => {
        if (characters.length === 0) {
            fetchPage();
        }
    }, [errorMessage, characters.length]);

    useEffect(() => {
        const timeoutId = setTimeout(() => setErrorMessage(''), 5000);
        // Das return gibt eine Funktion zurück, die von react aufgerufen wird um hinter dem Effekt wieder aufzuräumen.
        return () => clearTimeout(timeoutId);
    }, [errorMessage])

    const fetchPage = (url: string = 'https://rickandmortyapi.com/api/character') => {
        axios.get(url)
            .then((response: AxiosResponse<PageData, any>) => response.data)
            .then((page: PageData) => {
                setCharacters(page.results);
                setInfo(page.info);
            })
            .catch(() => setErrorMessage('The characters could not be loaded.'));
    }

    const nextPage = () => fetchPage(info!.next);

    const prevPage = () => fetchPage(info!.prev);

    const components = characters
            .filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
            .map(c => <div key={c.id} data-testid={`character-${c.id}`}><GalleryItem character={c} /></div>)

    return (
        <div className="gallerie-wrapper">
            <h1>The Rick and Morty gallery</h1>
            { errorMessage && 
                <div className="error">
                    {errorMessage}
                </div>
            }   
            <div>
                <div className="navigation">
                    { info?.prev && <button onClick={prevPage}>Prev</button> }
                    { info?.next && <button onClick={nextPage}>Next</button> }
                </div>
                <div className="search">
                    <label htmlFor="search-value">Search for name:</label> <input id="search-value" data-testid="search-field" type="text" value={name} onChange={ev => setName(ev.target.value)} />
                </div>
                <div className="gallery">
                    {components}
                </div>
            </div>
        </div>
    )
}