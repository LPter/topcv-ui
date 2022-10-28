import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CompanyDetailPage.module.scss';
import { companyFollow, companyUnFollow, getCompany } from '../../Api/company-api';
import { getCurrentUser } from '../../Api/user-api';
import JobCard from '../../Components/JobCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../Auth/AuthProvider';

const cx = classNames.bind(styles);

function CompanyDetailPage() {
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const { companyId } = useParams();
    const [company, setCompany] = useState({});
    const [jobs, setJobs] = useState([]);
    const [companyFollowing, setCompanyFollowing] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        getCurrentUser().then((res) => {
            if (res) {
                setCurrentUser(res);
            }
        });
    }, []);

    useEffect(() => {
        getCompany(companyId).then((res) => {
            if (res) {
                setCompany(res);
                setJobs(res.jobs);
            }
        });
    }, []);

    useEffect(() => {
        const usersFollowed = company.usersFollowed || [];
        usersFollowed.map((user) => {
            if (user.id === currentUser.id) {
                setCompanyFollowing(!companyFollowing);
            }
        });
    }, [company, currentUser]);

    return (
        <div className={cx('company')}>
            <div className={cx('company-container')}>
                <div className={cx('company-container__header')}>
                    <div className={cx('company-container__header-imgCover')}>
                        <img
                            src="https://www.topcv.vn/images/default_cover/default_normal_cover.jpg"
                            width="100%"
                            height="236px"
                            alt="..."
                        ></img>
                    </div>
                    <div className={cx('company-container__header-content')}>
                        <div className={cx('company-container__header-content__avatar')}>
                            <img
                                className={cx('company-container__header-content__avatar-img')}
                                src={company?.user?.avatar}
                                alt="avatar"
                            ></img>
                        </div>
                        <div className={cx('company-container__header-content__title')}>
                            <div className={cx('company-container__header-content__title-text')}>{company.name}</div>
                            <div className={cx('company-container__header-content__title-numberEmployee')}>
                                {company.employeeNumber} Nhân viên
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <button
                                className={cx('company-container__header-content__btn')}
                                onClick={() => {
                                    if (!companyFollowing) {
                                        companyFollow(company?.id, currentUser).then((res) => {
                                            if (res) {
                                                setCompanyFollowing(!companyFollowing);
                                                alert('Theo dõi công ty thành công!');
                                            }
                                        });
                                    } else {
                                        companyUnFollow(company?.id, currentUser).then((res) => {
                                            if (res) {
                                                setCompanyFollowing(!companyFollowing);
                                                alert('Bỏ theo dõi công ty thành công!');
                                            }
                                        });
                                    }
                                }}
                            >
                                {companyFollowing ? <span>Bỏ theo dõi công ty</span> : <span>Theo dõi công ty</span>}
                            </button>
                            <button
                                className={cx('company-container__header-content__btn-chat')}
                                onClick={() => {
                                    navigate(`/user/chat/${auth?.id}`, {
                                        state: { onID: company?.user?.id },
                                    });
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faComment}
                                    className={cx('company-container__header-content__btn-chat__icon')}
                                />
                                <span className={cx('company-container__header-content__btn-chat__text')}>
                                    Liên hệ với chúng tôi
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('company-container__content')}>
                    <div className={cx('company-container__content-info')}>
                        <div className={cx('company-container__content-info__title')}>
                            <p className={cx('company-container__content-info__title-text')}>Giới thiệu công ty</p>
                        </div>
                        <div className={cx('company-container__content-info__content')}>
                            <p className={cx('company-container__content-info__content')}>{company.introduction}</p>
                        </div>
                    </div>
                    <div className={cx('company-container__content-recruit')}>
                        <div className={cx('company-container__content-recruit__title')}>
                            <p className={cx('company-container__content-recruit__title-text')}>Tuyển dụng</p>
                        </div>
                        <div className={cx('company-container__content-recruit__content')}>
                            {jobs.map((job, index) => (
                                <JobCard
                                    key={index}
                                    id={job?.id}
                                    hrefImg={company?.user?.avatar}
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
            </div>
        </div>
    );
}

export default CompanyDetailPage;
