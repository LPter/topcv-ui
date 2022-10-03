import classNames from 'classnames/bind';
import styles from './SearchPage.module.scss';

const cx = classNames.bind(styles);

function SearchPage() {
    return <h1 className={cx('wrapper')}>SearchPage</h1>;
}

export default SearchPage;
