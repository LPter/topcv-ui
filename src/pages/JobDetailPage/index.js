import { faClock, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import styles from './JobDetailPage.module.scss';
import { getJob, upLoadCV } from '../../Api/job-api';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../Auth/AuthProvider';

const cx = classNames.bind(styles);

function JobDetailPage() {
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(true);
    const [cv, setCv] = useState(null);
    const [showUpLoadForm, setShowUpLoadForm] = useState(false);
    const [showUpLoad, setShowUpLoad] = useState(false);
    const [job, setJob] = useState({});

    const { jobId } = useParams();

    useEffect(() => {
        getJob(jobId).then((res) => {
            if (res) {
                setJob(res);
            }
        });
    }, []);

    function handleSubmit() {
        if (auth?.role === 'user') {
            upLoadCV(jobId, cv).then((res) => {
                if (res) {
                    alert('Upload CV thành công!! Vui lòng chờ phản hồi từ phía công ty');
                }
            });
        } else {
            navigate('/login');
            alert('Bạn không phải người dùng nên ko thể ứng tuyển!! Vui lòng đăng nhập lại.');
        }
    }

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div className={cx('header-container')}>
                        <div className={cx('header-container__logo')}>
                            <img
                                className={cx('header-container__logo-img')}
                                src={job?.company?.user?.avatar}
                                alt="avatar"
                            ></img>
                        </div>

                        <div className={cx('header-container__info')}>
                            <h1 className={cx('header-container__info-title')}>{job?.name}</h1>
                            <div className={cx('header-container__info-company')}>{job?.company?.name}</div>
                            <div className={cx('header-container__info-deadline')}>
                                <FontAwesomeIcon icon={faClock} />
                                Hạn nộp hồ sơ: {job?.expired?.slice(0, 10)}
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
                                <span className={cx('header-container__apply-save__text')}>Theo dõi công ty</span>
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
                                                <span>{job?.salary}</span>
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
                                                <span>{job?.recruitQuantity}</span>
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
                                                <span>{job?.workFormat}</span>
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
                                                <span>{job?.level}</span>
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
                                                <span>{job?.gender}</span>
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
                                                <span>{job?.experience}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('recruit-container__address')}>
                                <div className={cx('recruit-container__address-wrapper')}>
                                    <p className={cx('recruit-container__address-wrapper__text')}>Địa điểm làm việc</p>
                                    <div>
                                        <div style={{ marginBottom: '10px' }}>{job?.company?.address}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="company" className={cx('company')}>
                        <div className={cx('company-container')}>
                            <div className={cx('company-container__title')}>
                                <h2 className={cx('company-container__title-text')}>Thông tin {job?.company?.name}</h2>
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
                                            {job?.company?.introduction}
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
                                        <span>{job?.company?.employeeNumber}</span>
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
                                        <span>{job?.company?.address}</span>
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
                                    Ứng tuyển {job?.name} (thu nhập lên đến {job?.salary})
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
                                <button
                                    className={cx('upload-dialog__container-btn__closeBtn')}
                                    onClick={() => {
                                        setShowUpLoad(!showUpLoad);
                                    }}
                                >
                                    Đóng lại
                                </button>
                                <button
                                    className={cx('upload-dialog__container-btn__submitBtn')}
                                    onClick={handleSubmit}
                                >
                                    Nộp cv
                                </button>
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
