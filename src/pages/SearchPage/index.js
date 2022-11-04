import classNames from 'classnames/bind';
import styles from './SearchPage.module.scss';
import { getJobs } from '../../Api/job-api';
import { useEffect, useState } from 'react';
import JobCard from '../../Components/JobCard';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const limit = 4;

function SearchPage() {
    const locationParams = useLocation();

    const [page, setPage] = useState(1);
    const [jobs, setJobs] = useState([]);

    const [salary, setSalary] = useState(locationParams.state.salary);
    const [workFormat, setWorkFormat] = useState(locationParams.state.workFormat);
    const [level, setLevel] = useState(locationParams.state.level);
    const [location, setLocation] = useState(locationParams.state.location);
    const search = locationParams.state.search;

    useEffect(() => {
        getJobs(page, limit, search, salary, workFormat, level, location).then((res) => {
            if (res) {
                setJobs(res);
            }
        });
    }, [salary, workFormat, level, location, page]);

    return (
        <div className={cx('search')}>
            <div className={cx('search-container')}>
                <div className={cx('search-container__filter')}>
                    <div className={cx('search-container__filter-item')}>
                        <select
                            className={cx('search-container__filter-item__select')}
                            onChange={(e) => {
                                setSalary(e.target.value);
                                console.log(salary);
                            }}
                        >
                            <option value="over30">Mức lương</option>
                            <option value="over30">Trên 30 triệu đồng/tháng</option>
                            <option value="between15to30">Từ 15 đến 30 triệu đồng/tháng</option>
                            <option value="between5to15">Từ 5 đến 15 triệu đồng/tháng</option>
                            <option value="below_5">Dưới 5 triệu đồng/tháng</option>
                        </select>
                    </div>
                    <div className={cx('search-container__filter-item')}>
                        <select
                            className={cx('search-container__filter-item__select')}
                            onChange={(e) => {
                                setWorkFormat(e.target.value);
                            }}
                        >
                            <option value="intern">Hình thức làm việc</option>
                            <option value="intern">Thực tập sinh</option>
                            <option value="part_time">Bán thời gian</option>
                            <option value="full_time">Toàn thời gian</option>
                        </select>
                    </div>
                    <div className={cx('search-container__filter-item')}>
                        <select
                            className={cx('search-container__filter-item__select')}
                            onChange={(e) => {
                                setLevel(e.target.value);
                            }}
                        >
                            <option value="team_lead">Cấp bậc</option>
                            <option value="management">Quản lý</option>
                            <option value="team_lead">Trưởng phòng</option>
                            <option value="staff">Nhân viên</option>
                            <option value="intern">Thực tập sinh</option>
                        </select>
                    </div>
                    <div className={cx('search-container__filter-item')}>
                        <select
                            className={cx('search-container__filter-item__select')}
                            onChange={(e) => {
                                setLocation(e.target.value);
                            }}
                        >
                            <option value="hanoi">Khu vực</option>
                            <option value="hanoi">Hà Nội</option>
                            <option value="hcm">TP.Hồ Chí Minh</option>
                            <option value="danang">Đà Nẵng</option>
                            <option value="another">Khác</option>
                        </select>
                    </div>
                </div>
                <div className={cx('search-container__jobs')}>
                    <div className={cx('search-container__jobs-wrapper')}>
                        {jobs &&
                            jobs.map((job, index) => (
                                <JobCard
                                    key={index}
                                    id={job.id}
                                    hrefImg={job.company?.user?.avatar}
                                    job={job.name}
                                    company={job.company.name}
                                    salary={job.salary}
                                    address={job.company.address}
                                    idCompany={job?.company?.id}
                                />
                            ))}
                    </div>
                </div>
                <div className={cx('pagination')}>
                    <div className={cx('pagination-container')}>
                        <button
                            className={cx('pagination-container__btn')}
                            onClick={(e) => {
                                if (page > 1) {
                                    setPage(page - 1);
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faAnglesLeft} />
                            <span>Trang trước</span>
                        </button>
                        <button
                            className={cx('pagination-container__btn')}
                            onClick={() => {
                                if (page < jobs.length / limit + 1) {
                                    setPage(page + 1);
                                }
                            }}
                        >
                            <span>Trang sau</span>
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
