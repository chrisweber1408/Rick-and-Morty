import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Character } from "../model";

export default function CharacterDetail() {

    const [character, setCharacter] = useState<Character>();
    const [errorMessage, setErrorMessage] = useState('');
    
    const { characterId } = useParams();

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
            .then((response: AxiosResponse<Character, any>) => setCharacter(response.data))
            .catch(() => setErrorMessage('The characters could not be loaded.'));
    }, [])

    return (
        <div className="character-detail">
            <Link to="/">Back</Link>
            { errorMessage && <div className="error">{errorMessage}</div>}
            { character && 
                <div>
                    <h2>{character.name}</h2>
                    <div className="image-wrapper">
                        <img data-testid="image" src={character.image} alt="not found" />
                    </div>
                    <div className="character-information">
                        <div>
                            <span className="label">Status:</span> <span>{character.status}</span>
                        </div>
                        <div>
                            <span className="label">Species:</span> <span>{character.species}</span>
                        </div>
                        { character.gender && 
                            <div>
                                <span className="label">Gender:</span> <span>{character.gender}</span>
                            </div>
                        }
                        { character.location && 
                            <div>
                                <span className="label">Location:</span> <span>{character.location.name}</span>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
