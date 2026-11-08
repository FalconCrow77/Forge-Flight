<<<<<<< HEAD
=======
import { useState } from 'react';
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import LeftNav from '../components/LeftNav';
import { Icon } from '../components/IconSprite';
<<<<<<< HEAD
import { useApp } from '../context/AppContext';
import '../styles/notifications.css';

export default function Notifications() {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  async function markAllRead() {
    await markAllNotificationsRead();
  }

  async function open(notification) {
    await markNotificationRead(notification.id);
    navigate(notification.link || '/feed');
=======
import '../styles/notifications.css';

const INITIAL = [
  { id: 1, icon: 'coin', color: 'var(--success)', text: <><b>MedAI</b> opened its seed funding round.</>, time: '12m ago', read: false, to: '/profile/medai' },
  { id: 2, icon: 'comment', color: 'var(--info)', text: <><b>Priya Nair</b> commented on your update.</>, time: '1h ago', read: false, to: '/profile/healthsync' },
  { id: 3, icon: 'cal', color: 'var(--info)', text: <>Reminder — <b>Pitch Day</b> starts in 2 days.</>, time: '3h ago', read: false, to: '/feed' },
  { id: 4, icon: 'heart', color: 'var(--accent)', text: <><b>Lena Torres</b> liked your milestone update.</>, time: '5h ago', read: true, to: '/profile/healthsync' },
  { id: 5, icon: 'handshake', color: 'var(--warning)', text: <>New application for your <b>Flutter Developer</b> role.</>, time: '1d ago', read: true, to: '/profile/farmchain' },
  { id: 6, icon: 'check', color: 'var(--success)', text: <><b>Nimbus Robotics</b> closed its funding round.</>, time: '2d ago', read: true, to: '/profile/nimbus' },
  { id: 7, icon: 'user', color: 'var(--text-muted)', text: <><b>David Osei</b> started following your startup.</>, time: '3d ago', read: true, to: '/profile/healthsync' },
];

export default function Notifications() {
  const [items, setItems] = useState(INITIAL);
  const navigate = useNavigate();
  const unreadCount = items.filter((n) => !n.read).length;

  function markAllRead() {
    setItems((cur) => cur.map((n) => ({ ...n, read: true })));
  }

  function open(n) {
    setItems((cur) => cur.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
    navigate(n.to);
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
  }

  return (
    <div>
      <Topbar />
      <div className="layout layout-2col">
        <LeftNav />
        <main className="center-col notifications-page">
          <div className="notif-page-head">
            <div>
              <h2>Notifications</h2>
              <p>{unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up."}</p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={markAllRead} disabled={unreadCount === 0}>Mark all as read</button>
          </div>
          <div className="notif-page-list">
<<<<<<< HEAD
            {notifications.length === 0 ? (
              <div className="settings-card" style={{ margin: 0 }}>
                <p className="settings-hint" style={{ marginBottom: 0 }}>No notifications yet.</p>
              </div>
            ) : notifications.map((notification) => (
              <button key={notification.id} className={`notif-page-item${notification.read ? '' : ' unread'}`} onClick={() => open(notification)}>
                <span className="np-icon" style={{ color: notification.color }}><Icon name={notification.icon} /></span>
                <span className="np-text">{notification.text}</span>
                <time className="np-time mono">{notification.time}</time>
                {!notification.read && <span className="np-dot" />}
=======
            {items.map((n) => (
              <button key={n.id} className={`notif-page-item${n.read ? '' : ' unread'}`} onClick={() => open(n)}>
                <span className="np-icon" style={{ color: n.color }}><Icon name={n.icon} /></span>
                <span className="np-text">{n.text}</span>
                <time className="np-time mono">{n.time}</time>
                {!n.read && <span className="np-dot" />}
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
