let myLibrary = [];

const root = document.documentElement;
const mainLibrary = document.querySelector(".book-container");
const modal = document.querySelector("#add-book-modal");
const addBookForm = document.querySelector("#add-book-form");

function Book(id, title, author, pages, date, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.date = date;
  this.read = read;
  this.toggleRead = function () {
    this.read = !this.read;
    let card = document.querySelector(`[data-id="${this.id}"]`);
    if (this.read) {
      card.classList.add("read");
    } else {
      card.classList.remove("read");
    }
  };
}

function generateID() {
  if (myLibrary.length == 0) {
    return 0;
  }
  return myLibrary[myLibrary.length - 1].id + 1;
}

function createBookCard(book) {
  let card = document.createElement("div");

  //add classes and data-id attribute

  card.classList.add("book");
  if (book.read) {
    card.classList.add("read");
  }
  card.setAttribute("data-id", book.id);

  //create title and book detail elements and add them to the card
  let cardDetails = document.createElement("div");
  cardDetails.classList.add(".book-details");
  cardDetails.appendChild(document.createElement("h2")).innerHTML = book.title;
  cardDetails.appendChild(document.createElement("p")).innerHTML =
    "By: " + book.author;
  cardDetails.appendChild(document.createElement("p")).innerHTML =
    "Number of pages: " + book.pages;
  cardDetails.appendChild(document.createElement("p")).innerHTML =
    "Published: " + book.date;
  card.appendChild(cardDetails);

  //create read toggle and delete buttons and add them to the card
  let cardButtons = document.createElement("div");
  cardButtons.classList.add("book-buttons");
  tempButton = document.createElement("button");
  tempButton.innerHTML = "Read";
  tempButton.addEventListener("click", function (e) {
    const id = parseInt(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );

    myLibrary.find((book) => {
      return parseInt(book.id) == id;
    }).toggleRead;
  });
  cardButtons.appendChild(tempButton);
  tempButton = document.createElement("button");
  tempButton.innerHTML = "Remove";
  tempButton.addEventListener("click", function (e) {
    const parent = e.target.parentElement.parentElement;
    removeBook(parseInt(parent.getAttribute("data-id")));
  });
  cardButtons.appendChild(tempButton);
  card.appendChild(cardButtons);
  mainLibrary.insertBefore(card, mainLibrary.lastElementChild);
}

function removeBook(id) {
  mainLibrary.removeChild(document.querySelector(`[data-id="${id}"]`));
  myLibrary = myLibrary.filter((book) => {
    return parseInt(book.id) != id;
  });
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  createBookCard(book);
}

myLibrary.forEach((book) => {
  createBookCard(book);
});

document.querySelectorAll(".show-add").forEach((button) => {
  button.addEventListener("click", () => {
    modal.showModal();
  });
});

addBookForm.addEventListener("submit", () => {
  let formData = new FormData(addBookForm);
  let newBook = new Book(
    generateID(),
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("date"),
    formData.get("read")
  );
  addBookToLibrary(newBook);
  addBookForm.reset();
});

addBookForm.addEventListener("reset", () => {
  modal.close();
});

document.querySelector("#theme-button").addEventListener("click", function () {
  if (root.classList.contains("light")) {
    root.classList.remove("light");
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
  }
});
