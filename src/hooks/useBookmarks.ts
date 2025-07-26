import { useState, useEffect } from 'react';

export interface ModuleData {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: "online" | "offline" | "connecting";
  isBookmarked?: boolean;
}

const BOOKMARKS_KEY = 'tim-bookmarks';
const MAX_BOOKMARKS = 3;

export const useBookmarks = () => {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    if (saved) {
      try {
        setBookmarkedIds(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse bookmarks:', error);
        // Set defaults if parsing fails
        const defaults = ["file-server", "smart-home", "downloads"];
        setBookmarkedIds(defaults);
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(defaults));
      }
    } else {
      // Set default bookmarks on first load
      const defaults = ["file-server", "smart-home", "downloads"];
      setBookmarkedIds(defaults);
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(defaults));
    }
  }, []);

  const saveBookmarks = (ids: string[]) => {
    setBookmarkedIds(ids);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  };

  const toggleBookmark = (moduleId: string) => {
    if (bookmarkedIds.includes(moduleId)) {
      // Remove bookmark
      saveBookmarks(bookmarkedIds.filter(id => id !== moduleId));
    } else if (bookmarkedIds.length < MAX_BOOKMARKS) {
      // Add bookmark
      saveBookmarks([...bookmarkedIds, moduleId]);
    } else {
      // Show message when full
      alert(`Quick access full (${bookmarkedIds.length}/${MAX_BOOKMARKS}). Remove a bookmark first.`);
    }
  };

  const canBookmark = (moduleId: string) => {
    return bookmarkedIds.includes(moduleId) || bookmarkedIds.length < MAX_BOOKMARKS;
  };

  const getBookmarkTooltip = (moduleId: string) => {
    if (bookmarkedIds.includes(moduleId)) {
      return 'Remove from quick access';
    }
    if (bookmarkedIds.length >= MAX_BOOKMARKS) {
      return `Quick access full (${bookmarkedIds.length}/${MAX_BOOKMARKS}). Remove a bookmark first.`;
    }
    return `Add to quick access (${bookmarkedIds.length}/${MAX_BOOKMARKS})`;
  };

  return {
    bookmarkedIds,
    toggleBookmark,
    canBookmark,
    getBookmarkTooltip,
    maxBookmarks: MAX_BOOKMARKS
  };
};