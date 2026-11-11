import { setCurrentPage } from "../App";
import { initGame, players } from "../Core/GameManager";
import { createSignal, Match, Show, Switch } from "solid-js";
import ImposterSettingsPage from "./Settings/ImposterSettingsPage";
import NameSettings from "./Settings/NameSettings";
import { Transition } from "solid-transition-group";

import editIcon from '../assets/edit.svg';

import styles from './StartPage.module.css';
import './GamePage.css';
import '/src/Styles/Transitions.css';


const [settingsPage, setSettingsPage] = createSignal("");

export default function StartPage() {
    function startGame() {
        setCurrentPage("gamePage");
        initGame();
    }

    return (
        <main class={styles.page}>
            <Transition name="grow">
                <Show when={settingsPage() == ""}>
                    <div class={styles.wrapper}>
                        <button onclick={()=>setSettingsPage("name")}>
                            <span>Players: {players().length} <img class='editButton' src={editIcon}/></span>
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
                                <NameSettings></NameSettings>
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