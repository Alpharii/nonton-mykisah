export function parseEpisodeTitle(fullTitle: string) {
  if (!fullTitle) {
    return {
      animeTitle: '',
      episodeLabel: '',
      episodeNumber: '',
    };
  }

  // Split by "Episode"
  const parts = fullTitle.split(/episode/i);

  if (parts.length < 2) {
    return {
      animeTitle: fullTitle,
      episodeLabel: '',
      episodeNumber: '',
    };
  }

  const animeTitle = parts[0].trim();

  // Ambil angka setelah Episode
  const afterEpisode = parts[1];

  const match = afterEpisode.match(/\d+/);
  const episodeNumber = match ? match[0] : '';

  return {
    animeTitle,
    episodeLabel: episodeNumber ? `Episode ${episodeNumber}` : '',
    episodeNumber,
  };
}