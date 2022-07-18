import { useState } from 'react';
import axios from 'axios';

function AddTask(props) {
    const [taskInput, setTaskInput] = useState('');

    //Handle input focus
    const handleAddTaskFocus = (e) => {
        e.target.classList.remove('placeholder-green');
        e.target.placeholder = 'Nhập tiêu đề cho thẻ này';
        e.target.nextSibling.style.display = 'flex';
    };

    //Handle key down == enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    };

    //Handle input blur and send data to database
    const handleAddTaskBlur = (e) => {
        if (taskInput) {
            //Add new list up server
            axios
                .post('http://localhost:9000/api/tasks/create', {
                    idList: props.idList,
                    title: taskInput,
                })
                .then((res) => {
                    props.render();
                    console.log(res);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        setTaskInput('');
        e.target.classList.add('placeholder-green');
        e.target.placeholder = 'Thêm thẻ';
        e.target.nextSibling.style.display = 'none';
    };

    //Handle drop when list is empty
    const handleDropListEmpty = (event) => {
        const taskIdStart = event.dataTransfer.getData('taskId');
        const listIdStart = event.dataTransfer.getData('listId');
        const listIdDrop = props.idList;
        axios
            .get(`http://localhost:9000/api/list/get`, {
                params: {
                    _id: [listIdStart, listIdDrop],
                },
            })
            .then((response) => {
                if (response.data[1].listTask.length === 0) {
                    props.handleDropMultipleList(event, listIdStart, listIdDrop, taskIdStart, 0);
                    props.render();
                }
            })
            .catch((error) => {});
    };
    return (
        <div className={'list-content-footer'} onDrop={handleDropListEmpty} onDragOver={(e) => e.preventDefault()}>
            <input
                className={'task-input input-style placeholder-green'}
                value={taskInput}
                placeholder={'Thêm thẻ'}
                onChange={(e) => {
                    setTaskInput(e.target.value);
                }}
                onFocus={handleAddTaskFocus}
                onBlur={handleAddTaskBlur}
                onKeyDown={handleKeyDown}
            />
            <span id={'add-list-check'}>
                <i className={'fa fa-check'} aria-hidden="true" />
            </span>
        </div>
    );
}

export default AddTask;
