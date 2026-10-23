import {test} from 'node:test';
import assert from 'node:assert/strict';
import {levels} from '../src/levels.ts';
import {apply,grid,limits,solve,won} from '../src/engine.ts';
test('30 original grids: boundaries, no overlap, one target',()=>{assert.equal(levels.length,30);for(const cars of levels){assert.equal(cars.filter(c=>c.color==='red').length,1);const occupied=new Set<number>();for(const c of cars)for(let k=0;k<c.length;k++){const r=c.row+(c.horizontal?0:k),col=c.col+(c.horizontal?k:0);assert.ok(r>=0&&r<6&&col>=0&&col<6);const key=r*6+col;assert.ok(!occupied.has(key));occupied.add(key);}assert.equal([...grid(cars)].filter(c=>c>=0).length,occupied.size);}});
test('all 30 levels solvable and all solution moves legal',()=>{const counts:number[]=[];for(const [i,cars] of levels.entries()){const solution=solve(cars);assert.ok(solution,`Level ${i+1} not solved`);let current=cars;for(const m of solution!){const [a,b]=limits(current,m.id);assert.ok(m.delta>=a&&m.delta<=b);current=apply(current,m);}assert.ok(won(current));counts.push(solution!.length);}console.log('Optimal moves per level:',counts.join(', '));});
test('rejects blocked moves and can reverse a legal move',()=>{const cs=levels[0];assert.throws(()=>apply(cs,{id:3,delta:3}));const m={id:0,delta:1};const next=apply(cs,m);assert.deepEqual(apply(next,{id:0,delta:-1}),cs);assert.deepEqual(cs,levels[0]);});
