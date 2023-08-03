"use strict"

let book_list = [];

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".add-book-btn");
const closeModalBtn = document.querySelector(".close-modal-btn");
const formElement = document.getElementById("my-form");
const readBtns = document.querySelectorAll(".card-read");
const cards_block = document.querySelector('.cards');
const removeCardBtns = document.querySelectorAll('.remove-card-btn');


openModalBtn.addEventListener("click", openModal);
overlay.addEventListener('click', closeModal);
closeModalBtn.addEventListener('click', closeModal);


function openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    formElement.reset();
}

function switch_read() {
    this.classList.toggle('book-read');
    if (this.classList.contains('book-read')) {
        this.textContent = "Read";
    } else {
        this.textContent = "Not read";
    }
}

function remove_card(bookObj) {
    let remove_confirm = confirm(`Delete ${bookObj.title} from library?`);
    if (remove_confirm) {
    book_list.forEach((el, index) => {
        if (el.title == bookObj.title) {
            book_list.splice(index, 1);
            refresh_cards();
            }
        });
    }
}

formElement.addEventListener('submit', (event) => {
    event.preventDefault()
    let formData = new FormData(formElement);
    addBookToLibrary(formData);
    closeModal();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = Boolean(read);
}

function refresh_cards() {
    cards_block.replaceChildren();
    for (let book of book_list) {
        addCard(book);
    }
}


function addBookToLibrary(formData) {
    let title = formData.get('title');
    let author = formData.get('author');
    let pages = formData.get('pages');
    let read = formData.get('read');
    read = (read == "on") ? true: false;
    let book = new Book(title, author, pages, read);
    book_list.push(book);
    refresh_cards();
}

function addCard(bookObj) {
    let card = document.createElement('div');
    let title = document.createElement('p');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let read = document.createElement('button');
    let remove_btn = document.createElement('input');
    remove_btn.setAttribute("type", "image");
    remove_btn.setAttribute("src", "img/window-close.svg");
    card.className = 'card';
    title.className = 'card-title';
    author.className = 'card-author';
    pages.className = 'card-pages';
    remove_btn.className = 'remove-card-btn';
    read.className = (bookObj.read) ? 'card-read book-read': 'card-read';
    title.appendChild(document.createTextNode(bookObj.title));
    author.appendChild(document.createTextNode(bookObj.author));
    pages.appendChild(document.createTextNode(bookObj.pages + " pages"));
    let btn_text = (read.classList.contains('book-read')) ? "Read": "Not read"; 
    read.appendChild(document.createTextNode(btn_text));
    read.addEventListener('click', switch_read);
    remove_btn.addEventListener('click', function() {
        remove_card(bookObj);
    });
    card.appendChild(remove_btn);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    cards_block.appendChild(card);
}

let book_example1 = {
    title: 'Teasing Master Takagi-san',
    author: 'Soichiro Yamamoto',
    pages: 805,
    read: true
}

let book_example2 = {
    title: 'When Will Ayumu Make His Move?',
    author: 'Soichiro Yamamoto',
    pages: 711,
    read: true
}

let book_example3 = {
    title: 'Kaguya-sama: Love Is War',
    author: 'Aka Akasaka',
    pages: 1009,
    read: false
}

book_list.push(book_example1, book_example2, book_example3);
refresh_cards();




