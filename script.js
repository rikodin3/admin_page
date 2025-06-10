function toggleModal() {
    const modal = document.getElementById("modal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function saveCards(cards){
    localStorage.setItem("cards",JSON.stringify(cards));
}

function loadCards(){
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : [];
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

function addTask(){
    const title = document.getElementById("taskTitle").value;
    const content = document.getElementById("taskContent").value;
    if(!title || !content) return;

    const cards = loadCards();
    cards.push({ title , content});
    saveCards(cards);
    renderCards(cards);

    toggleModal();
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskContent").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    renderCards(loadCards())
});