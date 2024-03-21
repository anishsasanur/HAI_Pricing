import { scales } from "chart.js";

let scale_factor = 25

function s1(p1, p2, a1a, a2a, b1a, b2a) {
    return Math.exp(a1a + b1a * p1) / (1 + Math.exp(a1a + b1a * p1) + Math.exp(a2a + b2a * p2));
}

function s2(p1, p2, a1a, a2a, b1a, b2a) {
    return Math.exp(a2a + b2a * p2) / (1 + Math.exp(a1a + b1a * p1) + Math.exp(a2a + b2a * p2));
}


function s1g(p1, p2, g) {
    p1 = p1/scale_factor
    p2 = p2/scale_factor
    const exp1A = Math.exp(1 - 0.35 * p1);
    const exp2A = Math.exp(-1 - 0.35 * p2);
    const exp1B = Math.exp(-0.5 - 0.2 * p1);
    const exp2B = Math.exp(0.5 - 0.2 * p2);
    return (g * exp1A / (1 + exp1A + exp2A)) + ((1 - g) * exp1B / (1 + exp1B + exp2B));
}

function s2g(p1, p2, g) {
    p1 = p1/scale_factor
    p2 = p2/scale_factor
    const exp1A = Math.exp(1 - 0.35 * p1);
    const exp2A = Math.exp(-1 - 0.35 * p2);
    const exp1B = Math.exp(-0.5 - 0.2 * p1);
    const exp2B = Math.exp(0.5 - 0.2 * p2);
    return (g * exp2A / (1 + exp1A + exp2A)) + ((1 - g) * exp2B / (1 + exp1B + exp2B));
}

function q1(p1, p2, g) {
    const M = 1000;
    return M * s1g(p1, p2, g);
}

function q2(p1, p2, g) {
    const M = 1000;
    return M * s2g(p1, p2, g);
}

function revenue(p1, p2, g) {
    return p1 * q1(p1, p2, g) + p2 * q2(p1, p2, g);
}

function probabilityA(dt) {
    return Math.exp(dt) / (1 + Math.exp(dt));
}

// Example usage (assuming dt is known):
let dt = null /* previous dt value */;
let tA = probabilityA(dt);
let p1 = null /* price of product 1 */;
let p2 = null /* price of product 2 */;
let rev = revenue(p1, p2, tA);

export {s1, s2, s1g, s2g, q1, q2, revenue, probabilityA}