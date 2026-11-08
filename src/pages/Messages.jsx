<<<<<<< HEAD
import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
=======
import { useState } from 'react';
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
import Topbar from '../components/Topbar';
import LeftNav from '../components/LeftNav';
import LogoBadge from '../components/LogoBadge';
import { Icon } from '../components/IconSprite';
import { useApp } from '../context/AppContext';
<<<<<<< HEAD
import { initialsOf } from '../data/startups';
import '../styles/messages.css';

export default function Messages() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser, startups, myStartups, conversations, sendMessage: sendConversationMessage, markConversationRead } = useApp();
  const [activeId, setActiveId] = useState(null);
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [inboxFilter, setInboxFilter] = useState('all');

  const visibleConversations = useMemo(() => {
    return conversations.filter(c => {
      if (inboxFilter === 'all') return true;
      if (inboxFilter === 'personal') return c.initiatorId === currentUser.id;
      return c.startupSlug === inboxFilter;
    });
  }, [conversations, inboxFilter, currentUser.id]);

  useEffect(() => {
    if (visibleConversations.length === 0) {
      setActiveId(null);
      return;
    }
    const requestedId = searchParams.get('id');
    if (requestedId) {
      const match = visibleConversations.find((c) => String(c.id) === requestedId);
      if (match) {
        setActiveId(match.id);
        setSearchParams({}, { replace: true });
        return;
      }
    }
    if (!activeId || !visibleConversations.some((conversation) => conversation.id === activeId)) {
      setActiveId(visibleConversations[0].id);
    }
  }, [visibleConversations, activeId, searchParams, setSearchParams]);

  const active = visibleConversations.find((conversation) => conversation.id === activeId) || null;
  const activeStartup = active ? startups[active.startupSlug] : null;
  const activeIsOwner = activeStartup?.ownerId === currentUser.id;
=======
import '../styles/messages.css';

const INITIAL = [
  {
    id: 'healthsync', unread: 2, time: '2m',
    thread: [
      { from: 'them', text: 'Thanks for reaching out about the seed round — happy to walk you through the clinical trial data.', time: '10:02 AM' },
      { from: 'me', text: 'Would love that. Do you have 20 minutes this week?', time: '10:05 AM' },
      { from: 'them', text: "Thursday afternoon works — I'll send a calendar link.", time: '10:07 AM' },
    ],
  },
  {
    id: 'medai', unread: 0, time: '1h',
    thread: [
      { from: 'them', text: 'Appreciate you looking at our regulatory filing summary.', time: 'Yesterday' },
      { from: 'me', text: "It's thorough — I'll get back to you by Friday.", time: 'Yesterday' },
    ],
  },
  {
    id: 'farmchain', unread: 0, time: '6h',
    thread: [
      { from: 'them', text: 'Thanks for applying to the Flutter Developer role — we’ll review this week.', time: 'Mon' },
    ],
  },
  {
    id: 'ecoride', unread: 0, time: '2d',
    thread: [
      { from: 'them', text: 'Great meeting you at Pitch Day, let’s stay in touch.', time: 'Last week' },
    ],
  },
  {
    id: 'nimbus', unread: 0, time: '4d',
    thread: [
      { from: 'them', text: 'We closed the round — thanks so much for your interest.', time: 'Last week' },
    ],
  },
];

