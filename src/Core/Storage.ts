import { createEffect, createSignal, on, Signal } from "solid-js";

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
function syncImposterChances(names: string[]) {
    console.log("syncing")
    const chances: number[] = [...imposterChances()];
    chances.splice(names.length, chances.length - names.length);
    for (let i=0;i<=names.length;i++) {
        if (chances.length <= i) {
            chances.push(-1);
        }
        if (chances[i] <= -1) {
            chances[i] = 100;
        }
        setImposterChances(chances);
    }
}
createEffect(on(playerNames, (v) => syncImposterChances(v)));
export {imposterChances, setImposterChances};