import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import useAuth from '../../../../hooks/useAuth.js';

const cx = classNames.bind(styles);

function Header() {
    const { auth } = useAuth();
    console.log(auth);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-logo')}>
                <img
                    className={cx('header-logo__img')}
                    src="https://www.topcv.vn/v3/images/topcv-logo-4.png?v=1.0.1"
                    alt="..."
                ></img>
            </div>
            <div className={cx('navbar')}>
                <ul className={cx('navbar-left')}>
                    <li className={cx('navbar-left__item')}>
                        <a className={cx('navbar-left__item-link')} href="/">
                            Việc làm
                        </a>
                    </li>
                    <li className={cx('navbar-left__item')}>
                        <a className={cx('navbar-left__item-link')} href="/">
                            Hồ sơ & CV
                        </a>
                    </li>
                    <li className={cx('navbar-left__item')}>
                        <a className={cx('navbar-left__item-link')} href="/">
                            Công ty
                        </a>
                    </li>
                    <li className={cx('navbar-left__item')}>
                        <a className={cx('navbar-left__item-link')} href="/">
                            Công cụ
                        </a>
                    </li>
                </ul>
                <ul className={cx('navbar-right')}>
                    {auth.role === undefined && (
                        <>
                            <li className={cx('navbar-right__item')}>
                                <a
                                    href="http://localhost:3000/user"
                                    type="button"
                                    className={cx('navbar-right__item-buttonOutline')}
                                >
                                    Đăng nhập
                                </a>
                            </li>
                            <li className={cx('navbar-right__item')}>
                                <a
                                    href="http://localhost:3000/sign-up"
                                    type="button"
                                    className={cx('navbar-right__item-buttonPrimary')}
                                >
                                    Đăng ký
                                </a>
                            </li>
                            <li className={cx('navbar-right__item')}>
                                <a
                                    href="http://localhost:3000/company"
                                    type="button"
                                    className={cx('navbar-right__item-buttonRecruit')}
                                >
                                    Đăng tuyển dụng & Tìm hồ sơ
                                </a>
                            </li>
                        </>
                    )}
                    {auth.role === 'user' && (
                        <>
                            <li className={cx('navbar-right__item')}>
                                <div className={cx('navbar-right__item-user')}>
                                    {/* <a className={cx('navbar-right__item-user__href')}></a> */}
                                </div>
                                <div className={cx('navbar-right__item-hover')}></div>
                            </li>
                        </>
                    )}
                    {auth.role === 'company' && (
                        <>
                            <li className={cx('navbar-right__item')}>
                                <a
                                    href="http://localhost:3000/user"
                                    type="button"
                                    className={cx('navbar-right__item-buttonOutline')}
                                >
                                    Đăng nhập
                                </a>
                            </li>
                            <li className={cx('navbar-right__item')}>
                                <a
                                    href="http://localhost:3000/sign-up"
                                    type="button"
                                    className={cx('navbar-right__item-buttonPrimary')}
                                >
                                    Đăng ký
                                </a>
                            </li>
                            <li className={cx('navbar-right__item')}>
                                <a
                                    href="http://localhost:3000/company"
                                    type="button"
                                    className={cx('navbar-right__item-buttonRecruit')}
                                >
                                    Đăng tuyển dụng & Tìm hồ sơ
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Header;
