import classNames from 'classnames/bind';
import styles from './Chat.scss';
import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { getUser } from '../../Api/user-api';

const cx = classNames.bind(styles);

function Chat({ from, to, socket, room, messageList, setMessageList }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [toUser, setToUser] = useState({});
    const [showUserBox, setShowUserBox] = useState(false);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                content: currentMessage,
                to: to,
                room: room,
            };
            await socket.emit('send_message', messageData);
            messageData.from = { id: from };
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage('');
        }
    };

    useEffect(() => {
        if (to !== undefined) {
            getUser(to).then((res) => {
                if (res) {
                    setToUser(res);
                    setShowUserBox(true);
                }
            });
        }
    }, [to]);

    useEffect(() => {
        socket.emit('join_room', room);
    }, [room]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            let message = { content: data, from: { id: to } };
            setMessageList((list) => [...list, message]);
        });
    }, [socket]);

    return (
        <div className={cx('chat-window')}>
            <div className={cx('chat-header')}>
                <p className={cx('chat-header__text')}>Live Chat</p>
                {showUserBox && (
                    <div className={cx('chat-header__userBox')}>
                        <img src={toUser?.avatar} alt="avatar" className={cx('chat-header__userBox-img')}></img>
                        <span className={cx('chat-header__userBox-username')}>{toUser?.username}</span>
                    </div>
                )}
            </div>
            <div className={cx('chat-body')}>
                <ScrollToBottom className={cx('message-container')}>
                    {messageList.map((messageContent, index) => {
                        return (
                            <div
                                className={cx('message')}
                                id={Number(from) === Number(messageContent.from?.id) ? 'you' : 'other'}
                                key={index}
                            >
                                <div>
                                    <div className={cx('message-content')}>
                                        <p style={{ margin: 0 }}>{messageContent.content}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className={cx('chat-footer')}>
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Nhập tin nhắn..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === 'Enter' && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;
