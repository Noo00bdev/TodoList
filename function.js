
const listItem = document.querySelector('#listItems')
const AffDate = document.querySelector('.date')
if (!window.containers) window.containers = {}
export function sauvegarderTaches(listItem, tasks) {
  // On sélectionne toutes les tâches dans la liste
  const elements = listItem.querySelectorAll('.list');


  // On recrée le tableau des tâches
  Array.from(elements).forEach(item => {
    const text = item.querySelector('p').textContent.trim(); // le texte de la tâche
    const done = item.querySelector('input[type="checkbox"]').checked; // état de la case
    
    const existingTask = tasks.find(t => t.text === text);
    if (existingTask) {
        existingTask.done = done; // ✅ met à jour l’état
    } else {
        tasks.push({ text, done }); // ➕ ajoute une nouvelle tâche
    }
    return { text, done };
  });

  // On sauvegarde le tableau dans le localStorage
  localStorage.setItem('list', JSON.stringify(tasks));
}
/**
 * 
 * @param {String} Value
 * @param {Object} tasks
 */
export function afficherTache(Value,tasks, dateValue) {
    const history = document.querySelector('#history')

    // format de la date
    const dateStr = AfficherDate(dateValue)

    // objet global pour les conteneurs
    if (!window.containers) window.containers = {}

    // créer le conteneur pour la date si nécessaire
    if (!window.containers[dateStr]) {
        const container = document.createElement("div")
        container.className = "mb-6 p-4 bg-gray-100 rounded shadow" // ton style Tailwind
        container.dataset.date = dateStr

        const dateTitle = document.createElement("h2")
        dateTitle.textContent = dateStr
        dateTitle.className = "text-lg font-bold mb-2"

        container.appendChild(dateTitle)
        listItem.appendChild(container)

        window.containers[dateStr] = container
    }

    const container = window.containers[dateStr]

    // créer la tâche
    const taskDiv = document.createElement('div')
    taskDiv.className = "list flex flex-row gap-5 items-center border-none bg-white p-2 m-2 rounded relative w-full"

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = "w-5 h-5 cursor-pointer"

    const taskContent = document.createElement('p')
    taskContent.innerText = Value
    taskContent.className = "font-bold"
    taskContent.setAttribute("contenteditable", "true")
    taskContent.setAttribute('data-date', dateStr)
    // Le button supprimer
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = `
        <img src="delete.png">
    `
    deleteBtn.addEventListener('click', ()=>{
        taskDiv.remove()
        tasks = tasks.filter(t => t.text !== taskContent.innerText)
        localStorage.setItem('list', JSON.stringify(tasks))
    })
    deleteBtn.className ="absolute right-0 bg-red-900 p-2 rounded-xs"
    checkbox.addEventListener("change",()=>sauvegarderTaches(listItem, tasks) )
    taskContent.addEventListener('focus', () => {
        taskContent.className = "outline-none";
        taskDiv.classList.toggle("border-blue-600");
    });
    taskContent.addEventListener("keydown", (e)=> {
        if(e.key === "Enter"){
            e.preventDefault
            sauvegarderTaches(listItem, tasks)
            console.log(e.key)
        }
    })

    checkbox.addEventListener("change", () => sauvegarderTaches(listItem, tasks))

    taskDiv.append(checkbox, taskContent, deleteBtn)
    
    container.appendChild(taskDiv)
    
}

/**
 * 
 * @param {JSON} tasks 
 */
export function Alltask(tasks){
    tasks.forEach(task => {
        //recupere la date de chaque task
        const dateStr = task.date
        // créer le conteneur si nécessaire
        if (!window.containers[dateStr]) {
            const containerDiv = document.createElement("div")
            containerDiv.dataset.date = dateStr
            containerDiv.className = "mb-6 p-4 bg-gray-100 rounded shadow"
            const dateTitle = document.createElement("h2")
            dateTitle.textContent = dateStr
            dateTitle.className = "text-lg font-bold mb-2"
            containerDiv.appendChild(dateTitle)
            //assigne la valeur de containerDiv a la dateStr
            window.containers[dateStr] = containerDiv
        }
        const container = window.containers[dateStr]
        // ajouter la tâche dans le conteneur
        const taskDiv = document.createElement('div')
        taskDiv.className = "list flex flex-row gap-5 items-center border-none bg-white p-2 m-2 rounded relative w-full"

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.className = "w-5 h-5 cursor-pointer"

        const taskContent = document.createElement('p')
        taskContent.innerText = task.text
        taskContent.className = "font-bold"

        taskContent.setAttribute('data-date', dateStr)
        // Le button supprimer
        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = `
            <img src="delete.png">
        `
        deleteBtn.addEventListener('click', ()=>{
            taskDiv.remove()
            tasks = tasks.filter(t => t.text !== taskContent.innerText)
            localStorage.setItem('list', JSON.stringify(tasks))
        })
        deleteBtn.className ="absolute right-0 bg-red-900 p-2 rounded-xs"
        taskDiv.append(checkbox, taskContent, deleteBtn)
        // assigne chaque task à sa date 
        window.containers[dateStr].appendChild(taskDiv)
        container.append(taskDiv)
        listItem.append(container)
    })   
}


/**
 * 
 * @param {never} e 
 * @param {HTMLBodyElement} value 
 */
export function ChangeTheme(e, value){
    e.preventDefault()
    value.classList.toggle('bg-gray-900/80')
}

/**
 * Format une Date en chaîne jour/mois/année.
 *
 * @param {Date} date - Objet Date à formater.
 * @returns {string} La date formatée sous la forme 'JJ/MM/YYYY'.
 */

export function AfficherDate(date) {
  // Exemple : renvoie une date au format 17/10/2025
  const d = new Date(date)
  return d.toLocaleDateString("fr-FR")
}

