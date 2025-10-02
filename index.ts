interface Cabinet {
// zwraca dowolny element o podanej nazwie
    findFolderByName(name: string):Folder;

// zwraca wszystkie foldery podanego rozmiaru SMALL/MEDIUM/LARGE
    findFoldersBySize(size: string):Folder[];

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
class FileCabinet implements Cabinet, MultiFolder {
    private folders: Folder[];
    private name: string;
    private size: string;

    constructor(folders: Folder[] = [], name: string, size: string) {
        this.folders = folders;
        this.name = name;
        this.size = size;
    }

    getFolders(): Folder[] {
        return this.folders;
    }

    getName(): string {
        return this.name;
    }

    getSize(): string {
        return this.size;
    }

    findFolderByName(name: string): Folder {
        const folder = this.getFolders().find(c => c.getName() === name);
        if (!folder) {
            throw new Error("Folder not found by name");
        }
        return folder;
    }

    findFoldersBySize(size: string): Folder[] {
        const folders = this.getFolders().filter(c => c.getSize() === size);
        if (folders.length === 0) {
            throw new Error("Folders not found by size");
        }
        return folders;
    }

    count(): number {
        const countFolders = (folders: Folder[]): number => {
            return folders.reduce((acc, folder) => {
                if ("getFolders" in folder) {
                    return acc + 1 + countFolders((folder as MultiFolder).getFolders());
                }
                return acc + 1;
            }, 0);
        };
        return countFolders(this.getFolders());
    }
}

// przykładowe dane
const dataCollection: Folder[] = [
    {
        getName: () => "Folder A",
        getSize: () => "SMALL",
    },
    {
        getName: () => "Folder B",
        getSize: () => "MEDIUM"
    },
    {
        getName: () => "Folder C",
        getSize: () => "LARGE"
    },
    {
        getName: () => "Folder D",
        getSize: () => "LARGE"
    }
];

// przykład użycia
const foldersCollection = new FileCabinet(dataCollection, "FleetContainer", "XL");

const byName = foldersCollection.findFolderByName("Folder B");
console.log("By name:", byName.getName(), byName.getSize());

const bySize = foldersCollection.findFoldersBySize("LARGE");
console.log("By size:", bySize.map(f => ({
    name: f.getName(),
    size: f.getSize()
})));

console.log("Count:", foldersCollection.count());