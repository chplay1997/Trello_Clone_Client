import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Sidebar() {
    window.addEventListener('click', (e) => {
        if (e.target.closest('.item-link')) {
            let linhList = document.querySelectorAll('.item-link');
            for (let i = 0; i < linhList.length; i++) {
                linhList[i].classList.remove('active');
            }
            e.target.closest('.item-link').classList.add('active');
        }
    });

    return (
        <aside className={cx('wrapper')}>
            <nav className={cx('home-left-sidebar-container')}>
                <div>
                    <ul>
                        <Link to={'/boards'} className={cx('item-link', 'active')}>
                            <li className={cx('item')}>
                                <span className={cx('icon-table')}>
                                    <i className={cx('fa fa-table')} aria-hidden="true"></i>
                                </span>
                                <span>Bảng</span>
                            </li>
                        </Link>
                        <Link to={'/templates/boards'} className={cx('item-link')}>
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
