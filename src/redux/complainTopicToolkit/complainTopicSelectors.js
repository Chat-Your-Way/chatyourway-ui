export const selectComplainTopicStatus = (state) => state.complainTopic.status;
export const selectComplainTopicIsLoading = (state) =>
  state.complainTopic.isLoading;
export const selectComplainTopicIsError = (state) =>
  state.complainTopic.isError;
export const selectComplainTopicResult = (state) => state.complainTopic.result;
