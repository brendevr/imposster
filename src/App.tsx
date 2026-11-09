import { createSignal, Show } from 'solid-js';

import './App.css'
import NameEditPage from './Pages/NameEditPage';
import GamePage from './Pages/GamePage';
import StartPage from './Pages/StartPage';
import { Transition } from 'solid-transition-group';
import VotePage from './Pages/VotePage';
import ResultsPage from './Pages/ResultsPage';
import ImposterSettingsPage from './Pages/ImposterSettingsPage';

const [currentPage, setCurrentPage] = createSignal("");
export {currentPage, setCurrentPage};

function App() {
    return (
        <main class='App'>
            <h1>imp&#123oss&#125ter</h1>
            <div class='titleTopBar'></div>

            <div class="pageWrapper">
                <Transition name="slide-fade">
                    <Show when={currentPage()==""}>
                        <StartPage></StartPage>
                    </Show>
                    
                    <Show when={currentPage()=="gamePage"}>
                        <GamePage></GamePage>
                    </Show>

                    <Show when={currentPage()=="roundPage"}>
                        <VotePage></VotePage>
                    </Show>

                    <Show when={currentPage()=="resultsPage"}>
                        <ResultsPage></ResultsPage>
                    </Show>
                </Transition>
            </div>
        </main>
    );
}

export default App;
