let library = [];
const tbl = document.querySelector("div.table");

function Book(title, author, pages, rating=null, read=false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.rating  = rating;
    this.read = read;
}

function addBookToLibrary(book){
    library.push(book);
}

function createCell(entry){
    let [key,value] = entry;
    let cell = document.createElement("div");
    cell.style.gridArea = key;
    cell.textContent = value;
    return cell;
}

function createRow(book){
    let row = document.createElement("div");
    let cells = Object.entries(book).map(createCell);
    cells.forEach(cell => row.appendChild(cell));
    row.classList.add("row");
    return row;
}

function displayBook(book){
    tbl.appendChild(createRow(book));
}

function displayLibrary(){
    library.map(displayBook);
}

addBookToLibrary(new Book("harry potter","rowling","250"));
addBookToLibrary(new Book("lord of the rings","tolkien","1000"));
displayLibrary();

