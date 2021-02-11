let library = [];
const tbl = document.querySelector("div.table");
const addBtn = document.querySelector("button.add-btn");
const clsBtn = document.querySelector("div.modal__close-btn");
const form = document.querySelector("form");

addBtn.addEventListener("click",toggleModal);
clsBtn.addEventListener("click",toggleModal);
form.addEventListener("submit",e => submitBook(e));

function toggleModal() {
    document.querySelector("div.overlay").classList.toggle("overlay--hidden");
    document.querySelector("div.modal").classList.toggle("modal--hidden");
    document.querySelector("div.viewport").classList.toggle("viewport--blur");
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
    // Creates an entry within a row
    let [key,value] = entry;
    let cell = document.createElement("div");
    cell.style.gridArea = key;
    cell.textContent = value;
    return cell;
}

function createRow(book){
    // Creates a row within a table
    let row = document.createElement("div");
    let cells = Object.entries(book).map(createCell);
    cells.forEach(cell => row.appendChild(cell));
    row.appendChild(createRemoveBtn(book.title));
    row.classList.add("row");
    row.classList.add("entry");
    row.setAttribute("data-key",book.title);
    return row;
}

function displayBook(book){
    tbl.appendChild(createRow(book));
}

function createRemoveBtn(key){
    let btn = document.createElement("button");
    btn.textContent = "REMOVE";
    btn.classList.add("remove-btn");
    btn.setAttribute("data-key",key);
    btn.addEventListener("click",removeBook);
    return btn;
}

function removeBook(event){
    let removeTitle = event.target.getAttribute("data-key");
    library = library.filter(book => book.title !== removeTitle);
    tbl.removeChild(document.querySelector(`div.row[data-key="${removeTitle}"]`));
}