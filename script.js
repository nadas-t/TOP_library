let myLibrary = [];

const book1 = {
  author: "George Orwell",
  title: "1984",
  numPages: 328,
  isRead: true,
  id: 1
};

const book2 = {
  author: "Harper Lee",
  title: "O Sol é para Todos",
  numPages: 281,
  isRead: false,
  id: 2
};

const book3 = {
  author: "J.R.R. Tolkien",
  title: "O Senhor dos Anéis: A Sociedade do Anel",
  numPages: 423,
  isRead: true,
  id: 3
};

const book4 = {
  author: "Yuval Noah Harari",
  title: "Sapiens: Uma Breve História da Humanidade",
  numPages: 464,
  isRead: false,
  id: 4
};

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);


function Book(author,title,numPages,isRead) {
  // the constructor...
  this.author=author;
  this.title=title;
  this.numPages=numPages;   
  this.isRead=isRead;
  this.id=crypto.randomUUID()
}

function addBookToLibrary(author,title,numPages,isRead) {
  const Nbook= new Book(author,title,numPages,isRead)
  myLibrary.push(Nbook)
}

const cardsContainer=document.getElementById("cards-container") 
const newBookBtn=document.querySelector(".new-book-btn")
const dialog=document.querySelector("dialog")
const formsNewBook=document.getElementById("new-book-form")
const submitFormBtn=document.querySelector(".form-submit")
const cancelFormBtn=document.querySelector(".form-cancel")

function criarCardLivro(livro){
    const card=document.createElement("div")
    card.className="card-livro"
    card.dataset.id = livro.id; 
    
    cardsContainer.appendChild(card)

    const cardInfos=document.createElement("div");
    cardInfos.className="card-infos";
    card.appendChild(cardInfos);
    
    const title=document.createElement("p");
    title.textContent=`Title: ${livro.title}`
    cardInfos.appendChild(title)
    
    const author=document.createElement("p");
    author.textContent=`author: ${livro.author}`
    cardInfos.appendChild(author)
    
    const numPages=document.createElement("p");
    numPages.textContent=`Number of pages: ${livro.numPages}`
    cardInfos.appendChild(numPages)
    
    const isRead=document.createElement("p");
    isRead.textContent=`Status: ${livro.isRead ? "Sim" : "Não"}`
    cardInfos.appendChild(isRead)
    
    // adicionar os comments aqui depois

    const cardButtons=document.createElement("div");
    cardButtons.className="card-buttons";
    card.appendChild(cardButtons);
    
    const butChangeRead=document.createElement("button")
    butChangeRead.textContent="Change Read Status"
    butChangeRead.className="card-button change-read-btn"
    cardButtons.appendChild(butChangeRead)
    
    const butRemoveCard=document.createElement("button")
    butRemoveCard.textContent="Remove this card"
    butRemoveCard.className="card-button DelBookBtn"   
    cardButtons.appendChild(butRemoveCard)   
}

newBookBtn.addEventListener("click",()=>{
    dialog.showModal();
})

cancelFormBtn.addEventListener("click",()=>{
    dialog.close()
})

function iterateBooks(){
    // console.log("rodou iterate")
    cardsContainer.innerHTML = '';
    myLibrary.forEach(book=>{
        criarCardLivro(book)
    })  
    addChangeReadListeners()
    addDeleteBookListeners()
}

formsNewBook.addEventListener("submit",(e)=>{
    // console.log("rodou entrega do forms")
    // console.log("entrou aqui")
    console.log("rodou addevent listener")
    e.preventDefault();

    const authorForm = formsNewBook["form-author"].value;
    const titleForm = formsNewBook["form-title"].value;
    const numPagesForm = formsNewBook["form-numPages"].value;
    const readForm = formsNewBook["form-read"].value;
    const commentForm = formsNewBook["form-comment"].value;
    
    const addedBook=new Book(authorForm,titleForm,numPagesForm,readForm)
    myLibrary.push(addedBook)
    iterateBooks()
    dialog.close()
    formsNewBook.reset();    
})

function addDeleteBookListeners() {
    // console.log("rodou add delete listeners")
    const DeleteBookBtn=document.querySelectorAll(".DelBookBtn")

    DeleteBookBtn.forEach(delbtn=>{
        delbtn.addEventListener("click",()=>{
            const deletedCard=delbtn.closest(".card-livro")
            const livroId = deletedCard.dataset.id
            // console.log(typeof livroId)            
            myLibrary=myLibrary.filter(livro=> String(livro.id) !== livroId)
            console.log(myLibrary)            
            iterateBooks()
        })
    })
}

function addChangeReadListeners() {
    // console.log("rodou change status")
    const changeReadBtn=document.querySelectorAll(".change-read-btn")

    changeReadBtn.forEach(changeStatusBtn=>{
        changeStatusBtn.addEventListener("click",()=>{
            const changeStatusCard=changeStatusBtn.closest(".card-livro")
            const livroId = changeStatusCard.dataset.id
            
            myLibrary.forEach(livro=>{
                if(String(livro.id)===livroId){
                    livro.isRead=!livro.isRead
                }
            })
            iterateBooks()
        })

    })
}
iterateBooks();