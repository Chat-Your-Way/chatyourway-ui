export function getAvatar(isTopics, data) {
  if (!isTopics) return undefined;
  const topicNameSet = data.topicName
    .split(' ')
    .filter((el) => el !== '' && el !== '-');
  if (topicNameSet.length === 1) {
    return topicNameSet[0][0].toUpperCase();
  } else {
    const firstLetter = topicNameSet[0][0];
    const secondLetter = topicNameSet[1][0];
    return `${firstLetter}${secondLetter}`.toUpperCase();
  }
}
