import { createSignal, Signal } from "solid-js";

function createStoredSignal<T>(storageKey: string, defaultValue: T): Signal<T> {
    const loadedVal = JSON.parse(localStorage.getItem(storageKey) ?? JSON.stringify(defaultValue));
    const [signalVal, setSignalVal] = createSignal<T>(loadedVal);
    const setVal = ((val: any) => {
        setSignalVal(val);
        localStorage.setItem(storageKey, JSON.stringify(val));
    }) as typeof setSignalVal;
    return [signalVal, setVal];
}

const [playerNames, setPlayerNames] = createStoredSignal<string[]>("playerNames", []);
export {playerNames, setPlayerNames};
const [imposterChances, setImposterChances] = createStoredSignal<number[]>("imposterChances", []);
for (let i=0;i<=playerNames().length;i++) {
    const chances: number[] = imposterChances();
    if (chances.length <= i) {
        chances.push(-1);
    }
    if (chances[i] <= -1) {
        chances[i] = 100;
    }
    setImposterChances(chances);
}
export {imposterChances, setImposterChances};