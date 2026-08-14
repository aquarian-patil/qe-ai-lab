"use client";
import { useState, useEffect } from 'react';

export default function HitlBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // In a real app, this would use SWR or React Query, 
    // or listen to a WebSocket/Global Store for real-time updates across pages.
    fetch('/api/governance/hitl')
      .then(res => res.json())
      .then(data => {
        if (data.queue) {
          setCount(data.queue.length);
        }
      })
      .catch(() => setCount(0));
  }, []);

  if (count === 0) return null;

  return (
    <span className="ml-auto bg-red-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]">
      {count}
    </span>
  );
}
