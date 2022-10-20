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
import { createJob } from '../../Api/company-api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './CreateJobForm.module.scss';

const cx = classNames.bind(styles);

function CreateJobForm({ id }) {
    const navigate = useNavigate();

    const [usernameInput, setUsernameInput] = useState('');
    const [expiredInput, setExpiredInput] = useState('');
    const [salaryInput, setSalaryInput] = useState('');
    const [recruitQuantityInput, setRecruitQuantityInput] = useState(1);
    const [workFormatInput, setWorkFormatInput] = useState('');
    const [levelInput, setLevelInput] = useState('');
    const [genderInput, setGenderInput] = useState('');
    const [experienceInput, setExperienceInput] = useState('');

    const handleExpiredChange = (evnt) => {
        setExpiredInput(evnt.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        createJob(
            usernameInput,
            Date(expiredInput),
            salaryInput,
            recruitQuantityInput,
            workFormatInput,
            levelInput,
            genderInput,
            experienceInput,
        ).then((res) => {
            if (res) {
                navigate('/company');
                alert('Tạo công ty thành công!!');
            }
        });
    }

    return (
        <div className={cx('showAddRecord_dialog')}>
            <div className={cx('showAddRecord_dialog_container')}>
                <div className={cx('createCompany-container')}>
                    <div className={cx('createJobForm-title')}>
                        <img
                            className={cx('createJobForm-title__logo')}
                            src="https://www.topcv.vn/v3/images/topcv-logo-4.png?v=1.0.1"
                            alt="..."
                        ></img>
                        <h2 className={cx('createJobForm-title__text')}>Chào mừng bạn đến với TopCV,</h2>
                        <div className={cx('createJobForm-title__caption')}>
                            Cùng xây dựng những offer tuyệt vời và nhận được các ứng viên tiềm năng
                        </div>
                    </div>
                    <div className={cx('form')}>
                        <div className={cx('form-login')}>
                            <form onSubmit={handleSubmit} className={cx('form-login__input')}>
                                <div className={cx('form-login__input-group')}>
                                    <label className={cx('form-login__input-group__label')}>Username</label>
                                    <div className={cx('form-login__input-group__fill')}>
                                        <div className={cx('form-login__input-group__fill-icon')}>
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <input
                                            type="text"
                                            className={cx('form-login__input-group__fill-control')}
                                            placeholder="Nhập tên công việc của bạn"
                                            value={usernameInput}
                                            onChange={(e) => {
                                                setUsernameInput(e.target.value);
                                            }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={cx('form-login__input-group')}>
                                    <label className={cx('form-login__input-group__label')}>Ngày hết hạn</label>
                                    <div className={cx('form-login__input-group__fill')}>
                                        <div className={cx('form-login__input-group__fill-icon')}>
                                            <FontAwesomeIcon icon={faClock} />
                                        </div>
                                        <input
                                            type="date"
                                            className={cx('form-login__input-group__fill-control')}
                                            placeholder="Nhập ngày hết hạn của bạn"
                                            value={expiredInput}
                                            onChange={handleExpiredChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={cx('form-login__input-group')}>
                                    <label className={cx('form-login__input-group__label')}>Lương</label>
                                    <div className={cx('form-login__input-group__fill')}>
                                        <div className={cx('form-login__input-group__fill-icon')}>
                                            <FontAwesomeIcon icon={faSackDollar} />
                                        </div>

                                        <select
                                            className={cx('form-login__input-group__fill-control')}
                                            onChange={(e) => {
                                                setSalaryInput(e.target.value);
                                            }}
                                        >
                                            <option value="">Choose here</option>
                                            <option value="over30">Trên 30 triệu đồng/tháng</option>
                                            <option value="between15to30">Từ 15 đến 30 triệu đồng/tháng</option>
                                            <option value="between5to15">Từ 5 đến 15 triệu đồng/tháng</option>
                                            <option value="below_5">Dưới 5 triệu</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={cx('form-login__input-group')}>
                                    <label className={cx('form-login__input-group__label')}>Số lượng yêu cầu</label>
                                    <div className={cx('form-login__input-group__fill')}>
                                        <div className={cx('form-login__input-group__fill-icon')}>
                                            <FontAwesomeIcon icon={faPeopleGroup} />
                                        </div>
                                        <input
                                            type="number"
                                            className={cx('form-login__input-group__fill-control')}
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

                                <div className={cx('form-login__input-group')}>
                                    <label className={cx('form-login__input-group__label')}>Hình thức làm việc</label>
                                    <div className={cx('form-login__input-group__fill')}>
                                        <div className={cx('form-login__input-group__fill-icon')}>
                                            <FontAwesomeIcon icon={faUserTie} />
                                        </div>

                                        <select
                                            className={cx('form-login__input-group__fill-control')}
                                            onChange={(e) => {
                                                setWorkFormatInput(e.target.value);
                                            }}
                                        >
                                            <option value="">Choose here</option>
                                            <option value="intern">Thực tập sinh</option>
                                            <option value="part_time">Bán thời gian</option>
                                            <option value="full_time">Toàn thời gian</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={cx('form-login__input-group')}>
                                    <label className={cx('form-login__input-group__label')}>Cấp bậc</label>
                                    <div className={cx('form-login__input-group__fill')}>
                                        <div className={cx('form-login__input-group__fill-icon')}>
                                            <FontAwesomeIcon icon={faLayerGroup} />
                                        </div>

                                        <select
                                            className={cx('form-login__input-group__fill-control')}
                                            onChange={(e) => {
                                                setLevelInput(e.target.value);
                                            }}
                                        >
                                            <option value="">Choose here</option>
                                            <option value="management">Quản lý</option>
                                            <option value="team_lead">Trưởng phòng</option>
                                            <option value="staff">Nhân viên</option>
                                            <option value="intern">Thực tập sinh</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={cx('form-login__input-group')}>
                                    <label className={cx('form-login__input-group__label')}>Giới tính</label>
                                    <div className={cx('form-login__input-group__fill')}>
                                        <div className={cx('form-login__input-group__fill-icon')}>
                                            <FontAwesomeIcon icon={faVenusMars} />
                                        </div>

                                        <select
                                            className={cx('form-login__input-group__fill-control')}
                                            onChange={(e) => {
                                                setGenderInput(e.target.value);
                                            }}
                                        >
                                            <option value="">Choose here</option>
                                            <option value="male">Nam</option>
                                            <option value="female">Nữ</option>
                                            <option value="both">Không yêu cầu</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={cx('form-login__input-group')}>
                                    <label className={cx('form-login__input-group__label')}>Kinh nghiệm</label>
                                    <div className={cx('form-login__input-group__fill')}>
                                        <div className={cx('form-login__input-group__fill-icon')}>
                                            <FontAwesomeIcon icon={faChartLine} />
                                        </div>
                                        <input
                                            type="text"
                                            className={cx('form-login__input-group__fill-control')}
                                            placeholder="Nhập năm kinh nghiệm yêu cầu"
                                            value={experienceInput}
                                            onChange={(e) => {
                                                setExperienceInput(e.target.value);
                                            }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={cx('form-login__input-group')}>
                                    <button className={cx('form-login__input-group__button')}>Tạo công việc</button>
                                    <button
                                        className={cx('form-login__input-group__button_close')}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/company');
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
    );
}

export default CreateJobForm;
