class Book {
  #card = null;

  constructor(
    id,
    title,
    author = "unknown",
    pages = "unknown",
    date = "unknown",
    read
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.date = date;
    this.isRead = read;
  }

  createCard() {
    if (this.#card != null) {
      return this.#card;
    } else {
      this.#card = document.createElement("div");
    }
    this.#card.classList.add();
    this.#card.classList.add("book");
    if (this.isRead) {
      this.#card.classList.add("read");
    }
    this.#card.setAttribute("data-id", this.id);

    let cardDetails = document.createElement("div");
    cardDetails.classList.add("book-details");
    cardDetails.appendChild(document.createElement("h2")).innerHTML =
      this.title;
    cardDetails.appendChild(document.createElement("p")).innerHTML =
      "By: " + this.author;
    cardDetails.appendChild(document.createElement("p")).innerHTML =
      "Number of pages: " + this.pages;
    cardDetails.appendChild(document.createElement("p")).innerHTML =
      "Published: " + this.date;
    this.#card.appendChild(cardDetails);
    let tempButton;
    let cardButtons = document.createElement("div");
    cardButtons.classList.add("book-buttons");
    tempButton = document.createElement("button");
    tempButton.innerHTML = "Read";
    tempButton.addEventListener("click", function (e) {
      const id = e.target.parentElement.parentElement.getAttribute("data-id");
      myLibrary.findBook(id).toggleRead();
    });
    cardButtons.appendChild(tempButton);
    tempButton = document.createElement("button");
    tempButton.innerHTML = "Remove";
    tempButton.addEventListener("click", function (e) {
      const parent = e.target.parentElement.parentElement;
      myLibrary.removeBook(parseInt(parent.getAttribute("data-id")));
    });
    cardButtons.appendChild(tempButton);
    this.#card.appendChild(cardButtons);

    return this.#card;
  }

  toggleRead() {
    this.isRead = !this.isRead;
    let card = document.querySelector(`[data-id="${this.id}"]`);
    if (this.isRead) {
      card.classList.add("read");
    } else {
      card.classList.remove("read");
    }
    myLibrary.updateInfo();
  }
}

const myLibrary = new (class {
  #books = [];
  libraryUI = document.querySelector(".book-container");
  infoUI = document.querySelector(".library-info");

  constructor() {
    this.addBook(new Book(this.generateID(), "y", "f", 734, 752, true));
    this.addBook(new Book(this.generateID(), "b", "c", 423, 252, true));
    this.addBook(new Book(this.generateID(), "a", "z", 123, 152, true));
    this.addBook(new Book(this.generateID(), "f", "a", 534, 552, true));

    this.createAddCard();
  }

  generateID() {
    return this.#books.length == 0
      ? 0
      : this.#books[this.#books.length - 1].id + 1;
  }

  addBook(book) {
    this.#books.push(book);
    this.libraryUI.insertBefore(book.createCard(), this.libraryUI.lastChild);
    this.updateInfo();
  }

  removeBook(id) {
    this.libraryUI.removeChild(document.querySelector(`[data-id="${id}"]`));
    this.#books = this.#books.filter((book) => {
      return parseInt(book.id) != id;
    });
    this.updateInfo();
  }

  updateInfo() {
    let read = 0,
      unread = 0,
      total = this.#books.length;
    this.#books.forEach((book) => {
      if (book.isRead) {
        read++;
      } else {
        unread++;
      }
    });

    this.infoUI.children[0].innerText = "Read Books: " + read;
    this.infoUI.children[1].innerText = "Unread Books: " + unread;
    this.infoUI.children[2].innerText = "Total Books: " + total;
  }

  findBook(id) {
    return this.#books.find((book) => {
      return (book.id = id);
    });
  }
  sort() {
    this.#books.sort(function (a, b) {
      let result =
        a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0;
      return result;
    });

    this.rebuildLibrary();
  }

  createAddCard() {
    let addCard = document.createElement("div");
    addCard.id = "add";
    addCard.classList.add("show-add");
    addCard.addEventListener("click", () => {
      modal.showModal();
    });
    addCard.innerText = "+";
    this.libraryUI.appendChild(addCard);
  }

  rebuildLibrary() {
    while (this.libraryUI.firstChild) {
      this.libraryUI.removeChild(this.libraryUI.firstChild);
    }
    this.#books.forEach((book) => {
      this.libraryUI.appendChild(book.createCard());
    });
    this.createAddCard();
  }
})();

const root = document.documentElement;
const modal = document.querySelector("#add-book-modal");
const addBookForm = document.querySelector("#add-book-form");
const filter = document.querySelector("#sort-by");

document.querySelectorAll(".show-add").forEach((button) => {
  button.addEventListener("click", () => {
    modal.showModal();
  });
});

addBookForm.addEventListener("submit", () => {
  let formData = new FormData(addBookForm);
  let newBook = new Book(
    myLibrary.generateID(),
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("date"),
    formData.get("read")
  );
  myLibrary.addBook(newBook);
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

  myLibrary.sort();
});
