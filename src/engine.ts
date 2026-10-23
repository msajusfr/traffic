export type Car = { id: number; length: number; color: string; horizontal: boolean; row: number; col: number };
export type Move = { id: number; delta: number };
export function grid(cars: Car[]) {
 const cells = new Int16Array(36).fill(-1);
 for (const c of cars) for(let k=0;k<c.length;k++) cells[(c.row+(c.horizontal?0:k))*6+c.col+(c.horizontal?k:0)]=c.id;
 return cells;
}
export function limits(cars: Car[], id: number): [number,number] {
 const c=cars.find(c=>c.id===id)!; const cells=grid(cars); let min=0,max=0;
 const pos=c.horizontal?c.col:c.row; const at=(p:number)=>c.horizontal?c.row*6+p:p*6+c.col;
 while(pos+min>0 && cells[at(pos+min-1)]===-1) min--;
 while(pos+max+c.length<6 && cells[at(pos+max+c.length)]===-1) max++;
 return [min,max];
}
export function apply(cars: Car[], move: Move): Car[] {
 const [min,max]=limits(cars,move.id);
 if(!Number.isInteger(move.delta)||move.delta<min||move.delta>max) throw new Error('Déplacement invalide');
 return cars.map(c=>c.id!==move.id?c:{...c,row:c.row+(c.horizontal?0:move.delta),col:c.col+(c.horizontal?move.delta:0)});
}
export function won(cars:Car[]) {return cars.some(c=>c.color==='red' && c.col+c.length===6);}
// Each slide, regardless of distance, counts as one move, as in the applet.
export function solve(start:Car[], budget=350000): Move[] | null {
 const key=(cs:Car[])=>cs.map(c=>String.fromCharCode(48+(c.horizontal?c.col:c.row))).join('');
 const queue:{cars:Car[];parent:number;move:Move|null}[]=[{cars:start,parent:-1,move:null}];
 const seen=new Set([key(start)]);
 for(let head=0;head<queue.length && head<budget;head++) {
  const node=queue[head];
  if(won(node.cars)){const path:Move[]=[];let n=head;while(queue[n].move){path.push(queue[n].move!);n=queue[n].parent;}return path.reverse();}
  const cells=grid(node.cars);
  for(const c of node.cars) for(const direction of [-1,1]) {
   for(let distance=1;distance<6;distance++) {
    const delta=direction*distance;const edge=(c.horizontal?c.col:c.row)+(direction<0?delta:c.length-1+delta);
    if(edge<0||edge>5)break;
    const cell=c.horizontal?c.row*6+edge:edge*6+c.col;
    if(cells[cell]!==-1)break;
    const next=node.cars.map(v=>v.id!==c.id?v:{...v,row:v.row+(v.horizontal?0:delta),col:v.col+(v.horizontal?delta:0)});
    const k=key(next);if(seen.has(k))continue;seen.add(k);queue.push({cars:next,parent:head,move:{id:c.id,delta}});
   }
  }
 }
 return null;
}
