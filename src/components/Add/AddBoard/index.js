import { useState } from 'react';
import axios from 'axios';

function AddBoard(props) {
    const [checked, setChecked] = useState(1);
    const [name, setName] = useState('');

    //Handle click btn submit
    const handleSubmit = (event) => {
        if (name === '') {
            return;
        } else {
            event.preventDefault();
            setName('');
            setChecked(1);
        }
        //Add new board up server
        axios
            .post('http://localhost:9000/api/boards/create', {
                name: name,
                image: checked,
            })
            .then((res) => {
                //Close modal and re-render
                document.getElementsByClassName('close')[0].click();
                props.renderBoards();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    //Create list view image
    let list = [];
    for (let i = 1; i <= 4; i++) {
        list.push(
            <li className={'background-item'} key={i}>
                <label
                    htmlFor={`background-image${i}-check`}
                    className={'background-image'}
                    style={{ backgroundImage: 'url(/images/board' + i + '.jpg)' }}
                >
                    <input
                        id={`background-image${i}-check`}
                        type="checkbox"
                        name={i}
                        checked={checked === i}
                        onChange={() => setChecked(i)}
                    />
                </label>
            </li>,
        );
    }

    return (
        <div
            className={'modal fade'}
            id="addBoardModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addBoardModalLabel"
            aria-hidden="true"
        >
            <div className={'modal-dialog'} role="document">
                <div className={'modal-content'}>
                    <div className={'modal-header'}>
                        <h1 className={'modal-title'} id="addBoardModalLabel">
                            Tạo bảng
                        </h1>
                        <button type="button" className={'close'} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div>
                                <label className="background-title" htmlFor="background-picker">
                                    Phông nền
                                </label>
                            </div>
                            <div className={'background-picker'}>
                                <ul className={'background-list'}>{list}</ul>
                            </div>

                            <div className={'form-group'}>
                                <label htmlFor="recipient-name" className={'col-form-label'}>
                                    Tiêu đề bảng
                                    <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    className={'input-board-title'}
                                    required
                                    autoFocus={true}
                                    id="board-name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={'modal-footer'}>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    Hủy bỏ
                                </button>
                                <button className="btn btn-primary" id={'btnSubmit'} onClick={handleSubmit}>
                                    Lưu lại
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBoard;
