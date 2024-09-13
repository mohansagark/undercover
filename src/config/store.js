import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import cryptoJs from "crypto-js";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../store/reducers";
import whitelist from "./whitelistedReducers.json";

const middleware = [thunk];

const encryptingKey = "bellbottom";

const encryptor = createTransform(
  (inboundState, key) => {
    if (!inboundState) {
      return inboundState;
    }
    const cryptedText = cryptoJs.AES.encrypt(
      JSON.stringify(inboundState),
      encryptingKey
    );
    return cryptedText.toString();
  },
  (outboundState, key) => {
    if (!outboundState) {
      return outboundState;
    }
    const bytes = cryptoJs.AES.decrypt(outboundState, encryptingKey);
    const decrypted = bytes.toString(cryptoJs.enc.Utf8);

    return JSON.parse(decrypted);
  }
);

const persistConfig = {
  key: "root",
  storage,
  transforms: [encryptor],
  whitelist: whitelist,
};

const initialState = {};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middleware)
);
const persistor = persistStore(store);

export { store, persistor };
