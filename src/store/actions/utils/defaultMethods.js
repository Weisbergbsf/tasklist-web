export const fetchStart = (type) => {
  return {
    type: type,
  };
};

export const fetchError = (type, error) => {
  return {
    type: type,
    error: error,
  };
};

export const fetchSuccess = (type, payload, id) => {
  return {
    type: type,
    payload: payload,
    id: id
  };
};
