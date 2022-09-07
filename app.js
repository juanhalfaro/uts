console.log('conetau')
const formulario = document.getElementById('formulario')
const ListaTareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()

let tareas = {}

document.addEventListener('DOMContentLoaded', () => {console.log('ya lo tengo abierto')})

formulario.addEventListener('submit', event => { e.preventDefault() 
    console.log('evento', event)
    setTarea(event)
})

    const setTarea = e =>
    {
        const texto = e.target.querySelector('input').value
        //console.log(texto)
        if(texto.trim() === ''){
            console.log('cadena vacia')
            return
        }
        const tarea = {
            id: Date.now(),
            texto: texto,
            estado: false
        }

        console.log('tarea', tarea)
        tareas[tarea.id] = tarea    
        pintartareas()
        formulario.reset()
        e.target.querySelector('input').focus()    
    }

    const pintartareas = () => {
        localStorage.setItem('tareas', JSON.stringify(tareas))
        if(Object.values(tareas).length === 0)
        {
            ListaTareas.innerHTML = 
            `
             <div class="alert alert-dark" >sin tareas berga</div>

            `
            return
        }
        ListaTareas.innerHTML = ''
        Object.values(tareas).forEach( item => {
            //console.log('item', item)
            const clone = template.cloneNode(true)
            clone.querySelector('p').textContent = item.texto
                if(item.estado){
                    clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
                    clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
                    clone.querySelector('p').style.textDecoration = 'line-through'
                    
                }   
                clone.querySelectorAll('.fas')[0].dataset.id = item.id
                clone.querySelectorAll('.fas')[].dataset.id = item.id
                fragment.appendChild(clone)
        })
        ListaTareas.appendChild(fragment)

        const btnAcciones = e =>{
            if(e.target.classList.contains('fa-minus-circle'))
                delete tareas[e.target.dataset.id]
                pintartareas()
        }
        e.stop.Propagation();
    }
