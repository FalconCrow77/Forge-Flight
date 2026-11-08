import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import LeftNav from '../components/LeftNav';
import LogoBadge from '../components/LogoBadge';
import { statusMeta, fmtMoney, fundingPct } from '../data/startups';
import { useApp } from '../context/AppContext';
import '../styles/settings.css';
import '../styles/dashboard.css';

const SECTIONS = [
  ['watchlist', 'Watchlist'],
  ['portfolio', 'Investment Portfolio'],
  ['requests', 'Investment Requests'],
  ['history', 'Investment History'],
];

<<<<<<< HEAD
=======
const MOCK_PORTFOLIO = [
  { startupId: 'nimbus', amount: 25000, date: 'Jun 2026', roi: '4.2x (est.)' },
  { startupId: 'ecoride', amount: 12000, date: 'Apr 2026', roi: '2.8x (est.)' },
];

const MOCK_HISTORY = [
  { startupId: 'nimbus', amount: 15000, date: 'Mar 2025', roi: '3.1x', outcome: 'Exited' },
  { startupId: 'ecoride', amount: 8000, date: 'Jan 2025', roi: '1.6x', outcome: 'Exited' },
];

>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
function WatchlistTab({ saved, startups, navigate }) {
  const list = Object.entries(startups).filter(([id, s]) => saved.has(id) && (s.status === 'open' || s.status === 'soon'));
  return (
    <div className="settings-card">
      <h4>Watchlist</h4>
      <p className="settings-hint">Saved startups with an open or upcoming funding window — the ones worth acting on.</p>
      {list.length === 0 ? (
        <p className="settings-hint">Nothing on your watchlist yet. Save a startup with an open funding round from the feed or Explore to see it here.</p>
      ) : (
        list.map(([id, s]) => {
          const pct = fundingPct(s.raised, s.goal);
          const meta = statusMeta(s.status);
          return (
            <div className="portfolio-card" key={id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${id}`)}>
              <LogoBadge id={id} initials={s.initials} size={44} />
              <div className="pc-body">
                <b>{s.name}</b>
                <span>{s.tagline}</span>
              </div>
              <div className="pc-amount">
                <span className={`status-pill ${meta.cls}`}>{meta.label}</span>
                <div style={{ marginTop: 6 }}><b className="mono">{pct}%</b></div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

<<<<<<< HEAD
function PortfolioTab({ investments, startups, navigate }) {
  const committed = investments.filter((investment) => investment.status === 'accepted');
  return (
    <div className="settings-card">
      <h4>Investment Portfolio</h4>
      <p className="settings-hint">Rounds the backend has marked as accepted.</p>
      {committed.length === 0 ? (
        <p className="settings-hint">No accepted investments yet.</p>
      ) : (
        committed.map((inv) => {
          const s = startups[inv.startupId];
          return (
            <div className="portfolio-card" key={inv.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${inv.startupId}`)}>
              <LogoBadge id={inv.startupId} initials={s.initials} size={44} />
              <div className="pc-body">
                <b>{s.name}</b>
                <span>Accepted {inv.time}</span>
              </div>
              <div className="pc-amount">
                <b>{fmtMoney(inv.amount)}</b>
                <span>accepted</span>
              </div>
            </div>
          );
        })
      )}
=======
function PortfolioTab({ startups, navigate }) {
  return (
    <div className="settings-card">
      <h4>Investment Portfolio</h4>
      <p className="settings-hint">Rounds you're currently committed to.</p>
      {MOCK_PORTFOLIO.map((p, i) => {
        const s = startups[p.startupId];
        return (
          <div className="portfolio-card" key={i} style={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${p.startupId}`)}>
            <LogoBadge id={p.startupId} initials={s.initials} size={44} />
            <div className="pc-body">
              <b>{s.name}</b>
              <span>Invested {p.date}</span>
            </div>
            <div className="pc-amount">
              <b>{fmtMoney(p.amount)}</b>
              <span>{p.roi}</span>
            </div>
          </div>
        );
      })}
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
    </div>
  );
}

function RequestsTab({ investments, startups, cancelInvestment, navigate }) {
<<<<<<< HEAD
  const pending = investments.filter((investment) => investment.status === 'pending');
  return (
    <div className="settings-card">
      <h4>Investment Requests</h4>
      <p className="settings-hint">Pending "Invest Now" requests you've sent.</p>
      {pending.length === 0 ? (
        <p className="settings-hint">No pending requests. Use "Invest Now" on any open funding round to send one.</p>
      ) : (
        <div className="app-list">
          {pending.map((inv) => {
=======
  return (
    <div className="settings-card">
      <h4>Investment Requests</h4>
      <p className="settings-hint">Pending "Invest Now" requests you've sent this session.</p>
      {investments.length === 0 ? (
        <p className="settings-hint">No pending requests. Use "Invest Now" on any open funding round to send one.</p>
      ) : (
        <div className="app-list">
          {investments.map((inv) => {
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
            const s = startups[inv.startupId];
            return (
              <div className="app-row" key={inv.id}>
                <div className="app-row-main" style={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${inv.startupId}`)}>
                  <b>{s.name} · {fmtMoney(inv.amount)}</b>
                  <span className="app-row-meta">{inv.time}</span>
                </div>
                {inv.status === 'pending' ? (
                  <div className="app-row-actions">
                    <button className="btn btn-outline btn-sm" onClick={() => cancelInvestment(inv.id)}>Cancel</button>
                  </div>
                ) : (
                  <span className={`status-pill ${inv.status === 'accepted' ? 'status-open' : 'status-closed'}`}>{inv.status}</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function HistoryTab({ startups, navigate }) {
<<<<<<< HEAD
  const { investments } = useApp();
  const history = investments.filter((investment) => investment.status !== 'pending');
  return (
    <div className="settings-card">
      <h4>Investment History</h4>
      <p className="settings-hint">Accepted or declined requests from the backend.</p>
      {history.length === 0 ? (
        <p className="settings-hint">No completed requests yet.</p>
      ) : (
        history.map((inv) => {
          const s = startups[inv.startupId];
          return (
            <div className="portfolio-card" key={inv.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${inv.startupId}`)}>
              <LogoBadge id={inv.startupId} initials={s.initials} size={44} />
              <div className="pc-body">
                <b>{s.name}</b>
                <span>{inv.time} · {inv.status}</span>
              </div>
              <div className="pc-amount">
                <b>{fmtMoney(inv.amount)}</b>
                <span>{inv.status}</span>
              </div>
            </div>
          );
        })
      )}
=======
  return (
    <div className="settings-card">
      <h4>Investment History</h4>
      <p className="settings-hint">Closed and exited positions.</p>
      {MOCK_HISTORY.map((h, i) => {
        const s = startups[h.startupId];
        return (
          <div className="portfolio-card" key={i} style={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${h.startupId}`)}>
            <LogoBadge id={h.startupId} initials={s.initials} size={44} />
            <div className="pc-body">
              <b>{s.name}</b>
              <span>{h.date} · {h.outcome}</span>
            </div>
            <div className="pc-amount">
              <b>{fmtMoney(h.amount)}</b>
              <span>{h.roi} return</span>
            </div>
          </div>
        );
      })}
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
    </div>
  );
}

export default function InvestorPortfolio() {
  const [section, setSection] = useState('watchlist');
  const navigate = useNavigate();
<<<<<<< HEAD
  const { currentUser, saved, startups, investments, cancelInvestment } = useApp();
  const myInvestments = useMemo(
    () => investments.filter((i) => i.investorId === currentUser.id),
    [investments, currentUser.id],
  );
  const pendingCount = useMemo(() => myInvestments.filter((i) => i.status === 'pending').length, [myInvestments]);
=======
  const { saved, startups, investments, cancelInvestment } = useApp();
  const pendingCount = useMemo(() => investments.filter((i) => i.status === 'pending').length, [investments]);
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c

  return (
    <div>
      <Topbar />
      <div className="layout layout-2col">
        <LeftNav />
        <main className="center-col settings-page">
          <h2 className="settings-title">My Portfolio</h2>
          <div className="settings-shell">
            <nav className="settings-nav">
              {SECTIONS.map(([key, label]) => (
                <button key={key} className={`settings-nav-item${section === key ? ' active' : ''}`} onClick={() => setSection(key)}>
                  {label}{key === 'requests' && pendingCount > 0 ? <span className="nav-badge">{pendingCount}</span> : null}
                </button>
              ))}
            </nav>
            <div className="settings-panel">
              {section === 'watchlist' && <WatchlistTab saved={saved} startups={startups} navigate={navigate} />}
<<<<<<< HEAD
              {section === 'portfolio' && <PortfolioTab investments={myInvestments} startups={startups} navigate={navigate} />}
              {section === 'requests' && <RequestsTab investments={myInvestments} startups={startups} cancelInvestment={cancelInvestment} navigate={navigate} />}
=======
              {section === 'portfolio' && <PortfolioTab startups={startups} navigate={navigate} />}
              {section === 'requests' && <RequestsTab investments={investments} startups={startups} cancelInvestment={cancelInvestment} navigate={navigate} />}
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
              {section === 'history' && <HistoryTab startups={startups} navigate={navigate} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
