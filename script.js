const bodySection = document.querySelector("tbody");
const newBookButton = document.querySelector(".wrapper > button");

const addBookDialog = document.querySelector("dialog");
const addBookDialogButton = document.querySelector("#add");
const closeDialogButton = document.querySelector("#close");

const myLibrary = [];

function Book(title,author,pages,read){
  if(!new.target){
    throw Error("Use new for this constructor")
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
  this.read = read;
}

Book.prototype.info = function(){
  return(this.title + " by " + this.author +", " + this.pages + " pages, " + this.read + " " + this.id);
}

Book.prototype.toggleRead = function(){
  this.read = !this.read;
}

function displayBookInLibrary(){
  bodySection.innerHTML = ""; // suppression of everything in the body section
  if(myLibrary.length !== 0) {
    myLibrary.forEach((elements) => {
      const row = document.createElement("tr");
      Object.values(elements).forEach(value => {
        if(typeof value === "boolean") { // checkbox
          const cell = document.createElement("td");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = value;
          checkbox.dataset.id = elements.id; // to know what book it is
          cell.appendChild(checkbox);
          row.appendChild(cell);
        }
        else {
          const cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);
        }
      });
      //delete button
      const cell = document.createElement("td");
      const btn = document.createElement("button");
      btn.textContent = "Delete";
      btn.dataset.id = elements.id;
      btn.classList.add("shadow");
      cell.appendChild(btn);
      row.appendChild(cell);

      bodySection.appendChild(row);
    });
  }
  else {
    emptyLibrary();
  }
}

function emptyLibrary() {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.textContent = "No books in the library";
  row.appendChild(cell);
  cell.colSpan = 6;
  bodySection.appendChild(row);
}

// Utiliser la délégation d’événement pour éviter d'avoir 50 écouteurs d'événement
// (ne pas les mettres à l'endroit de la création des bouton)
bodySection.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const row = event.target.closest("tr"); // récupère la ligne parente
    const idToDelete = event.target.dataset.id; // récupère l'id
    const index = myLibrary.findIndex(book => book.id === idToDelete);

    row.remove(); // supprime la ligne du DOM
    if (index !== -1) {
      myLibrary.splice(index, 1); // supprime l'objet directement
    }
  if(myLibrary.length === 0) {
    emptyLibrary();
  }
  }

});
// on utilise la même methode pour le checkbox car de base les inputs existent pas et cela créé une au commencement si on utilise un querySelector checkbox
bodySection.addEventListener("change", (event) => {
  if (event.target.tagName === "INPUT") {
    const idToToggle = event.target.dataset.id; // récupère l'id
    const index = myLibrary.findIndex(book => book.id === idToToggle);
    if (index !== -1) myLibrary[index].toggleRead();
  }
});

function addBookToLibrary(title, author, pages, read) {
  // create a book then store it in the array
  // myLibrary.push(new Book('The Hobbit', 'J.R.R Tolkien', 285,false))
  // myLibrary.push(new Book('Lord of the ring', 'J.R.R Tolkien', 458,true))
  if (title && author && pages){
    myLibrary.push(new Book(title, author, pages, read));
  }
  displayBookInLibrary();
}

newBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

closeDialogButton.addEventListener("click", (event) => {
  event.preventDefault(); // empêche la soumission
  addBookDialog.close();
});

addBookDialogButton.addEventListener("click", (event) => {
  event.preventDefault(); // empêche la soumission
  addBookDialog.close();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  addBookToLibrary(title,author,pages,read);
});

emptyLibrary();
// addBookToLibrary();
// const thehobbit = new Book('The Hobbit', 'J.R.R Tolkien', 285,false);
// console.log(myLibrary[0].info());
