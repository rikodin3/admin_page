firebase.initializeApp(firebaseConfig);  //creates an app instance based on the firebaseConfig object
const db = firebase.firestore();  //Initializes and returns the Firestore database instance for your Firebase app

let isEditing = false;
let editingCardId = null;  //setting the editing card
let selectedCard = null; //setting the selected card

function toggleModal(card=null) {  
    const modal = document.getElementById("modal");

    if(card){
        isEditing = true;
        console.log("inside toggle modal",editingCardId);
        document.getElementById("modalHeading").textContent = "Changed your mind?";
        document.getElementById("submitButton").textContent = "Save Changes";
        document.getElementById("taskTitle").value = card.title;
        document.getElementById("taskContent").value = card.content;
    }else{
        isEditing = false;
        editingCardId = null;

        document.getElementById("modalHeading").textContent = "Wanna do something else huh?";
        document.getElementById("submitButton").textContent = "Add";
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskContent").value = "";
    }
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

async function loadCards(){
    try{
        const snapshots = await db.collection("cards").get();
        const cards = snapshots.docs.map(doc => ({
            id: doc.id, //added id to the cards 
            ...doc.data()
        }));
        renderCards(cards);
    }catch(err){
        console.error("Failed to load cards",err);
    }
}

function renderCards(cards){
    const container = document.querySelector(".projects-grid");
    container.innerHTML = '';

    cards.forEach(card => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h3>${card.title}</h3>
            <p>${card.content}</p>
        `;
        div.addEventListener("contextmenu",(e)=> {
            e.preventDefault();
            showContextMenu(e.pageX,e.pageY,card);
            editingCardId = card.id;
        })
        container.appendChild(div);
    });
}

async function startEdit(){
    id = editingCardId;
    console.log(editingCardId);
    console.log(id);
    try{
        const cardRef = await db.collection("cards").doc(id).get();
        const card = cardRef.data();
        document.getElementById("taskTitle").value = card.title;
        document.getElementById("taskContent").value = card.content;
        document.getElementById("submitButton").textContent = "Update"; 
        toggleModal(card);
    }catch{
    }
}

async function deleteCard(){
    id = editingCardId;
    try{    
        await db.collection("cards").doc(id).delete();
        console.log("Card deleted:", id);
        loadCards();
    } catch (err) {
        console.error("Failed to delete card:", err);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    loadCards();
});

function showContextMenu(x,y,card){
    selectedCard = card;
    const menu = document.getElementById("context-menu");
    menu.style.top = `${y}px`;
    menu.style.left = `${x}px`;
    menu.style.display = 'block';
}

document.addEventListener("click",()=>{
    document.getElementById("context-menu").style.display = "none";
});

async function handleSubmit(){
    const title = document.getElementById("taskTitle").value;
    const content = document.getElementById("taskContent").value;
    if(!title||!content) return;
    console.log("This",editingCardId);
    if(isEditing && editingCardId){
        try{
            await db.collection("cards").doc(editingCardId).update({
                title,
                content,
                update: new Date()
            });
            editingCardId = null;
            isEditing = false;
            document.getElementById("submitButton").textContent = "Add Task";
        }catch(err){
            console.error("Error updating card:",err);
        }
    } else {
        try{
            await db.collection("cards").add({
                title,
                content,
                created: new Date()
            });
        } catch(err){
            console.error("Couldnt add the card",err);
        }
    }
    document.querySelector(".projects-grid").innerHTML = '';
    loadCards();
    toggleModal();
}