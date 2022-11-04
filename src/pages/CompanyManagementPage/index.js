import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getJobsByCompany, deleteJob, getJob } from '../../Api/job-api';
import './CompanyManagementPage.scss';
import EditJobForm from '../../Components/EditJobForm';
import { deleteCV, getCVsByCompany } from '../../Api/cv-api';

function CompanyManagementPage() {
    const [activeTabSidebar1, setActiveTabSidebar1] = useState(true);
    const [activeTabSidebar2, setActiveTabSidebar2] = useState(false);

    const [modifyJob, setModifyJob] = useState(false);
    const [modifyCV, setModifyCV] = useState(false);

    const [jobsRows, setJobsRows] = useState([]);
    const [CVsRows, setCVsRows] = useState([]);

    const [showEditRecordJob, setShowEditRecordJob] = useState(false);

    const [selectedRowJob, setSeletedRowJob] = useState({});

    const jobsColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 50,
            renderCell: (params) => {
                return (
                    <div className="cellWithId">
                        <span>{params.row.id}</span>
                    </div>
                );
            },
        },
        {
            field: 'name',
            headerName: 'TÊN CÔNG VIỆC',
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="cellWithName">
                        <span>{params.row.name}</span>
                    </div>
                );
            },
        },
        {
            field: 'createdAt',
            headerName: 'NGÀY TẠO',
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="cellWithCreatedAt">
                        <span>{params.row.createdAt.slice(0, 10)}</span>
                    </div>
                );
            },
        },
        {
            field: 'expired',
            headerName: 'NGÀY HẾT HẠN',
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="cellWithExpired">
                        <span>{params.row.expired.slice(0, 10)}</span>
                    </div>
                );
            },
        },
        {
            field: 'salary',
            headerName: 'LƯƠNG',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellWithSalary">
                        <span>{params.row.salary}</span>
                    </div>
                );
            },
        },
        {
            field: 'recruitQuantity',
            headerName: 'SỐ LƯỢNG',
            width: 70,
            renderCell: (params) => {
                return (
                    <div className="cellWithRecruitQuantity">
                        <span>{params.row.recruitQuantity}</span>
                    </div>
                );
            },
        },
        {
            field: 'workFormat',
            headerName: 'HÌNH THỨC LÀM VIỆC',
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellWithWorkFormat">
                        <span>{params.row.workFormat}</span>
                    </div>
                );
            },
        },
        {
            field: 'level',
            headerName: 'CẤP BẬC',
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellWithLevel">
                        <span>{params.row.level}</span>
                    </div>
                );
            },
        },
        {
            field: 'actions',
            headerName: 'HÀNH ĐỘNG',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="adminActionContainer">
                        <div className="adminActionContainer_edit">
                            <button
                                className="adminActionContainer_edit_btn"
                                onClick={() => {
                                    getJob(params.row.id).then((res) => {
                                        setSeletedRowJob(res);
                                        setShowEditRecordJob(!showEditRecordJob);
                                    });
                                }}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                        </div>
                        <div className="adminActionContainer_delete">
                            <button
                                className="adminActionContainer_delete_btn"
                                onClick={() => {
                                    if (window.confirm('Bạn có chắc chắn muốn xóa công việc này!!!!')) {
                                        deleteJob(params.row.id).then((res) => {
                                            if (res) {
                                                setModifyJob(!modifyJob);
                                                alert('Xóa công việc thành công!!');
                                            }
                                        });
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    </div>
                );
            },
        },
    ];

    const CVsColumns = [
        {
            field: 'cv_id',
            headerName: 'ID',
            width: 50,
            renderCell: (params) => {
                return (
                    <div className="cellWithId">
                        <span>{params.row.cv_id}</span>
                    </div>
                );
            },
        },
        {
            field: 'job_name',
            headerName: 'TÊN CÔNG VIỆC',
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cellWithName">
                        <span>{params.row.job_name}</span>
                    </div>
                );
            },
        },
        {
            field: 'url',
            headerName: 'URL',
            width: 550,
            renderCell: (params) => {
                return (
                    <div className="cellWithName">
                        <a href={params.row.url}>{params.row.url}</a>
                    </div>
                );
            },
        },
        {
            field: 'cv_createdAt',
            headerName: 'NGÀY TẠO',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellWithCreatedAt">
                        <span>{params.row.cv_createdAt.slice(0, 10)}</span>
                    </div>
                );
            },
        },
        {
            field: 'actions',
            headerName: 'HÀNH ĐỘNG',
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="adminActionContainer">
                        <div className="adminActionContainer_delete">
                            <button
                                className="adminActionContainer_delete_btn"
                                onClick={() => {
                                    if (window.confirm('Bạn có chắc chắn muốn xóa cv này!!!!')) {
                                        deleteCV(params.row.cv_id).then((res) => {
                                            if (res) {
                                                setModifyCV(!modifyCV);
                                                alert('Xóa cv thành công!!');
                                            }
                                        });
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        getJobsByCompany(1, 999).then((res) => {
            setJobsRows(res);
        });
        getCVsByCompany(1, 999).then((res) => {
            setCVsRows(res);
        });
    }, [modifyJob, modifyCV]);

    return (
        <div className="admin">
            <div className="admin-wrapper">
                <div className="admin-wrapper__sidebar">
                    <ul className="admin-wrapper__sidebar-tab">
                        {(!activeTabSidebar1 && (
                            <li
                                className="admin-wrapper__sidebar-tab__item"
                                onClick={() => {
                                    setActiveTabSidebar1(!activeTabSidebar1);
                                    setActiveTabSidebar2(!activeTabSidebar2);
                                }}
                            >
                                {/* <FontAwesomeIcon icon={faUser} /> */}
                                <span className="admin-wrapper__sidebar-tab__item-icon">Quản lý công việc</span>
                            </li>
                        )) ||
                            (activeTabSidebar1 && (
                                <li className="admin-wrapper__sidebar-tab__item-active">
                                    {/* <FontAwesomeIcon icon={faUser} /> */}
                                    <span className="admin-wrapper__sidebar-tab__item-icon">Quản lý công việc</span>
                                </li>
                            ))}

                        {(!activeTabSidebar2 && (
                            <li
                                className="admin-wrapper__sidebar-tab__item"
                                onClick={() => {
                                    setActiveTabSidebar2(!activeTabSidebar2);
                                    setActiveTabSidebar1(!activeTabSidebar1);
                                }}
                            >
                                {/* <FontAwesomeIcon icon={faBuilding} /> */}
                                <span className="admin-wrapper__sidebar-tab__item-icon">Quản lý sơ yếu lý lịch</span>
                            </li>
                        )) ||
                            (activeTabSidebar2 && (
                                <li className="admin-wrapper__sidebar-tab__item-active">
                                    {/* <FontAwesomeIcon icon={faBuilding} /> */}
                                    <span className="admin-wrapper__sidebar-tab__item-icon">
                                        Quản lý sơ yếu lý lịch
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="datatable">
                    {activeTabSidebar1 && (
                        <>
                            <DataGrid
                                className="datagrid"
                                rows={jobsRows}
                                columns={jobsColumns}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                            />
                        </>
                    )}
                    {activeTabSidebar2 && (
                        <>
                            <DataGrid
                                className="datagrid"
                                rows={CVsRows}
                                columns={CVsColumns}
                                getRowId={(row) => row.cv_id + row.url}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                            />
                        </>
                    )}
                </div>
                {showEditRecordJob && (
                    <EditJobForm
                        id={selectedRowJob.id}
                        name={selectedRowJob.name}
                        expired={selectedRowJob.expired}
                        salary={selectedRowJob.salary}
                        recruitQuantity={selectedRowJob.recruitQuantity}
                        workFormat={selectedRowJob.workFormat}
                        level={selectedRowJob.level}
                        gender={selectedRowJob.gender}
                        experience={selectedRowJob.experience}
                        showAddRecordJob={showEditRecordJob}
                        setShowAddRecordJob={setShowEditRecordJob}
                        modifyJob={modifyJob}
                        setModifyJob={setModifyJob}
                    />
                )}
            </div>
        </div>
    );
}

export default CompanyManagementPage;
