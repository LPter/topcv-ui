import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PrimaryButton from '../../Components/PrimaryButton';
import { useState } from 'react';
import JobCard from '../../Components/JobCard';
import useAuth from '../../hooks/useAuth';

const cx = classNames.bind(styles);

function HomePage() {
    const [showSearchAdvance, setShowSearchAdvance] = useState(false);

    const { auth } = useAuth();
    console.log(auth);

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
                                                        name="Ngành nghề"
                                                        className={cx('search-advance__item-select')}
                                                    >
                                                        <option value>Ngành nghề</option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Lập trình viên
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Kế toán
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Sales
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Nhân viên bán hàng
                                                        </option>
                                                    </select>
                                                    <select
                                                        name="Ngành nghề"
                                                        className={cx('search-advance__item-select')}
                                                    >
                                                        <option value>Ngành nghề</option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Lập trình viên
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Kế toán
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Sales
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Nhân viên bán hàng
                                                        </option>
                                                    </select>
                                                    <select
                                                        name="Ngành nghề"
                                                        className={cx('search-advance__item-select')}
                                                    >
                                                        <option value>Ngành nghề</option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Lập trình viên
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Kế toán
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Sales
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Nhân viên bán hàng
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className={cx('search-advance__item-right')}>
                                                    <select
                                                        name="Ngành nghề"
                                                        className={cx('search-advance__item-select')}
                                                    >
                                                        <option value>Ngành nghề</option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Lập trình viên
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Kế toán
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Sales
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Nhân viên bán hàng
                                                        </option>
                                                    </select>
                                                    <select
                                                        name="Ngành nghề"
                                                        className={cx('search-advance__item-select')}
                                                    >
                                                        <option value>Ngành nghề</option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Lập trình viên
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Kế toán
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Sales
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Nhân viên bán hàng
                                                        </option>
                                                    </select>
                                                    <select
                                                        name="Ngành nghề"
                                                        className={cx('search-advance__item-select')}
                                                    >
                                                        <option value>Ngành nghề</option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Lập trình viên
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Kế toán
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Sales
                                                        </option>
                                                        <option className={cx('search-advance__tiem-select__option')}>
                                                            Nhân viên bán hàng
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={cx('search-button')}>
                                <PrimaryButton content="Tìm kiếm ngay" />
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
                        <JobCard
                            hrefImg="https://cdn.topcv.vn/44/company_logos/ipLdRyrqGnZe4hPCzO2Lj2XPQdzAwp37_1657252043____0afea70639e77b459d5c6d08fe2159ed.png"
                            job="Nhân viên kinh doanh"
                            company="Công ty THNN MING"
                            salary="2000 USD"
                            address="Hà nội"
                        />
                        <JobCard
                            hrefImg="https://cdn.topcv.vn/44/company_logos/ipLdRyrqGnZe4hPCzO2Lj2XPQdzAwp37_1657252043____0afea70639e77b459d5c6d08fe2159ed.png"
                            job="Nhân viên kinh doanh"
                            company="Công ty THNN MINGZOOOOO"
                            salary="2000 USD"
                            address="Hà nội"
                        />
                        <JobCard
                            hrefImg="https://cdn.topcv.vn/44/company_logos/ipLdRyrqGnZe4hPCzO2Lj2XPQdzAwp37_1657252043____0afea70639e77b459d5c6d08fe2159ed.png"
                            job="Nhân viên kinh doanh"
                            company="Công ty THNN MINGZOOOOO"
                            salary="2000 USD"
                            address="Hà nội"
                        />
                        <JobCard
                            hrefImg="https://cdn.topcv.vn/44/company_logos/ipLdRyrqGnZe4hPCzO2Lj2XPQdzAwp37_1657252043____0afea70639e77b459d5c6d08fe2159ed.png"
                            job="Nhân viên kinh doanh"
                            company="Công ty THNN MINGZOOOOO"
                            salary="2000 USD"
                            address="Hà nội"
                        />
                        <JobCard
                            hrefImg="https://cdn.topcv.vn/44/company_logos/ipLdRyrqGnZe4hPCzO2Lj2XPQdzAwp37_1657252043____0afea70639e77b459d5c6d08fe2159ed.png"
                            job="Nhân viên kinh doanh"
                            company="Công ty THNN MINGZOOOOO"
                            salary="2000 USD"
                            address="Hà nội"
                        />
                        <JobCard
                            hrefImg="https://cdn.topcv.vn/44/company_logos/ipLdRyrqGnZe4hPCzO2Lj2XPQdzAwp37_1657252043____0afea70639e77b459d5c6d08fe2159ed.png"
                            job="Nhân viên kinh doanh"
                            company="Công ty THNN MINGZOOOOO"
                            salary="2000 USD"
                            address="Hà nội"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
