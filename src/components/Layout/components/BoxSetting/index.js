import { useState } from 'react';

import ModalDelete from '~/components/Layout/components/ModalDelete';
import Loading from '../Loading';

function BoxSetting(props) {
    console.log(props.idSetting);
    const [showLoading, setShowLoading] = useState(false);

    //Handle click add task and focus addtask
    const handleClickAddTask = (e) => {
        document.getElementsByClassName('task-input')[props.index].focus();
        props.setShowSetting(false);
    };

    //Handle show modal delete
    const handleClickShowModalDelete = (e) => {
        e.target.closest('.pop-over').classList.add('hidden');
    };

    //Listen even click down and hiden box
    window.addEventListener('click', (e) => {
        if (e.target.closest('.close') || e.target.matches('.cancel') || e.target.matches('.modal')) {
            if (document.getElementsByClassName('modal-backdrop')[0]) {
                document.body.removeChild(document.getElementsByClassName('modal-backdrop')[0]);
            }
            props.setShowSetting(false);
        }

        //handle click confirm delete
        if (e.target.matches('.delete')) {
            document.getElementsByClassName('modal-content')[0].style.display = 'none';
            setShowLoading(true);

            setTimeout(() => {
                props.setShowSetting(false);
                if (document.getElementsByClassName('modal-backdrop')[0]) {
                    document.body.removeChild(document.getElementsByClassName('modal-backdrop')[0]);
                }
            }, 200);
        }
    });
    return (
        <>
            <div className="pop-over">
                <div className="pop-over-header">
                    <span className="pop-over-header-title">Thao Tác</span>
                    <span
                        className="pop-over-header-close"
                        onClick={(e) => {
                            props.setShowSetting(false);
                        }}
                    >
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </span>
                </div>
                <div className="pop-over-content">
                    <ul className="pop-over-content-list">
                        <li className="pop-over-item" onClick={handleClickAddTask}>
                            <span className="pop-over-item-icon">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </span>
                            <span className="pop-over-item-name">Thêm thẻ</span>
                        </li>
                        <li
                            className="pop-over-item"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={handleClickShowModalDelete}
                        >
                            <span className="pop-over-item-icon">
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </span>
                            <span className="pop-over-item-name">Xóa danh sách này</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* <!-- Modal Delete--> */}
            <ModalDelete idDelete={props.idSetting} render={props.render} target={'list'} message="danh sách" />

            {/* Loading */}
            {showLoading && <Loading />}
        </>
    );
}

export default BoxSetting;