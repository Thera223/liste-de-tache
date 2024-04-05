let nouvelleTacheInput = document.getElementById("nouvelle-tache");
let listeTaches = document.getElementById("liste-taches");
let calendrier = document.getElementById("calendrier");
let priorite = document.getElementById("priorite");

// Fonction pour ajouter une tâche
function ajouter() {
  let task = nouvelleTacheInput.value.trim();
  let calendrierContent = calendrier.value.trim();
  let prioriteContent = priorite.value.trim();

  if (!task) {
    alert("Merci de taper quelque chose");
    console.log("Ok");
    return;
  }

  // Création de l'objet tâche avec les informations
  let taskObj = {
    task: task,
    calendrier: calendrierContent,
    priorite: prioriteContent,
  };

  // Ajout de la tâche à la liste
  ajouterTacheToListe(taskObj);

  // Réinitialiser les champs
  nouvelleTacheInput.value = "";
  calendrier.value = "";
  priorite.value = "";
}

// Fonction pour ajouter une tâche à la liste
function ajouterTacheToListe(taskObj) {
  let li = document.createElement("li");
  li.innerHTML = `
    <label>
      <span>${taskObj.task}</span>
      <span>${taskObj.calendrier}</span>
      <span>${taskObj.priorite}</span>
      <button class="supprimer-btn">Supprimer</button>
    </label>
  `;

  listeTaches.appendChild(li);

  // Attacher un gestionnaire d'événements pour le bouton de suppression
  let supprimerBtn = li.querySelector(".supprimer-btn");
  supprimerBtn.addEventListener("click", function () {
    // Supprimer l'élément parent (li) de la liste
    li.remove();
  });
}

// Gestionnaire d'événement pour ajouter une tâche en appuyant sur la touche "Enter"
if (nouvelleTacheInput) {
  nouvelleTacheInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      ajouter();
    }
  });
}

// Charger les tâches existantes depuis le stockage local lorsque la page est chargée
document.addEventListener("DOMContentLoaded", function () {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(function (taskObj) {
    ajouterTacheToListe(taskObj);
  });
});

// Fonction pour sauvegarder les tâches dans le stockage local
function sauvegarderTaches() {
  let taches = [];
  let listeTachesItems = listeTaches.querySelectorAll("li");

  listeTachesItems.forEach(function (item) {
    let task = item.querySelector("span:nth-child(1)").textContent;
    let calendrier = item.querySelector("span:nth-child(2)").textContent;
    let priorite = item.querySelector("span:nth-child(3)").textContent;

    taches.push({
      task: task,
      calendrier: calendrier,
      priorite: priorite,
    });
  });

  localStorage.setItem("tasks", JSON.stringify(taches));
}

// Ajouter un gestionnaire d'événements pour la sauvegarde des tâches lors de la fermeture de la page ou du rechargement
window.addEventListener("beforeunload", sauvegarderTaches);
