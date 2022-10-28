import classNames from 'classnames/bind';
import styles from './JobCard.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function JobCard({ id, hrefImg, job, company, salary, address, idCompany, currentUser }) {
    return (
        <div className={cx('job-card__item')}>
            <div className={cx('job-card__item-title')}>
                <div className={cx('job-card__item-title__img')}>
                    <img
                        className={cx('job-card__item-title__img-href')}
                        title="Công Ty TNHH Viet Nam Stay Travel tuyển dụng tại TopCV"
                        alt="avatar"
                        src={hrefImg}
                        data-src="https://cdn.topcv.vn/44/company_logos/ipLdRyrqGnZe4hPCzO2Lj2XPQdzAwp37_1657252043____0afea70639e77b459d5c6d08fe2159ed.png"
                    ></img>
                </div>
                <div className={cx('job-card__item-title__name')}>
                    <Link to={`/jobs/${id}`} className={cx('job-card__item-title__name-job')}>
                        {job}
                    </Link>
                    <Link to={`/company/${idCompany}`} className={cx('job-card__item-title__name-company')}>
                        {company}
                    </Link>
                </div>
                {/* <button
                    className={cx('job-card__item-title__like')}
                    onClick={() => {
                        if (!showIconFollowing) {
                            companyFollow(idCompany, currentUser).then((res) => {
                                if (res) {
                                    setShowIconFollowing(!showIconFollowing);
                                    alert('Theo dõi công ty thành công!');
                                }
                            });
                        } else {
                            companyUnFollow(idCompany, currentUser).then((res) => {
                                if (res) {
                                    setShowIconFollowing(!showIconFollowing);
                                    alert('Bỏ theo dõi công ty thành công!');
                                }
                            });
                        }
                    }}
                >
                    {showIconFollowing ? (
                        <FontAwesomeIcon icon={faHeartSolid} style={{ color: 'red' }} />
                    ) : (
                        <FontAwesomeIcon icon={faHeart} />
                    )}
                </button> */}
            </div>
            <div className={cx('job-card__item-desc')}>
                <span className={cx('job-card__item-desc__salary')}>{salary}</span>
                <span className={cx('job-card__item-desc__address')}>{address}</span>
            </div>
        </div>
    );
}

export default JobCard;
