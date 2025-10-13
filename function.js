
const listItem = document.querySelector('#listItems')
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
export function afficherTache(Value, tasks) {
    const taskDiv = document.createElement('div');
    taskDiv.className = "list flex flex-row gap-5 items-center border-none bg-white p-2 m-2 rounded relative w-full";

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = "w-5 h-5 cursor-pointer";

    const taskContent = document.createElement('p');
    taskContent.innerText = Value;
    taskContent.className = "font-bold";

    taskContent.setAttribute("contenteditable", "true")
  
    taskContent.addEventListener("keydown", (e)=> {
        if(e.key === "Enter"){
            e.preventDefault()
            sauvegarderTaches(listItem, tasks)
            console.log(e.key)
        }
    })
        
    
    checkbox.addEventListener("change",()=>sauvegarderTaches(listItem, tasks) )
    taskContent.addEventListener('focus', () => {
        taskContent.className = "outline-none";
        taskDiv.classList.toggle("border-blue-600");
    });


    // Le button supprimer
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = `
        <img src="delete.png">
    `
    deleteBtn.addEventListener('click', ()=>{
        taskDiv.remove()
    })
    deleteBtn.className ="absolute right-0 bg-red-900 p-2 rounded-xs"

    // div.append(checkbox, taskContent)
    taskDiv.append(checkbox, taskContent , deleteBtn);
    listItem.append(taskDiv);
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
