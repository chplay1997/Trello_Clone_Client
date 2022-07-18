import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={'/'}>
                    <img className={cx('icon')} alt="icon-trello" src={'/images/trello.gif'} />
                </Link>
            </div>
        </header>
    );
}

export default Header;
