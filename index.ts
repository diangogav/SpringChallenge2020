import { LoadManager } from "./src/Load";
import { World } from "./src/World";
import { Target } from "./src/Target";
import { Pellet } from "./src/Pellet";
import { SearchingBigPellet } from "./src/State";
declare function readline(): string;

/**
 * Grab the pellets as fast as you can!
 **/

var inputs: string[] = readline().split(" ");
const width: number = parseInt(inputs[0]); // size of the grid
const height: number = parseInt(inputs[1]); // top left corner is (x=0, y=0)
for (let i = 0; i < height; i++) {
  const row: string = readline(); // one line of the grid: space " " is floor, pound "#" is wall
}

const loadManager = new LoadManager();
const world = new World();
let { players, enemies } = loadManager.initPacs();

// game loop
while (true) {
  var inputs: string[] = readline().split(" ");
  const myScore: number = parseInt(inputs[0]);
  const opponentScore: number = parseInt(inputs[1]);
  const visiblePacCount: number = parseInt(readline()); // all your pacs and enemy pacs in sight

  const { currentEnemies, currentPlayers } = loadManager.loadPlayers(visiblePacCount, players, enemies, world);

  const visiblePelletCount: number = parseInt(readline()); // all pellets in sight

  const pellets = loadManager.loadPellets(visiblePelletCount);

  world.clear();
  players = [...currentPlayers];
  enemies = [...currentEnemies];

  world.setPellets([...pellets]);
  world.setPlayers([...currentPlayers]);
  world.setEnemies([...currentEnemies]);

  world.getPlayers().forEach(player => {
    player.getState().start();
  });
  world.getPlayers().forEach(player => {
    player.getState().compute();
  });

  const actions = world
    .getPlayers()
    .map(player => player.getState().execute())
    .join("|");

  // Write an action using console.log()
  // To debug: console.error('Debug messages...');

  console.log(actions); // MOVE <pacId> <x> <y>
}