const myLibrary = [];

function Book(title,author,pages,read){
  if(!new.target){
    throw Error("Use new for this constructor")
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  // this.info = function(){
  //   let read_or_not_read = "already read";
  //   if(this.read === false){
  //     read_or_not_read = "not read yet";
  //   }
  //   return(this.title + " by " + this.author +", " + this.pages + " pages, " + read_or_not_read);
  // }
}

function addBookToLibrary(obj) {
  // take params, create a book then store it in the array
}

// const thehobbit = new Book('The Hobbit', 'J.R.R Tolkien', 285,false);
// console.log(thehobbit.info());
