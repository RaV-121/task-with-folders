interface Cabinet {
// zwraca dowolny element o podanej nazwie
    findFolderByName(name: string):Folder;

// zwraca wszystkie foldery podanego rozmiaru SMALL/MEDIUM/LARGE
    findFoldersBySize(size: string):Folder;

//zwraca liczbę wszystkich obiektów tworzących strukturę
    count():number;
}

interface Folder {
    getName():string;
    getSize():string;
}

interface MultiFolder extends Folder {
    getFolders():Folder[];
}

//umieścić całą logikę
class FileCabinet implements Cabinet {
    private folders: Folder[];
    
    constructor(folders: Folder[] = []){
        this.folders = folders;
    }

    findFolderByName(name: string): Folder {
        // ciało funkcji
    }

    findFoldersBySize(size: string): Folder {
        // ciało funkcji
    }

    count(): number {
        return 0;
    }
}