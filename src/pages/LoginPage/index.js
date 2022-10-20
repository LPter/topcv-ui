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
                        <h2 className={cx('form-header__title')}>Chào mừng bạn trở lại,</h2>
                        <div className={cx('form-header__caption')}>
                            Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
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
                                        placeholder="Nhập email của bạn"
                                        value={emailInput}
                                        ref={userRef}
                                        onChange={handleEmailChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={cx('form-login__input-group')}>
                                <label className={cx('form-login__input-group__label')}>Mật khẩu</label>
                                <div className={cx('form-login__input-group__fill')}>
                                    <div className={cx('form-login__input-group__fill-icon')}>
                                        <FontAwesomeIcon icon={faShield} />
                                    </div>
                                    <input
                                        type={passwordType}
                                        onChange={handlePasswordChange}
                                        value={passwordInput}
                                        className={cx('form-login__input-group__fill-control')}
                                        placeholder="Nhập mật khẩu của bạn"
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
                                <button className={cx('form-login__input-group__button')}>Đăng nhập</button>
                                <p className={cx('form-login__input-group__text')}>Hoặc</p>
                            </div>

                            <div className={cx('form-login__input-option')}>
                                <GoogleLogin
                                    onSuccess={({ credential }) => {
                                        const user = jwt_decode(credential);
                                        loginOAuth(user.email, user.given_name, user.picture).then((res) => {
                                            if (res) {
                                                getCurrentUser().then((currentUser) => {
                                                    setAuth(currentUser);
                                                    if (auth?.role === 'admin') {
                                                        navigate('/admin');
                                                    } else {
                                                        navigate('/');
                                                    }
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
                            <span>Bạn chưa có tài khoản?</span>
                            <a href="http://localhost:3000/sign-up" className={cx('form-auth__signup')}>
                                Đăng ký ngay
                            </a>
                        </div>
                        <button
                            href="/"
                            className={cx('form-auth__forgotPassword')}
                            onClick={() => {
                                setShowForgotPassword(!showForgotPassword);
                            }}
                        >
                            Quên mật khẩu
                        </button>
                    </div>

                    {showForgotPassword && (
                        <div className={cx('form-forgotPassword')}>
                            <form onSubmit={handleSubmitForgotPassword} className={cx('form-forgotPassword__wrapper')}>
                                <div className={cx('form-forgotPassword__wrapper-group')}>
                                    <p>
                                        Quên mật khẩu tài khoản của bạn? Nhập địa chỉ email của bạn và chúng tôi sẽ gửi
                                        cho bạn liên kết khôi phục.
                                    </p>
                                    <label className={cx('form-forgotPassword__wrapper-group__label')}>Email</label>
                                    <div className={cx('form-forgotPassword__wrapper-group__fill')}>
                                        <div className={cx('form-forgotPassword__wrapper-group__fill-icon')}>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </div>
                                        <input
                                            type="email"
                                            className={cx('form-forgotPassword__wrapper-group__fill-control')}
                                            placeholder="Nhập email xác thực của bạn"
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
                        <p className={cx('form-contact__text')}>Bạn gặp khó khăn khi tạo tài khoản?</p>
                        <p>Vui lòng gọi tới số 0123456789 (giờ hành chính).</p>
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
