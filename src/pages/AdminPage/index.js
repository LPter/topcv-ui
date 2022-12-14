import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faAddressCard, faBuilding, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { deleteJob, getJob, getJobs } from '../../Api/job-api';
import { deleteUser, getUser, getUsers } from '../../Api/user-api';
import { getCompanies, getCompany, deleteCompany } from '../../Api/company-api';
import { deleteCV, getCVs } from '../../Api/cv-api';
import './AdminPage.scss';
import CreateCompanyForm from '../../Components/CreateCompanyForm';
import EditCompanyForm from '../../Components/EditCompanyForm';
import CreateUserForm from '../../Components/CreateUserForm';
import EditUserForm from '../../Components/EditUserForm';
import EditJobForm from '../../Components/EditJobForm';

function AdminPage() {
    const [activeTabSidebar1, setActiveTabSidebar1] = useState(true);
    const [activeTabSidebar2, setActiveTabSidebar2] = useState(false);
    const [activeTabSidebar3, setActiveTabSidebar3] = useState(false);
    const [activeTabSidebar4, setActiveTabSidebar4] = useState(false);

    const [jobsRows, setJobsRows] = useState([]);
    const [usersRows, setUsersRows] = useState([]);
    const [companiesRows, setCompaniesRows] = useState([]);
    const [CVsRows, setCVsRows] = useState([]);

    const [modifyJob, setModifyJob] = useState(false);
    const [modifyUser, setModifyUser] = useState(false);
    const [modifyCompany, setModifyCompany] = useState(false);
    const [modifyCV, setModifyCV] = useState(false);

    const [showAddRecordUser, setShowAddRecordUser] = useState(false);
    const [showEditRecordUser, setShowEditRecordUser] = useState(false);

    const [showAddRecordCompany, setShowAddRecordCompany] = useState(false);
    const [showEditFormCompany, setShowEditCompany] = useState(false);

    const [showEditRecordJob, setShowEditRecordJob] = useState(false);

    const [selectedRowUser, setSeletedRowUser] = useState({});
    const [selectedRowCompany, setSeletedRowCompany] = useState({});
    const [selectedRowJob, setSeletedRowJob] = useState({});

    const usersColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            renderCell: (params) => {
                return (
                    <div className="cellWithId">
                        <span>{params.row.id}</span>
                    </div>
                );
            },
        },
        {
            field: 'username',
            headerName: 'T??N NG?????I D??NG',
            width: 320,
            renderCell: (params) => {
                return (
                    <div className="cellWithImg">
                        <img className="cellImg" src={params.row.avatar} alt="avatar" />
                        <div className="cellWithId">{params.row.username}</div>
                    </div>
                );
            },
        },
        {
            field: 'email',
            headerName: 'EMAIL',
            width: 320,
            renderCell: (params) => {
                return (
                    <div className="cellWithCreatedAt">
                        <span>{params.row.email}</span>
                    </div>
                );
            },
        },
        {
            field: 'role',
            headerName: 'CH???C N??NG',
            width: 320,
            renderCell: (params) => {
                return (
                    <div className="cellWithExpired">
                        <span>{params.row.role}</span>
                    </div>
                );
            },
        },
        {
            field: 'actions',
            headerName: 'H??NH ?????NG',
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="adminActionContainer">
                        <div className="adminActionContainer_edit">
                            <button
                                className="adminActionContainer_edit_btn"
                                onClick={() => {
                                    getUser(params.row.id).then((res) => {
                                        setSeletedRowUser(res);
                                        setShowEditRecordUser(!showEditRecordUser);
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
                                    if (window.confirm('B???n c?? ch???c ch???n mu???n x??a ng?????i d??ng n??y!!!!')) {
                                        deleteUser(params.row.id).then((res) => {
                                            if (res) {
                                                setModifyUser(!modifyUser);
                                                alert('X??a ng?????i d??ng th??nh c??ng!!');
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

    const companiesColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
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
            headerName: 'T??N C??NG TY',
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cellWithName">
                        <span>{params.row.name}</span>
                    </div>
                );
            },
        },
        {
            field: 'website',
            headerName: 'WEBSITE',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellWithCreatedAt">
                        <span>{params.row.website}</span>
                    </div>
                );
            },
        },
        {
            field: 'employeeNumber',
            headerName: 'QUY M?? NH??N VI??N',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellWithExpired">
                        <span>{params.row.employeeNumber}</span>
                    </div>
                );
            },
        },
        {
            field: 'introduction',
            headerName: 'M?? T???',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellWithExpired">
                        <span>{params.row.introduction}</span>
                    </div>
                );
            },
        },
        {
            field: 'address',
            headerName: '?????A CH???',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellWithExpired">
                        <span>{params.row.address}</span>
                    </div>
                );
            },
        },
        {
            field: 'location',
            headerName: 'KHU V???C',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellWithExpired">
                        <span>{params.row.location}</span>
                    </div>
                );
            },
        },
        {
            field: 'actions',
            headerName: 'H??NH ?????NG',
            width: 90,
            renderCell: (params) => {
                return (
                    <div className="adminActionContainer">
                        <div className="adminActionContainer_edit">
                            <button
                                className="adminActionContainer_edit_btn"
                                onClick={() => {
                                    getCompany(params.row.id).then((res) => {
                                        setSeletedRowCompany(res);
                                        setShowEditCompany(!showEditFormCompany);
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
                                    if (window.confirm('B???n c?? ch???c ch???n mu???n x??a c??ng ty n??y!!!!')) {
                                        deleteCompany(params.row.id).then((res) => {
                                            if (res) {
                                                setModifyCompany(!modifyCompany);
                                                alert('X??a c??ng ty th??nh c??ng!!');
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
            headerName: 'T??N C??NG VI???C',
            width: 350,
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
            headerName: 'NG??Y T???O',
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
            headerName: 'NG??Y H???T H???N',
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
            headerName: 'L????NG',
            width: 120,
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
            headerName: 'S??? L?????NG',
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
            headerName: 'H??NH TH???C L??M VI???C',
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
            headerName: 'C???P B???C',
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
            headerName: 'H??NH ?????NG',
            width: 120,
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
                                    if (window.confirm('B???n c?? ch???c ch???n mu???n x??a c??ng vi???c n??y!!!!')) {
                                        deleteJob(params.row.id).then((res) => {
                                            if (res) {
                                                setModifyJob(!modifyJob);
                                                alert('X??a c??ng vi???c th??nh c??ng!!');
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
            headerName: 'T??N C??NG VI???C',
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
            field: 'companyId',
            headerName: 'COMPANY ID',
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="cellWithId">
                        <span>{params.row.companyId}</span>
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
                        <a href={params.row.url + params.row.cv_id}>{params.row.url + params.row.cv_id}</a>
                    </div>
                );
            },
        },
        {
            field: 'cv_createdAt',
            headerName: 'NG??Y T???O',
            width: 100,
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
            headerName: 'H??NH ?????NG',
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="adminActionContainer">
                        <div className="adminActionContainer_delete">
                            <button
                                className="adminActionContainer_delete_btn"
                                onClick={() => {
                                    if (window.confirm('B???n c?? ch???c ch???n mu???n x??a cv n??y!!!!')) {
                                        deleteCV(params.row.cv_id).then((res) => {
                                            if (res) {
                                                setModifyCV(!modifyCV);
                                                alert('X??a cv th??nh c??ng!!');
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
        getJobs(1, 999, '').then((res) => {
            setJobsRows(res);
        });
        getUsers(1, 999).then((res) => {
            setUsersRows(res);
        });
        getCompanies(1, 999).then((res) => {
            setCompaniesRows(res);
        });
        getCVs(1, 999).then((res) => {
            setCVsRows(res);
        });
    }, [modifyUser, modifyCompany, modifyJob, modifyCV]);

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
                                    activeTabSidebar2
                                        ? setActiveTabSidebar2(!activeTabSidebar2)
                                        : activeTabSidebar3
                                        ? setActiveTabSidebar3(!activeTabSidebar3)
                                        : setActiveTabSidebar4(!activeTabSidebar4);
                                }}
                            >
                                <FontAwesomeIcon icon={faUser} />
                                <span className="admin-wrapper__sidebar-tab__item-icon">Qu???n l?? ng?????i d??ng</span>
                            </li>
                        )) ||
                            (activeTabSidebar1 && (
                                <li className="admin-wrapper__sidebar-tab__item-active">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span className="admin-wrapper__sidebar-tab__item-icon">Qu???n l?? ng?????i d??ng</span>
                                </li>
                            ))}

                        {(!activeTabSidebar2 && (
                            <li
                                className="admin-wrapper__sidebar-tab__item"
                                onClick={() => {
                                    setActiveTabSidebar2(!activeTabSidebar2);
                                    activeTabSidebar1
                                        ? setActiveTabSidebar1(!activeTabSidebar1)
                                        : activeTabSidebar3
                                        ? setActiveTabSidebar3(!activeTabSidebar3)
                                        : setActiveTabSidebar4(!activeTabSidebar4);
                                }}
                            >
                                <FontAwesomeIcon icon={faBuilding} />
                                <span className="admin-wrapper__sidebar-tab__item-icon">Qu???n l?? c??ng ty</span>
                            </li>
                        )) ||
                            (activeTabSidebar2 && (
                                <li className="admin-wrapper__sidebar-tab__item-active">
                                    <FontAwesomeIcon icon={faBuilding} />
                                    <span className="admin-wrapper__sidebar-tab__item-icon">Qu???n l?? c??ng ty</span>
                                </li>
                            ))}

                        {(!activeTabSidebar3 && (
                            <li
                                className="admin-wrapper__sidebar-tab__item"
                                onClick={() => {
                                    setActiveTabSidebar3(!activeTabSidebar3);
                                    activeTabSidebar1
                                        ? setActiveTabSidebar1(!activeTabSidebar1)
                                        : activeTabSidebar2
                                        ? setActiveTabSidebar2(!activeTabSidebar2)
                                        : setActiveTabSidebar4(!activeTabSidebar4);
                                }}
                            >
                                <FontAwesomeIcon icon={faAddressBook} />
                                <span className="admin-wrapper__sidebar-tab__item-icon">Qu???n l?? c??ng vi???c</span>
                            </li>
                        )) ||
                            (activeTabSidebar3 && (
                                <li className="admin-wrapper__sidebar-tab__item-active">
                                    <FontAwesomeIcon icon={faAddressBook} />
                                    <span className="admin-wrapper__sidebar-tab__item-icon">Qu???n l?? c??ng vi???c</span>
                                </li>
                            ))}

                        {(!activeTabSidebar4 && (
                            <li
                                className="admin-wrapper__sidebar-tab__item"
                                onClick={() => {
                                    setActiveTabSidebar4(!activeTabSidebar4);
                                    activeTabSidebar1
                                        ? setActiveTabSidebar1(!activeTabSidebar1)
                                        : activeTabSidebar2
                                        ? setActiveTabSidebar2(!activeTabSidebar2)
                                        : setActiveTabSidebar3(!activeTabSidebar3);
                                }}
                            >
                                <FontAwesomeIcon icon={faAddressCard} />
                                <span className="admin-wrapper__sidebar-tab__item-icon">Qu???n l?? s?? y???u l?? l???ch</span>
                            </li>
                        )) ||
                            (activeTabSidebar4 && (
                                <li className="admin-wrapper__sidebar-tab__item-active">
                                    <FontAwesomeIcon icon={faAddressCard} />
                                    <span className="admin-wrapper__sidebar-tab__item-icon">
                                        Qu???n l?? s?? y???u l?? l???ch
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="datatable">
                    {activeTabSidebar1 && (
                        <>
                            <div className="adminPage_addRecord">
                                <button
                                    className="adminPage_addRecord_btn"
                                    onClick={() => {
                                        setShowAddRecordUser(!showAddRecordUser);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    Th??m ng?????i d??ng
                                </button>
                            </div>
                            <DataGrid
                                className="datagrid"
                                rows={usersRows}
                                columns={usersColumns}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                            />
                        </>
                    )}
                    {activeTabSidebar2 && (
                        <>
                            <div className="adminPage_addRecord">
                                <button
                                    className="adminPage_addRecord_btn"
                                    onClick={() => {
                                        setShowAddRecordCompany(!showAddRecordCompany);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    Th??m c??ng ty
                                </button>
                            </div>
                            <DataGrid
                                className="datagrid"
                                rows={companiesRows}
                                columns={companiesColumns}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                            />
                        </>
                    )}
                    {activeTabSidebar3 && (
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
                    {activeTabSidebar4 && (
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
                {showAddRecordCompany && (
                    <CreateCompanyForm
                        name=""
                        email=""
                        password=""
                        website=""
                        employeeNumber=""
                        introduction=""
                        address=""
                        location=""
                        showAddRecordCompany={showAddRecordCompany}
                        setShowAddRecordCompany={setShowAddRecordCompany}
                        modifyCompany={modifyCompany}
                        setModifyCompany={setModifyCompany}
                    />
                )}
                {showEditFormCompany && (
                    <EditCompanyForm
                        id={selectedRowCompany.id}
                        name={selectedRowCompany.name}
                        website={selectedRowCompany.website}
                        employeeNumber={selectedRowCompany.employeeNumber}
                        introduction={selectedRowCompany.introduction}
                        address={selectedRowCompany.address}
                        location={selectedRowCompany.location}
                        showAddRecordCompany={showEditFormCompany}
                        setShowAddRecordCompany={setShowEditCompany}
                        modifyCompany={modifyCompany}
                        setModifyCompany={setModifyCompany}
                    />
                )}
                {showAddRecordUser && (
                    <CreateUserForm
                        id=""
                        username=""
                        email=""
                        password=""
                        showAddRecordUser={showAddRecordUser}
                        setShowAddRecordUser={setShowAddRecordUser}
                        modifyUser={modifyUser}
                        setModifyUser={setModifyUser}
                    />
                )}
                {showEditRecordUser && (
                    <EditUserForm
                        id={selectedRowUser.id}
                        username={selectedRowUser.username}
                        avatar={selectedRowUser.avatar}
                        showEditRecordUser={showEditRecordUser}
                        setShowEditRecordUser={setShowEditRecordUser}
                        modifyUser={modifyUser}
                        setModifyUser={setModifyUser}
                    />
                )}
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

export default AdminPage;
