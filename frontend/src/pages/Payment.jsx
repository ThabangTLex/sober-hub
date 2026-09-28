import { useState } from 'react';
import AppHeader from '../components/AppHeader';

const PLANS = [
    { value: 'R50', label: 'Starter', desc: 'Wi-Fi • community • peer support' },
    { value: 'R75', label: 'Standard', desc: 'Core access + skills activities' },
    { value: 'R100', label: 'Full', desc: 'Full hub access + support services' },
];

function fmtCard(v) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function fmtExpiry(v) {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
}

export default function Payment() {
    const [selected, setSelected] = useState('R50');
    const [step, setStep] = useState('plan'); // 'plan' | 'card' | 'done'
    const [card, setCard] = useState({ name: '', number: '', expiry: '', cvv: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const setF = (field) => (e) => {
        let v = e.target.value;
        if (field === 'number') v = fmtCard(v);
        if (field === 'expiry') v = fmtExpiry(v);
        if (field === 'cvv') v = v.replace(/\D/g, '').slice(0, 4);
        setCard({ ...card, [field]: v });
    };

    const handlePay = async (e) => {
        e.preventDefault();
        setError('');
        const digits = card.number.replace(/\s/g, '');
        if (digits.length < 16) return setError('Enter a valid 16-digit card number.');
        if (card.expiry.length < 5) return setError('Enter a valid expiry date (MM/YY).');
        if (card.cvv.length < 3) return setError('Enter a valid CVV.');
        setLoading(true);
        try {
            const token = localStorage.getItem('sh_token');
            const res = await fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ plan: selected }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Payment failed.');
            const user = JSON.parse(localStorage.getItem('sh_user') || '{}');
            localStorage.setItem('sh_user', JSON.stringify({ ...user, membershipStatus: 'active', membershipPlan: selected }));
            setStep('done');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (step === 'done') {
        return (
            <>
                <AppHeader />
                <main className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
                    <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
                    <h1 style={{ fontSize: 32 }}>Membership Activated!</h1>
                    <p className="muted" style={{ marginTop: 10 }}>
                        You are now on the <strong>{selected}/month</strong> plan. Enjoy full access to Sober Hub.
                    </p>
                </main>
            </>
        );
    }

    return (
        <>
            <AppHeader />
            <main className="page">
                <span className="eyebrow">MEMBERSHIP CHECKOUT</span>
                <h1>Choose your plan</h1>
                <p className="page-intro">Select a monthly plan then enter your card details to activate.</p>

                <div className="payment-grid">
                    {PLANS.map(p => (
                        <div key={p.value} className={`price-card${selected === p.value ? ' selected' : ''}`} onClick={() => setSelected(p.value)}>
                            <strong>{p.value}</strong>
                            <span>{p.label} membership</span>
                            <small>{p.desc}</small>
                        </div>
                    ))}
                </div>

                {step === 'plan' && (
                    <div style={{ textAlign: 'right' }}>
                        <button className="btn primary" onClick={() => setStep('card')}>
                            Continue to Payment →
                        </button>
                    </div>
                )}

                {step === 'card' && (
                    <form className="form" onSubmit={handlePay} style={{ maxWidth: 520 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                            <span style={{ fontSize: 22 }}>🔒</span>
                            <div>
                                <b>Secure card payment</b>
                                <p className="muted">Plan: {selected}/month — {PLANS.find(p => p.value === selected)?.label} membership</p>
                            </div>
                        </div>

                        {error && <div className="form-error">{error}</div>}

                        <label>
                            Cardholder name
                            <input value={card.name} onChange={setF('name')} placeholder="e.g. Thabo Dlamini" required />
                        </label>
                        <label>
                            Card number
                            <input value={card.number} onChange={setF('number')} placeholder="1234 5678 9012 3456" inputMode="numeric" required />
                        </label>
                        <div className="formgrid">
                            <label>
                                Expiry date
                                <input value={card.expiry} onChange={setF('expiry')} placeholder="MM/YY" inputMode="numeric" required />
                            </label>
                            <label>
                                CVV
                                <input value={card.cvv} onChange={setF('cvv')} placeholder="123" inputMode="numeric" type="password" required />
                            </label>
                        </div>

                        <div style={{ display: 'flex', gap: 10 }}>
                            <button type="button" className="btn outline" onClick={() => setStep('plan')}>← Back</button>
                            <button type="submit" className="btn primary" disabled={loading} style={{ flex: 1 }}>
                                {loading ? 'Processing...' : `Pay ${selected}/month`}
                            </button>
                        </div>
                    </form>
                )}
            </main>
        </>
    );
}
