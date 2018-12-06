const initialState = {
  token: null,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'STORE_TOKEN':
    return {
      token: action.payload
    };

  default:
    return state;
  }
};

export default tokenReducer;
