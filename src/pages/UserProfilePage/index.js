import classNames from 'classnames/bind';
import styles from './UserProfilePage.module.scss';
import { getCurrentUser, updateProfile } from '../../Api/user-api';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPenToSquare, faScrewdriverWrench, faUser } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function UserProfilePage() {
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [toggleEditForm, setToggleEditForm] = useState(false);

    // const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser().then((res) => {
            setUser(res);
        });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if (window.confirm('Are you sure you want to update your profile ?')) {
            // check if password valid or not
            // if (!user.password) {
            //     alert('Password invalid');
            // } else {
            updateProfile(user, avatar).then((response) => {
                if (response) {
                    alert('Update success !!');
                }
            });
            // }
        }
    }

    return (
        <div className={cx('profile')}>
            <div className={cx('profile-container')}>
                <div className={cx('profile-container__header')}>
                    <div className={cx('profile-container__header-avatar')}>
                        <img
                            src={user.avatar}
                            className={cx('profile-container__header-avatar__img')}
                            alt="avatar"
                        ></img>
                    </div>
                    <div className={cx('profile-container__header-username')}>
                        <span className={cx('profile-container__header-username__text')}>{user.username}</span>
                    </div>
                </div>
                {!toggleEditForm && (
                    <div className={cx('profile-container__content')}>
                        <div className={cx('profile-container__content-email')}>
                            <FontAwesomeIcon
                                className={cx('profile-container__content-email__icon')}
                                icon={faEnvelope}
                            />
                            <p className={cx('profile-container__content-email__text')}>Email: {user.email}</p>
                        </div>
                        <div className={cx('profile-container__content-code')}>
                            <FontAwesomeIcon className={cx('profile-container__content-code__icon')} icon={faUser} />
                            <p className={cx('profile-container__content-code__text')}>UserCode: {user.id}</p>
                        </div>
                        <div className={cx('profile-container__content-role')}>
                            <FontAwesomeIcon
                                className={cx('profile-container__content-role__icon')}
                                icon={faScrewdriverWrench}
                            />
                            <p className={cx('profile-container__content-role__text')}>Role: {user.role}</p>
                        </div>
                    </div>
                )}

                {toggleEditForm && (
                    <div className={cx('profile-container__editForm')}>
                        <form onSubmit={handleSubmit} className={cx('profile-container__editForm-form')}>
                            <div className={cx('profile-container__editForm-form__editAvatar')}>
                                <input
                                    className={cx('profile-container__editForm-form__editAvatar-input')}
                                    type="file"
                                    onChange={(e) => {
                                        setAvatar(e.target.files[0]);
                                    }}
                                ></input>
                            </div>
                            <div className={cx('profile-container__editForm-form__editUsername')}>
                                <label className={cx('profile-container__editForm-form__editUsername-title')}>
                                    Edit Username
                                </label>
                                <input
                                    className={cx('profile-container__editForm-form__editUsername-input')}
                                    onChange={(e) => {
                                        setUser({ ...user, username: e.target.value });
                                    }}
                                ></input>
                            </div>
                            <div className={cx('profile-container__editForm-form__editPassword')}>
                                <label className={cx('profile-container__editForm-form__editPassword-title')}>
                                    Edit Password
                                </label>
                                <input
                                    className={cx('profile-container__editForm-form__editPassword-input')}
                                    onChange={(e) => {
                                        setUser({ ...user, password: e.target.value });
                                    }}
                                ></input>
                            </div>
                            <div className={cx('profile-container__editForm-form__btn')}>
                                <button className={cx('profile-container__editForm-form__btn-button')}>
                                    Chấp nhận
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className={cx('profile-container__edit')}>
                    <button
                        className={cx('profile-container__edit-btn')}
                        onClick={() => {
                            setToggleEditForm(!toggleEditForm);
                        }}
                    >
                        <FontAwesomeIcon className={cx('profile-container__edit-btn__icon')} icon={faPenToSquare} />
                        <p className={cx('profile-container__edit-btn__text')}>Edit profile</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
