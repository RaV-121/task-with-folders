interface Cabinet {
// zwraca dowolny element o podanej nazwie
Optional<Folder> 
findFolderByName(String name);

// zwraca wszystkie foldery podanego rozmiaru SMALL/MEDIUM/LARGE
List<Folder> findFoldersBySize(String size);

//zwraca liczbę wszystkich obiektów tworzących strukturę
int count();
}

//umieścić całą logikę
public class FileCabinet implements Cabinet {
private List<Folder> folders;
}

interface Folder {
String getName();
String getSize();
}

interface MultiFolder extends Folder {
List<Folder> getFolders();
}