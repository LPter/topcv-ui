import classNames from 'classnames/bind';
import Slider from '../../Components/Slider';
import styles from './LoginPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef, useContext } from 'react';
import { faEye, faEyeSlash, faShield } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../Auth/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleLogin } from '../../helpers/handle-login';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { loginOAuth, getCurrentUser, sendForgotPasswordMail } from '../../Api/user-api';

const cx = classNames.bind(styles);

function LoginPage() {
    const { auth, setAuth } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const userRef = useRef();

    const [passwordType, setPasswordType] = useState('password');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [emailAuthInput, setEmailAuthInput] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleEmailChange = (evnt) => {
        setEmailInput(evnt.target.value);
    };

    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    };

    const handleEmailAuthChange = (evnt) => {
        setEmailAuthInput(evnt.target.value);
    };

    function togglePassword(evnt) {
        evnt.preventDefault();
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(emailInput, passwordInput, setAuth, navigate, location);
    }

    function handleSubmitForgotPassword(e) {
        e.preventDefault();
        sendForgotPasswordMail(emailAuthInput).then((res) => res && alert('Mail sent successfully !!'));
    }

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    <div className={cx('form-header')}>
                        <img
                            className={cx('form-header__logo')}
                            src="https://www.topcv.vn/v3/images/topcv-logo-4.png?v=1.0.1"
                            alt="..."
                        ></img>
                        <h2 className={cx('form-header__title')}>Ch??o m???ng b???n tr??? l???i,</h2>
                        <div className={cx('form-header__caption')}>
                            C??ng x??y d???ng m???t h??? s?? n???i b???t v?? nh???n ???????c c??c c?? h???i s??? nghi???p l?? t?????ng
                        </div>
                    </div>

                    <div className={cx('form-login')}>
                        <form onSubmit={handleSubmit} className={cx('form-login__input')}>
                            <div className={cx('form-login__input-group')}>
                                <label className={cx('form-login__input-group__label')}>Email</label>
                                <div className={cx('form-login__input-group__fill')}>
                                    <div className={cx('form-login__input-group__fill-icon')}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                    <input
                                        type="email"
                                        className={cx('form-login__input-group__fill-control')}
                                        placeholder="Nh???p email c???a b???n"
                                        value={emailInput}
                                        ref={userRef}
                                        onChange={handleEmailChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={cx('form-login__input-group')}>
                                <label className={cx('form-login__input-group__label')}>M???t kh???u</label>
                                <div className={cx('form-login__input-group__fill')}>
                                    <div className={cx('form-login__input-group__fill-icon')}>
                                        <FontAwesomeIcon icon={faShield} />
                                    </div>
                                    <input
                                        type={passwordType}
                                        onChange={handlePasswordChange}
                                        value={passwordInput}
                                        className={cx('form-login__input-group__fill-control')}
                                        placeholder="Nh???p m???t kh???u c???a b???n"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className={cx('form-login__input-group__fill-toggle')}
                                        onClick={(e) => togglePassword(e)}
                                    >
                                        {passwordType === 'password' ? (
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        ) : (
                                            <FontAwesomeIcon icon={faEye} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className={cx('form-login__input-group')}>
                                <button className={cx('form-login__input-group__button')}>????ng nh???p</button>
                                <p className={cx('form-login__input-group__text')}>Ho???c</p>
                            </div>

                            <div className={cx('form-login__input-option')}>
                                <GoogleLogin
                                    onSuccess={({ credential }) => {
                                        const user = jwt_decode(credential);
                                        loginOAuth(user.email, user.given_name, user.picture).then((res) => {
                                            if (res) {
                                                getCurrentUser().then((currentUser) => {
                                                    setAuth(currentUser);
                                                    navigate(`/${currentUser?.role}`);
                                                });
                                            }
                                        });
                                    }}
                                    onError={() => {
                                        alert('Login Failed');
                                    }}
                                    useOneTap
                                    logo_alignment="center"
                                />
                            </div>
                        </form>
                    </div>

                    <div className={cx('form-auth')}>
                        <div>
                            <span>B???n ch??a c?? t??i kho???n?</span>
                            <a href="https://topcv-clone.netlify.app/sign-up" className={cx('form-auth__signup')}>
                                ????ng k?? ngay
                            </a>
                        </div>
                        <button
                            href="/"
                            className={cx('form-auth__forgotPassword')}
                            onClick={() => {
                                setShowForgotPassword(!showForgotPassword);
                            }}
                        >
                            Qu??n m???t kh???u
                        </button>
                    </div>

                    {showForgotPassword && (
                        <div className={cx('form-forgotPassword')}>
                            <form onSubmit={handleSubmitForgotPassword} className={cx('form-forgotPassword__wrapper')}>
                                <div className={cx('form-forgotPassword__wrapper-group')}>
                                    <p>
                                        Qu??n m???t kh???u t??i kho???n c???a b???n? Nh???p ?????a ch??? email c???a b???n v?? ch??ng t??i s??? g???i
                                        cho b???n li??n k???t kh??i ph???c.
                                    </p>
                                    <label className={cx('form-forgotPassword__wrapper-group__label')}>Email</label>
                                    <div className={cx('form-forgotPassword__wrapper-group__fill')}>
                                        <div className={cx('form-forgotPassword__wrapper-group__fill-icon')}>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </div>
                                        <input
                                            type="email"
                                            className={cx('form-forgotPassword__wrapper-group__fill-control')}
                                            placeholder="Nh???p email x??c th???c c???a b???n"
                                            value={emailAuthInput}
                                            onChange={handleEmailAuthChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={cx('form-forgotPassword__wrapper-group')}>
                                    <button className={cx('form-forgotPassword__wrapper-group__button')}>Submit</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className={cx('form-contact')}>
                        <p className={cx('form-contact__text')}>B???n g???p kh?? kh??n khi t???o t??i kho???n?</p>
                        <p>Vui l??ng g???i t???i s??? 0123456789 (gi??? h??nh ch??nh).</p>
                    </div>
                </div>

                <div className={cx('slider')}>
                    <Slider className={cx('slider-container')} />
                </div>
            </div>
        </>
    );
}

export default LoginPage;
