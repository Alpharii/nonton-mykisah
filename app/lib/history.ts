import type { AnimeHistory } from "~/types/History";

const STORAGE_KEY = 'watch-history';

export function getWatchHistory(): AnimeHistory[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveWatchHistory(data: AnimeHistory[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function upsertHistory(newItem: AnimeHistory) {
  const history = getWatchHistory();

  const index = history.findIndex(h => h.slug === newItem.slug);

  if (index !== -1) {
    // update existing
    history[index] = newItem;

    // pindahkan ke paling atas
    const updated = history.splice(index, 1)[0];
    history.unshift(updated);
  } else {
    history.unshift(newItem);
  }

  // limit max 50 history
  const trimmed = history.slice(0, 50);

  saveWatchHistory(trimmed);
}