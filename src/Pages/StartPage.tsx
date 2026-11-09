import { setCurrentPage } from "../App";
import { initGame } from "../Core/GameManager";
import { playerNames } from "../Core/Storage";

import editIcon from '../assets/edit.svg';
import styles from './StartPage.module.css';
import { createSignal, Match, Show, Switch } from "solid-js";
import ImposterSettingsPage from "./ImposterSettingsPage";
import NameEditPage from "./NameEditPage";
import { Transition } from "solid-transition-group";
import './GamePage.css';

const [settingsPage, setSettingsPage] = createSignal("");

export default function StartPage() {
    function startGame() {
        setCurrentPage("gamePage");
        initGame();
    }

    return (
        <main class={styles.page}>
            <Transition name="growTransition">
                <Show when={settingsPage() == ""}>
                    <div class={styles.wrapper}>
                        <button onclick={()=>setSettingsPage("name")}>
                            <span>Players: {playerNames().length} <img class='editButton' src={editIcon}/></span>
                        </button>
                        <button onclick={()=>setSettingsPage("imposter")}>
                            <span>Imposter Settings <img class='editButton' src={editIcon}/></span>
                        </button>
                        <button onclick={()=>setSettingsPage("crewmate")}>
                            <span>Crewmate Settings <img class='editButton' src={editIcon}/></span>
                        </button>
                        <button onclick={()=>setSettingsPage("general")}>
                            <span>General Settings <img class='editButton' src={editIcon}/></span>
                        </button>
                        <div class="bottomBar">
                            <button
                                onclick={startGame}
                            >
                                Start Game
                            </button>
                        </div>
                    </div>
                </Show>
                <Show when={settingsPage() != ""}>
                    <div class={styles.wrapper}>
                        <Switch>
                            <Match when={settingsPage() == "name"}>
                                <NameEditPage></NameEditPage>
                            </Match>
                            <Match when={settingsPage() == "imposter"}>
                                <ImposterSettingsPage></ImposterSettingsPage>
                            </Match>
                        </Switch>
                        <div class="bottomBar">
                            <button
                                onclick={() => {setSettingsPage("")}}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Show>
            </Transition>
        </main>
    );
}