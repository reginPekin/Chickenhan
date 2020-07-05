import React from 'react';

type Listener<T> = (val: T) => void;
type Unsubscriber = () => void;

export class Observable<T> {
  private listeners: Listener<T>[] = [];

  constructor(private value: T) {}

  get(): T {
    return this.value;
  }

  next(value: T): void {
    if (this.value !== value) {
      this.value = value;

      this.listeners.forEach(innerListener => innerListener(value));
    }
  }

  subscribe(listener: Listener<T>): Unsubscriber {
    this.listeners.push(listener);

    return (): void => {
      this.listeners = this.listeners.filter(
        innerListener => innerListener !== listener,
      );
    };
  }
}

type StoreReturnedType<T> = [
  T, // state
  (newState: T) => void, // setState
  () => [T, (newState: T) => void], // useState
  <K>(selector: (state: T) => K) => K | undefined, // useSelector
];

export function createStore<T>(initialState: T): StoreReturnedType<T> {
  const state = Object.assign({}, initialState);
  const subject = new Observable<T>(state);

  function setState(newState: T): void {
    Object.assign(state, newState);
    subject.next(newState);
  }

  function useState(): [T, (newState: T) => void] {
    const [innerState, setInnerState] = React.useState<T>(state);

    React.useEffect(() => {
      const unsubscribe = subject.subscribe(newState =>
        setInnerState(newState),
      );
      return unsubscribe;
    }, []);

    return [innerState, setState];
  }

  function useSelector<K>(selector: (state: T) => K): K | undefined {
    const [, forceRender] = React.useReducer(innerState => innerState + 1, 0);

    const latestSelector = React.useRef<Function>();
    const latestSelectedState = React.useRef<K>();
    const latestCallbackError = React.useRef();

    let selectedState: K | undefined;

    try {
      if (selector !== latestSelector.current || latestCallbackError.current) {
        selectedState = selector({ ...state });
      } else {
        selectedState = latestSelectedState.current;
      }
    } catch (error) {
      throw error;
    }

    React.useEffect(() => {
      latestSelector.current = selector;
      latestSelectedState.current = selectedState;
      latestCallbackError.current = undefined;
    });

    React.useEffect(() => {
      const unsubscriber = subject.subscribe(newState => {
        if (!latestSelector.current) return;

        try {
          const newSelectedState = latestSelector.current(newState);

          if (newSelectedState === latestSelectedState.current) {
            return;
          }
          latestSelectedState.current = newSelectedState;
        } catch (error) {
          latestCallbackError.current = error;
        }

        forceRender();
      });

      return unsubscriber;
    }, []);

    return selectedState;
  }

  return [state, setState, useState, useSelector];
}
