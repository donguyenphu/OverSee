import { useState, useRef, useEffect } from 'react';

export interface Highlight {
  start: number;
  end: number;
  id: string;
}

export const useTextHighlight = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [selectedRange, setSelectedRange] = useState<{ start: number; end: number; text: string } | null>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const getTextOffset = (container: Node, node: Node, offset: number): number => {
    let charCount = 0;

    const traverse = (n: Node): boolean => {
      if (n === node) {
        return true;
      }

      if (n.nodeType === 3) { // TEXT_NODE
        charCount += (n.textContent || '').length;
      } else if (n.nodeType === 1) { // ELEMENT_NODE
        for (let i = 0; i < n.childNodes.length; i++) {
          if (traverse(n.childNodes[i])) {
            return true;
          }
        }
      }
      return false;
    };

    if (node.nodeType === 3) {
      charCount = offset;
      let n = node.previousSibling;
      while (n) {
        charCount += (n.textContent || '').length;
        n = n.previousSibling;
      }

      let parent = node.parentNode;
      while (parent && parent !== container) {
        n = parent.previousSibling;
        while (n) {
          charCount += (n.textContent || '').length;
          n = n.previousSibling;
        }
        parent = parent.parentNode;
      }
    } else {
      traverse(container);
    }

    return charCount;
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0 || !textRef.current) {
      setSelectedRange(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(textRef.current);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    
    const start = preCaretRange.toString().length - selection.toString().length;
    const end = start + selection.toString().length;

    setSelectedRange({
      start,
      end,
      text: selection.toString()
    });
  };

  const normalizeHighlights = (items: Highlight[]) => {
    if (!items || items.length === 0) return [] as Highlight[];
    const sorted = [...items].sort((a, b) => a.start - b.start);
    const out: Highlight[] = [];
    let cur = sorted[0];
    for (let i = 1; i < sorted.length; i++) {
      const next = sorted[i];
      if (next.start <= cur.end) {
        // overlap or contiguous -> merge
        cur = { start: Math.min(cur.start, next.start), end: Math.max(cur.end, next.end), id: `${cur.start}-${Math.max(cur.end, next.end)}-${Date.now()}` };
      } else {
        out.push(cur);
        cur = next;
      }
    }
    out.push(cur);
    return out;
  };

  const addHighlight = () => {
    if (!selectedRange) return;

    const newStart = Math.min(selectedRange.start, selectedRange.end);
    const newEnd = Math.max(selectedRange.start, selectedRange.end);
    if (newStart === newEnd) return;

    setHighlights(prev => {
      const withNew = [...prev, { start: newStart, end: newEnd, id: `${newStart}-${newEnd}-${Date.now()}` }];
      return normalizeHighlights(withNew);
    });

    setSelectedRange(null);
    window.getSelection()?.removeAllRanges();
  };

  const removeHighlight = () => {
    if (!selectedRange) return;

    const selStart = Math.min(selectedRange.start, selectedRange.end);
    const selEnd = Math.max(selectedRange.start, selectedRange.end);

    setHighlights(prev => {
      const normalized = normalizeHighlights(prev);
      const out: Highlight[] = [];

      for (const h of normalized) {
        if (h.end <= selStart || h.start >= selEnd) {
          // no overlap
          out.push(h);
        } else {
          // overlap exists -> keep left part if any
          if (h.start < selStart) {
            out.push({ start: h.start, end: selStart, id: `${h.start}-${selStart}-${Date.now()}` });
          }
          // keep right part if any
          if (h.end > selEnd) {
            out.push({ start: selEnd, end: h.end, id: `${selEnd}-${h.end}-${Date.now()}` });
          }
        }
      }

      return normalizeHighlights(out);
    });

    setSelectedRange(null);
    window.getSelection()?.removeAllRanges();
  };

  const clearAllHighlights = () => {
    setHighlights([]);
    setSelectedRange(null);
  };

  type Part =
    | { type: 'text'; start: number; end: number; text: string }
    | { type: 'highlight'; id: string; start: number; end: number };

  const renderHighlightedText = (text: string): Part[] => {
    const out: Part[] = [];
    if (!text) return out;

    if (!highlights || highlights.length === 0) {
      out.push({ type: 'text', start: 0, end: text.length, text });
      return out;
    }

    const sorted = normalizeHighlights(highlights).sort((a, b) => a.start - b.start);
    let last = 0;
    for (const h of sorted) {
      const hStart = Math.max(0, Math.min(text.length, h.start));
      const hEnd = Math.max(0, Math.min(text.length, h.end));
      if (hStart > last) {
        out.push({ type: 'text', start: last, end: hStart, text: text.slice(last, hStart) });
      }
      if (hEnd > hStart) {
        out.push({ type: 'highlight', id: h.id, start: hStart, end: hEnd });
      }
      last = Math.max(last, hEnd);
    }

    if (last < text.length) {
      out.push({ type: 'text', start: last, end: text.length, text: text.slice(last) });
    }

    return out;
  };

  return {
    highlights,
    selectedRange,
    textRef,
    handleTextSelection,
    addHighlight,
    removeHighlight,
    clearAllHighlights,
    renderHighlightedText
  };
};
