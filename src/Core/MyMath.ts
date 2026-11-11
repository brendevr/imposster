export function weightedRandom(items: number[], weights: number[]): number {
    for (let i=1;i<items.length;i++) {;
        weights[i] += weights[i-1];
    }

    const rand = Math.random() * weights[weights.length - 1];
    
    let i: number;
    for (i=0;i<items.length;i++) {
        if (rand < weights[i]) {
            break;
        }
    }
    return i;
}

export function distSquared(x1: number, y1: number, x2: number, y2: number): number {
    return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
}