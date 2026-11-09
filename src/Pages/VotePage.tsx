import { setCurrentPage } from '../App';
import { playerNames } from '../Core/Storage';
import { startingPlayerIndex } from '../Core/GameManager';
import styles from './VotePage.module.css'

export default function VotePage() {
    return (
        <main class={styles.page}>
            <h2>Voting Time!</h2>
            <h3 class={styles.header}>How to Vote</h3>
            <div>
                <h3>Starting Player</h3>
                <h4><span style={"color:rgb(0, 255, 0)"}>{playerNames()[startingPlayerIndex()]}</span> starts the round</h4>
            </div>
            <div>
                <h3>Take Turns</h3>
                <h4>Go clockwise</h4>
            </div>
            <div>
                <h3>Discussion</h3>
                <h4>Each player says a word related to the secret word. You can go around as many times as you'd like.</h4>
            </div>
            <div>
                <h3>Voting Time</h3>
                <h4>Everyone votes for who they think the imposter is. Then tap to reveal the results.</h4>
            </div>
            <div class="bottomBar">
                <button
                    onclick={() => {setCurrentPage("resultsPage")}}
                >
                    Reveal Results
                </button>
            </div>
        </main>
    );
}