import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';
import {
    faEye,
    faEyeSlash,
    faShield,
    faEnvelope,
    faPeopleGroup,
    faSortDesc,
    faAddressCard,
    faContactCard,
} from '@fortawesome/free-solid-svg-icons';
import { createCompany } from '../../Api/company-api';
import { useState } from 'react';
import './CreateCompanyForm.scss';

function CreateCompanyForm({
    name,
    email,
    password,
    website,
    employeeNumber,
    introduction,
    address,
    location,
    showAddRecordCompany,
    setShowAddRecordCompany,
    modifyCompany,
    setModifyCompany,
}) {
    const [passwordType, setPasswordType] = useState('password');

    const [usernameInput, setUsernameInput] = useState(name);
    const [emailInput, setEmailInput] = useState(email);
    const [passwordInput, setPasswordInput] = useState(password);
    const [websiteInput, setWebsiteInput] = useState(website);
    const [employeeNumberInput, setEmployeeNumberInput] = useState(employeeNumber);
    const [introductionInput, setIntroductionInput] = useState(introduction);
    const [addressInput, setAddressInput] = useState(address);
    const [locationInput, setLocationInput] = useState(location);

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
        createCompany(
            usernameInput,
            emailInput,
            passwordInput,
            websiteInput,
            employeeNumberInput,
            introductionInput,
            addressInput,
            locationInput,
        ).then((res) => {
            if (res) {
                setModifyCompany(!modifyCompany);
                alert('T???o c??ng ty th??nh c??ng!!');
            }
        });
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
                                                placeholder="Nh???p t??n c??ng ty c???a b???n"
                                                value={usernameInput}
                                                onChange={(e) => {
                                                    setUsernameInput(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Email</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </div>
                                            <input
                                                type="email"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nh???p email c???a b???n"
                                                value={emailInput}
                                                onChange={handleEmailChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">M???t kh???u</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faShield} />
                                            </div>
                                            <input
                                                type={passwordType}
                                                onChange={handlePasswordChange}
                                                value={passwordInput}
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nh???p m???t kh???u c???a b???n"
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
                                        <label className="form-login__input-group__label">Website</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faBuilding} />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nh???p website c??ng ty c???a b???n"
                                                value={websiteInput}
                                                onChange={(e) => {
                                                    setWebsiteInput(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Quy m?? nh??n vi??n</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faPeopleGroup} />
                                            </div>
                                            <input
                                                type="number"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nh???p quy m?? nh??n vi??n c??ng ty c???a b???n"
                                                value={employeeNumberInput}
                                                onChange={(e) => {
                                                    setEmployeeNumberInput(e.target.value);
                                                }}
                                                required
                                                min="10"
                                                max="100000"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">M?? t??? v??? c??ng ty</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faSortDesc} />
                                            </div>
                                            <textarea
                                                type="text"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nh???p m?? t??? c??ng ty c???a b???n"
                                                value={introductionInput}
                                                onChange={(e) => {
                                                    setIntroductionInput(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">?????a ch???</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nh???p ?????a ch??? c??ng ty c???a b???n"
                                                value={addressInput}
                                                onChange={(e) => {
                                                    setAddressInput(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Khu v???c</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faContactCard} />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nh???p khu v???c c???a b???n"
                                                value={locationInput}
                                                onChange={(e) => {
                                                    setLocationInput(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <button className="form-login__input-group__button">T???o c??ng ty</button>
                                        <button
                                            className="form-login__input-group__button_close"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowAddRecordCompany(!showAddRecordCompany);
                                            }}
                                        >
                                            ????ng l???i
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

export default CreateCompanyForm;
