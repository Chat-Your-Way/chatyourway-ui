const registry = new Map();

export const registerSubscription = (id, destination, callback) => {
  registry.set(id, { destination, callback });
};

export const getSubscriptionById = (id) => {
  return registry.get(id) || null;
};

export const clearRegistry = () => {
  registry.clear();
};
