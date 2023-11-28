let myLibrary = [];

const root = document.documentElement;
const mainLibrary = document.querySelector(".book-container");
const modal = document.querySelector("#add-book-modal");
const addBookForm = document.querySelector("#add-book-form");
const libraryInfo = document.querySelector(".library-info");
const filter = document.querySelector("#sort-by");

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
    updateInfo();
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
  cardDetails.classList.add("book-details");
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
    const id = e.target.parentElement.parentElement.getAttribute("data-id");

    myLibrary
      .find((book) => {
        return book.id == id;
      })
      .toggleRead();
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

  return card;
}

function removeBook(id) {
  mainLibrary.removeChild(document.querySelector(`[data-id="${id}"]`));
  myLibrary = myLibrary.filter((book) => {
    return parseInt(book.id) != id;
  });
  updateInfo();
}

function updateInfo() {
  let read = 0,
    unread = 0,
    total = myLibrary.length;
  myLibrary.forEach((book) => {
    if (book.read) {
      read++;
    } else {
      unread++;
    }
  });

  libraryInfo.children[0].innerText = "Read Books: " + read;
  libraryInfo.children[1].innerText = "Unread Books: " + unread;
  libraryInfo.children[2].innerText = "Total Books: " + total;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  mainLibrary.insertBefore(createBookCard(book), mainLibrary.lastElementChild);
  updateInfo();
}

function createAddCard() {
  let addCard = document.createElement("div");
  addCard.id = "add";
  addCard.classList.add("show-add");
  addCard.addEventListener("click", () => {
    modal.showModal();
  });
  addCard.innerText = "+";
  mainLibrary.appendChild(addCard);
}

function rebuildLibrary() {
  while (mainLibrary.firstChild) {
    mainLibrary.removeChild(mainLibrary.firstChild);
  }
  myLibrary.forEach((book) => {
    mainLibrary.appendChild(createBookCard(book));
  });
  createAddCard();
}

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

filter.addEventListener("change", function () {
  sortKey = filter.value;

  myLibrary.sort(function (a, b) {
    let result = a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0;
    return result;
  });

  console.table(myLibrary);

  rebuildLibrary();
});

addBookToLibrary(new Book(generateID(), "y", "f", 734, 752, true));
addBookToLibrary(new Book(generateID(), "b", "c", 423, 252, true));
addBookToLibrary(new Book(generateID(), "a", "z", 123, 152, true));
addBookToLibrary(new Book(generateID(), "f", "a", 534, 552, true));

createAddCard();
