import { playerNames, setPlayerNames } from '../Core/Storage';
import './NameEditPage.css'
import trashbinIcon from '../assets/trashbin.svg'
import { Index } from 'solid-js';
import { setCurrentPage } from '../App';

function NameEditPage() {
    function setPlayerName(index: number, name: string) {
        const currentPlayerNames = [...playerNames()];
        currentPlayerNames[index] = name;
        setPlayerNames(currentPlayerNames);
    }

    function addPlayer() {
        setPlayerNames([...playerNames(), "Player"])
    }

    function deletePlayer(index: number) {
        const currentPlayerNames = [...playerNames()];
        currentPlayerNames.splice(index, 1);
        setPlayerNames(currentPlayerNames);
    }

    return (
        <main class='nameEditCont'>
            <h2>Edit Players</h2>

            <div class='box nameEditList'>
                <Index each={playerNames()}>
                    {(item, index) =>
                        <div class='nameEditRow'>
                            <input 
                                type='text'
                                value={item()}
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

export default NameEditPage;
