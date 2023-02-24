// Redux API
import { Dispatch } from "react";

interface ICreateStore<T, U> {
  isReady: boolean;
  name: string;
  dispatch: Dispatch<T>;
  getState: () => void;
  subscribe: (callback: Function) => void;
  __onStateUpdated: () => void;
  init: ({dispatch, getState}: {dispatch: Dispatch<T>, getState: () => U})  => void;
}

let createStore = <T, U>({ name = "" } = {}) => {
  return (() => {
    const subscriptions: Function[] = [];
    const store: ICreateStore<T, U> = {
      isReady: false,
      name,
      dispatch: function () {
        console.error(`store ${this.name}: is NOT ready`);
      },
      getState: () => null, // method will be updated by init
      subscribe: function (callback) {
        subscriptions.push(callback);
      },
      __onStateUpdated: function () {
        subscriptions.forEach((fn) => fn());
      },
      init: function ({dispatch, getState}) {
        if (this.isReady) return;

        this.isReady = true;
        this.dispatch = dispatch;
        this.getState = getState;
        console.log(`store ${this.name}: is ready`)
        Object.freeze(this);
      },
    };

    return store;
  })();
};

export default createStore;
