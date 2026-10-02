"use client";

import { useState } from "react";

/** Copy / download buttons for the security note. The note text itself is rendered on the server, so it stays selectable without JS. */
export default function NoteActions({ text, copy, copied, download, filename }: { text: string; copy: string; copied: string; download: string; filename: string }) {
  const [done, setDone] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  }

  function onDownload() {
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="note-actions">
      <button type="button" className="pill white small" onClick={onCopy}>{done ? copied : copy}</button>
      <button type="button" className="pill dark small" onClick={onDownload}>{download}</button>
      <span className="sr-only" role="status" aria-live="polite">{done ? copied : ""}</span>
    </div>
  );
}
