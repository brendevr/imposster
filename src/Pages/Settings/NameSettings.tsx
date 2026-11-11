import { Index } from 'solid-js';

import trashbinIcon from '/src/assets/trashbin.svg'

import './NameSettings.css'
import { Player, players, setPlayers } from '../../Core/GameManager';


export default function NameSettings() {
    function setPlayerName(index: number, name: string) {
        setPlayers(players().map((player, i): Player => (i==index ? {...player, name} : player)));
    }

    function addPlayer() {
        setPlayers([...players(), {name: "Player", imposter: false, disabled:false}]);
    }

    function deletePlayer(index: number) {
        const playersCopy = [...players()];
        playersCopy.splice(index, 1);
        setPlayers(playersCopy);
    }

    return (
        <main class='nameEditCont'>
            <h2>Edit Players</h2>

            <div class='box nameEditList'>
                <Index each={players()}>
                    {(item, index) =>
                        <div class='nameEditRow'>
                            <input 
                                type='text'
                                value={item().name}
                                onchange={(e) => setPlayerName(index, e.currentTarget.value)}
                            />
                            <button class='nameRemoveButton' onclick={(e) => deletePlayer(index)}><img src={trashbinIcon}/></button>
                        </div>
                    }
                </Index>
                
                <button class='nameAddButton' onclick={addPlayer}>Add Player +</button>
            </div>
        </main>
    );
}