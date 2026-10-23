import { solve } from './engine';
self.onmessage = (e) => { self.postMessage(solve(e.data)); };
