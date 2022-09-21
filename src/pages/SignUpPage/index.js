import classNames from 'classnames/bind';
import styles from './SignUpPage.module.scss';
import Slider from '../../Components/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import TogglePassword from '../../Components/TogglePassword';

const cx = classNames.bind(styles);

function SignUpPage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <div className={cx('form-header')}>
                    <img
                        className={cx('form-header__logo')}
                        src="https://www.topcv.vn/v3/images/topcv-logo-4.png?v=1.0.1"
                        alt="..."
                    ></img>
                    <h2 className={cx('form-header__title')}>Chào mừng bạn đến với TopCV</h2>
                    <div className={cx('form-header__caption')}>
                        Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
                    </div>
                </div>

                <div className={cx('form-login')}>
                    <form className={cx('form-login__input')}>
                        <div className={cx('form-login__input-group')}>
                            <label className={cx('form-login__input-group__label')}>Họ và tên</label>
                            <div className={cx('form-login__input-group__fill')}>
                                <div className={cx('form-login__input-group__fill-icon')}>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <input
                                    className={cx('form-login__input-group__fill-control')}
                                    placeholder="Nhập họ và tên của bạn"
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

                        <TogglePassword label="Mật khẩu" placeholder="Nhập mật khẩu" />

                        <TogglePassword label="Xác nhận mật khẩu" placeholder="Nhập lại mật khẩu" />

                        <div className={cx('form-login__input-group')}>
                            <div className={cx('form-login__input-group__policy')}>
                                <span>Bằng việc đăng ký tài khoản, bạn đã đồng ý với </span>
                                <a className={cx('form-login__input-group__policy-link')} href="/">
                                    Điều khoản dịch vụ
                                </a>
                                <span> và </span>
                                <a className={cx('form-login__input-group__policy-link')} href="/">
                                    Chính sách bảo mật
                                </a>
                                <span> của chúng tôi</span>
                            </div>
                            <button className={cx('form-login__input-group__button')}>Đăng nhập</button>
                        </div>
                    </form>
                </div>

                <div className={cx('form-auth')}>
                    <div>
                        <span>Bạn đã có tài khoản?</span>
                        <a href="/" className={cx('form-auth__signup')}>
                            Đăng nhập ngay
                        </a>
                    </div>
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

export default SignUpPage;
