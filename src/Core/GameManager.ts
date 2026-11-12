import { createEffect, createSignal, on } from "solid-js";
import { createStoredSignal } from "./Storage";
import { Word, WordBank } from "./WordBank";
import { setViewedPlayers } from "../Pages/GamePage";
import { weightedRandom } from "./MyMath";


export interface Player {
    name: string,
    imposter: boolean,
    disabled: boolean,
}

const playerNamesKey = "playerNames";

const [players, setPlayers] = createSignal<Player[]>([]);
const [imposterChances, setImposterChances] = createStoredSignal<number[]>("imposterChances", []);
const [startingPlayerIndex, setStartingPlayerIndex] = createSignal(0);
const [currentWord, setCurrentWord] = createSignal<Word>(WordBank[0]);

export {players, setPlayers};
export {imposterChances, setImposterChances};

export {currentWord};
export {startingPlayerIndex};


loadPlayerNames();
createEffect(on(players, reactToPlayerListChange));

export function initGame() {
    setPlayers(players().map((player): Player => ({...player, imposter: false, disabled: player.disabled})));
    
    const imposterBag: number[] = []
    const imposterCountBag: number[] = []
    for (let i=0; i<players().length ;i++) { imposterBag.push(i) }
    for (let i=0; i<=players().length; i++) { imposterCountBag.push(i) }
    const numImposters = imposterCountBag[weightedRandom(imposterCountBag, [...imposterChances()])];
    for (let i=0; i<numImposters; i++) {
        const imposter = imposterBag.splice(Math.floor(Math.random() * imposterBag.length), 1)[0];
        setPlayers(players().map((player, i): Player => (i==imposter ? {...player, imposter: true} : player)))
    }

    setCurrentWord(WordBank[Math.floor(Math.random() * WordBank.length)]);
    setStartingPlayerIndex(Math.floor(Math.random() * players().length));
}

export function reactToPlayerListChange(playerList: Player[], oldPlayerList?: Player[]) {
    oldPlayerList ??= [];
    const lengthsMatch: boolean = playerList.length == oldPlayerList.length;
    if (!lengthsMatch) {
        syncImposterChances(playerList.length);
    }
    let namesMatch = true;
    if (lengthsMatch) {
        for (let i=0; i<playerList.length; i++) {
            const p = playerList[i];
            const pp = oldPlayerList[i]; // hehe pp
            if (p.name != pp.name) {
                namesMatch = false;
            }
        }
    }
    if (!lengthsMatch || !namesMatch) {
        savePlayerNames();
    }
}

function savePlayerNames() {
    localStorage.setItem(
        playerNamesKey,
        JSON.stringify(players().map((player) => player.name))
    );
}

export function loadPlayerNames() {
    const names: string[] = JSON.parse(localStorage.getItem(playerNamesKey) ?? "[]");
    const newPlayerList: Player[] = [];
    names.forEach(name => {
        newPlayerList.push({name: name, imposter: false, disabled: false});
    });
    setPlayers(newPlayerList);
}

function syncImposterChances(playerCount: number) {
    const chances: number[] = [...imposterChances()];
    if (chances.length > (playerCount + 1)) {
        chances.splice(playerCount + 1)
    }
    for (let i=0; i<=playerCount; i++) {
        if (chances.length <= i) {
            chances.push(-1);
        }
        if (chances[i] <= -1) {
            chances[i] = 100;
        }
        setImposterChances(chances);
    }
}