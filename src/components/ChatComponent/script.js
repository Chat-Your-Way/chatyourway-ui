const socket = new SockJS('/chat');
const stompClient = Stomp.over(socket);
const subToTopicDest = '/topic/';
const subToError = '/user/specific/error';
const subToNotificationDest = '/user/specific/notify/';
const sendToPublicTopicDest = '/app/topic/public/';
const sendToPrivateTopicDest = '/app/topic/private/';
const getHistoryTopicDest = '/app/history/topic/';

stompClient.connect({}, function (frame) {
  console.log('Connected: ' + frame);

  subscribeToError();
});

function subscribeToMessageHistory() {
  let topicId = document.getElementById('subscribeToTopic').value;

  stompClient.subscribe(
    '/user' + subToTopicDest + topicId,
    function (messages) {
      let parseMessage = JSON.parse(messages.body);

      parseMessage.forEach(function (message) {
        showMessage(message);
      });
    },
  );
}

function subscribeToTopic() {
  let topicId = document.getElementById('subscribeToTopic').value;

  subscribeToMessageHistory();

  stompClient.subscribe(subToTopicDest + topicId, function (messages) {
    let parseMessage = JSON.parse(messages.body);
    showMessage(parseMessage);
  });
}

function showMessage(message) {
  let response = document.getElementById('messages');
  response.innerText += '>>> ' + JSON.stringify(message) + '\n';
}

function showNotification(notificationMessage) {
  let response = document.getElementById('notification');
  response.innerText = JSON.stringify(notificationMessage);
}

function subscribeToNotificationFromTopic(topicId) {
  stompClient.subscribe(subToNotificationDest + topicId, function (messages) {
    let notificationMessage = JSON.parse(messages.body);
    console.log(notificationMessage);
    showNotification(notificationMessage);
  });
}

function subscribeToError() {
  stompClient.subscribe(subToError, function (messages) {
    let errorMessage = JSON.parse(messages.body);
    console.log(errorMessage);
    showMessage(errorMessage);
  });
}

function sendToPublicTopic() {
  let topicId = document.getElementById('subscribeToTopic').value;
  let message = document.getElementById('message').value;
  let request = JSON.stringify({ content: message });
  let response = document.getElementById('messages');

  stompClient.send(sendToPublicTopicDest + topicId, {}, request);
  response.innerText += '<<< ' + request + '\n';
}

function sendToPrivateTopic() {
  let topicId = document.getElementById('subscribeToTopic').value;
  let message = document.getElementById('privateMessage').value;
  let sendTo = document.getElementById('sendToContact').value;
  let request = JSON.stringify({ sendTo: sendTo, content: message });
  let response = document.getElementById('messages');

  stompClient.send(sendToPrivateTopicDest + topicId, {}, request);
  response.innerText += '<<< ' + request + '\n';
}

function getHistoryTopic() {
  let topicId = document.getElementById('subscribeToTopic').value;
  let page = document.getElementById('page').value;
  let pageSize = document.getElementById('pageSize').value;
  let request = JSON.stringify({ page: page, pageSize: pageSize });
  let response = document.getElementById('messages');

  stompClient.send(getHistoryTopicDest + topicId, {}, request);
  response.innerText += '<<< ' + request + '\n';
}
