export function findImageURL(content: string) {
  const regexp = /https:\/\/myblogsbucket[^<>"]+/;
  const match = content.match(regexp);

  if (match) return match[0];

  return null;
}
