import { createSignal } from "solid-js";
import { imposterChances, playerNames } from "./Storage";
import { Word, WordBank } from "./WordBank";
import { setViewedPlayers } from "../Pages/GamePage";

const [startingPlayerIndex, setStartingPlayerIndex] = createSignal(0);
const [currentWord, setCurrentWord] = createSignal<Word>(WordBank[0]);
const [currentImposters, setCurrentImposters] = createSignal<number[]>([]);

function weightedRandom(items: number[], weights: number[]): number {
    for (let i=1;i<items.length;i++) {;
        weights[i] += weights[i-1];
    }

    const rand = Math.random() * weights[weights.length - 1];
    
    let i: number;
    for (i=0;i<items.length;i++) {
        if (rand < weights[i]) {
            break;
        }
    }
    return i;
}

export function initGame() {
    setViewedPlayers([]);
    
    const imposters: number[] = []
    const imposterBag: number[] = []
    const imposterCountBag: number[] = []
    for (let i=0;i<playerNames().length;i++) { imposterBag.push(i) }
    for (let i=0;i<=playerNames().length;i++) { imposterCountBag.push(i) }
    const numImposters = imposterCountBag[weightedRandom(imposterCountBag, [...imposterChances()])];
    for (let i=0; i<numImposters; i++) {
        imposters.push(
            imposterBag.splice(Math.floor(Math.random() * imposterBag.length), 1)[0]
        );
    }
    console.log(imposters);
    setCurrentImposters(imposters);

    setCurrentWord(WordBank[Math.floor(Math.random() * WordBank.length)]);
    setStartingPlayerIndex(Math.floor(Math.random() * playerNames().length));
}

export {currentImposters};
export {currentWord};
export {startingPlayerIndex};