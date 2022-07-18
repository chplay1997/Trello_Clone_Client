import React from 'react';
import { Link } from 'react-router-dom';

function Boards() {
    const templates = [
        { id: 1, image: 1, name: 'Remote Class Template' },
        { id: 2, image: 2, name: 'Company Overview' },
        { id: 3, image: 3, name: 'Game Development' },
        { id: 4, image: 4, name: 'Design Project Template' },
    ];

    return (
        <div>
            <h3 className={'header-name'}>CÁC MẪU CÓ SẴN</h3>
            <div className={'board-page'}>
                <div className={'board-page-section-header'}>
                    <div className={'section-icon'}>T</div>
                    <h3 className={'section-header-name'}>Chọn mẫu:</h3>
                </div>
            </div>

            <div>
                <ul className={'board-page-section-list'}>
                    {templates.map((template, index) => (
                        <li className={'board-page-section-item'} key={index}>
                            <Link
                                to={`/templates/list/${template.id}`}
                                state={{ templates: templates }}
                                className={'board-title'}
                                style={{ backgroundImage: `url(/images/board${template.image}.jpg)` }}
                            >
                                <span className="board-tile-fade"></span>
                                <div className={'board-tile-details'}>{template.name}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Boards;
