
const cardsContainer=document.getElementById("cards-container") 
const newBookBtn=document.querySelector(".new-book-btn")
const dialog=document.querySelector("dialog")
const formsNewBook=document.getElementById("new-book-form")
const submitFormBtn=document.querySelector(".form-submit")
const cancelFormBtn=document.querySelector(".form-cancel")

// console.warn("Teste")

class Book {
    static myLibrary = [];
    constructor(author, title, numPages, isRead) {
        // the constructor...
        this.author = author;
        this.title = title;
        this.numPages = numPages;
        this.isRead = isRead;
        this.id = crypto.randomUUID();
        Book.myLibrary.push(this);
    }
    
    static criarCardLivro(livro){

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
}

new Book("George Orwell", "1984", 328, true), // O ID será gerado aqui
new Book("Harper Lee", "O Sol é para Todos", 281, false), // O ID será gerado aqui
new Book("J.R.R. Tolkien", "O Senhor dos Anéis: A Sociedade do Anel", 423, true), // O ID será gerado aqui
new Book("Yuval Noah Harari", "Sapiens: Uma Breve História da Humanidade", 464, false) // O ID será gerado aqui



newBookBtn.addEventListener("click",()=>{
    dialog.showModal();
})

cancelFormBtn.addEventListener("click",()=>{
    dialog.close()
})

function iterateBooks(){
    // console.log("rodou iterate")
    cardsContainer.innerHTML = '';
    Book.myLibrary.forEach(book=>{
        Book.criarCardLivro(book)
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
    
    new Book(authorForm,titleForm,numPagesForm,readForm)
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
            Book.myLibrary=Book.myLibrary.filter(livro=> String(livro.id) !== livroId)
            console.log(Book.myLibrary)            
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
            
            Book.myLibrary.forEach(livro=>{
                if(String(livro.id)===livroId){
                    livro.isRead=!livro.isRead
                }
            })
            iterateBooks()
        })

    })
}
iterateBooks();