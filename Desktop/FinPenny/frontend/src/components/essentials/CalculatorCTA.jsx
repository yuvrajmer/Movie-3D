import React, { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

// --- SHARED UI COMPONENTS ---

const ModalWrapper = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div className="bg-white w-full max-w-[850px] rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
      <div className="flex justify-between items-center px-8 py-6 border-b bg-slate-50">
        <h2 className="text-3xl font-bold text-[#2B5A84]">{title}</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
          <X size={28} />
        </button>
      </div>
      <div className="p-8 bg-white">
        <div className="flex flex-col md:flex-row gap-10">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const ResultDisplay = ({ results, disclaimer }) => (
  <div className="flex-1 bg-[#F3F6FA] p-8 rounded-2xl">
    <h3 className="text-2xl font-bold text-[#2B5A84] mb-6">Result</h3>
    <div className="space-y-5">
      {results.map((res, i) => (
        <div key={i} className="flex justify-between items-center border-b border-slate-200 pb-2">
          <span className="text-slate-600 font-medium">{res.label}:</span>
          <span className="text-[#2B5A84] font-bold text-xl">{res.value || '-'}</span>
        </div>
      ))}
    </div>
    <p className="mt-12 text-[12px] text-slate-500 leading-tight">
      <strong>Disclaimer:</strong> {disclaimer}
    </p>
  </div>
);

// --- CALCULATION LOGIC ---

const SIPCalc = ({ onClose }) => {
  const [inputs, setInputs] = useState({ p: '', n: '', r: '' });
  const [out, setOut] = useState(null);

  const handleCalc = () => {
    const P = parseFloat(inputs.p); // Monthly SIP
    const n = parseFloat(inputs.n); // Months
    const annualR = parseFloat(inputs.r); // Yearly Rate
    
    if (P > 0 && n > 0 && annualR > 0) {
      const i = (annualR / 100) / 12; // Monthly rate
      const fv = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const invested = P * n;
      setOut({
        invested: invested.toLocaleString('en-IN'),
        wealth: (fv - invested).toLocaleString('en-IN'),
        total: Math.round(fv).toLocaleString('en-IN')
      });
    }
  };

  return (
    <ModalWrapper title="SIP Calculator" onClose={onClose}>
      <div className="flex-1 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">SIP Amount (₹):</label>
          <input type="number" className="w-full bg-[#3D5A80] text-white p-4 rounded-lg outline-none focus:ring-2 ring-blue-400" 
            placeholder="e.g. 5000" onChange={e => setInputs({...inputs, p: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (Months):</label>
          <input type="number" className="w-full bg-[#3D5A80] text-white p-4 rounded-lg outline-none focus:ring-2 ring-blue-400" 
            placeholder="e.g. 120" onChange={e => setInputs({...inputs, n: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Expected Rate of Return (%):</label>
          <input type="number" className="w-full bg-[#3D5A80] text-white p-4 rounded-lg outline-none focus:ring-2 ring-blue-400" 
            placeholder="e.g. 12" onChange={e => setInputs({...inputs, r: e.target.value})} />
        </div>
        <button onClick={handleCalc} className="w-full md:w-auto bg-[#0077B6] hover:bg-[#023E8A] text-white px-10 py-4 rounded-lg font-bold uppercase transition-all shadow-md">
          Calculate
        </button>
      </div>
      <ResultDisplay 
        disclaimer="Please note that these calculators are for illustrations only and do not represent actual returns. Stock Market does not have a fixed rate of return."
        results={[
          { label: "Your Investment", value: out ? `₹${out.invested}` : null },
          { label: "Your Wealth Creation", value: out ? `₹${out.wealth}` : null },
          { label: "Future Value", value: out ? `₹${out.total}` : null }
        ]}
      />
    </ModalWrapper>
  );
};

const GoalCalc = ({ onClose }) => {
  const [inputs, setInputs] = useState({ target: '', years: '', rate: '' });
  const [out, setOut] = useState(null);

  const handleCalc = () => {
    const FV = parseFloat(inputs.target);
    const n = parseFloat(inputs.years) * 12;
    const annualR = parseFloat(inputs.rate);

    if (FV > 0 && n > 0 && annualR > 0) {
      const i = (annualR / 100) / 12;
      const sip = FV / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
      setOut({
        monthly: Math.round(sip).toLocaleString('en-IN'),
        total: Math.round(sip * n).toLocaleString('en-IN')
      });
    }
  };

  return (
    <ModalWrapper title="Goal SIP Calculator" onClose={onClose}>
      <div className="flex-1 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Goal Amount (₹):</label>
          <input type="number" className="w-full bg-[#3D5A80] text-white p-4 rounded-lg outline-none focus:ring-2 ring-blue-400" 
            onChange={e => setInputs({...inputs, target: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Years:</label>
          <input type="number" className="w-full bg-[#3D5A80] text-white p-4 rounded-lg outline-none focus:ring-2 ring-blue-400" 
            onChange={e => setInputs({...inputs, years: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Rate (%):</label>
          <input type="number" className="w-full bg-[#3D5A80] text-white p-4 rounded-lg outline-none focus:ring-2 ring-blue-400" 
            onChange={e => setInputs({...inputs, rate: e.target.value})} />
        </div>
        <button onClick={handleCalc} className="w-full md:w-auto bg-[#0077B6] text-white px-10 py-4 rounded-lg font-bold uppercase">Calculate</button>
      </div>
      <ResultDisplay 
        disclaimer="Actual returns may vary based on market conditions."
        results={[
          { label: "Monthly SIP", value: out ? `₹${out.monthly}` : null },
          { label: "Total Investment", value: out ? `₹${out.total}` : null }
        ]}
      />
    </ModalWrapper>
  );
};

const InflationCalc = ({ onClose }) => {
  const [inputs, setInputs] = useState({ cost: '', inf: '', years: '' });
  const [out, setOut] = useState(null);

  const handleCalc = () => {
    const PV = parseFloat(inputs.cost);
    const r = parseFloat(inputs.inf) / 100;
    const n = parseFloat(inputs.years);

    if (PV > 0 && n > 0) {
      const fv = PV * Math.pow(1 + r, n);
      setOut(Math.round(fv).toLocaleString('en-IN'));
    }
  };

  return (
    <ModalWrapper title="Inflation Calculator" onClose={onClose}>
      <div className="flex-1 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Current Cost (₹):</label>
          <input type="number" className="w-full bg-[#3D5A80] text-white p-4 rounded-lg" onChange={e => setInputs({...inputs, cost: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Inflation Rate (%):</label>
          <input type="number" className="w-full bg-[#3D5A80] text-white p-4 rounded-lg" onChange={e => setInputs({...inputs, inf: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Years:</label>
          <input type="number" className="w-full bg-[#3D5A80] text-white p-4 rounded-lg" onChange={e => setInputs({...inputs, years: e.target.value})} />
        </div>
        <button onClick={handleCalc} className="w-full md:w-auto bg-[#0077B6] text-white px-10 py-4 rounded-lg font-bold uppercase">Calculate</button>
      </div>
      <ResultDisplay 
        disclaimer="This helps you understand the future value of your current expenses."
        results={[{ label: "Future Cost", value: out ? `₹${out}` : null }]}
      />
    </ModalWrapper>
  );
};

// --- MAIN PAGE SECTION ---

const CalculatorCTA = () => {
  const [modal, setModal] = useState(null);

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto  ">
        <div className="flex flex-col md:flex-row items-center gap-16 mb-20">
          <div className="w-full md:w-1/2">
            <div className="rounded-[40px] overflow-hidden shadow-xl border border-slate-100">
              <img 
                src="https://finpenny.com/wp-content/uploads/2026/03/4-1-1536x449.png" 
                alt="Wealth Calculation" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-1.5 rounded-full text-white shadow-md">
                <ShieldCheck size={19} />
              </div>
              <span className="text-red-600 font-bold text-sm uppercase tracking-widest">
                Wealth Tools
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl text-[#2B5A84] leading-tight">
              Calculate <span className="font-extrabold">Your Wealth</span>
            </h2>
            
            <p className="text-slate-600 leading-relaxed text-lg text-justify max-w-xl">
              Use our calculators to visualize your investment growth and returns. Make 
              informed decisions with clarity on how much you need to invest.
            </p>

            <div className="pt-6 flex flex-wrap gap-4">
              <button onClick={() => setModal('sip')} className="bg-[#0077B6] hover:bg-[#023E8A] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide transition-all transform hover:-translate-y-1 shadow-lg">
                SIP Calculator
              </button>
              <button onClick={() => setModal('goal')} className="bg-[#0077B6] hover:bg-[#023E8A] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide transition-all transform hover:-translate-y-1 shadow-lg">
                Goal SIP Calculator
              </button>
              <button onClick={() => setModal('inflation')} className="bg-[#0077B6] hover:bg-[#023E8A] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide transition-all transform hover:-translate-y-1 shadow-lg">
                Inflation Calculator
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER MODALS */}
      {modal === 'sip' && <SIPCalc onClose={() => setModal(null)} />}
      {modal === 'goal' && <GoalCalc onClose={() => setModal(null)} />}
      {modal === 'inflation' && <InflationCalc onClose={() => setModal(null)} />}
    </section>
  );
};

export default CalculatorCTA;