const myLibrary = [];
const themeButton = document.querySelector("#theme-button");
const root = document.documentElement;
const headerIcons = document.querySelectorAll(".filter-light");

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
  this.info = function () {
    let infoString =
      this.title + " by " + this.author + ", " + this.pages + " pages, ";
    if (read) {
      infoString += "already read";
    } else {
      infoString += "not yet read";
    }
    return infoString;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}
