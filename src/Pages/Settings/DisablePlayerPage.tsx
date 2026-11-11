import { createSignal, Show, Index } from 'solid-js';
import '/src/Styles/PlayerList.css';
import styles from './SettingsPageDefault.module.css';
import { Player, players, setPlayers } from '../../Core/GameManager';


export default function DisablePlayerPage() {
    function togglePlayerDisabled(index: number) {
        setPlayers(players().map((player, i): Player => (i==index ? {...player, disabled: !player.disabled} : player)));
    }
    
    return (
        <main class={`${styles.page} ${styles.centerFull}`}>
            <h2>Tap a player to toggle their disabled status:</h2>
            <div class='playerNamesContainer'>
                <Index each={players()}>
                    {(item, index) =>
                        <button
                            class={"playerNameButton " + (item().disabled ? "playerNameButtonDisabled" : "")}
                            onclick={() => {togglePlayerDisabled(index)}}
                            disabled={false}
                        >
                            <span>{item().name}</span>
                        </button>
                    }
                </Index>
            </div>
        </main>
    );
}