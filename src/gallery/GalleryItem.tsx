import { Link } from "react-router-dom";
import { Character } from "../model"
import './GalleryItem.css';

interface GalleryItemProps {
    character: Character
}

export default function GalleryItem(props: GalleryItemProps) {

    return (
        <div className="gallery-item">
            <div className="image-wrapper">
                <Link to={`/detail/${props.character.id}`}>
                    <img data-testid="image" src={props.character.image} alt="not found" />
                </Link>
            </div>
            <div className="character-information">
                <div>
                    <span className="label">Name:</span> <span data-testid="name">{props.character.name}</span>
                </div>
                <div>
                    <span className="label">Status:</span> <span data-testid="status">{props.character.status}</span>
                </div>
                <div>
                    <span className="label">Species:</span> <span data-testid="species">{props.character.species}</span>
                </div>
            </div>
        </div>
    )
}
