import { useState, useEffect } from 'react';

const STORAGE_KEY = 'scholarfind_search_history';
const MAX_HISTORY = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    
    setHistory((prev) => {
      // Remove if already exists
      const filtered = prev.filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
      // Add to beginning and limit to max
      return [trimmed, ...filtered].slice(0, MAX_HISTORY);
    });
  };

  const removeFromHistory = (query: string) => {
    setHistory((prev) => prev.filter((q) => q !== query));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}
