import classNames from 'classnames/bind';
import styles from './TogglePassword.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faShield } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TogglePassword(props) {
    const [passwordType, setPasswordType] = useState('password');
    const [passwordInput, setPasswordInput] = useState('');
    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    };

    // const functionHandler = (passwordInput) => {
    //     props.passChildData = passwordInput;
    // };

    function togglePassword(evnt) {
        evnt.preventDefault();
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    }

    return (
        <div className={cx('form-login__input-group')}>
            <label className={cx('form-login__input-group__label')}>{props.label}</label>
            <div className={cx('form-login__input-group__fill')}>
                <div className={cx('form-login__input-group__fill-icon')}>
                    <FontAwesomeIcon icon={faShield} />
                </div>
                <input
                    type={passwordType}
                    onChange={handlePasswordChange}
                    value={passwordInput}
                    className={cx('form-login__input-group__fill-control')}
                    placeholder={props.placeholder}
                />
                <button className={cx('form-login__input-group__fill-toggle')} onClick={(e) => togglePassword(e)}>
                    {passwordType === 'password' ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                        <FontAwesomeIcon icon={faEye} />
                    )}
                </button>
            </div>
        </div>
    );
}

export default TogglePassword;
