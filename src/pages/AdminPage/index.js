import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faBuilding, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { deleteJob, getJob, getJobs } from '../../Api/job-api';
import { deleteUser, getUser, getUsers } from '../../Api/user-api';
import { getCompanies, getCompany, deleteCompany } from '../../Api/company-api';
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

    const [jobsRows, setJobsRows] = useState([]);
    const [usersRows, setUsersRows] = useState([]);
    const [companiesRows, setCompaniesRows] = useState([]);

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
            headerName: 'TÊN NGƯỜI DÙNG',
            width: 280,
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
            width: 280,
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
            headerName: 'CHỨC NĂNG',
            width: 280,
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
            headerName: 'HÀNH ĐỘNG',
            width: 230,
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
                                    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này!!!!')) {
                                        deleteUser(params.row.id).then((res) => {
                                            if (res) {
                                                alert('Xóa người dùng thành công!!');
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
            headerName: 'TÊN CÔNG TY',
            width: 150,
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
            headerName: 'QUY MÔ NHÂN VIÊN',
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
            headerName: 'MÔ TẢ',
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
            headerName: 'ĐỊA CHỈ',
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
            headerName: 'KHU VỰC',
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
            headerName: 'HÀNH ĐỘNG',
            width: 190,
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
                                    if (window.confirm('Bạn có chắc chắn muốn xóa công ty này!!!!')) {
                                        deleteCompany(params.row.id).then((res) => {
                                            if (res) {
                                                alert('Xóa công ty thành công!!');
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
            headerName: 'TÊN CÔNG VIỆC',
            width: 150,
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
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellWithCreatedAt">
                        <span>{params.row.createdAt}</span>
                    </div>
                );
            },
        },
        {
            field: 'expired',
            headerName: 'NGÀY HẾT HẠN',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellWithExpired">
                        <span>{params.row.expired}</span>
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
            width: 200,
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
    }, []);

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
                                        : setActiveTabSidebar3(!activeTabSidebar3);
                                }}
                            >
                                <FontAwesomeIcon icon={faUser} />
                                <span className="admin-wrapper__sidebar-tab__item-icon">Quản lý người dùng</span>
                            </li>
                        )) ||
                            (activeTabSidebar1 && (
                                <li className="admin-wrapper__sidebar-tab__item-active">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span className="admin-wrapper__sidebar-tab__item-icon">Quản lý người dùng</span>
                                </li>
                            ))}

                        {(!activeTabSidebar2 && (
                            <li
                                className="admin-wrapper__sidebar-tab__item"
                                onClick={() => {
                                    setActiveTabSidebar2(!activeTabSidebar2);
                                    activeTabSidebar1
                                        ? setActiveTabSidebar1(!activeTabSidebar1)
                                        : setActiveTabSidebar3(!activeTabSidebar3);
                                }}
                            >
                                <FontAwesomeIcon icon={faBuilding} />
                                <span className="admin-wrapper__sidebar-tab__item-icon">Quản lý công ty</span>
                            </li>
                        )) ||
                            (activeTabSidebar2 && (
                                <li className="admin-wrapper__sidebar-tab__item-active">
                                    <FontAwesomeIcon icon={faBuilding} />
                                    <span className="admin-wrapper__sidebar-tab__item-icon">Quản lý công ty</span>
                                </li>
                            ))}

                        {(!activeTabSidebar3 && (
                            <li
                                className="admin-wrapper__sidebar-tab__item"
                                onClick={() => {
                                    setActiveTabSidebar3(!activeTabSidebar3);
                                    activeTabSidebar1
                                        ? setActiveTabSidebar1(!activeTabSidebar1)
                                        : setActiveTabSidebar2(!activeTabSidebar2);
                                }}
                            >
                                <FontAwesomeIcon icon={faAddressBook} />
                                <span className="admin-wrapper__sidebar-tab__item-icon">Quản lý công việc</span>
                            </li>
                        )) ||
                            (activeTabSidebar3 && (
                                <li className="admin-wrapper__sidebar-tab__item-active">
                                    <FontAwesomeIcon icon={faAddressBook} />
                                    <span className="admin-wrapper__sidebar-tab__item-icon">Quản lý công việc</span>
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
                                    Thêm người dùng
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
                                    Thêm công ty
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
                    />
                )}
                {showEditRecordUser && (
                    <EditUserForm
                        id={selectedRowUser.id}
                        username={selectedRowUser.username}
                        avatar={selectedRowUser.avatar}
                        showEditRecordUser={showEditRecordUser}
                        setShowEditRecordUser={setShowEditRecordUser}
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
                    />
                )}
            </div>
        </div>
    );
}

export default AdminPage;
