import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronCircleDown, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../../../Auth/AuthProvider';

const cx = classNames.bind(styles);

function Header() {
    const { auth, setAuth } = useContext(AuthContext);

    const [showNotification, setShowNotification] = useState(false);
    const [showToggleUser, setShowToggleUser] = useState(false);

    const navigate = useNavigate();

    function handleLoginUserBtn() {
        navigate('/user');
    }

    function handleLoginCompanyBtn() {
        navigate('/company');
    }

    function handleLogoutBtn() {
        // if used in more components, this should be in context
        // axios to /logout endpoint
        setAuth({});
        localStorage.removeItem('token');
        navigate('/', { replace: true });
    }

    function handleUserProfileBtn() {
        setShowToggleUser(!showToggleUser);
        navigate('/user/profile');
    }

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
                    {auth?.role === undefined && (
                        <>
                            <li className={cx('navbar-right__item')}>
                                <button
                                    onClick={handleLoginUserBtn}
                                    type="button"
                                    className={cx('navbar-right__item-buttonOutline')}
                                >
                                    Đăng nhập
                                </button>
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
                                <button
                                    onClick={handleLoginCompanyBtn}
                                    type="button"
                                    className={cx('navbar-right__item-buttonRecruit')}
                                >
                                    Đăng tuyển dụng & Tìm hồ sơ
                                </button>
                            </li>
                        </>
                    )}
                    {auth?.role === 'user' && (
                        <>
                            <li className={cx('navbar-right__item')}>
                                <div className={cx('navbar-right__item-notification')}>
                                    <button
                                        className={cx('navbar-right__item-notification__icon')}
                                        onClick={() => {
                                            setShowNotification(!showNotification);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faBell} />
                                    </button>
                                    {showNotification && (
                                        <div className={cx('navbar-right__item-notification__click')}>
                                            <ul className={cx('navbar-right__item-notification__click-item')}>
                                                <span
                                                    className={cx(
                                                        'navbar-right__item-notification__click-item__content',
                                                    )}
                                                >
                                                    Bạn không có thông báo nào!!
                                                </span>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </li>
                            <li className={cx('navbar-right__item')}>
                                <div
                                    className={cx('navbar-right__item-user')}
                                    onClick={() => {
                                        setShowToggleUser(!showToggleUser);
                                    }}
                                >
                                    <div className={cx('navbar-right__item-user__btn')}>
                                        <div className={cx('navbar-right__item-user__btn-avatar')}>
                                            <img
                                                alt="..."
                                                src={auth.avatar}
                                                className={cx('navbar-right__item-user__btn-avatar__img')}
                                            ></img>
                                        </div>
                                        <div className={cx('navbar-right__item-user__btn-name')}>
                                            <span>{auth.username}</span>
                                        </div>
                                        <div className={cx('navbar-right__item-user__btn-icon')}>
                                            <FontAwesomeIcon icon={faChevronCircleDown} />
                                        </div>
                                    </div>
                                </div>
                                {showToggleUser && (
                                    <div className={cx('navbar-right__item-hover')}>
                                        <div className={cx('navbar-right__item-hover__wrapper')}>
                                            <div className={cx('navbar-right__item-hover__wrapper-header')}>
                                                <div className={cx('navbar-right__item-hover__wrapper-header__avatar')}>
                                                    <img
                                                        alt="..."
                                                        src={auth.avatar}
                                                        className={cx(
                                                            'navbar-right__item-hover__wrapper-header__avatar-img',
                                                        )}
                                                    ></img>
                                                </div>
                                                <div className={cx('navbar-right__item-hover__wrapper-header__title')}>
                                                    <div
                                                        className={cx(
                                                            'navbar-right__item-hover__wrapper-header__title-name',
                                                        )}
                                                    >
                                                        {auth.username}
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'navbar-right__item-hover__wrapper-header__title-id',
                                                        )}
                                                    >
                                                        MÃ ỨNG VIÊN: #{auth.id}
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className={cx('navbar-right__item-hover__wrapper-content')}>
                                                <li
                                                    className={cx('navbar-right__item-hover__wrapper-content__item')}
                                                    onClick={handleUserProfileBtn}
                                                >
                                                    <FontAwesomeIcon
                                                        className={cx(
                                                            'navbar-right__item-hover__wrapper-content__item-logo',
                                                        )}
                                                        icon={faUser}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'navbar-right__item-hover__wrapper-content__item-text',
                                                        )}
                                                    >
                                                        Thông tin cá nhân
                                                    </span>
                                                </li>
                                                <li
                                                    className={cx('navbar-right__item-hover__wrapper-content__item')}
                                                    onClick={handleLogoutBtn}
                                                >
                                                    <FontAwesomeIcon
                                                        className={cx(
                                                            'navbar-right__item-hover__wrapper-content__item-logo',
                                                        )}
                                                        icon={faRightFromBracket}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'navbar-right__item-hover__wrapper-content__item-text',
                                                        )}
                                                    >
                                                        Đăng xuất
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </li>
                        </>
                    )}
                    {auth?.role === 'company' && (
                        <>
                            <li className={cx('navbar-right__item')}>
                                <button type="button" className={cx('navbar-right__item-buttonRecruit')}>
                                    Đăng tuyển dụng
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Header;
