import { useState  } from "react";
import TaskCreate from "./TaskCreate";
function TaskShow({task,onDelete,onUpdate}){
    //update için başlangıç değeri false olacak bir usestate değişken tanımlayalım
    const [showEdit, setShowEdit] = useState(false)
    const deleteTask = () =>{
        //onDelete diye props oluşturduk  
        onDelete(task.id);
    }
    const editTask = () =>{
        setShowEdit(!showEdit);
    }
    const updateForm = (id,title,description) =>{
        setShowEdit(false);
        onUpdate(id,title,description);
    }
    return(
        <div>
            {
            showEdit
             ?
              <TaskCreate task={task} taskFormUpdate={true} onUpdate={updateForm}></TaskCreate>
            : 
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                {task.title}
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                    {task.description}
                    </div>
                </div>
                <footer class="card-footer">
                    <button onClick={editTask}   class="card-footer-item siltask">Düzenle</button>
                    <button onClick={deleteTask} class="card-footer-item edittask">Sil</button>
                </footer>
            </div>
            }
   
        </div>
    )
}

export default TaskShow;