let library = [];
const tbl = document.querySelector("div.table");
const addBtn = document.querySelector("button.add");
const clsBtn = document.querySelector("div.modal__close-btn");
const form = document.querySelector("form");

addBtn.addEventListener("click",toggleModal);
clsBtn.addEventListener("click",toggleModal);
form.addEventListener("submit",e => submitBook(e));

function toggleModal() {
    document.querySelector("div.overlay").classList.toggle("overlay--hidden");
    document.querySelector("div.modal").classList.toggle("modal--hidden");
    form.reset();
}

function getBookInfo(){
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked
    return new Book(title,author,pages,read=read);
}

function submitBook(event){
    event.preventDefault(); // prevent page refresh after form submit
    
    let book = getBookInfo();
    addBookToLibrary(book);
    displayBook(book);
    toggleModal();
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

