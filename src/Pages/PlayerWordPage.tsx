import { onMount } from "solid-js";
import { exitPlayerWordScreen, selectedPlayer, setViewedPlayers, viewedPlayers } from "./GamePage";
import { currentWord, Player, players } from "../Core/GameManager";

import './PlayerWordPage.css'


export default function PlayerWordPage() {
    const player: Player = players()[selectedPlayer()];

    let roleHider!: HTMLButtonElement;
    let roleLabel!: HTMLSpanElement;
    let wordBox!: HTMLDivElement;

    // element, position, motion dir
    const glowDots: [HTMLDivElement, [number,number], [number, number]][] = []
    let roleRevealed: boolean = false

    async function revealRole() {
        setViewedPlayers([...viewedPlayers(), selectedPlayer()]);
        roleRevealed = true;
        glowDots.forEach(dotInfo => {
            let outwardsX = (dotInfo[1][0] - 50) / 50;
            let outwardsY = (dotInfo[1][1] - 50) / 50;
            outwardsX *= 1;
            outwardsY *= 1;
            outwardsX += 1 * Math.sign(outwardsX);
            outwardsY += 1 * Math.sign(outwardsY);
            dotInfo[2] = [outwardsX, outwardsY];
        });
        setTimeout(() => roleLabel.style.opacity = "1", 100);
        setTimeout(() => wordBox.style.opacity = "1", 400);
    }

    onMount(function() {
        roleHider.scrollIntoView();

        const dotPalette: string[] = [
            "253, 129, 253",
            "72, 182, 255",
            "172, 172, 172",
        ]
        const dotPositions: [number, number][] = [];
        
        function dotPercentToPx(percentX: number, percentY: number): [number, number] {
            const scale: number = 1 / (roleHider.getBoundingClientRect().width / roleHider.offsetWidth);
            const parentWidth = roleHider.getBoundingClientRect().width * scale;
            const parentHeight = roleHider.getBoundingClientRect().height * scale;
            return [
                parentWidth * (percentX / 100),
                parentHeight * (percentY / 100),
            ];
        }

        for (let i = 0; i < 65; i++) {
            const randX = Math.random() * 100;
            const randY = Math.random() * 100;
            
            dotPositions.push([randX, randY]);

            const dot = document.createElement("div");
            dot.style.transition = "none";
            roleHider.appendChild(dot);
            
            dot.className = "glowDot";
            const randColor = dotPalette[Math.floor(Math.random() * dotPalette.length)];
            dot.style.background = `
            radial-gradient(circle at center, rgb(${randColor}) 0, rgba(255, 255, 255, 0) 50%)
            `;

            let scale: number = Math.max(0.2, Math.random());
            dot.style.width = scale * 32 + "px";
            dot.style.height = dot.style.width;

            scale = Math.pow(scale, 1.5);
            const motionDir: [number, number] = [
                (Math.random() - 0.5) * scale,
                (Math.random() - 0.5) * scale,
            ];

            glowDots.push([dot, [randX, randY], motionDir]);
        }

        let dotUpdateRate: number = 33;

        function updateDots(initialize: boolean = false) {
            const scale: number = 1 / (roleHider.getBoundingClientRect().width / roleHider.offsetWidth);
            const isScaled: boolean = Math.abs(scale - 1.0) > 0.1;
            if (isScaled) { initialize = true; }

            const lowerLim: number = -15;
            const upperLim: number = 115;
            glowDots.forEach(dotInfo => {
                const dot = dotInfo[0];
                const currentPos: [number, number] = dotInfo[1];
                const motionDir: [number, number] = [...dotInfo[2]];
                if (initialize) {motionDir[0] = 0; motionDir[1] = 0;}
                let newX = currentPos[0] + (motionDir[0] * 20);
                let newY = currentPos[1] + (motionDir[1] * 20);

                let jumped: boolean = false || initialize
                if (newX > upperLim && !roleRevealed) {
                    newX = lowerLim;
                    jumped = true;
                }
                if (newY > upperLim && !roleRevealed) {
                    newY = lowerLim;
                    jumped = true;
                }
                if (newX < lowerLim && !roleRevealed) {
                    newX = upperLim;
                    jumped = true;
                }
                if (newY < lowerLim && !roleRevealed) {
                    newY = upperLim;
                    jumped = true;
                }
                
                const posPx: [number, number] = dotPercentToPx(newX, newY);

                dot.style.transform = `translate(${posPx[0]}px, ${posPx[1]}px)`;
                if (!jumped) {
                    dot.style.transition = "";
                } else {
                    dot.style.transition = "none";
                }
                
                dotInfo[1] = [newX, newY];
            });

            setTimeout(updateDots, isScaled ? 33 : 200);
        }

        updateDots(true);
        updateDots();
        setTimeout(updateDots, dotUpdateRate);
    })
    
    return (
        <div class="transWrapper">
        <main class="playerWordPage">
            <div class="playerName">
                <span>{player.name}</span>
            </div>
            <button onclick={revealRole} class="roleBox" ref={roleHider}>
                <span ref={roleLabel}>You are <span style={"color:" + (player.imposter ? "rgb(255,0,0)" : "")}>{player.imposter ? "Imposter." : "Crewmate."}</span></span>
            </button>
            <span class="tapInfo">Tap the box to reveal role</span>
            <div class="box wordBox" ref={wordBox}>
                <h4>The category is:</h4>
                <span class="categoryLabel roleLabel">{currentWord().category}</span>
                <h4>The {player.imposter ? "hint " : ""}word is:</h4>
                <span class="roleLabel" style={"color:" + (player.imposter ? "rgb(255,0,0)" : "")}>{!player.imposter ? currentWord().word : currentWord().hintWord}</span>
            </div>
            <div class="bottomBar">
                <button
                    onclick={exitPlayerWordScreen}
                >
                    Return
                </button>
            </div>
        </main>
        </div>
    )
}