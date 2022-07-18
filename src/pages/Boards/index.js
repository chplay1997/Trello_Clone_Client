import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddBoard from '~/components/Layout/components/AddBoard';
import ModalDelete from '~/components/Layout/components/ModalDelete';

function Boards() {
    const [idDelete, setIdDelete] = useState('');
    const [boards, setBoards] = useState([]);
    //Get data from api
    const getBoards = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/boards/getAll');
            setBoards(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getBoards();
    }, []);

    const handleClickDeleteBoard = async (e, boardId) => {
        setIdDelete(boardId);
    };

    window.addEventListener('click', (e) => {
        if (e.target.matches('.delete')) {
            document.getElementsByClassName('cancel')[0].click();
        }
    });

    return (
        <div>
            <h3 className={'header-name'}>CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN</h3>
            <div className={'board-page'}>
                <div className={'board-page-section-header'}>
                    <div className={'section-icon'}>T</div>
                    <h3 className={'section-header-name'}>Trello Không gian làm việc</h3>
                </div>
            </div>

            <div className="board-page-scroll">
                <ul className={'board-page-section-list'}>
                    {boards.map((board, index) => (
                        <li className={'board-page-section-item'} key={index}>
                            <Link
                                to={`/list/${board._id}`}
                                className={'board-title'}
                                style={{ backgroundImage: `url(/images/board${board.image}.jpg)` }}
                                state={{ boardName: board.name }}
                                onClick={(e) => {
                                    if (e.target.matches('.board-page-section-delete-icon')) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <span className="board-tile-fade">
                                    <div className={'board-page-section-delete'}>
                                        <i
                                            className="fa fa-trash board-page-section-delete-icon"
                                            aria-hidden="true"
                                            data-toggle="modal"
                                            data-target="#exampleModal"
                                            onClick={(e) => handleClickDeleteBoard(e, board._id)}
                                        />
                                    </div>
                                </span>
                                <div className={'board-tile-details'}>{board.name}</div>
                            </Link>
                        </li>
                    ))}

                    {/* ADD Board */}
                    <li className={'board-page-section-item'}>
                        <div
                            className={'board-title add-board'}
                            data-toggle="modal"
                            data-target="#addBoardModal"
                            data-whatever="@mdo"
                        >
                            <div>Tạo bảng mới</div>
                            <div className={'board-tile-plus'}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </div>
                        </div>
                    </li>

                    <AddBoard renderBoards={getBoards} />
                </ul>
            </div>

            {/* <!-- Modal Delete--> */}
            <ModalDelete idDelete={idDelete} render={getBoards} target={'boards'} message="bảng" />
        </div>
    );
}

export default Boards;
