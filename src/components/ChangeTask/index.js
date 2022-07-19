import { useState } from 'react';

import axios from 'axios';
import ModalDelete from '../ModalDelete';
import Loading from '../Loading';

function ChangeTask(props) {
    const [input, setInput] = useState(props.task.title);
    const [textarea, setTextarea] = useState(props.task.description);
    const [showLoading, setShowLoading] = useState(false);
    const [showLoadingSave, setShowLoadingSave] = useState(false);

    //Listen even click down and hiden box
    window.addEventListener('mousedown', (e) => {
        if (
            e.target.closest('.close') ||
            e.target.matches('.list-task-box-wrap') ||
            e.target.matches('.cancel') ||
            e.target.matches('.modal')
        ) {
            if (document.getElementsByClassName('modal-backdrop')[0]) {
                document.body.removeChild(document.getElementsByClassName('modal-backdrop')[0]);
            }
            props.setShowChange(false);
        }

        //handle click confirm delete
        if (e.target.matches('.delete')) {
            setShowLoading(true);
            loading();
            if (document.getElementsByClassName('modal-backdrop')[0]) {
                document.body.removeChild(document.getElementsByClassName('modal-backdrop')[0]);
            }
        }
    });

    //Handle submit when change task
    const submitTask = () => {
        if (input || textarea) {
            axios
                .put('http://localhost:9000/api/tasks/updateOne', {
                    _id: props.task.id,
                    title: input || props.task.title,
                    description: textarea,
                })
                .then((res) => {
                    props.render();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        setShowLoadingSave(true);
        loading();
    };

    // function open loading and close
    const loading = () => {
        //Open loading ui
        setTimeout(() => {
            props.setShowChange(false);
        }, 200);
    };

    const handleDeleteTask = (e) => {
        document.getElementsByClassName('list-task-box')[0].style.display = 'none';
    };

    return (
        <div className="list-task-box-wrap">
            <div className="list-task-box">
                <span className="close">
                    <i className="fa fa-times" aria-hidden="true" />
                </span>
                <div className="box-task-title">
                    <span className="box-task-icon">
                        <i className="fa fa-window-maximize" aria-hidden="true" />
                    </span>
                    <input
                        type="text"
                        className={'input-style placeholder'}
                        value={input}
                        placeholder={props.task.title}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                        onFocus={(e) => {
                            e.target.classList.remove('placeholder');
                        }}
                        onBlur={(e) => {
                            e.target.classList.add('placeholder');
                        }}
                    />
                </div>
                <div className="box-task-des">
                    <div className="box-task-des-title">
                        <span className="box-task-icon">
                            <i className="fa fa-bars" aria-hidden="true" />
                        </span>
                        Mô tả
                    </div>
                    <textarea
                        className={'textarea-style'}
                        value={textarea}
                        placeholder={'Thêm mô tả chi tiết hơn...'}
                        onChange={(e) => {
                            setTextarea(e.target.value);
                        }}
                    />
                </div>
                <div className="box-task-delete">
                    <div className="box-task-des-title">
                        <span className="box-task-icon">
                            <i className="fa fa-bars" aria-hidden="true" />
                        </span>
                        Xóa Thẻ
                    </div>
                    <button
                        data-toggle="modal"
                        data-target="#exampleModal"
                        className={'btn btn-danger btn-delete'}
                        onClick={handleDeleteTask}
                    >
                        Xóa
                    </button>
                </div>
                <div className="box-task-footer">
                    <button type="button" className="btn btn-secondary cancel">
                        Hủy
                    </button>
                    <button type="button" id="save-btn" className=" btn btn-primary" onMouseDown={submitTask}>
                        Lưu
                    </button>
                </div>
                {/* Loading Save*/}
                {showLoadingSave && <Loading />}
            </div>
            {/* Loading */}
            {showLoading && <Loading />}

            {/* Delete taks */}
            <ModalDelete
                idDelete={{
                    idTask: props.task.id,
                    idList: props.idList,
                }}
                render={props.render}
                target={'tasks'}
                message="thẻ"
            />
        </div>
    );
}

export default ChangeTask;
