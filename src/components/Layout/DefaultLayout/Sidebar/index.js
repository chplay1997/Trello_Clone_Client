import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Sidebar() {
    //active
    const active = (type) => {
        let path = window.location.pathname.split('/')[1];
        if (path === type || (path === '' && type === 'boards')) {
            return 'active';
        }
        return '';
    };

    return (
        <aside className={cx('wrapper')}>
            <nav className={cx('home-left-sidebar-container')}>
                <div>
                    <ul>
                        <Link to={'/boards'} className={cx('item-link', active('boards'))}>
                            <li className={cx('item')}>
                                <span className={cx('icon-table')}>
                                    <i className={cx('fa fa-table')} aria-hidden="true"></i>
                                </span>
                                <span>Bảng</span>
                            </li>
                        </Link>
                        <Link to={'/templates/boards'} className={cx('item-link', active('templates'))}>
                            <li className={cx('item')}>
                                <span className={cx('icon-table')}>
                                    <i className={cx('fa fa-book')} aria-hidden="true"></i>
                                </span>
                                <span>Mẫu</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </aside>
    );
}

export default Sidebar;
