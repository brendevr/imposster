import { For, onMount, onCleanup, createSignal, Show } from "solid-js";
import { playerNames } from "../Core/Storage";

import './GamePage.css'
import { currentImposters } from "../Core/GameManager";
import PlayerWordPage from "./PlayerWordPage";
import { setCurrentPage } from "../App";
import { Transition } from "solid-transition-group";

export interface PlayerInfo {
    index: number,
    playerName: string,
    imposter: boolean
}
const [selectedPlayerInfo, setSelectedPlayerInfo] = createSignal<PlayerInfo>({
    index: 0,
    playerName: "Player",
    imposter: false,
});
const [viewedPlayers, setViewedPlayers] = createSignal<number[]>([]);
const [onWordScreen, setOnWordScreen] = createSignal(false);

export function exitPlayerWordScreen() {
    if (viewedPlayers().length >= playerNames().length) {
        setCurrentPage("roundPage");
    }
    setOnWordScreen(false);
}

export {viewedPlayers, setViewedPlayers}
export {selectedPlayerInfo}

function GamePage() {
    function playerButtonPressed(index: number) {
        const playerInfo: PlayerInfo = {
            index: index,
            playerName: playerNames()[index],
            imposter: currentImposters()?.indexOf(index) != -1,
        };
        setSelectedPlayerInfo(playerInfo);
        setOnWordScreen(true);
    }

    return (
        <main>
            <div class='playerNamesContainer'>
                <For each={playerNames()}>
                    {(item, index) =>
                        <button
                            class='playerNameButton'
                            onclick={() => {playerButtonPressed(index())}}
                            disabled={viewedPlayers().indexOf(index()) != -1}
                        >
                            <span>{item}</span>
                        </button>
                    }
                </For>
            </div>
            <div class="bottomBar">
                <button
                    class='startGameButton'
                    onclick={() => setCurrentPage("")}
                >
                    Return
                </button>
            </div>
            <Transition name="growTransition">
                <Show when={onWordScreen()}>
                    <PlayerWordPage/>
                </Show>
            </Transition>
        </main>
    )
}

export default GamePage;