import { createSignal, Show, Index, onMount } from "solid-js";
import { players } from "../Core/GameManager";
import PlayerWordPage from "./PlayerWordPage";
import { setCurrentPage } from "../App";
import { Transition } from "solid-transition-group";

import '/src/Styles/Transitions.css';
import './GamePage.css'
import '/src/Styles/Transitions.css';
import '/src/Styles/PlayerList.css';

const [selectedPlayer, setSelectedPlayer] = createSignal(-1);
const [viewedPlayers, setViewedPlayers] = createSignal<number[]>([]);
const [onWordScreen, setOnWordScreen] = createSignal(false);

export function exitPlayerWordScreen() {
    console.log(viewedPlayers());
    if (viewedPlayers().length >= players().length) {
        setCurrentPage("roundPage");
    }
    setOnWordScreen(false);
}

export {viewedPlayers, setViewedPlayers}
export {selectedPlayer}

export default function GamePage() {
    onMount(function() {
        setViewedPlayers([]);
        for (let i=0; i<players().length; i++) {
            const disabled = players()[i].disabled;
            if (disabled) {
                setViewedPlayers([...viewedPlayers(), i])
            }
        }
    });

    function playerButtonPressed(index: number) {
        setSelectedPlayer(index);
        setOnWordScreen(true);
    }

    return (
        <main>
            <div class='playerNamesContainer'>
                <Index each={players()}>
                    {(item, index) =>
                        <button
                            class='playerNameButton'
                            onclick={() => {playerButtonPressed(index)}}
                            disabled={viewedPlayers().indexOf(index) != -1 || item().disabled}
                        >
                            <span>{item().name}</span>
                        </button>
                    }
                </Index>
            </div>
            <div class="bottomBar">
                <button
                    class='startGameButton'
                    onclick={() => setCurrentPage("")}
                >
                    Return
                </button>
            </div>
            <Transition name="grow">
                <Show when={onWordScreen()}>
                    <PlayerWordPage/>
                </Show>
            </Transition>
        </main>
    )
}