import AppHeader from '../components/AppHeader';

export default function Employment() {
    const OPPORTUNITIES = [
        { icon: '☕', title: 'Hospitality / Barista Pathway', desc: 'Build hospitality skills and explore potential local-business opportunities.' },
        { icon: '📱', title: 'Mobile Repair Pathway', desc: 'Develop practical cell phone repair skills.' },
        { icon: '💻', title: 'Computer Skills Pathway', desc: 'Build basic computer or programming skills.' },
    ];

    return (
        <>
            <AppHeader />
            <main className="page">
                <span className="eyebrow">EMPLOYMENT SUPPORT</span>
                <h1>Build towards opportunity.</h1>
                <p className="page-intro">Connect skills development with employment and local opportunity support.</p>

                <div className="jobs">
                    {OPPORTUNITIES.map((o, i) => (
                        <article key={i} className="job">
                            <div className="jobicon">{o.icon}</div>
                            <div>
                                <b>{o.title}</b>
                                <p className="muted" style={{ marginTop: 4 }}>{o.desc}</p>
                            </div>
                            <button className="btn primary" onClick={() => alert('Opportunity saved.')}>Save</button>
                        </article>
                    ))}
                </div>
            </main>
        </>
    );
}
