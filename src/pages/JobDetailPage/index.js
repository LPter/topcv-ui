import { faClock, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './JobDetailPage.module.scss';

const cx = classNames.bind(styles);

function JobDetailPage() {
    const [activeTab, setActiveTab] = useState(true);
    const [cv, setCv] = useState(null);
    const [showUpLoadForm, setShowUpLoadForm] = useState(false);
    const [showUpLoad, setShowUpLoad] = useState(false);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div className={cx('header-container')}>
                        <div className={cx('header-container__logo')}>
                            <img
                                className={cx('header-container__logo-img')}
                                src="https://cdn.topcv.vn/80/company_logos/cong-ty-mylife-company-5fe45369490b5.jpg"
                                alt="CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ CUỘC SỐNG CỦA TÔI"
                            ></img>
                        </div>

                        <div className={cx('header-container__info')}>
                            <h1 className={cx('header-container__info-title')}>
                                Giám sát nhà hàng (Quản lý nhà hàng) - upto 25 triệu
                            </h1>
                            <div className={cx('header-container__info-company')}>
                                CÔNG TY TNHH VÀ DỊCH VỤ CUỘC SỐNG CỦA TÔI
                            </div>
                            <div className={cx('header-container__info-deadline')}>
                                <FontAwesomeIcon icon={faClock} />
                                Hạn nộp hồ sơ: 31/10/2022
                            </div>
                        </div>

                        <div className={cx('header-container__apply')}>
                            <button
                                className={cx('header-container__apply-button')}
                                onClick={() => {
                                    setShowUpLoadForm(!showUpLoadForm);
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faPaperPlane}
                                    className={cx('header-container__apply-button__icon')}
                                />
                                <span className={cx('header-container__apply-button__text')}>Ứng tuyển ngay</span>
                            </button>
                            <button className={cx('header-container__apply-save')}>
                                <FontAwesomeIcon icon={faHeart} className={cx('header-container__apply-save__icon')} />
                                <span className={cx('header-container__apply-save__text')}>Lưu tin</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('navbar')}>
                    <ul className={cx('navbar-container')}>
                        <li
                            className={cx('navbar-container__item')}
                            onClick={(e) => {
                                setActiveTab(!activeTab);
                            }}
                        >
                            {activeTab && (
                                <a
                                    style={{
                                        borderBottomWith: '1px',
                                        borderBottomStyle: 'solid',
                                        borderBottomColor: '#333',
                                        opacity: '1',
                                        color: '#333',
                                        fontWeight: '600',
                                    }}
                                    href="#recruit"
                                    className={cx('navbar-container__item-toggle')}
                                >
                                    Tin tuyển dụng
                                </a>
                            )}

                            {!activeTab && (
                                <a href="#recruit" className={cx('navbar-container__item-toggle')}>
                                    Tin tuyển dụng
                                </a>
                            )}
                        </li>
                        <li
                            className={cx('navbar-container__item')}
                            onClick={(e) => {
                                setActiveTab(!activeTab);
                            }}
                        >
                            {!activeTab && (
                                <a
                                    style={{
                                        borderBottomWith: '1px',
                                        borderBottomStyle: 'solid',
                                        borderBottomColor: '#333',
                                        opacity: '1',
                                        color: '#333',
                                        fontWeight: '600',
                                    }}
                                    href="#company"
                                    className={cx('navbar-container__item-toggle')}
                                >
                                    Thông tin công ty
                                </a>
                            )}

                            {activeTab && (
                                <a href="#company" className={cx('navbar-container__item-toggle')}>
                                    Thông tin công ty
                                </a>
                            )}
                        </li>
                    </ul>
                </div>
                <div className={cx('content')}>
                    <div id="recruit" className={cx('recruit')}>
                        <div className={cx('recruit-container')}>
                            <div>
                                <h2 className={cx('recruit-container__header')}>Chi tiết tin tuyển dụng</h2>
                            </div>

                            <div className={cx('recruit-container__generalInfo')}>
                                <div className={cx('recruit-container__generalInfo-wrapper')}>
                                    <p className={cx('recruit-container__generalInfo-wrapper__title')}>
                                        Thông tin chung
                                    </p>
                                    <div className={cx('recruit-container__generalInfo-wrapper__box')}>
                                        <div className={cx('recruit-container__generalInfo-wrapper__box-item')}>
                                            <img
                                                src="https://www.topcv.vn/v4/image/job-detail/icon/1.svg"
                                                alt=""
                                                className={cx('recruit-container__generalInfo-wrapper__box-item__img')}
                                            ></img>
                                            <div>
                                                <strong>Mức lương</strong>
                                                <br></br>
                                                <span>10-25 triệu</span>
                                            </div>
                                        </div>
                                        <div className={cx('recruit-container__generalInfo-wrapper__box-item')}>
                                            <img
                                                src="https://www.topcv.vn/v4/image/job-detail/icon/5.svg"
                                                alt=""
                                                className={cx('recruit-container__generalInfo-wrapper__box-item__img')}
                                            ></img>
                                            <div>
                                                <strong>Số lượng tuyển</strong> <br></br>
                                                <span>8 người</span>
                                            </div>
                                        </div>
                                        <div className={cx('recruit-container__generalInfo-wrapper__box-item')}>
                                            <img
                                                src="https://www.topcv.vn/v4/image/job-detail/icon/2.svg"
                                                alt=""
                                                className={cx('recruit-container__generalInfo-wrapper__box-item__img')}
                                            ></img>
                                            <div>
                                                <strong>Hình thức làm việc</strong>
                                                <br></br>
                                                <span>Toàn thời gian</span>
                                            </div>
                                        </div>
                                        <div className={cx('recruit-container__generalInfo-wrapper__box-item')}>
                                            <img
                                                src="https://www.topcv.vn/v4/image/job-detail/icon/6.svg"
                                                alt=""
                                                className={cx('recruit-container__generalInfo-wrapper__box-item__img')}
                                            ></img>
                                            <div>
                                                <strong>Cấp bậc</strong>
                                                <br></br>
                                                <span>Quản lý/Giám sát</span>
                                            </div>
                                        </div>
                                        <div className={cx('recruit-container__generalInfo-wrapper__box-item')}>
                                            <img
                                                src="https://www.topcv.vn/v4/image/job-detail/icon/3.svg"
                                                alt=""
                                                className={cx('recruit-container__generalInfo-wrapper__box-item__img')}
                                            ></img>
                                            <div>
                                                <strong>Giới tính</strong>
                                                <br></br>
                                                <span>Không yêu cầu</span>
                                            </div>
                                        </div>
                                        <div className={cx('recruit-container__generalInfo-wrapper__box-item')}>
                                            <img
                                                src="https://www.topcv.vn/v4/image/job-detail/icon/7.svg"
                                                alt=""
                                                className={cx('recruit-container__generalInfo-wrapper__box-item__img')}
                                            ></img>
                                            <div>
                                                <strong>Kinh nghiệm</strong>
                                                <br></br>
                                                <span>1 năm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('recruit-container__address')}>
                                <div className={cx('recruit-container__address-wrapper')}>
                                    <p className={cx('recruit-container__address-wrapper__text')}>Địa điểm làm việc</p>
                                    <div>
                                        <div style={{ marginBottom: '10px' }}>
                                            - Hồ Chí Minh: 47-49 Trần Ngọc Diện, Thảo Điền, Quận 2
                                        </div>
                                        <div style={{ marginBottom: '10px' }}>
                                            - Hồ Chí Minh: 123 Bà Huyện Thanh Quan, P. Võ Thị Sáu, Quận 3
                                        </div>
                                        <div style={{ marginBottom: '10px' }}>
                                            - Hồ Chí Minh: 4 Alexandre de Rhodes, Bến Nghé, Quận 1
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="company" className={cx('company')}>
                        <div className={cx('company-container')}>
                            <div className={cx('company-container__title')}>
                                <h2 className={cx('company-container__title-text')}>
                                    Thông tin CÔNG TY TNHH QUỐC TẾ SƠN HÀ
                                </h2>
                            </div>
                            <div className={cx('company-container__info')}>
                                <div className={cx('company-container__info-item')}>
                                    <img
                                        src="https://www.topcv.vn/v4/image/job-detail/icon/8.svg"
                                        alt=""
                                        style={{ marginRight: '16px' }}
                                    ></img>
                                    <div>
                                        <p className={cx('company-container__info-item__title')}>Giới thiệu</p>
                                        <span>
                                            <p>Giới thiệu sơ bộ về SHC Group - Tập Đoàn Sơn Hà</p>
                                            <p>Tập Đoàn Sơn Hà bao gồm 3 công ty con:</p>
                                            <p>
                                                Công ty TNHH Đầu tư phát triển quốc tế Sơn Hà: được thành lập đầu tiên
                                                trong khối SHC từ năm 2013 đến nay trải qua gần 10 năm xây dựng và phát
                                                triển hiện tại Sơn Hà đang là công ty hàng đầu trong việc cung cấp các
                                                mặt hàng khoáng sản trong nước. Phục vụ các ngành xây dựng, thực ăn chăn
                                                nuôi, thủy sản, vv.....
                                            </p>
                                            <p>
                                                Công ty TNHH Khoáng Sản Sơn Hà 18: Với sự phát triển vượt bậc về tiêu
                                                thụ sản lượng của Công ty Sơn Hà. SHC Group đầu tư kinh phí lớn xây dựng
                                                Nhà máy với dây chuyền khép kín, máy móc hiện đại bậc nhất tại chuyên
                                                cung cấp các mặt hàng khoáng sản phục vụ cho trong nước và xuất khẩu.
                                                Nhà máy đặt tại Kim Bảng, Hà Nam
                                            </p>
                                            <p>
                                                Công ty TNHH Khoáng Sản Công Nghệ Việt Nam: Công ty được thành lập sau
                                                cùng, thành lập năm 2019 chuyên về kinh doanh mặt hàng xuất khẩu đi các
                                                nước Mỹ, Ấn Độ, Nhật vv.... Mặc dù thành lập sau cũng tuy nhiên hiện tại
                                                Công ty Khoáng Sản Công Nghệ đang có doanh thu vượt bậc và đáng kinh
                                                ngạc nhất. Hiện tại công ty đã Cổ phần thành công và đổi tên thành Công
                                                ty Cổ Phần Khoáng Sản Công Nghệ Việt Nam
                                            </p>
                                            <p>&nbsp;</p>
                                        </span>
                                    </div>
                                </div>

                                <div className={cx('company-container__info-item')}>
                                    <img
                                        src="https://www.topcv.vn/v4/image/job-detail/icon/9.svg"
                                        alt=""
                                        style={{ marginRight: '16px' }}
                                    ></img>
                                    <div>
                                        <p className={cx('company-container__info-item__title')}>Quy mô</p>
                                        <span>25-99 nhân viên</span>
                                    </div>
                                </div>
                                <div className={cx('company-container__info-item')}>
                                    <img
                                        src="https://www.topcv.vn/v4/image/job-detail/icon/10.svg"
                                        alt=""
                                        style={{ marginRight: '16px' }}
                                    ></img>
                                    <div>
                                        <p className={cx('company-container__info-item__title')}>Địa điểm</p>
                                        <span>Số 1 ngõ 75 Trần Quang Diệu, P Ô Chợ Dừa, Đống Đa, Hà Nội</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showUpLoadForm && (
                <div className={cx('upload')}>
                    <div className={cx('upload-dialog')}>
                        <div className={cx('upload-dialog__container')}>
                            <div className={cx('upload-dialog__container-header')}>
                                <h4 className={cx('upload-dialog__container-header__title')}>
                                    Ứng tuyển nhân viên tư vấn chăm sóc khách hàng (thu nhập lên đến 20 triệu đồng
                                    tháng)
                                </h4>
                                <button
                                    className={cx('upload-dialog__container-header__close')}
                                    onClick={() => {
                                        setShowUpLoadForm(!showUpLoadForm);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                            <div className={cx('upload-dialog__container-content')}>
                                <div className={cx('upload-dialog__container-content__wrapper')}>
                                    <button
                                        className={cx('upload-dialog__container-content__wrapper-uploadBtn')}
                                        onClick={() => {
                                            setShowUpLoad(!showUpLoad);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                                        <span>Tải CV lên từ máy tính</span>
                                    </button>
                                    {showUpLoad && (
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                setCv(e.target.files[0]);
                                            }}
                                            placeholder={cv}
                                        ></input>
                                    )}
                                </div>
                            </div>
                            <div className={cx('upload-dialog__container-btn')}>
                                <button className={cx('upload-dialog__container-btn__closeBtn')}>Đóng lại</button>
                                <button className={cx('upload-dialog__container-btn__submitBtn')}>Nộp cv</button>
                            </div>
                        </div>
                        <div className={cx('upload-dialog__chosse-cv-overlay')}></div>
                    </div>
                </div>
            )}
        </>
    );
}

export default JobDetailPage;
