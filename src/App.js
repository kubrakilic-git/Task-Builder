import './App.css';
import 'bulma/css/bulma.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import { useState } from 'react';
import axios from 'axios';  
import { useEffect } from 'react';

function App() {
  //forma girilen veriyi bu şekilde arrayde tutalım
  const [tasks, setTasks] = useState([]);
  //alt componentden ana componente props yaptık
  const createTask = async (title,description) => {
    //bu şekilde db.json dosyasına istek attık post ile veri eklediğimiz zaman otomatik olarak db.json düşer
   const response = await axios.post('http://localhost:3001/tasks',{
      title:title,
      description:description,
    })
    const createdTasks = [
      ...tasks,
      response.data
    ];
    //burada array değişkenlerini oluşturduk.
    setTasks(createdTasks);
    //buradan gelen değişkeni props olarak TaksList Componentinde çağırdık 
  
  };

  //şimdi useEffect ile sayfa yenilendiğine verilerin kaybolmasını engelleyelim.
  const listTasks = async () =>{
    //burada useEffect ile sayfa yenilendiğinde oluşan tüm verileri setTasks ile 
    //tasks arrayında oluşturmuş oluruz
    const response = await axios.get('http://localhost:3001/tasks');
    setTasks(response.data);

  }
  useEffect(()=>{
    listTasks();
    //axios get ile apide oluşturduğumuz verileri listeleyelim
  },[])  

  const deleteTask = async (id) =>{
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    const afterDeletedTask = tasks.filter((task)=>{
      return task.id !== id;
    })
    setTasks(afterDeletedTask);
  }

  const editTaskForm = async (id,title,description) =>{
    await axios.put(`http://localhost:3001/tasks/${id}`,{
      title:title,
          description:description
    });
    const updatedTasks = tasks.map((task) => {
      if(task.id === id)
      {
        return {
          id:id,
          title:title,
          description:description
        }
      }
      return task;
    })
    setTasks(updatedTasks);
  }
  return (
    <div className="App">
      <div className='container'>
        <TaskCreate onCreate={createTask}></TaskCreate>
        <hr></hr>
          <h1 className='gorevler'>Görevler</h1>
          <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={editTaskForm}></TaskList>
      </div>

    </div>
  );
}

export default App;
