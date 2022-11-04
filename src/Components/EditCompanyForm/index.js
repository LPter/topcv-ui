import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup, faSortDesc, faAddressCard, faContactCard } from '@fortawesome/free-solid-svg-icons';
import { updateCompany } from '../../Api/company-api';
import { useState } from 'react';
import './EditCompanyForm.scss';

function EditCompanyForm({
    id,
    name,
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
    const [usernameInput, setUsernameInput] = useState(name);
    const [websiteInput, setWebsiteInput] = useState(website);
    const [employeeNumberInput, setEmployeeNumberInput] = useState(employeeNumber);
    const [introductionInput, setIntroductionInput] = useState(introduction);
    const [addressInput, setAddressInput] = useState(address);
    const [locationInput, setLocationInput] = useState(location);

    function handleSubmit(e) {
        e.preventDefault();
        if (window.confirm('Bạn có chắc chắn muốn lưu thay đổi này!!')) {
            updateCompany(
                id,
                usernameInput,
                websiteInput,
                employeeNumberInput,
                introductionInput,
                addressInput,
                locationInput,
            ).then((res) => {
                if (res) {
                    setModifyCompany(!modifyCompany);
                    alert('Chỉnh sửa công ty thành công!!');
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

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Website</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faBuilding} />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập website công ty của bạn"
                                                value={websiteInput}
                                                onChange={(e) => {
                                                    setWebsiteInput(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Quy mô nhân viên</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faPeopleGroup} />
                                            </div>
                                            <input
                                                type="number"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập quy mô nhân viên công ty của bạn"
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
                                        <label className="form-login__input-group__label">Mô tả về công ty</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faSortDesc} />
                                            </div>
                                            <textarea
                                                type="text"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập mô tả công ty của bạn"
                                                value={introductionInput}
                                                onChange={(e) => {
                                                    setIntroductionInput(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Địa chỉ</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập địa chỉ công ty của bạn"
                                                value={addressInput}
                                                onChange={(e) => {
                                                    setAddressInput(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Khu vực</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faContactCard} />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập khu vực của bạn"
                                                value={locationInput}
                                                onChange={(e) => {
                                                    setLocationInput(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <button className="form-login__input-group__button">Lưu thay đổi</button>
                                        <button
                                            className="form-login__input-group__button_close"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowAddRecordCompany(!showAddRecordCompany);
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

export default EditCompanyForm;
