export function ChatBlockDataHelper(isTopics) {
  if (!isTopics)
    return [
      {
        title: 'Культурна мозаїка: автентичний досвід',
        lastMessageTime: '14:03',
        userName: 'Ім`я користувача',
        message: 'Супер',
        isTyping: true,
        unreadedMessage: 3,
      },
      {
        title: 'Культурна мозаїка: автентичний досвід',
        lastMessageTime: '14:03',
        userName: 'Ім`я користувача',
        message: 'Супер',
        isTyping: false,
        unreadedMessage: 3,
      },
    ];

  return [
    {
      title: 'Приховані походи: Відкриття незвіданого',
      lastMessageTime: '16:28',
      userName: 'Ім`я користувача',
      message: 'Супер',
      isTyping: true,
      unreadedMessage: 4,
    },
    {
      title: 'Культурна мозаїка: автентичний досвід',
      lastMessageTime: '14:03',
      userName: 'Ім`я користувача',
      message: 'Супер',
      isTyping: false,
      unreadedMessage: 0,
    },
    {
      title: 'Незвичайні дива: унікальні напрямки',
      lastMessageTime: '03:46',
      userName: 'Ім`я користувача',
      message: 'Супер',
      isTyping: false,
      unreadedMessage: 0,
    },
    {
      title: 'Посібник шукача гострих відчуттів: пригодницькі ескапади',
      lastMessageTime: '14:03',
      userName: 'Ім`я користувача',
      message: 'Супер',
      isTyping: true,
      unreadedMessage: 3,
    },
  ];
}
