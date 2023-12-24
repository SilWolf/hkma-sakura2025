export const getVideoIdFromYoutubeUrl = (url: string | null) => {
  if (!url) {
    return null;
  }

  return (
    url.match(
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
    )?.[1] ?? null
  );
};

export const getYoutubeThumbnailByVideoId = (videoId: string | null) =>
  `https://img.youtube.com/vi/${videoId ?? "0"}/0.jpg`;

export const getYoutubeThumbnailByUrl = (url: string | null) =>
  getYoutubeThumbnailByVideoId(getVideoIdFromYoutubeUrl(url));
