import TaskShow from "./TaskShow";

function TaskList({tasks,onDelete,onUpdate}){
    //map ile array içerisinde geziyoruz
    return(
        <div className="task-list">
        {tasks.map((task,index)=>{
            return(
                <TaskShow key={index} task={task} onDelete={onDelete} onUpdate={onUpdate}></TaskShow>
            )
        })}
        </div>
    )

}

export default TaskList;