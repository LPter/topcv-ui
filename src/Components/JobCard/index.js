import classNames from 'classnames/bind';
import styles from './JobCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function JobCard({ hrefImg, job, company, salary, address }) {
    return (
        <div className={cx('job-card__item')}>
            <div className={cx('job-card__item-title')}>
                <div className={cx('job-card__item-title__img')}>
                    <img
                        className={cx('job-card__item-title__img-href')}
                        title="Công Ty TNHH Viet Nam Stay Travel tuyển dụng tại TopCV"
                        alt="Công Ty TNHH Viet Nam Stay Travel tuyển dụng tại TopCV"
                        src={hrefImg}
                        data-src="https://cdn.topcv.vn/44/company_logos/ipLdRyrqGnZe4hPCzO2Lj2XPQdzAwp37_1657252043____0afea70639e77b459d5c6d08fe2159ed.png"
                    ></img>
                </div>
                <div className={cx('job-card__item-title__name')}>
                    <p className={cx('job-card__item-title__name-job')}>{job}</p>
                    <p className={cx('job-card__item-title__name-company')}>{company}</p>
                </div>
                <button className={cx('job-card__item-title__like')}>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
            </div>
            <div className={cx('job-card__item-desc')}>
                <span className={cx('job-card__item-desc__salary')}>{salary}</span>
                <span className={cx('job-card__item-desc__address')}>{address}</span>
            </div>
        </div>
    );
}

export default JobCard;
