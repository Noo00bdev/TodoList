import { afficherTache, ChangeTheme, sauvegarderTaches} from "./function.js"

const listItem = document.querySelector('#listItems')
const btn = document.querySelector('#btnAdd')
const checked = document.querySelector('#checked')
const Nocheck = document.querySelector('#no-checked')
const delAll = document.querySelector('#delAll')
const history = document.querySelector('#history')
const body = document.body
const title = document.querySelector('#title')
const theme = document.querySelector('#themeToggle')

// store les listes sous formes json dans le localStorage
let tasks = JSON.parse(localStorage.getItem('list')) || [];

btn.addEventListener('click', function(e){
    e.preventDefault()
    const form = document.querySelector('#todo')
    listItem.classList.toggle('listItem')

    // recupere les données de l'input
    const taskInput = document.querySelector('#taskInput')
    const taskValue = taskInput.value
    if(!taskValue) return
    afficherTache(taskValue, tasks)

    // met la taches dans tasks
    tasks.push({text: `${taskValue}`, done : false})
    // Sauvegarde dans le localSt"Nouvelle tâche dans localStorage
    localStorage.setItem('list', JSON.stringify(tasks));


    form.reset()
})

// change le theme 
theme.addEventListener('click', (e) => {
    ChangeTheme(e, body)
    title.classList.toggle('text-white')
})




checked.addEventListener('click', function(){
    if(Nocheck.classList.contains('selected')){
        Nocheck.classList.remove('selected')
    }
    checked.classList.toggle('selected')
    const all = document.querySelectorAll('.list')
    all.forEach(item => {
        const isChecked = item.querySelector('input[type = "checkbox"]').checked
        item.style.display = isChecked ? 'flex' : 'none'   
    })
})
    


Nocheck.addEventListener('click', function(){
    Nocheck.classList.toggle('selected')
    if(checked.classList.contains('selected')){
        checked.classList.remove('selected')
    }
    const all = document.querySelectorAll('.list')
    all.forEach(item => {
        const IsNotChecked = !item.querySelector('input[type = "checkbox"]').checked
        item.style.display = IsNotChecked ? 'flex' : 'none'
    })
    
})



// button pour tout suprimer sur la page
delAll.addEventListener('click', function(e){
    e.preventDefault()
    //selectionner toute les task
    const allTasks = document.querySelectorAll('.list')
    //parcourir les tache avec foreach
    allTasks.forEach(items => {
        items.remove()
    })
    localStorage.removeItem('list')
})



// Afficher les tâches existantes
tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = "list flex flex-row gap-5 items-center border-none bg-white p-2 m-2 rounded relative w-full";

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.className = "w-5 h-5 cursor-pointer";

    const taskContent = document.createElement('p');
    taskContent.innerText = task.text;
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
        localStorage.removeItem('list')
    })
    deleteBtn.className ="absolute right-0 bg-red-900 p-2 rounded-xs"

    // div.append(checkbox, taskContent)
    taskDiv.append(checkbox, taskContent , deleteBtn);
    history.append(taskDiv);
});


