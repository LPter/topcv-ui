import styles from './ChatUserPage.module.scss';
import classNames from 'classnames/bind';
import { io } from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import Chat from '../../Components/Chat';
import AuthContext from '../../Auth/AuthProvider';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUsersSent, getMessagesToUserId } from '../../Api/message-api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const socket = io.connect('http://topcv-api.herokuapp.com', {
    extraHeaders: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
    },
});

function ChatUserPage() {
    const emitID = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);

    const [usersSent, setUserSent] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [onID, setOnID] = useState(state.onID);
    let id = emitID?.id > onID ? `${emitID?.id}A${onID}` : `${onID}A${emitID?.id}`;
    const [roomID, setRoomID] = useState(id);

    useEffect(() => {
        getUsersSent().then((res) => {
            if (res) {
                setUserSent(res);
            }
        });
    }, [roomID]);

    useEffect(() => {
        getMessagesToUserId(onID).then((res) => {
            if (res) {
                setMessageList(res);
            }
        });
    }, [roomID]);

    return (
        <div className={cx('chat')}>
            <div className={cx('chat-container')}>
                <div className={cx('chat-container__header')}>
                    <img
                        className={cx('chat-container__header-logo')}
                        alt="..."
                        src="http://candidate.topcvconnect.com/img/logo_beta.b868edf0.png"
                    ></img>
                </div>
                <div className={cx('chat-container__content')}>
                    <div className={cx('chat-container__content-sidebar')}>
                        <ScrollToBottom className={cx('chat-container__content-sidebar__wrapper')}>
                            <div className={cx('chat-container__content-sidebar__wrapper-title')}>
                                <p className={cx('chat-container__content-sidebar__wrapper-title__text')}>
                                    Danh sách chat gần đây
                                </p>
                            </div>
                            {usersSent.map((userSent, index) => {
                                if (Number(emitID?.id) !== userSent.to_id) {
                                    return (
                                        <div
                                            key={index}
                                            className={cx('chat-container__content-sidebar__wrapper-item')}
                                            onClick={() => {
                                                getMessagesToUserId(userSent.to_id).then((res) => {
                                                    if (res) {
                                                        setMessageList(res);
                                                    }
                                                });
                                                let id =
                                                    emitID?.id > userSent.to_id
                                                        ? `${emitID?.id}A${userSent.to_id}`
                                                        : `${userSent.to_id}A${emitID?.id}`;
                                                setRoomID(id);
                                                setOnID(userSent.to_id);
                                            }}
                                        >
                                            <div
                                                className={cx('chat-container__content-sidebar__wrapper-item__avatar')}
                                            >
                                                <img
                                                    alt="..."
                                                    src={userSent?.to_avatar}
                                                    className={cx(
                                                        'chat-container__content-sidebar__wrapper-item__avatar-img',
                                                    )}
                                                ></img>
                                            </div>
                                            <div className={cx('chat-container__content-sidebar__wrapper-item__name')}>
                                                <p
                                                    className={cx(
                                                        'chat-container__content-sidebar__wrapper-item__name-text',
                                                    )}
                                                >
                                                    {userSent?.to_username}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            key={index}
                                            className={cx('chat-container__content-sidebar__wrapper-item')}
                                            onClick={() => {
                                                getMessagesToUserId(userSent.from_id).then((res) => {
                                                    if (res) {
                                                        setMessageList(res);
                                                    }
                                                });
                                                let id =
                                                    emitID?.id > userSent.from_id
                                                        ? `${emitID?.id}A${userSent.from_id}`
                                                        : `${userSent.from_id}A${emitID?.id}`;
                                                setRoomID(id);
                                                setOnID(userSent.from_id);
                                            }}
                                        >
                                            <div
                                                className={cx('chat-container__content-sidebar__wrapper-item__avatar')}
                                            >
                                                <img
                                                    alt="..."
                                                    src={userSent?.from_avatar}
                                                    className={cx(
                                                        'chat-container__content-sidebar__wrapper-item__avatar-img',
                                                    )}
                                                ></img>
                                            </div>
                                            <div className={cx('chat-container__content-sidebar__wrapper-item__name')}>
                                                <p
                                                    className={cx(
                                                        'chat-container__content-sidebar__wrapper-item__name-text',
                                                    )}
                                                >
                                                    {userSent?.from_username}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </ScrollToBottom>
                    </div>
                    <div className={cx('chat-container__content-chatbox')}>
                        <Chat
                            from={emitID?.id}
                            to={onID}
                            socket={socket}
                            room={roomID}
                            messageList={messageList}
                            setMessageList={setMessageList}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('chat-back')}>
                <button
                    className={cx('chat-back__btn')}
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Quay lại
                </button>
            </div>
        </div>
    );
}

export default ChatUserPage;
