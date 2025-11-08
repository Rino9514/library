const bodySection = document.querySelector("tbody");


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
  this.info = function(){
    return(this.title + " by " + this.author +", " + this.pages + " pages, " + this.read + this.id);
  }
}

function displayBookInLibrary(){
  bodySection.innerHTML = "";
  if(myLibrary.length !== 0) {
    myLibrary.forEach((elements) => {
      const row = document.createElement("tr");

      Object.values(elements).forEach(value => {
        if (typeof value !== "function") {
          const cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);
        }
        else {
          const cell = document.createElement("td");
          const btn = document.createElement("button");
          btn.textContent = "Delete";
          btn.dataset.id = elements.id;
          cell.appendChild(btn);
          row.appendChild(cell);
        }
      });
      bodySection.appendChild(row);
    });
  }
  else {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = "No books in the library";
    row.appendChild(cell);
    cell.colSpan = 6;
    bodySection.appendChild(row);
  }
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
  }
});

function addBookToLibrary() {
  // take params, create a book then store it in the array
  myLibrary.push(new Book('The Hobbit', 'J.R.R Tolkien', 285,false))
  myLibrary.push(new Book('Lord of the ring', 'J.R.R Tolkien', 458,true))
  displayBookInLibrary();
}

addBookToLibrary();
// const thehobbit = new Book('The Hobbit', 'J.R.R Tolkien', 285,false);
console.log(myLibrary[0].info());
