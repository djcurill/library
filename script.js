let library = [];
const tbl = document.querySelector("div.table");
const addBtn = document.querySelector("button.add");
const clsBtn = document.querySelector("div.modal__close-btn");
const form = document.querySelector("form.modal__form");

addBtn.addEventListener("click",toggleModal);
clsBtn.addEventListener("click",toggleModal);
form.addEventListener("submit",submitBook);

function toggleModal() {
    document.querySelector("div.overlay").classList.toggle("overlay--hidden");
    document.querySelector("div.modal").classList.toggle("modal--hidden");
    form.reset();
}

function submitBook(event){
    console.log(form);
}


function Book(title, author, pages, read=false){
    this.title = title;
    this.author = author;
    this.pages = pages;
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

