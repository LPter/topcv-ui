import classNames from 'classnames/bind';
import styles from './SignUpPage.module.scss';
import Slider from '../../Components/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { faEye, faEyeSlash, faShield } from '@fortawesome/free-solid-svg-icons';
import { handleSignUP } from '../../helpers/handle-signup';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SignUpPage() {
    const [passwordType, setPasswordType] = useState('password');
    const [passwordTypeAuth, setPasswordTypeAuth] = useState('password');

    const [usernameInput, setUserNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordInputAuth, setPasswordInputAuth] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (evnt) => {
        setUserNameInput(evnt.target.value);
    };

    const handleEmailChange = (evnt) => {
        setEmailInput(evnt.target.value);
    };

    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    };

    const handlePasswordAuthChange = (evnt) => {
        setPasswordInputAuth(evnt.target.value);
    };

    function togglePassword(evnt) {
        evnt.preventDefault();
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    }

    function togglePasswordAuth(evnt) {
        evnt.preventDefault();
        if (passwordTypeAuth === 'password') {
            setPasswordTypeAuth('text');
            return;
        }
        setPasswordTypeAuth('password');
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleSignUP(usernameInput, emailInput, passwordInput, passwordInputAuth, navigate);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <div className={cx('form-header')}>
                    <img
                        className={cx('form-header__logo')}
                        src="https://www.topcv.vn/v3/images/topcv-logo-4.png?v=1.0.1"
                        alt="..."
                    ></img>
                    <h2 className={cx('form-header__title')}>Ch??o m???ng b???n ?????n v???i TopCV</h2>
                    <div className={cx('form-header__caption')}>
                        C??ng x??y d???ng m???t h??? s?? n???i b???t v?? nh???n ???????c c??c c?? h???i s??? nghi???p l?? t?????ng
                    </div>
                </div>

                <div className={cx('form-login')}>
                    <form onSubmit={handleSubmit} className={cx('form-login__input')}>
                        <div className={cx('form-login__input-group')}>
                            <label className={cx('form-login__input-group__label')}>Username</label>
                            <div className={cx('form-login__input-group__fill')}>
                                <div className={cx('form-login__input-group__fill-icon')}>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <input
                                    className={cx('form-login__input-group__fill-control')}
                                    placeholder="Nh???p username c???a b???n"
                                    onChange={handleUsernameChange}
                                />
                            </div>
                        </div>

                        <div className={cx('form-login__input-group')}>
                            <label className={cx('form-login__input-group__label')}>Email</label>
                            <div className={cx('form-login__input-group__fill')}>
                                <div className={cx('form-login__input-group__fill-icon')}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <input
                                    className={cx('form-login__input-group__fill-control')}
                                    placeholder="Nh???p email c???a b???n"
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>

                        <div className={cx('form-login__input-group')}>
                            <label className={cx('form-login__input-group__label')}>Password</label>
                            <div className={cx('form-login__input-group__fill')}>
                                <div className={cx('form-login__input-group__fill-icon')}>
                                    <FontAwesomeIcon icon={faShield} />
                                </div>
                                <input
                                    type={passwordType}
                                    onChange={handlePasswordChange}
                                    value={passwordInput}
                                    className={cx('form-login__input-group__fill-control')}
                                    placeholder="Nh???p m???t kh???u"
                                />
                                <button className={cx('form-login__input-group__fill-toggle')} onClick={togglePassword}>
                                    {passwordType === 'password' ? (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEye} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className={cx('form-login__input-group')}>
                            <label className={cx('form-login__input-group__label')}>X??c nh???n password</label>
                            <div className={cx('form-login__input-group__fill')}>
                                <div className={cx('form-login__input-group__fill-icon')}>
                                    <FontAwesomeIcon icon={faShield} />
                                </div>
                                <input
                                    type={passwordTypeAuth}
                                    onChange={handlePasswordAuthChange}
                                    value={passwordInputAuth}
                                    className={cx('form-login__input-group__fill-control')}
                                    placeholder="Nh???p l???i m???t kh???u"
                                />
                                <button
                                    className={cx('form-login__input-group__fill-toggle')}
                                    onClick={togglePasswordAuth}
                                >
                                    {passwordTypeAuth === 'password' ? (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEye} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className={cx('form-login__input-group')}>
                            <div className={cx('form-login__input-group__policy')}>
                                <span>B???ng vi???c ????ng k?? t??i kho???n, b???n ???? ?????ng ?? v???i </span>
                                <a className={cx('form-login__input-group__policy-link')} href="/">
                                    ??i???u kho???n d???ch v???
                                </a>
                                <span> v?? </span>
                                <a className={cx('form-login__input-group__policy-link')} href="/">
                                    Ch??nh s??ch b???o m???t
                                </a>
                                <span> c???a ch??ng t??i</span>
                            </div>
                            <button className={cx('form-login__input-group__button')}>????ng k??</button>
                        </div>
                    </form>
                </div>

                <div className={cx('form-auth')}>
                    <div>
                        <span>B???n ???? c?? t??i kho???n?</span>
                        <a href="https://topcv-clone.netlify.app/login" className={cx('form-auth__signup')}>
                            ????ng nh???p ngay
                        </a>
                    </div>
                </div>

                <div className={cx('form-contact')}>
                    <p className={cx('form-contact__text')}>B???n g???p kh?? kh??n khi t???o t??i kho???n?</p>
                    <p>Vui l??ng g???i t???i s??? 0123456789 (gi??? h??nh ch??nh).</p>
                </div>
            </div>

            <div className={cx('slider')}>
                <Slider className={cx('slider-container')} />
            </div>
        </div>
    );
}

export default SignUpPage;
