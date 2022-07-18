import { useState } from 'react';
import axios from 'axios';

function AddList(props) {
    const [addList, setAddList] = useState('Thêm danh sách');

    //Function render view
    const sendData = () => {
        props.parentCallback();
    };

    //Handle onchane set input value
    const handleAddListChange = (e) => {
        setAddList(e.target.value);
    };

    //Handle input focus
    const handleAddListFocus = (e) => {
        setAddList('');
        e.target.nextSibling.style.display = 'flex';
        e.target.setAttribute('placeholder', 'Tên danh sách');
    };

    //Handle key down == enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    };

    //Handle input blur and send data to database
    const handleAddListBlur = (e) => {
        if (addList !== '') {
            //Add new list up server
            axios
                .post('http://localhost:9000/api/list/create', {
                    idBoard: window.location.pathname.split('/')[2],
                    name: addList,
                })
                .then((res) => {
                    sendData();
                    console.log(res);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        setAddList('Thêm danh sách');
        e.target.nextSibling.style.display = 'none';
    };
    return (
        <div className={'add-list'}>
            <input
                id={'add-list-input'}
                className={'input-style'}
                value={addList}
                onChange={handleAddListChange}
                onFocus={handleAddListFocus}
                onBlur={handleAddListBlur}
                onKeyDown={handleKeyDown}
            />
            <span id={'add-list-check'}>
                <i className={'fa fa-check'} aria-hidden="true" />
            </span>
        </div>
    );
}

export default AddList;
