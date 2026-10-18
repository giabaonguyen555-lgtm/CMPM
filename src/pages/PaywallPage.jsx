import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Banknote,
  LockKeyhole,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { usePayment } from "../core/context/PaymentContext";

export default function PaywallPage() {
  const {
    hasAccess,
    status,
    mode,
    sessionId,
    error,
    startOnlinePayment,
    openCashPayment,
    submitCashCode,
    resetPayment,
    retryPayment,
    retryCount,
  } = usePayment();
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (hasAccess || status === "success") {
    return (
      <main className="site-main grid place-items-center bg-slate-50 px-4 py-16">
        <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto text-emerald-600" size={42} />
          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            Payment successful
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Demo access is now enabled for this browser. No real payment was processed.
          </p>
          <Link
            to="/"
            className="mt-7 inline-block rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Continue exploring
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="site-main grid place-items-center bg-slate-50 px-4 py-16">
      <section className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
          <LockKeyhole size={20} />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Access pass
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
          Unlock the full Hanoi audio experience.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
          This is a visual demo payment flow. No real payment is processed.
        </p>
          {status === "pending" && mode === "online" && (
           <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
             <Loader2 className="mr-2 inline animate-spin" size={16} />
             Payment pending… completing demo checkout.
             <p className="mt-2 text-xs text-slate-500">This is a demo; no card is charged.</p>
           </div>
         )}
        {status === "pending" && mode === "cash" && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold">Cash session created</p>
            <p className="mt-2 text-xs text-slate-500">
              Session ID: <b className="text-slate-900">{sessionId}</b>
            </p>
            <label className="mt-4 block text-xs font-semibold">
              Enter claim code
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="HANOI-DEMO"
                className="mt-2 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-slate-900"
              />
            </label>
            <button
              onClick={() => {
                setSubmitted(true);
                submitCashCode(code);
              }}
              className="mt-3 rounded-lg bg-slate-950 px-4 py-2 text-xs font-semibold text-white"
            >
              Verify code
            </button>
            {submitted && error && (
              <p className="mt-3 text-xs text-red-600">{error}</p>
            )}
          </div>
        )}
        {status === "idle" && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              onClick={startOnlinePayment}
              className="rounded-2xl border border-slate-200 p-5 text-left transition hover:border-slate-900 hover:shadow-sm"
            >
              <CreditCard size={20} />
              <b className="mt-4 block text-sm">Online payment</b>
              <span className="mt-2 block text-xs leading-5 text-slate-500">
                Simulate secure online checkout.
              </span>
            </button>
            <button
              onClick={openCashPayment}
              className="rounded-2xl border border-slate-200 p-5 text-left transition hover:border-slate-900 hover:shadow-sm"
            >
              <Banknote size={20} />
              <b className="mt-4 block text-sm">Cash payment</b>
              <span className="mt-2 block text-xs leading-5 text-slate-500">
                Use the demo claim code flow.
              </span>
            </button>
          </div>
        )}
         {status !== "idle" && (
           <div className="mt-6 flex flex-wrap gap-4">
             <button onClick={resetPayment} className="text-xs font-semibold text-slate-500 underline">
               Choose another method
             </button>
             {mode === "online" && status === "pending" && (
               <button onClick={retryPayment} className="text-xs font-semibold text-slate-700 underline">
                 Retry demo payment{retryCount ? ` (${retryCount})` : ""}
               </button>
             )}
           </div>
         )}
        <Link
          to="/"
          className="mt-8 block text-xs font-semibold text-slate-500 underline"
        >
          Back to Explore
        </Link>
      </section>
    </main>
  );
}
