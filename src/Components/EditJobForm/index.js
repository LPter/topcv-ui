import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faClock,
    faLayerGroup,
    faSackDollar,
    faUser,
    faUserTie,
    faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './EditJobForm.scss';
import { updateJob } from '../../Api/job-api';

function EditJobForm({
    id,
    name,
    expired,
    salary,
    recruitQuantity,
    workFormat,
    level,
    gender,
    experience,
    showAddRecordJob,
    setShowAddRecordJob,
    modifyJob,
    setModifyJob,
}) {
    const [usernameInput, setUsernameInput] = useState(name);
    const [expiredInput, setExpiredInput] = useState(expired);
    const [salaryInput, setSalaryInput] = useState(salary);
    const [recruitQuantityInput, setRecruitQuantityInput] = useState(recruitQuantity);
    const [workFormatInput, setWorkFormatInput] = useState(workFormat);
    const [levelInput, setLevelInput] = useState(level);
    const [genderInput, setGenderInput] = useState(gender);
    const [experienceInput, setExperienceInput] = useState(experience);

    const handleExpiredChange = (evnt) => {
        setExpiredInput(evnt.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (window.confirm('Bạn có chắc chắn muốn lưu thay đổi này !!')) {
            updateJob(
                id,
                usernameInput,
                expiredInput,
                salaryInput,
                recruitQuantityInput,
                workFormatInput,
                levelInput,
                genderInput,
                experienceInput,
            ).then((res) => {
                if (res) {
                    setModifyJob(!modifyJob);
                    alert('Tạo công ty thành công!!');
                }
            });
        }
    }

    console.log(
        id,
        usernameInput,
        expiredInput,
        salaryInput,
        recruitQuantityInput,
        workFormatInput,
        levelInput,
        genderInput,
        experienceInput,
    );

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
                                                placeholder="Nhập tên công việc của bạn"
                                                value={usernameInput}
                                                onChange={(e) => {
                                                    setUsernameInput(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Ngày hết hạn</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faClock} />
                                            </div>
                                            <input
                                                type="date"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập ngày hết hạn của bạn"
                                                value={expiredInput}
                                                onChange={handleExpiredChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Lương</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faSackDollar} />
                                            </div>

                                            <select
                                                className="form-login__input-group__fill-control"
                                                onChange={(e) => {
                                                    setSalaryInput(e.target.value);
                                                }}
                                            >
                                                <option value="over30">Trên 30 triệu đồng/tháng</option>
                                                <option value="between15to30">Từ 15 đến 30 triệu đồng/tháng</option>
                                                <option value="between5to15">Từ 5 đến 15 triệu đồng/tháng</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Số lượng yêu cầu</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faPeopleGroup} />
                                            </div>
                                            <input
                                                type="number"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập quy mô nhân viên công ty của bạn"
                                                value={recruitQuantityInput}
                                                onChange={(e) => {
                                                    setRecruitQuantityInput(e.target.value);
                                                }}
                                                required
                                                min="1"
                                                max="100"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Hình thức làm việc</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faUserTie} />
                                            </div>
                                            {/* <input
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
                                            /> */}

                                            <select
                                                className="form-login__input-group__fill-control"
                                                onChange={(e) => {
                                                    setWorkFormatInput(e.target.value);
                                                }}
                                            >
                                                <option value="intern">Thực tập sinh</option>
                                                <option value="part_time">Bán thời gian</option>
                                                <option value="full_time">Toàn thời gian</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Cấp bậc</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faLayerGroup} />
                                            </div>
                                            {/* <textarea
                                                type="text"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập mô tả công ty của bạn"
                                                value={introductionInput}
                                                onChange={(e) => {
                                                    setIntroductionInput(e.target.value);
                                                }}
                                                required
                                            /> */}
                                            <select
                                                className="form-login__input-group__fill-control"
                                                onChange={(e) => {
                                                    setLevelInput(e.target.value);
                                                }}
                                            >
                                                <option value="team_lead">Quản lý</option>
                                                <option value="staff">Nhân viên</option>
                                                <option value="intern">Thực tập sinh</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Giới tính</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faVenusMars} />
                                            </div>
                                            {/* <input
                                                type="text"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập địa chỉ công ty của bạn"
                                                value={addressInput}
                                                onChange={(e) => {
                                                    setAddressInput(e.target.value);
                                                }}
                                                required
                                            /> */}
                                            <select
                                                className="form-login__input-group__fill-control"
                                                onChange={(e) => {
                                                    setGenderInput(e.target.value);
                                                }}
                                            >
                                                <option value="male">Nam</option>
                                                <option value="female">Nữ</option>
                                                <option value="both">Không yêu cầu</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-login__input-group">
                                        <label className="form-login__input-group__label">Kinh nghiệm</label>
                                        <div className="form-login__input-group__fill">
                                            <div className="form-login__input-group__fill-icon">
                                                <FontAwesomeIcon icon={faChartLine} />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-login__input-group__fill-control"
                                                placeholder="Nhập năm kinh nghiệm yêu cầu"
                                                value={experienceInput}
                                                onChange={(e) => {
                                                    setExperienceInput(e.target.value);
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
                                                setShowAddRecordJob(!showAddRecordJob);
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

export default EditJobForm;
