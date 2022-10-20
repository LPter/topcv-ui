import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PrimaryButton from '../../Components/PrimaryButton';
import { useEffect, useState } from 'react';
import JobCard from '../../Components/JobCard';
import { getJobs } from '../../Api/job-api';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../Api/user-api';

const cx = classNames.bind(styles);

function HomePage() {
    const navigate = useNavigate();

    const [showSearchAdvance, setShowSearchAdvance] = useState(false);

    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const [salary, setSalary] = useState('');
    const [workFormat, setWorkFormat] = useState('');
    const [level, setLevel] = useState('');
    const [location, setLocation] = useState('');

    const [currentUser, setCurrenUser] = useState({});

    const limit = 9;

    const searchApi = '';

    useEffect(() => {
        getCurrentUser().then((res) => {
            if (res) {
                setCurrenUser(res);
            }
        });
    }, []);

    useEffect(() => {
        getJobs(page, limit, searchApi).then((res) => {
            if (res) {
                setJobs(res);
            }
        });
    }, [page]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <div className={cx('search-wrapper')}>
                    <h1>Tìm việc phù hợp với bạn</h1>
                    <div className={cx('search-form')}>
                        <form className={cx('search-form__box')}>
                            <div className={cx('search-form__container')}>
                                <div className={cx('search-form__wrapper')}>
                                    <div className={cx('search-form__wrapper-icon')}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </div>
                                    <input
                                        size={35}
                                        type="text"
                                        className={cx('search-form__wrapper-input')}
                                        placeholder="Tìm kiếm công việc, vị trí ..."
                                        onFocus={() => {
                                            setShowSearchAdvance(!showSearchAdvance);
                                        }}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                    ></input>
                                </div>
                                {showSearchAdvance && (
                                    <div className={cx('search-advance')}>
                                        <div className={cx('search-advance__title')}>
                                            <p className={cx('search-advance__title-text')}>Tìm kiếm nâng cao</p>
                                            <button
                                                className={cx('search-advance__title-collapse')}
                                                onClick={() => {
                                                    setShowSearchAdvance(!showSearchAdvance);
                                                }}
                                            >
                                                Thu gọn
                                            </button>
                                        </div>

                                        <div className={cx('search-advance__wrapper')}>
                                            <div className={cx('search-advance__item')}>
                                                <div className={cx('search-advance__item-left')}>
                                                    <select
                                                        name="Mức lương"
                                                        className={cx('search-advance__item-select')}
                                                        onChange={(e) => {
                                                            setSalary(e.target.value);
                                                        }}
                                                    >
                                                        <option value="">Mức lương</option>
                                                        <option
                                                            value="over30"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Trên 30 triệu đồng/tháng
                                                        </option>
                                                        <option
                                                            value="between15to30"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Từ 15 đến 30 triệu đồng/tháng
                                                        </option>
                                                        <option
                                                            value="between5to15"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Từ 5 đến 15 triệu đồng/tháng
                                                        </option>
                                                        <option
                                                            value="below_5"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Dưới 5 triệu đồng/tháng
                                                        </option>
                                                    </select>
                                                    <select
                                                        name="Hình thức làm việc"
                                                        className={cx('search-advance__item-select')}
                                                        onChange={(e) => {
                                                            setWorkFormat(e.target.value);
                                                        }}
                                                    >
                                                        <option value="">Hình thức làm việc</option>
                                                        <option
                                                            value="intern"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Thực tập sinh
                                                        </option>
                                                        <option
                                                            value="full_time"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Toàn thời gian
                                                        </option>
                                                        <option
                                                            value="part_time"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Bán thời gian
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className={cx('search-advance__item-right')}>
                                                    <select
                                                        name="Cấp bậc"
                                                        className={cx('search-advance__item-select')}
                                                        onChange={(e) => {
                                                            setLevel(e.target.value);
                                                        }}
                                                    >
                                                        <option value="">Cấp bậc</option>
                                                        <option
                                                            value="management"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Quản lý
                                                        </option>
                                                        <option
                                                            value="team_lead"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Trưởng phòng
                                                        </option>
                                                        <option
                                                            value="staff"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Nhân viên
                                                        </option>
                                                        <option
                                                            value="intern"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Thực tập sinh
                                                        </option>
                                                    </select>
                                                    <select
                                                        name="Khu vực"
                                                        className={cx('search-advance__item-select')}
                                                        onChange={(e) => {
                                                            setLocation(e.target.value);
                                                        }}
                                                    >
                                                        <option value="">Khu vực</option>
                                                        <option
                                                            value="hanoi"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Hà Nội
                                                        </option>
                                                        <option
                                                            value="hcm"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            TP.Hồ Chí Minh
                                                        </option>
                                                        <option
                                                            value="danang"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Đà Nẵng
                                                        </option>
                                                        <option
                                                            value="another"
                                                            className={cx('search-advance__tiem-select__option')}
                                                        >
                                                            Khác
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={cx('search-button')}>
                                <button
                                    className={cx('search-button__btn')}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(
                                            `/search`,
                                            {
                                                state: {
                                                    search: search,
                                                    salary: salary,
                                                    workFormat: workFormat,
                                                    level: level,
                                                    location: location,
                                                },
                                            },
                                            { replace: true },
                                        );
                                    }}
                                >
                                    <PrimaryButton content="Tìm kiếm ngay" />
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className={cx('search-company')}>
                        <h4>Các công ty tuyển dụng hàng đầu trên TopCV</h4>
                        <div className={cx('search-company__top')}>
                            <div className={cx('search-company__top-item')}>
                                <img
                                    src="https://www.topcv.vn/v4/image/welcome/companies/onemoutn.png"
                                    title="One Mount tuyển dụng tại TopCV"
                                    alt="One Mount tuyen dung tai TopCV"
                                    className={cx('search-company__top-item__img')}
                                ></img>
                            </div>
                            <div className={cx('search-company__top-item')}>
                                <img
                                    src="https://www.topcv.vn/v4/image/welcome/companies/prudential.png"
                                    title="Prudential tuyển dụng tại TopCV"
                                    alt="Prudential tuyen dung tai TopCV"
                                    className={cx('search-company__top-item__img')}
                                ></img>
                            </div>
                            <div className={cx('search-company__top-item')}>
                                <img
                                    src="https://www.topcv.vn/v4/image/welcome/companies/fpt.png"
                                    title="FPT Software tuyển dụng tại TopCV"
                                    alt="FPT Software tuyen dung tai TopCV"
                                    className={cx('search-company__top-item__img')}
                                ></img>
                            </div>
                            <div className={cx('search-company__top-item')}>
                                <img
                                    src="https://www.topcv.vn/v4/image/welcome/companies/tiki.png"
                                    title="Tiki tuyển dụng tại TopCV"
                                    alt="Tiki tuyen dung tai TopCV"
                                    className={cx('search-company__top-item__img')}
                                ></img>
                            </div>
                            <div className={cx('search-company__top-item')}>
                                <img
                                    src="https://www.topcv.vn/v4/image/welcome/companies/viettel.png"
                                    title="Viettel tuyển dụng tại TopCV"
                                    alt="Viettel tuyen dung tai TopCV"
                                    className={cx('search-company__top-item__img')}
                                ></img>
                            </div>
                            <div className={cx('search-company__top-item')}>
                                <img
                                    src="https://www.topcv.vn/v4/image/welcome/companies/teachcombank.png"
                                    title="Techcombank tuyển dụng tại TopCV"
                                    alt="Techcombank tuyen dung tai TopCV"
                                    className={cx('search-company__top-item__img')}
                                ></img>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('search-img')}>
                    <img
                        src="https://www.topcv.vn/v4/image/welcome/image_topcv.png?v=1.0.0"
                        title="Nhân viên tuyển dụng tại TopCV"
                        alt="Nhan vien tuyen dung tai TopCV"
                        className={cx('search-img__href')}
                    ></img>
                </div>
            </div>
            <div className={cx('job')}>
                <div className={cx('job-container')}>
                    <div className={cx('job-container__wrapper')}>
                        {jobs.map((job, index) => (
                            <JobCard
                                key={index}
                                id={job?.id}
                                hrefImg={job?.company?.user?.avatar}
                                job={job?.name}
                                company={job?.company?.name}
                                salary={job?.salary}
                                address={job?.company?.address}
                                idCompany={job?.company?.id}
                                currentUser={currentUser}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('pagination')}>
                <div className={cx('pagination-container')}>
                    <button
                        className={cx('pagination-container__btn')}
                        onClick={(e) => {
                            setPage(page - 1);
                        }}
                    >
                        <FontAwesomeIcon icon={faAnglesLeft} />
                        <span>Trang trước</span>
                    </button>
                    <button
                        className={cx('pagination-container__btn')}
                        onClick={() => {
                            setPage(page + 1);
                        }}
                    >
                        <span>Trang sau</span>
                        <FontAwesomeIcon icon={faAnglesRight} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