export default function Messages() {
  const { startups } = useApp();
  const [conversations, setConversations] = useState(INITIAL);
  const [activeId, setActiveId] = useState(INITIAL[0].id);
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const active = conversations.find((c) => c.id === activeId);
  const activeStartup = startups[activeId];
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c

  function selectConversation(id) {
    setActiveId(id);
    setMobileThreadOpen(true);
<<<<<<< HEAD
    markConversationRead(id);
  }

  async function sendMessage(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !active) return;
    await sendConversationMessage(active.id, text);
=======
    setConversations((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  }

  function sendMessage(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setConversations((cs) => cs.map((c) => (
      c.id === activeId ? { ...c, thread: [...c.thread, { from: 'me', text, time: 'Just now' }] } : c
    )));
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
    setDraft('');
  }

  return (
    <div>
      <Topbar />
      <div className="layout layout-2col">
        <LeftNav />
        <main className="center-col messages-page">
          <div className={`messages-shell${mobileThreadOpen ? ' show-thread' : ''}`}>
            <aside className="conv-list">
<<<<<<< HEAD
              <div className="conv-list-head" style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '12px'}}>
                <h3 style={{margin: 0}}>Messages</h3>
                <select 
                  className="input" 
                  style={{ padding: '6px 10px', fontSize: '13px' }}
                  value={inboxFilter} 
                  onChange={(e) => {
                    setInboxFilter(e.target.value);
                    setActiveId(null);
                  }}
                >
                  <option value="all">All Messages</option>
                  <option value="personal">Personal Inbox</option>
                  {myStartups.map(([id, s]) => (
                    <option key={id} value={id}>{s.name} Inbox</option>
                  ))}
                </select>
              </div>
              {visibleConversations.length === 0 ? (
                <div className="settings-card" style={{ margin: 0 }}>
                  <p className="settings-hint" style={{ marginBottom: 12 }}>No conversations found for this filter.</p>
                  <button className="btn btn-accent btn-sm" onClick={() => navigate('/explore')}>Explore startups</button>
                </div>
              ) : visibleConversations.map((conversation) => {
                const s = startups[conversation.startupSlug];
                const isOwner = s?.ownerId === currentUser.id;
                const last = conversation.thread[conversation.thread.length - 1];
                return (
                  <button
                    key={conversation.id}
                    className={`conv-row${conversation.id === activeId ? ' active' : ''}`}
                    onClick={() => selectConversation(conversation.id)}
                  >
                    <LogoBadge id={isOwner ? conversation.initiatorId : conversation.startupSlug} initials={isOwner ? initialsOf(conversation.initiatorName) : (s?.initials || '?')} size={40} />
                    <div className="conv-row-body">
                      <div className="conv-row-top">
                        <span className="conv-name">{isOwner ? conversation.initiatorName : (s?.name || conversation.startupName)}</span>
                        <span className="conv-time mono">{conversation.time}</span>
                      </div>
                      {isOwner && <div style={{fontSize: '11px', color: 'var(--accent)', marginTop: '-2px', marginBottom: '4px', textAlign: 'left'}}>for {s?.name}</div>}
                      <div className="conv-row-bottom">
                        <span className="conv-preview">
                          {last?.from === 'me' ? 'You: ' : ''}
                          {last?.text || 'No messages yet'}
                        </span>
                        {conversation.unread > 0 && <span className="conv-unread">{conversation.unread}</span>}
=======
              <div className="conv-list-head"><h3>Messages</h3></div>
              {conversations.map((c) => {
                const s = startups[c.id];
                const last = c.thread[c.thread.length - 1];
                return (
                  <button
                    key={c.id}
                    className={`conv-row${c.id === activeId ? ' active' : ''}`}
                    onClick={() => selectConversation(c.id)}
                  >
                    <LogoBadge id={c.id} initials={s.initials} size={40} />
                    <div className="conv-row-body">
                      <div className="conv-row-top">
                        <span className="conv-name">{s.founder}</span>
                        <span className="conv-time mono">{c.time}</span>
                      </div>
                      <div className="conv-row-bottom">
                        <span className="conv-preview">{last.from === 'me' ? 'You: ' : ''}{last.text}</span>
                        {c.unread > 0 && <span className="conv-unread">{c.unread}</span>}
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
                      </div>
                    </div>
                  </button>
                );
              })}
            </aside>

            <section className="thread-panel">
<<<<<<< HEAD
              {!active ? (
                <div className="settings-card" style={{ margin: 0 }}>
                  <h3 style={{ marginTop: 0 }}>No conversation selected</h3>
                  <p className="settings-hint">Choose a startup thread from the left.</p>
                </div>
              ) : (
                <>
                  <div className="thread-head">
                    <button className="thread-back" onClick={() => setMobileThreadOpen(false)} aria-label="Back to conversations"><Icon name="back" /></button>
                    <LogoBadge id={activeIsOwner ? active.initiatorId : active.startupSlug} initials={activeIsOwner ? initialsOf(active.initiatorName) : (activeStartup?.initials || '?')} size={38} />
                    <div>
                      <b>{activeIsOwner ? active.initiatorName : (activeStartup?.founder || active.startupName)}</b>
                      <span>{activeIsOwner ? `Inquiry for ${activeStartup?.name}` : (activeStartup?.name || active.startupName)}</span>
                    </div>
                  </div>
                  <div className="thread-body">
                    {active.thread.map((message) => (
                      <div key={message.id} className={`bubble-row ${message.from}`}>
                        <div className="bubble">
                          {message.text}
                          <time>{message.time}</time>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form className="thread-compose" onSubmit={sendMessage}>
                    <input
                      type="text"
                      placeholder={`Message ${activeStartup?.founder || active.startupName}...`}
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                    />
                    <button className="btn btn-accent btn-sm" type="submit">Send</button>
                  </form>
                </>
              )}
=======
              <div className="thread-head">
                <button className="thread-back" onClick={() => setMobileThreadOpen(false)} aria-label="Back to conversations"><Icon name="back" /></button>
                <LogoBadge id={activeId} initials={activeStartup.initials} size={38} />
                <div><b>{activeStartup.founder}</b><span>{activeStartup.name}</span></div>
              </div>
              <div className="thread-body">
                {active.thread.map((m, i) => (
                  <div key={i} className={`bubble-row ${m.from}`}>
                    <div className="bubble">{m.text}<time>{m.time}</time></div>
                  </div>
                ))}
              </div>
              <form className="thread-compose" onSubmit={sendMessage}>
                <input
                  type="text"
                  placeholder={`Message ${activeStartup.founder}...`}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
                <button className="btn btn-accent btn-sm" type="submit">Send</button>
              </form>
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
