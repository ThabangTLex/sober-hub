import AppHeader from '../components/AppHeader';

export default function Skills() {
    const toast = (msg) => alert(msg);

    return (
        <>
            <AppHeader />
            <main className="page">
                <span className="eyebrow">SKILLS LAB</span>
                <h1>Learn. Build. Grow.</h1>
                <p className="page-intro">Vocational training to help young people improve employability and build a productive future.</p>

                <div className="grid three">
                    <article className="card">
                        <i>📱</i>
                        <h3>Cell Phone Repair</h3>
                        <p>Explore practical repair skills for future work or entrepreneurship.</p>
                        <button className="btn outline" style={{ marginTop: 16 }} onClick={() => toast('Cell phone repair module coming soon.')}>Start Module</button>
                    </article>
                    <article className="card featured">
                        <i>☕</i>
                        <h3>Barista Training</h3>
                        <p>Develop hospitality-related skills for employment opportunities.</p>
                        <button className="btn primary" style={{ marginTop: 16 }} onClick={() => toast('Barista training module coming soon.')}>Start Module</button>
                    </article>
                    <article className="card">
                        <i>💻</i>
                        <h3>Computer & Programming</h3>
                        <p>Build basic computer skills or explore programming fundamentals.</p>
                        <button className="btn outline" style={{ marginTop: 16 }} onClick={() => toast('Computer skills module coming soon.')}>Start Module</button>
                    </article>
                </div>

                <section className="dashcard" style={{ marginTop: 18 }}>
                    <h3>Local opportunities</h3>
                    <p className="muted">Skills Lab can connect suitable participants with internships at local businesses, depending on programme requirements and progress.</p>
                </section>
            </main>
        </>
    );
}
