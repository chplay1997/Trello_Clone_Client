import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function List(props) {
    const navigate = useNavigate();

    const { idBoard } = useParams();
    const state = useLocation().state;
    const list = [
        { idBoard: '1', id: '1', name: 'Resources' },
        { idBoard: '1', id: '2', name: 'Weekly Assignments' },
        { idBoard: '1', id: '3', name: 'Lab Projects' },
        { idBoard: '1', id: '4', name: 'Exams' },
    ];
    const tasks = [
        { idList: '1', id: '1', title: 'Getting started with Trello' },
        { idList: '1', id: '2', title: 'Ways to contact Dr. Theisen Remotely' },
        { idList: '1', id: '3', title: 'Coping with Covid-19' },
        { idList: '1', id: '4', title: 'Remote Class Plan and Revised Schedule' },
        { idList: '1', id: '5', title: 'Links to eTextbook - Biochemistry' },

        { idList: '2', id: '6', title: 'Week of 3/23-3/29' },
        { idList: '2', id: '7', title: 'Week of 3/30-4/5' },
        { idList: '2', id: '8', title: 'Week of 4/6-12' },
        { idList: '2', id: '9', title: 'Week of 4/20-26' },

        { idList: '3', id: '10', title: 'Poster - Both Tracks' },
        { idList: '3', id: '11', title: 'Final Lab Report - Catalase Track' },

        { idList: '4', id: '12', title: 'Exam 2: Ch. 5-8' },
        { idList: '4', id: '13', title: 'Lab Exam' },
        { idList: '4', id: '14', title: 'Exam 3: Ch. 10-12, 15-16, and 18-21' },
        { idList: '4', id: '15', title: 'Optional Retake (Finals Week)' },
    ];
    //Handle submit
    const handleClickUseTemplate = (e) => {
        if (state === null) {
            console.log('run');
            return;
        }
        // e.preventDefault();
        let board = {};
        for (let i = 0; i < state.templates.length; i++) {
            if (state.templates[i].id === idBoard) {
                board = state.templates[i];
                break;
            }
        }
        axios
            .post('http://localhost:9000/api/boards/createTemplate', {
                list: list,
                tasks: tasks,
                board: board,
            })
            .then((res) => {
                navigate(`/list/${res.data._id}`);
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div className={'board-wrapper'}>
            <div id={'board'}>
                <div className={'list-wrapper'}>
                    {/* ------------for loop view-------------- */}
                    {list.map((item, index) => (
                        <div className={'list list-content'} key={index}>
                            <div className={'list-content-header'}>
                                <input type="text" className={'input-style placeholder'} defaultValue={item.name} />

                                <div className={'list-content-header-setting'}>
                                    <span className={'list-content-setting-icon'}>
                                        <i className="fa fa-ellipsis-h" aria-hidden="true" />
                                    </span>
                                </div>
                            </div>
                            {/* Tasks */}
                            <div className={'list-content-task'}>
                                <ul className={'list-task'}>
                                    {tasks.map(
                                        (task, index) =>
                                            task.idList === item.id && (
                                                <li key={index} className={'list-task-item'}>
                                                    {task.title}
                                                </li>
                                            ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="button-use" onClick={handleClickUseTemplate}>
                    <button className="btn btn-warning">Sử dụng mẫu này</button>
                </div>
            </div>
        </div>
    );
}

export default List;
