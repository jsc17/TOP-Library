const myLibrary = [
  {
    title: "The Lost Fleet: Dauntless",
    author: "Jack Campbell",
    pages: 304,
    date: 2006,
    read: true,
  },
];
const themeButton = document.querySelector("#theme-button");
const root = document.documentElement;
const headerIcons = document.querySelectorAll(".filter-light");
const mainLibrary = document.querySelector("main");
const addButton = document.querySelector("#add");

themeButton.addEventListener("click", function () {
  if (root.classList.contains("light")) {
    root.classList.remove("light");
    root.classList.add("dark");
    headerIcons.forEach((icon) => {
      icon.classList.remove("filter-light");
      icon.classList.add("filter-dark");
    });
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
    headerIcons.forEach((icon) => {
      icon.classList.remove("filter-dark");
      icon.classList.add("filter-light");
    });
  }
});

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
  card.appendChild(document.createElement("h2")).innerHTML = book.title;
  card.appendChild(document.createElement("p")).innerHTML =
    "By: " + book.author;
  card.appendChild(document.createElement("p")).innerHTML =
    "Number of pages: " + book.pages;
  card.appendChild(document.createElement("p")).innerHTML =
    "Published: " + book.date;
  console.log(mainLibrary.lastChild);
  mainLibrary.insertBefore(card, mainLibrary.lastElementChild);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  createBookCard(book);
}

createBookCard(myLibrary[0]);

add.addEventListener("click", () => {
  let book = new Book("Ender's game", "Orson Scott Card", 324, 1985, true);
  addBookToLibrary(book);
});
