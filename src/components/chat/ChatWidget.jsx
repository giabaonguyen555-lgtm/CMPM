import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  ChevronRight,
  Image as ImageIcon,
  LoaderCircle,
  MessageCircle,
  RotateCcw,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { sites } from "../../core/data/hanoiHeritageSites";
import { useHeritage } from "../../core/context/HeritageContext";
import { initialChatMessage, sendChatMessage } from "./chatService";

export default function ChatWidget() {
  const { language } = useHeritage();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([initialChatMessage]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const suggested = useMemo(() => sites.slice(0, 3), []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (value = message) => {
    const text = value.trim();
    if (!text || loading) return;
    setMessage("");
    setError(null);
    setMessages((items) => [...items, { id: `${Date.now()}-user`, role: "user", text }]);
    setLoading(true);
    try {
      const reply = await sendChatMessage({ message: text, language });
      setMessages((items) => [
        ...items,
        { id: `${Date.now()}-assistant`, role: "assistant", ...reply },
      ]);
    } catch (requestError) {
      setError({ text, message: requestError.message || "Unable to reach the assistant." });
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([initialChatMessage]);
    setError(null);
    setMessage("");
  };

  return (
    <div className="chat-widget">
      {open && (
        <section className="chat-panel" aria-label="Hanoi heritage assistant">
          <header className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-white" aria-hidden="true"><Bot size={16} /></span>
              <div><b className="block text-sm text-slate-900">Hanoi Assistant</b><small className="text-[10px] text-slate-500">Heritage guide · Mock assistant</small></div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={clearConversation} aria-label="Clear conversation" title="Clear conversation" className="chat-icon-button"><Trash2 size={15} /></button>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="chat-icon-button"><X size={16} /></button>
            </div>
          </header>
          <div className="chat-messages" aria-live="polite" aria-busy={loading}>
            {messages.map((item) => (
              <div key={item.id} className={`chat-message ${item.role === "user" ? "user" : "assistant"}`}>
                <p>{item.text}</p>
                {item.isMock && item.role === "assistant" && <small className="chat-mock-label">Mock response</small>}
                {item.site && <Link to={`/location/${item.site.id}`} onClick={() => setOpen(false)} className="chat-site">
                  <img src={item.site.image} alt="" /><span><b>{item.site.name[language] || item.site.name.en}</b><small>{item.site.category} · {item.site.duration} min</small></span><ChevronRight size={15} />
                </Link>}
                {item.links?.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="chat-link">{link.label}<ChevronRight size={13} /></Link>)}
              </div>
            ))}
            {loading && <div className="chat-message assistant chat-typing" role="status"><LoaderCircle size={14} className="chat-spinner" /> Assistant is typing…</div>}
            {error && <div className="chat-error" role="alert"><span>{error.message}</span><button onClick={() => send(error.text)} aria-label="Retry message"><RotateCcw size={14} /> Retry</button></div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-slate-100 p-3">
            <div className="mb-2 flex gap-1.5 overflow-x-auto" aria-label="Suggested questions">
              {suggested.map((site) => <button key={site.id} disabled={loading} onClick={() => send(`Tell me about ${site.name.en}`)} className="whitespace-nowrap rounded-full bg-slate-50 px-2.5 py-1 text-[10px] text-slate-600 hover:bg-slate-100">{site.name.en.split(" ").slice(0, 2).join(" ")}</button>)}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 focus-within:border-slate-900">
              <ImageIcon size={15} className="text-slate-400" aria-hidden="true" />
              <input ref={inputRef} value={message} disabled={loading} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Ask about Hanoi…" aria-label="Message the assistant" className="min-w-0 flex-1 bg-transparent text-xs outline-none" />
              <button onClick={() => send()} disabled={loading || !message.trim()} aria-label="Send message" className="chat-send-button"><Send size={15} /></button>
            </div>
          </div>
        </section>
      )}
      <button onClick={() => setOpen((value) => !value)} aria-label={open ? "Close assistant" : "Open assistant"} className="chat-launcher">{open ? <X size={20} /> : <MessageCircle size={20} />}</button>
    </div>
  );
}
