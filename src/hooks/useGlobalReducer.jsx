import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  favorites: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE": {
      const fav = action.payload; // { uid, name, type }
      if (state.favorites.find((f) => f.uid === fav.uid)) return state;
      return { ...state, favorites: [...state.favorites, fav] };
    }

    case "REMOVE_FAVORITE": {
      const uidToRemove = action.payload; // uid (string)
      return {
        ...state,
        favorites: state.favorites.filter((f) => f.uid !== uidToRemove),
      };
    }

    default:
      return state;
  }
}

export const GlobalProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  // Helpers/acciones para usar desde los componentes
  const actions = {
    addFavorite: (fav) => dispatch({ type: "ADD_FAVORITE", payload: fav }),
    removeFavorite: (uid) => dispatch({ type: "REMOVE_FAVORITE", payload: uid }),
  };

  return (
    <GlobalContext.Provider value={{ store, dispatch, actions }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalProvider;
