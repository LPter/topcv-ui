import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShield, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
// import { faEye, faEyeSlash, faShield, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './EditUserForm.scss';
import { updateProfile } from '../../Api/user-api';

function EditUserForm({
    id,
    username,
    password,
    showEditRecordUser,
    setShowEditRecordUser,
    modifyUser,
    setModifyUser,
}) {
    const [passwordType, setPasswordType] = useState('password');

    const [usernameInput, setUsernameInput] = useState(username);
    const [passwordInput, setPasswordInput] = useState(password);

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
        if (window.confirm('Bạn có chắc chắc muốn lưu thay đổi này!!')) {
            updateProfile({ id: id, username: usernameInput, password: passwordInput }).then((res) => {
                if (res) {
                    setModifyUser(!modifyUser);
                    alert('Chỉnh sửa người dùng thành công!!');
                }
            });
        }
    }

    return (
        <div className="showAddRecord">
            <div className="showAddRecord_dialog">
                <div className="showAddRecord_dialog_container">
                    <div className="createCompany-container">
                        <div className="form">
                            <div className="form-login">
                                <form onSubmit={handleSubmit} className="form-login__input">
                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Username</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faUser} />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập tên công ty của bạn"
                                                value={usernameInput}
                                                onChange={(e) => {
                                                    setUsernameInput(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Email</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </div>
                                            <input
                                                type="email"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập email của bạn"
                                                value={emailInput}
                                                onChange={(e) => {
                                                    setEmailInput(e.target.value)
                                                }}
                                                required
                                            />
                                        </div>
                                    </div> */}

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Mật khẩu</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faShield} />
                                            </div>
                                            <input
                                                type={passwordType}
                                                onChange={handlePasswordChange}
                                                value={passwordInput}
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập mật khẩu của bạn"
                                                required
                                            />
                                            <button
                                                type="submit"
                                                className="form-login__input-group__fill-toggle"
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

                                    <div className="form-login__input-group">
                                        <button className="form-login__input-group__button">Lưu thay đổi</button>
                                        <button
                                            className="form-login__input-group__button_close"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowEditRecordUser(!showEditRecordUser);
                                            }}
                                        >
                                            Đóng lại
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUserForm;
