import classNames from 'classnames/bind';
import Slider from '../../Components/Slider';
import styles from './LoginPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { faEye, faEyeSlash, faShield } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleLogin } from '../../helpers/handle-login';

const cx = classNames.bind(styles);

function LoginPage() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const userRef = useRef();

    const [passwordType, setPasswordType] = useState('password');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleEmailChange = (evnt) => {
        setEmailInput(evnt.target.value);
    };

    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post(
    //             'http://localhost:8000/users/login',
    //             {
    //                 email: emailInput,
    //                 password: passwordInput,
    //             },
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true,
    //             },
    //         );
    //         console.log(JSON.stringify(response?.data));
    //         localStorage.setItem('token', response.data.access_token);
    //         // setAuth({ emailInput, passwordInput, roles, accessToken });
    //         setEmailInput('');
    //         setPasswordInput('');
    //         navigate(from, { replace: true });
    //     } catch (err) {
    //         console.log(err);
    //     }

    //     try {
    //         const response = await axios.get('http://localhost:8000/users/me', {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: 'Bearer ' + localStorage.getItem('token'),
    //             },
    //             withCredentials: true,
    //         });
    //         const role = response?.data?.role;
    //         setAuth({ emailInput, passwordInput, role });
    //         // console.log(setAuth);
    //         // console.log(response);
    //         navigate(from, { replace: true });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

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
                                <a type="button" href="/" className={cx('form-login__input-option__link')}>
                                    <FontAwesomeIcon icon={faGoogle} />
                                    <span>Google</span>
                                </a>
                            </div>
                        </form>
                    </div>

                    <div className={cx('form-auth')}>
                        <div>
                            <span>Bạn chưa có tài khoản?</span>
                            <a href="http://localhost:3001/sign-up" className={cx('form-auth__signup')}>
                                Đăng ký ngay
                            </a>
                        </div>
                        <a href="/" className={cx('form-auth__forgotPassword')}>
                            Quên mật khẩu
                        </a>
                    </div>

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
