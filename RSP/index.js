class GameSystem {
  start() {}

  choose() {}

  draw() {}

  win() {
    // 1勝
  }

  victory() {
    //game clear
  }

  lose() {}

  gameOver() {}
}

const RSP = {
  1: "rock",
  2: "scissors",
  3: "paper",
};

class World {
  gameObjectList = [];

  constructor() {
    const canvas = document.getElementById("canvas");
    this.canvas = canvas;
    this.width = 1920;
    this.height = 900;
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  }

  //画面に描画されるのは全てgameObjectとみなす
  //当たり判定がないもの（普通のテキストなど）は判定ロジックをoffにする
  //JSのイベントループみたいに毎フレーム当たり判定を動かす
  //リスト内をループする
  addGameObjects(gameObjects) {
    this.gameObjectList = this.gameObjectList.concat(gameObjects);
  }

  update() {
    //gameObjectListをループして当たり判定や、update処理を実施する
  }

  consumeRender() {
    //レンダリング
    //大枠描画
    this.context.fillStyle = "purple";
    this.context.fillRect(0, 0, this.width, this.height);
  }

  main() {
    const start = performance.now();
    this.update();
    const end = performance.now();
    const timeStr = (end - start).toPrecision(3);
    console.log(timeStr);

    //canvasの特性で
    this.context.clearRect(0, 0, this.width, this.height);

    this.consumeRender();
  }

  start(rock, scissors, paper) {
    const checkCollision = (e) => {
      // console.log(rock, scissors, paper);
      // グーチョキーパー判定
      if (rock.isCollision(e)) {
        this.canvas.removeEventListener("click", checkCollision);
        this.battle(1);
        return;
      }

      if (scissors.isCollision(e)) {
        this.canvas.removeEventListener("click", checkCollision);
        this.battle(2);
        return;
      }

      if (paper.isCollision(e)) {
        this.canvas.removeEventListener("click", checkCollision);
        this.battle(3);
        return;
      }
    };

    this.canvas.addEventListener("click", checkCollision);
  }

  battle(myChoise) {
    const opponentChoise = Math.floor(Math.random() * 3) + 1;
    console.log(
      `myChoise: ${RSP[myChoise]}, opponentChoise: ${RSP[opponentChoise]}}`
    );

    // 引き分け
    if (myChoise === opponentChoise) {
      console.log("draw");
      console.log("try again");
      this.start(
        this.gameObjectList[0],
        this.gameObjectList[1],
        this.gameObjectList[2]
      );
      return;
    }

    if (myChoise === 3) {
      if (opponentChoise === 1) {
        console.log("you win");
      } else {
        console.log("you lose");
      }
    } else {
      if (opponentChoise - myChoise === 1) {
        console.log("you win");
      } else {
        console.log("you lose");
      }
    }
    this.start(
      this.gameObjectList[0],
      this.gameObjectList[1],
      this.gameObjectList[2]
    );
    return;
  }
}

class Dimention {
  constructor(x, y) {
    this.width = x;
    this.height = y;
  }
}

class Colider {
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }

  get width() {
    return {
      start: this.position.x,
      end: this.position.x + this.size.x,
    };
  }

  get height() {
    return {
      start: this.position.y,
      end: this.position.y + this.size.y,
    };
  }

  // isCollision(targetColider) {
  //   return (
  //     this.width.start <= targetColider.width.start ||
  //     this.width.end >= targetColider.width.end ||
  //     this.height.start <= targetColider.height.start ||
  //     this.height.end >= targetColider.height.end
  //   );
  // }
}

class GameObject {
  constructor(img, ctx, position, size) {
    this.ctx = ctx;
    img.onload = () =>
      ctx.drawImage(
        img,
        position.xStart,
        position.yStart,
        size.width,
        size.height
      );
    this.position = position;
    this.size = size;
  }

  update() {
    this.colider = new Colider(position, size);
  }

  onCollision(gameObject) {
    throw new Error("Please implement collision handler!");
  }

  isCollision(clicked) {
    // console.log(this.position.xStart, clicked.x);
    // console.log(this.position.xStart + this.size.width, clicked.x);
    // console.log(this.position.yStart, clicked.y);
    // console.log(this.position.yStart + this.size.height);
    return (
      this.position.xStart <= clicked.x &&
      this.position.xStart + this.size.width >= clicked.x &&
      this.position.yStart <= clicked.y &&
      this.position.yStart + this.size.height >= clicked.y
    );
  }
}

const world = new World();
world.main();

const makeRSP = () => {
  const imageMyRock = new Image();
  const imageMyScissors = new Image();
  const imageMyPaper = new Image();
  const imageOpponentRock = new Image();
  const imageOpponentScissors = new Image();
  const imageOpponentPaper = new Image();
  imageMyRock.src = "../public/rock.png";
  imageMyScissors.src = "../public/scissors.png";
  imageMyPaper.src = "../public/paper.png";
  imageOpponentRock.src = "../public/rock.png";
  imageOpponentScissors.src = "../public/scissors.png";
  imageOpponentPaper.src = "../public/paper.png";

  return [
    new GameObject(
      imageMyRock,
      world.context,
      { xStart: 400, yStart: 700 },
      { width: 100, height: 100 }
    ),
    new GameObject(
      imageMyScissors,
      world.context,
      { xStart: 800, yStart: 700 },
      { width: 100, height: 100 }
    ),
    new GameObject(
      imageMyPaper,
      world.context,
      { xStart: 1200, yStart: 700 },
      { width: 100, height: 100 }
    ),
    new GameObject(
      imageOpponentRock,
      world.context,
      { xStart: 400, yStart: 100 },
      { width: 100, height: 100 }
    ),
    new GameObject(
      imageOpponentScissors,
      world.context,
      { xStart: 800, yStart: 100 },
      { width: 100, height: 100 }
    ),
    new GameObject(
      imageOpponentPaper,
      world.context,
      { xStart: 1200, yStart: 100 },
      { width: 100, height: 100 }
    ),
  ];
};

world.addGameObjects(makeRSP());

//当たり判定
world.start(
  world.gameObjectList[0],
  world.gameObjectList[1],
  world.gameObjectList[2]
);

// 残りやること
// 画像の反転処理
// クリック判定
// 勝敗判定
// 勝敗演出
// 連続してゲームを遊べる仕組み
