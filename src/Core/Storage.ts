import { createEffect, createSignal, on, Signal } from "solid-js";

export function createStoredSignal<T>(storageKey: string, defaultValue: T): Signal<T> {
    const loadedVal = JSON.parse(localStorage.getItem(storageKey) ?? JSON.stringify(defaultValue));
    const [signalVal, setSignalVal] = createSignal<T>(loadedVal);
    const setVal = ((val: any) => {
        setSignalVal(val);
        localStorage.setItem(storageKey, JSON.stringify(val));
    }) as typeof setSignalVal;
    return [signalVal, setVal];
}
