const myLibrary = [
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: true,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: true,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: true,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: true,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: true,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: true,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: false,
  },
];

const root = document.documentElement;
const mainLibrary = document.querySelector(".book-container");
const modal = document.querySelector("#add-book-modal");
const addBookForm = document.querySelector("#add-book-form");

let read = 0;
let unread = 0;
let total = 0;

function Book(title, author, pages, date, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.date = date;
  this.read = read;
}

function createBookCard(book) {
  let card = document.createElement("div");
  card.classList.add("book");
  if (book.read) {
    card.classList.add("read");
  } else {
    card.classList.add("unread");
  }
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
  let cardButtons = document.createElement("div");
  cardButtons.classList.add("book-buttons");
  cardButtons.appendChild(document.createElement("button"));
  cardButtons.appendChild(document.createElement("button"));
  card.appendChild(cardButtons);
  mainLibrary.insertBefore(card, mainLibrary.lastElementChild);
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
