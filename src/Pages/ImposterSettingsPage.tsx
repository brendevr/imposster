import { Index } from "solid-js";
import { imposterChances, playerNames, setImposterChances } from "../Core/Storage";

import '../Styles/Slider.css'
import styles from './SettingsPageDefault.module.css'

export default function ImposterSettingsPage() {
    function setImposterChance(index: number, chance: number) {
        const chances: number[] = [...imposterChances()];
        chances[index] = chance;
        setImposterChances(chances);
    }

    return (
        <main class={styles.page}>
            <h2>Number of Imposters Chance:</h2>
            <Index each={imposterChances()}>
                {(item, index) => (
                    <div class={styles.sliderGrid}>
                        <h4 style="grid-area: b1">{index} Imposters</h4>
                        <h4 style="grid-area: b2; text-align: right;">{item()}%</h4>
                        <div class="range-field" style="grid-area: b3">
                            <input
                                type="range" class="range" id="range-input" min="0" max="100" step="1" value={item()}
                                oninput={(e) => {setImposterChance(index, Number(e.target.value))}}
                            ></input>
                        </div>
                    </div>
                )}
            </Index>
        </main>
    );
}