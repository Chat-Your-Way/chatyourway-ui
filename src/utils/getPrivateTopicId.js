const getPrivateTopicId = ({ userId, privateTopics }) => {
  const userWithPrivateTopicId = privateTopics.find(
    (el) => el.contact.id === userId,
  );

  if (userWithPrivateTopicId) {
    return userWithPrivateTopicId.id;
  } else return userWithPrivateTopicId.contact.email;
};

export default getPrivateTopicId;
