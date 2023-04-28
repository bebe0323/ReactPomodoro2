import {useState} from 'react'

import './App.css'

function TodoItem({task, onToggleComplete, onEdit}) {
    
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task.text)

    const handleEditClick = () => {
        setIsEditing(true);
    };
    
    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedTask(task.text);
    };

    const handleSaveClick = () => {
        onEdit(task.id, editedTask);
        setIsEditing(false);
    };

    const handleTaskChange = (event) => {
        setEditedTask(event.target.value);
    };

    return (
        <div>
            {task.id}
            
            {isEditing === true ? (
                <div>
                    <input 
                        className='checkBoxTask'
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => onToggleComplete(task.id)}
                    />
                    <input className='inputTask editInput' type="text" value={editedTask} onChange={handleTaskChange} />
                    <button className='buttonAddTask buttonSave' onClick={handleSaveClick}>Save</button>
                    <button className='buttonAddTask' onClick={handleCancelClick}>Cancel</button>
                </div>
            ) : (
                <div className='eachTask'>
                    <input 
                        className='checkBoxTask'
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => onToggleComplete(task.id)}
                    />
                <span className='todoTask'>{task.text}</span>
                <button className='buttonAddTask' onClick={handleEditClick}>Edit</button>
                </div>
            )}
        </div>
    );
}


export default function App() {
    

    const [nextId, setNextId] = useState(1);
    const [nextCompletedId, setNextCompletedId] = useState(1);
    const [text, setText] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    function handleTaskInputChange(e) {
        setText(e.target.value);
    }


    function handleAddTaskButton() {
        if(text === '') {
            alert('Enter your task');
        }
        else {
            setNextId(nextId + 1);
            console.log(text);
            setTasks([
                ...tasks,
                {id: nextId, text: text, completed: false}
            ]);
            setText('');
        }
    }


    const handleEdit = (id, newText) => {
        if(newText === '') {
            alert('Enter your task!');
        }
        else {
            const newTasks = tasks.map((task) => {
                if (task.id === id) {
                    return { ...task, text: newText };
                } else {
                    return task;
                }
            });
            setTasks(newTasks);
        }
    };

    const handleToggleComplete = (id) => {
        tasks.map((task) => {
            if(task.id === id) {
                setNextCompletedId(nextCompletedId + 1);
                setCompletedTasks([
                    ...completedTasks,
                    {id: task.id, text: task.text, completed: true}
                ])
            }
            return null;
        })
        setTasks(tasks.filter(a => a.id !== id));
    }

   

    return(
        <>
            <input className='inputTask'
                value = {text}
                onChange = {handleTaskInputChange}
            />
            <button className='buttonAddTask' onClick = {handleAddTaskButton}>
                Add Task
            </button>
            <ul className='tasksInUL'>
                {tasks.map((task) => {
                    if(task.id !== 0) {
                        return ( 
                            <li key={task.id}>
                                <TodoItem
                                    key={task.id}
                                    task={task}
                                    onToggleComplete={handleToggleComplete}
                                    onEdit={handleEdit}
                                />
                            </li>
                        )
                    }
                    else {
                        return null;
                    }
                })}
            </ul>

            {Object.keys(completedTasks).length > 0 ? (<h3 className='headerCompleted'>Completed Tasks</h3>) : <p></p>}
            <ol>
                {completedTasks.map((task) => {
                    if(task.id !== 0) {
                        return <li key={task.id}><p className='completedTasks'>{task.text}</p></li> }
                        else {
                            return null;
                        }
                    }
                )}
            </ol>
        </>
    )
}

// export default function App() {
//     return (
//         <h1>Hello</h1>
//     )
// }