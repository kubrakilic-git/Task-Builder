import { useState } from "react";
function TaskCreate({onCreate,task,taskFormUpdate,onUpdate}){
    //task edit kısımından geldi 
     const [title, setTitle] = useState(task ? task.title : '');
     const [description, setDescription] = useState(task ? task.description : '');

     const inputChange = (event) =>{
        //bu şekilde inputa girilen value alınır
        setTitle(event.target.value);
     }
     const textareaChange = (event) =>{
        setDescription(event.target.value);
     }

    const taskFormSubmit = (event) =>{
        event.preventDefault();
        if(taskFormUpdate){
            onUpdate(task.id, title, description);
        }else{
            onCreate(title,description);
        }
        //oluştura bastıktan sonra değerleri props ettikten sonra input ve text area içini aşağıdakş gibi boşaltalım
        setTitle('');
        setDescription('');
    }
    return (
        <div>
            {taskFormUpdate
            ?
           <div className="task_duzenle">
            <h3>Lütfen Taskı Düzenleyiniz!</h3>
            <form onSubmit={taskFormSubmit}>
                <div className="field">
                    <input class="input is-primary" value={title} onChange={inputChange} type="text" placeholder="Başlık" />
                </div>
                <div class="field">
                <textarea class="textarea is-primary" value={description} onChange={textareaChange} placeholder="Task Giriniz"></textarea>
                </div>
                <div className="field">
                   <button className="button is-success">
                    Düzenle
                    </button>
                </div>
            </form>
        </div>
        :
        <div className="task_olustur">
        <h3>Lütfen Task Ekleyiniz!</h3>
        <form onSubmit={taskFormSubmit}>
            <div className="field">
                <input class="input is-primary" value={title} onChange={inputChange} type="text" placeholder="Başlık" />
            </div>
            <div class="field">
            <textarea class="textarea is-primary" value={description} onChange={textareaChange} placeholder="Task Giriniz"></textarea>
            </div>
            <div className="field">
               <button className="button is-success">
                Oluştur
                </button>
            </div>
        </form>
    </div>
    }
        </div>

    )
}

export default TaskCreate;