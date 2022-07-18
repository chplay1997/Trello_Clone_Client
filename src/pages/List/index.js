import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

import AddList from '~/components/Layout/components/AddList';
import Tasks from '~/components/Tasks';
import BoxSetting from '~/components/Layout/components/BoxSetting';

function List() {
    //get idBoard
    const { idBoard } = useParams();
    const state = useLocation().state;

    const [input, setInput] = useState('');
    const [id, setId] = useState('');
    const [list, setList] = useState([]);

    const [showSetting, setShowSetting] = useState(false);
    const [idSetting, setIdSetting] = useState('');
    const [indexSetting, setIndexSetting] = useState('');

    //get list
    async function getList() {
        try {
            const response = await axios.get(`http://localhost:9000/api/list/getData`, {
                params: {
                    idBoard: idBoard,
                },
            });
            setList(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getList();
    }, []);

    //Handle blur and submit
    const handleBlurListHeader = (e) => {
        if (input) {
            axios
                .put('http://localhost:9000/api/list/updateOne', {
                    _id: id,
                    name: input,
                })
                .then((res) => {
                    getList();
                    console.log(res);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
        }
        e.target.classList.add('placeholder');
        setInput('');
        setId('');
    };

    //Handle drag and drop multiple list
    const handleDropMultipleList = (event, listIdStart, listIdDrop, taskIdStart, taskIdDrop) => {
        axios
            .get(`http://localhost:9000/api/list/get`, {
                params: {
                    _id: [listIdStart, listIdDrop],
                },
            })
            .then((response) => {
                let arrayStart = [...response.data[0].listTask];
                let arrayDrop = [...response.data[1].listTask];

                let indexStart = arrayStart.indexOf(taskIdStart);
                let indexDrop = arrayDrop.indexOf(taskIdDrop);

                //Check position compare to balance
                let item = event.target.getBoundingClientRect();
                let balance = (item.top + item.bottom) / 2;
                indexDrop = event.pageY < balance ? indexDrop : indexDrop + 1;

                //Insert taskIdStart
                arrayStart.splice(indexStart, 1);
                arrayDrop.splice(indexDrop, 0, taskIdStart);

                Promise.all([
                    axios.put(`http://localhost:9000/api/list/updateOne`, {
                        _id: listIdStart,
                        listTask: arrayStart,
                    }),
                    axios.put(`http://localhost:9000/api/list/updateOne`, {
                        _id: listIdDrop,
                        listTask: arrayDrop,
                    }),
                ])
                    .then((response) => {
                        getList();
                    })
                    .catch((err) => {});
            })
            .catch((error) => {});
    };

    //Drag and drop list
    //Handle drag start and set taskId,listId
    const handleDragStartList = (event, listId) => {
        event.dataTransfer.setData('listId', listId);
        event.dataTransfer.setData('classList', event.target.classList);
    };

    //Handle drop and PUT Update
    const handleDropList = (event, listIdDrop) => {
        const listIdStart = event.dataTransfer.getData('listId');

        //check action drop
        if (listIdDrop === listIdStart || !event.dataTransfer.getData('classList').includes('list-content')) {
            return;
        }

        //Handle if listIdStart === listIdDrop
        axios
            .get(`http://localhost:9000/api/boards/getOne`, {
                params: {
                    _id: idBoard,
                },
            })
            .then((response) => {
                let arrayList = [...response.data[0].ArrayList];
                let indexStart = arrayList.indexOf(listIdStart);
                let indexDrop = arrayList.indexOf(listIdDrop);

                //Check position compare to balance
                let item = event.target.closest('.list-content').getBoundingClientRect();
                let balance = (item.left + item.right) / 2;
                indexDrop = event.pageX < balance ? indexDrop : indexDrop + 1;

                //Insert listIdStart
                arrayList.splice(indexDrop, 0, listIdStart);
                if (indexStart > indexDrop) {
                    arrayList.splice(indexStart + 1, 1);
                } else {
                    arrayList.splice(indexStart, 1);
                }

                //update new ArrayList to board
                axios
                    .put(`http://localhost:9000/api/boards/updateOne`, {
                        _id: idBoard,
                        ArrayList: arrayList,
                    })
                    .then(function () {
                        getList();
                    })
                    .catch(function (error) {});
            })
            .catch((error) => {});
    };
    return (
        <div className={'board-wrapper'}>
            <div className="name-board">
                <h1>{state ? state.boardName : ''}</h1>
            </div>
            <div id={'board'}>
                <div className={'list-wrapper'}>
                    {/* ------------for loop view-------------- */}
                    {list.map((item, index) => (
                        <div
                            className={'list list-content'}
                            key={index}
                            draggable
                            onDragStart={(event) => handleDragStartList(event, item._id)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(event) => handleDropList(event, item._id)}
                        >
                            <div className={'list-content-header'}>
                                <input
                                    type="text"
                                    className={'input-style placeholder'}
                                    value={id === item._id ? input : ''}
                                    placeholder={item.name}
                                    onChange={(e) => {
                                        setId(item._id);
                                        setInput(e.target.value);
                                    }}
                                    onFocus={(e) => {
                                        e.target.value = item.name;
                                        e.target.classList.remove('placeholder');
                                    }}
                                    onBlur={handleBlurListHeader}
                                />

                                <div className={'list-content-header-setting'}>
                                    {/* Toggle class hiden for pop-over*/}
                                    <span
                                        className={'list-content-setting-icon'}
                                        onClick={(e) => {
                                            setIdSetting(item._id);
                                            setIndexSetting(index);
                                            setShowSetting(!showSetting);
                                        }}
                                    >
                                        <i className="fa fa-ellipsis-h" aria-hidden="true" />
                                    </span>

                                    {/* <!-- Box Setting--> */}
                                    {showSetting && index === indexSetting && (
                                        <BoxSetting
                                            idSetting={idSetting}
                                            render={getList}
                                            setShowSetting={setShowSetting}
                                            index={indexSetting}
                                        />
                                    )}
                                </div>
                            </div>
                            {/* Tasks */}
                            <Tasks
                                list={list}
                                idList={item._id}
                                getList={getList}
                                handleDropMultipleList={handleDropMultipleList}
                            />
                        </div>
                    ))}
                    {/* ADD LIST */}
                    <AddList parentCallback={getList} />
                </div>
            </div>
        </div>
    );
}

export default List;
