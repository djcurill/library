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

Book.prototype.toggleRead = function(){
    this.read = (this.read === false) ? true : false;
}

function addBookToLibrary(book){
    library.push(book);
}

function createCell(entry){
    // Creates an entry within a row
    let [key,value] = entry;
    let cell = document.createElement("div");
    cell.style.gridArea = key;

    if (key === "read"){
        cell.appendChild(createToggle(value));
    }
    else {
        cell.textContent = value;
    }
    return cell;
}

function createRow(book){
    // Creates a row within a table
    let row = document.createElement("div");

    for (const key of Object.keys(book)){
        let cell = document.createElement("div");
        cell.style.gridArea = key;

        if (key === "read"){
            cell.appendChild(createToggle(book));
        }
        else {
            cell.textContent = book[key];
        }
        row.appendChild(cell);
    }
    row.appendChild(createRemoveBtn(book.title));
    return row;
}

function displayBook(book){
    let row = createRow(book);
    row.classList.add("row");
    row.classList.add("entry");
    row.setAttribute("data-key",book.title);
    tbl.appendChild(row);
}

function createRemoveBtn(key){
    let btn = document.createElement("button");
    btn.textContent = "REMOVE";
    btn.classList.add("remove-btn");
    btn.setAttribute("data-key",key);
    btn.addEventListener("click",removeBook);
    return btn;
}

function createToggle(book){
    let toggle = document.createElement("input");
    toggle.checked = book.read;
    toggle.setAttribute("type","checkbox");
    toggle.setAttribute("data-key",book.title);
    toggle.addEventListener("click",changeReadStatus);
    return toggle;
}

function changeReadStatus(event){
    let idTitle = event.target.getAttribute("data-key");
    library.forEach(book => {if (book.title === idTitle) (book.toggleRead())});
}

function removeBook(event){
    let removeTitle = event.target.getAttribute("data-key");
    library = library.filter(book => book.title !== removeTitle);
    tbl.removeChild(document.querySelector(`div.row[data-key="${removeTitle}"]`));
}

