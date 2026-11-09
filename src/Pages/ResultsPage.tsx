import { Index, Show } from 'solid-js';
import styles from './ResultsPage.module.css'
import { playerNames } from '../Core/Storage';
import { setCurrentPage } from '../App';
import { currentImposters, currentWord } from '../Core/GameManager';

export default function ResultsPage() {
    return (
        <main class={styles.page}>
            <h2>Results</h2>
            <div>
                <h3>Imposter(s):</h3>
                <Index each={currentImposters()}>
                    {(item) => (
                        <div class={styles.imposterBox}>{playerNames()[item()]}</div>
                    )}
                </Index>
                <Show when={currentImposters()?.length <= 0}>
                    <div class={styles.basicBox}>Nobody was imposter.</div>
                </Show>
            </div>
            <div>
                <h3>The Word was...</h3>
                <h3 style={"color:rgb(0,255,0); text-align:center; margin-top:15px; font-size:1.5rem"}>{currentWord().word}</h3>
            </div>
            <div class="bottomBar">
                <button
                    onclick={() => {setCurrentPage("")}}
                >
                    Home
                </button>
            </div>
        </main>
    );
}