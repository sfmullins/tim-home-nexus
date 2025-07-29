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
    const defaults = ["file-server", "smart-home", "vpn-access"];
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Check if the saved bookmarks contain the old "downloads" - if so, migrate to new defaults
        if (parsed.includes("downloads")) {
          console.log('Migrating old bookmarks to new defaults');
          setBookmarkedIds(defaults);
          localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(defaults));
        } else {
          setBookmarkedIds(parsed);
        }
      } catch (error) {
        console.error('Failed to parse bookmarks:', error);
        // Set defaults if parsing fails
        setBookmarkedIds(defaults);
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(defaults));
      }
    } else {
      // Set default bookmarks on first load
      setBookmarkedIds(defaults);
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(defaults));
    }
  }, []);

  const saveBookmarks = (ids: string[]) => {
    console.log('Saving bookmarks:', ids);
    setBookmarkedIds(ids);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  };

  const toggleBookmark = (moduleId: string) => {
    console.log('Toggle bookmark called for:', moduleId);
    console.log('Current bookmarked IDs:', bookmarkedIds);
    
    if (bookmarkedIds.includes(moduleId)) {
      // Remove bookmark
      console.log('Removing bookmark');
      saveBookmarks(bookmarkedIds.filter(id => id !== moduleId));
    } else if (bookmarkedIds.length < MAX_BOOKMARKS) {
      // Add bookmark
      console.log('Adding bookmark');
      saveBookmarks([...bookmarkedIds, moduleId]);
    } else {
      // Show message when full
      console.log('Bookmarks full');
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