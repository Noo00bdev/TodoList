

const listItem = document.querySelector('.listItems')
const btn = document.querySelector('.btnAdd')
btn.addEventListener('click', function(e){
    e.preventDefault()
    
    const form = document.querySelector('.todo')
    listItem.classList.toggle('listItem')
    
    const taskInput = document.querySelector('#taskInput')
    const taskValue = taskInput.value

    if(!taskValue) return

    const taskDiv = document.createElement('div')
    taskDiv.classList.toggle('list')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'

    const taskContent = document.createElement('p')
    taskContent.innerText = taskValue
    taskDiv.append(checkbox)
    taskDiv.append(taskContent)


    listItem.append(taskDiv)


    form.reset()
    

})

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



const Delete = document.querySelector('.del')


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