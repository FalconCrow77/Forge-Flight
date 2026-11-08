<<<<<<< HEAD
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './IconSprite';
import { useApp } from '../context/AppContext';
import CreateStartupModal from './CreateStartupModal';
=======
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './IconSprite';
import { useApp } from '../context/AppContext';
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c

const ITEMS = [
  ['home', 'Home', '/feed'],
  ['compass', 'Explore Startups', '/explore'],
<<<<<<< HEAD
=======
  ['coin', 'Funding Opportunities', '/explore?filter=funding'],
  ['handshake', 'Collaboration Openings', '/explore?filter=collab'],
  ['bookmark', 'Saved Startups', '/explore?filter=saved'],
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
  ['msg', 'Messages', '/messages'],
  ['bell', 'Notifications', '/notifications'],
];

export default function LeftNav() {
  const navigate = useNavigate();
  const location = useLocation();
<<<<<<< HEAD
  const { openCreatePost, signedIn, logOut } = useApp();
  const [createStartupOpen, setCreateStartupOpen] = useState(false);
=======
  const { openCreatePost } = useApp();
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c

  function isActive(href) {
    const [path, query] = href.split('?');
    if (location.pathname !== path) return false;
    return (location.search.slice(1) || '') === (query || '');
  }

  return (
<<<<<<< HEAD
    <>
      <nav className="side-left">
        {ITEMS.map(([icon, label, href]) => (
          <button
            key={href}
            className={`nav-item${isActive(href) ? ' active' : ''}`}
            onClick={() => navigate(href)}
          >
            <Icon name={icon} /><span>{label}</span>
          </button>
        ))}
        <button className={`nav-item${isActive('/account') ? ' active' : ''}`} onClick={() => navigate('/account')}>
          <Icon name="user" /><span>Profile</span>
        </button>
        {signedIn && (
          <>
            <button className="nav-item" onClick={async () => {
              await logOut();
              navigate('/');
            }}>
              <Icon name="logout" /><span>Log out</span>
            </button>
            <button className="btn btn-outline nav-cta" style={{ width: '100%' }} onClick={() => setCreateStartupOpen(true)}>
              <Icon name="flag" /><span>Create Startup</span>
            </button>
          </>
        )}
        <button className="btn btn-accent nav-cta" style={{ width: '100%' }} onClick={openCreatePost}>
          <Icon name="bolt" /><span>Create post</span>
        </button>
      </nav>
      <CreateStartupModal open={createStartupOpen} onClose={() => setCreateStartupOpen(false)} />
    </>
=======
    <nav className="side-left">
      {ITEMS.map(([icon, label, href]) => (
        <button
          key={href}
          className={`nav-item${isActive(href) ? ' active' : ''}`}
          onClick={() => navigate(href)}
        >
          <Icon name={icon} /><span>{label}</span>
        </button>
      ))}
      <button className={`nav-item${isActive('/account') ? ' active' : ''}`} onClick={() => navigate('/account')}>
        <Icon name="user" /><span>Profile</span>
      </button>
      <button className={`nav-item${isActive('/portfolio') ? ' active' : ''}`} onClick={() => navigate('/portfolio')}>
        <Icon name="chart" /><span>My Portfolio</span>
      </button>
      <button className={`nav-item${isActive('/settings') ? ' active' : ''}`} onClick={() => navigate('/settings')}>
        <Icon name="gear" /><span>Settings</span>
      </button>
      <button className="btn btn-accent nav-cta" style={{ width: '100%' }} onClick={openCreatePost}>
        <Icon name="bolt" /><span>Create post</span>
      </button>
    </nav>
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
  );
}
