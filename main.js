

const listItem = document.querySelector('#listItems')
const btn = document.querySelector('#btnAdd')


btn.addEventListener('click', function(e){
    e.preventDefault()
    const form = document.querySelector('#todo')
    listItem.classList.toggle('listItem')
    const taskInput = document.querySelector('#taskInput')
    const taskValue = taskInput.value
    if(!taskValue) return
    afficherTache(taskValue)


    tasks.push({text: `${taskValue}`} )
    // Sauvegarde dans le localSt"Nouvelle tâche"orage
    localStorage.setItem('list', JSON.stringify(tasks));

    form.reset()
})
// affiche les taches
function afficherTache(taskValue) {
  const taskDiv = document.createElement('div');
  taskDiv.className = "list flex gap-5 items-center bg-blue-600/30 p-2 mt-2 rounded";

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = "w-5 h-5 cursor-pointer";

  const taskContent = document.createElement('p');
  taskContent.innerText = taskValue;
  taskContent.className = "font-bold";

  taskDiv.append(checkbox, taskContent);
  listItem.append(taskDiv);
}



const checked = document.querySelector('#checked')
const Nocheck = document.querySelector('#no-checked')

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



const Delete = document.querySelector('#del')

// Supprime les taches cocher
Delete.addEventListener('click', function(e){
    e.preventDefault()
    //selectionner toute les task
    const allTask = document.querySelectorAll('.list')
    //parcourir les tache avec foreach
    allTask.forEach(item => {
        // selectionner les element input de type checkbox
        if(item.querySelector('input[type = "checkbox"]').checked){
            item.remove()
        }
    })
})


let tasks = JSON.parse(localStorage.getItem('list')) || [];
// Afficher les tâches existantes
const history = document.querySelector('#history')
tasks.forEach(task => {
  const taskDiv = document.createElement('div');
  taskDiv.className = "list flex gap-5 items-center bg-blue-600/30 p-2 mt-2 rounded";

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.className = "w-5 h-5 cursor-pointer";

  const taskContent = document.createElement('p');
  taskContent.innerText = task.text;
  taskContent.className = "font-bold";

  taskDiv.append(checkbox, taskContent);
  history.append(taskDiv);
});
