const firebaseConfig = {
  apiKey: "AIzaSyCgQdb4_fxAyRMr4eW6_MMvKXxq1x5u0g4",
  authDomain: "task-cards-5df0b.firebaseapp.com",
  projectId: "task-cards-5df0b",
  storageBucket: "task-cards-5df0b.firebasestorage.app",
  messagingSenderId: "152537910395",
  appId: "1:152537910395:web:cc15c86f27205724de26de"
}; 

firebase.initializeApp(firebaseConfig);  //creates an app instance based on the firebaseConfig object
const db = firebase.firestore();  //Initializes and returns the Firestore database instance for your Firebase app

function toggleModal() {
    const modal = document.getElementById("modal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

async function saveCard(card){
    try{
        await db.collection("cards").add({
            title:card.title,
            content:card.content,
            created: new Date()
        })
    }catch(err){
        console.error("Failed to save card:",err);
    }
}

async function loadCards(){
    try{
        const snapshots = await db.collection("cards").get();
        const cards = snapshots.docs.map(doc => doc.data());
        renderCards(cards);
    }catch(err){
        console.error("Failed to load cards",err);
    }
}

function renderCards(cards){
    const container = document.querySelector(".projects-grid");

    cards.forEach(card => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h3>${card.title}</h3><p>${card.content}</p>`;
        container.appendChild(div);
    });
}

async function addTask(){
    const title = document.getElementById("taskTitle").value;
    const content = document.getElementById("taskContent").value;
    if (!title || !content) return;

    const newCard = {title, content};
    saveCard(newCard);
    renderCards([newCard]);

    toggleModal();
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskContent").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    loadCards();
});