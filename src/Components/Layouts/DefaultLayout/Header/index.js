import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronCircleDown, faComments, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../../../Auth/AuthProvider';
import { deleteNotification, getNotification } from '../../../../Api/notification-api';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Header() {
    const { auth, setAuth } = useContext(AuthContext);

    const [showNotification, setShowNotification] = useState(false);
    const [showToggleUser, setShowToggleUser] = useState(false);
    const [showToggleCompany, setShowToggleCompany] = useState(false);

    const [notifications, setNotifications] = useState([]);

    const navigate = useNavigate();

    function handleLoginUserBtn() {
        navigate('/user');
    }

    function handleLogoutBtn() {
        setAuth({});
        localStorage.removeItem('token');
        navigate('/', { replace: true });
    }

    function handleUserProfileBtn() {
        setShowToggleUser(!showToggleUser);
        navigate('/user/profile');
    }

    function handleCompanyManagement() {
        setShowToggleCompany(!showToggleCompany);
        navigate(`/company/management/${auth?.id}`);
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-logo')}>
                <a href="http://localhost:3000/">
                    <img
                        className={cx('header-logo__img')}
                        src="https://www.topcv.vn/v3/images/topcv-logo-4.png?v=1.0.1"
                        alt="..."
                    ></img>
                </a>
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
                                    onClick={() => {
                                        navigate('/company');
                                    }}
                                    type="button"
                                    className={cx('navbar-right__item-buttonRecruit')}
                                >
                                    Đăng tuyển dụng & Tìm hồ sơ
                                </button>
                            </li>
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
                        </>
                    )}
                    {auth?.role === 'user' && (
                        <>
                            <li className={cx('navbar-right__item')}>
                                <div className={cx('navbar-right__item-notification')}>
                                    <button
                                        className={cx('navbar-right__item-notification__icon')}
                                        onClick={() => {
                                            getNotification().then((res) => {
                                                if (res) {
                                                    setNotifications(res);
                                                }
                                            });
                                            setShowNotification(!showNotification);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faBell} />
                                    </button>
                                    {showNotification && (
                                        <div className={cx('navbar-right__item-notification__click')}>
                                            <ul className={cx('navbar-right__item-notification__click-wrapper')}>
                                                {notifications.length === 0 ? (
                                                    <span
                                                        className={cx(
                                                            'navbar-right__item-notification__click-wrapper__nothing',
                                                        )}
                                                    >
                                                        Bạn không có thông báo nào!!
                                                    </span>
                                                ) : (
                                                    notifications.map((notification) => (
                                                        <li
                                                            key={notification.id}
                                                            className={cx(
                                                                'navbar-right__item-notification__click-wrapper__item',
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    'navbar-right__item-notification__click-wrapper__item-avatar',
                                                                )}
                                                            >
                                                                <img
                                                                    src={notification.user.avatar}
                                                                    className={cx(
                                                                        'navbar-right__item-notification__click-wrapper__item-avatar__img',
                                                                    )}
                                                                    alt="..."
                                                                ></img>
                                                            </div>
                                                            <a
                                                                href={notification?.url}
                                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        'navbar-right__item-notification__click-wrapper__item-body',
                                                                    )}
                                                                >
                                                                    <p
                                                                        className={cx(
                                                                            'navbar-right__item-notification__click-wrapper__item-body__title',
                                                                        )}
                                                                    >
                                                                        {notification.title}
                                                                    </p>
                                                                    <p
                                                                        className={cx(
                                                                            'navbar-right__item-notification__click-wrapper__item-body__desc',
                                                                        )}
                                                                    >
                                                                        {notification.description}
                                                                    </p>
                                                                </div>
                                                            </a>
                                                            <div
                                                                className={cx(
                                                                    'navbar-right__item-notification__click-wrapper__item-close',
                                                                )}
                                                            >
                                                                <button
                                                                    className={cx(
                                                                        'navbar-right__item-notification__click-wrapper__item-close__btn',
                                                                    )}
                                                                    onClick={() => {
                                                                        deleteNotification(notification?.id).then(
                                                                            () => {
                                                                                getNotification().then((res) => {
                                                                                    if (res) {
                                                                                        setNotifications(res);
                                                                                    }
                                                                                });
                                                                            },
                                                                        );
                                                                        console.log(notification.id);
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon icon={faCircleXmark} />
                                                                </button>
                                                            </div>
                                                        </li>
                                                    ))
                                                )}
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
                                <button
                                    onClick={() => {
                                        navigate('/company/create-job');
                                    }}
                                    type="button"
                                    className={cx('navbar-right__item-buttonRecruit')}
                                >
                                    Đăng tuyển dụng
                                </button>
                            </li>
                            <li className={cx('navbar-right__item')}>
                                <div className={cx('navbar-right__item-notification')}>
                                    <button
                                        className={cx('navbar-right__item-notification__icon')}
                                        onClick={() => {
                                            navigate(`/company/chat/${auth?.id}`);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faComments} />
                                    </button>
                                </div>
                            </li>
                            <li className={cx('navbar-right__item')}>
                                <div
                                    className={cx('navbar-right__item-user')}
                                    onClick={() => {
                                        setShowToggleCompany(!showToggleCompany);
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
                                {showToggleCompany && (
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
                                                    onClick={handleCompanyManagement}
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
                                                        Quản lý công việc
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
                    {auth?.role === 'admin' && (
                        <>
                            <li className={cx('navbar-right__item')}>
                                <button
                                    onClick={() => {
                                        navigate('/admin');
                                    }}
                                    type="button"
                                    className={cx('navbar-right__item-buttonRecruit')}
                                >
                                    Admin
                                </button>
                            </li>
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
                </ul>
            </div>
        </header>
    );
}

export default Header;
