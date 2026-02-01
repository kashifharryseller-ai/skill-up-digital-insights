import { useState, useEffect } from 'react';
import type { BookmarkedItem, AIUniversityData, AIProfessor, AIScholarship } from '@/types/ai-research';

const STORAGE_KEY = 'scholarfind_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (
    type: BookmarkedItem['type'],
    data: AIUniversityData | AIProfessor | AIScholarship
  ) => {
    const id = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newBookmark: BookmarkedItem = {
      id,
      type,
      data,
      savedAt: new Date().toISOString(),
    };
    setBookmarks((prev) => [...prev, newBookmark]);
    return id;
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const isBookmarked = (name: string, type: BookmarkedItem['type']) => {
    return bookmarks.some((b) => {
      if (b.type !== type) return false;
      const data = b.data as any;
      return data.name === name || data.university === name;
    });
  };

  const getBookmarksByType = (type: BookmarkedItem['type']) => {
    return bookmarks.filter((b) => b.type === type);
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarksByType,
    clearAllBookmarks,
  };
}
