import classNames from 'classnames/bind';
import styles from './PrimaryButton.module.scss';

const cx = classNames.bind(styles);

function PrimaryButton({ content }) {
    return (
        <div className={cx('wrapper')}>
            <a href="/" className={cx('wrapper-content')} type="button">
                {content}
            </a>
        </div>
    );
}

export default PrimaryButton;
