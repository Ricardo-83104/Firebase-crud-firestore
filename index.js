import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from "./firebase.js"


//seleccionar el task-form
const taskForm = document.getElementById('task-form')
//seleccionar el div tasks-container
const tasksContainer = document.getElementById('tasks-container')

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {
    //esta activamente escuchando si hay cambios

    onGetTasks((querySnapshot) => {
        let html = ''

        //recorrer los datos y rellenar el html
        querySnapshot.forEach(doc => {
            const task = doc.data()
            html += `
            <div class="card card-body mt-2 border-primary">
                <h3 class="h5">${task.title}</h3>
                <p>${task.description}</p>
                <div>
                <button class='btn btn-primary btn-delete' data-id="${doc.id}">Delete</button>
                <button class='btn btn-secondary btn-edit' data-id="${doc.id}">Edit</button>

                </div>
            </div>
            `
        })
        //poner los datos en el task-container
        tasksContainer.innerHTML = html

        const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                deleteTask(dataset.id)
            })
        })

        const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                const doc = await getTask(e.target.dataset.id)
                const task = doc.data()

                taskForm['task-title'].value = task.title
                taskForm['task-description'].value = task.description

                editStatus = true
                id = e.target.dataset.id;

                taskForm['btn-task-save'].innerText = 'Update'

            })
        })

    })
})



taskForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const title = taskForm['task-title']
    const description = taskForm['task-description']

    if (!editStatus) {
        saveTask(title.value, description.value)
    } else {
        updateTask(id, {
            title: title.value,
            description: description.value,
        });

        //para poder seguir añadiendo datos
        editStatus = false;
    }

    taskForm.reset()
})