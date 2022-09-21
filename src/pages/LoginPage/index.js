import classNames from 'classnames/bind';
import Slider from '../../Components/Slider';
import styles from './LoginPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import TogglePassword from '../../Components/TogglePassword';

const cx = classNames.bind(styles);

function LoginPage() {
    return (
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
                    <form className={cx('form-login__input')}>
                        <div className={cx('form-login__input-group')}>
                            <label className={cx('form-login__input-group__label')}>Email</label>
                            <div className={cx('form-login__input-group__fill')}>
                                <div className={cx('form-login__input-group__fill-icon')}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <input
                                    className={cx('form-login__input-group__fill-control')}
                                    placeholder="Nhập email của bạn"
                                />
                            </div>
                        </div>

                        {/* <div className={cx('form-login__input-group')}>
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
                                    placeholder="Nhập mật khẩu"
                                />
                                <button className={cx('form-login__input-group__fill-toggle')} onClick={togglePassword}>
                                    {passwordType === 'password' ? (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEye} />
                                    )}
                                </button>
                            </div>
                        </div> */}

                        <TogglePassword />

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
                        <a href="/" className={cx('form-auth__signup')}>
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
    );
}

export default LoginPage;
