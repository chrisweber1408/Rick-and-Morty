export interface PageData {
    info: Info;
    results: Array<Character>;
}

export interface Info {
    next: string;
    prev: string;
}

export interface Character {
    id: string;
    name: string;
    image: string;
    status: string;
    species: string;
    gender?: string;
    location?: Location;
}

export interface Location {
    name: string;
}
