export function getAvatar(isTopics, data) {
  if (!isTopics) return undefined;
  const avatarContent =
    data.title.trim()[0] + data.title.trim().split(' ')[1][0];
  return avatarContent.toUpperCase();
}
