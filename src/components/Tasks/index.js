import { useEffect, useState } from 'react';
import axios from 'axios';
import ChangeTask from '../ChangeTask';
import AddTask from '../Add/AddTask';

function Tasks(props) {
    const [tasks, setTasks] = useState([]);
    const [taskChange, setTaskChange] = useState({});
    const [showChange, setShowChange] = useState(false);

    //get tasks
    const getTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/tasks/getData`, {
                params: {
                    idList: props.idList,
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTasks();
    }, [props.list]);

    //Handle drag start and set taskId,listId
    const handleDragStart = (event, taskId, listId) => {
        event.dataTransfer.setData('taskId', taskId);
        event.dataTransfer.setData('listId', listId);
    };

    //Handle drop and PUT Update
    const handleDrop = (event, taskIdDrop, listIdDrop) => {
        const taskIdStart = event.dataTransfer.getData('taskId');
        const listIdStart = event.dataTransfer.getData('listId');

        //Check action drop
        if (taskIdDrop === listIdStart || !event.dataTransfer.getData('classList').includes('list-task-item')) {
            return;
        }
        //Handle if listIdStart === listIdDrop
        if (listIdStart === listIdDrop) {
            axios
                .get(`http://localhost:9000/api/list/get`, {
                    params: {
                        _id: [listIdStart],
                    },
                })
                .then((response) => {
                    let array = [...response.data[0].listTask];
                    let indexStart = array.indexOf(taskIdStart);
                    let indexDrop = array.indexOf(taskIdDrop);

                    //Check position compare to balance
                    let item = event.target.getBoundingClientRect();
                    let balance = (item.top + item.bottom) / 2;
                    indexDrop = event.pageY < balance ? indexDrop : indexDrop + 1;

                    //Insert taskIdStart
                    array.splice(indexDrop, 0, taskIdStart);
                    if (indexStart > indexDrop) {
                        array.splice(indexStart + 1, 1);
                    } else {
                        array.splice(indexStart, 1);
                    }

                    //update new Array to list
                    axios
                        .put(`http://localhost:9000/api/list/updateOne`, {
                            _id: listIdStart,
                            listTask: array,
                        })
                        .then(function (response) {
                            getTasks();
                        })
                        .catch(function (error) {});
                })
                .catch((error) => {});
        }

        //Handle if listIdStart !== listIdDrop
        else if (listIdStart !== listIdDrop) {
            props.handleDropMultipleList(event, listIdStart, listIdDrop, taskIdStart, taskIdDrop);
        }
    };

    //Handle click change task title
    const handleClick = (taskId, taskTitle, taskDescription) => {
        setShowChange(true);
        setTaskChange({ id: taskId, title: taskTitle, description: taskDescription });
    };

    return (
        <>
            <div className={'list-content-task'}>
                <ul className={'list-task'}>
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className={'list-task-item'}
                            draggable
                            onDragStart={(event) => handleDragStart(event, task._id, props.idList)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(event) => handleDrop(event, task._id, props.idList)}
                            onClick={() => handleClick(task._id, task.title, task.description)}
                        >
                            {task.title}
                        </li>
                    ))}
                </ul>

                {showChange && (
                    <ChangeTask
                        task={taskChange}
                        idList={props.idList}
                        render={getTasks}
                        setShowChange={setShowChange}
                    />
                )}
            </div>
            {/* ADD TASK */}

            <AddTask render={getTasks} idList={props.idList} handleDropMultipleList={props.handleDropMultipleList} />
        </>
    );
}

export default Tasks;
