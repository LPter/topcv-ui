import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CompanyDetailPage.module.scss';
import { companyFollow, companyUnFollow, getCompany } from '../../Api/company-api';
import { getCurrentUser } from '../../Api/user-api';

const cx = classNames.bind(styles);

function CompanyDetailPage() {
    const { companyId } = useParams();
    const [company, setCompany] = useState({});
    const [companyFollowing, setCompanyFollowing] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        getCompany(companyId).then((res) => {
            if (res) {
                setCompany(res);
            }
        });
    }, []);

    useEffect(() => {
        getCurrentUser().then((res) => {
            if (res) {
                setCurrentUser(res);
            }
        });
    }, []);

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
                        <div className={cx('company-container__content-recruit__content')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyDetailPage;
