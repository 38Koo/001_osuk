// ユーザーができること
class GameSystem {
  start() {
    //定数
    const TEXT_HEIGHT = 50;

    const ROCK_TEXT_SIDE_LENGTH = {
      width: 100,
      height: TEXT_HEIGHT,
    };

    const SCISSORS_TEXT_SIDE_LENGTH = {
      width: 130,
      height: TEXT_HEIGHT,
    };

    const PAPER_TEXT_SIDE_LENGTH = {
      width: 100,
      height: TEXT_HEIGHT,
    };

    const LOWER_HIGHT = 700;

    //ボタン押下でゲームスタート
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "orange";
    ctx.fillRect(10, 10, 1500, 1000);

    ctx.fillStyle = "black";
    ctx.font = "48px serif";

    const rock = new GameObject(
      350,
      LOWER_HIGHT,
      ROCK_TEXT_SIDE_LENGTH,
      "グー"
    );
    const scissors = new GameObject(
      650,
      LOWER_HIGHT,
      SCISSORS_TEXT_SIDE_LENGTH,
      "チョキ"
    );
    const paper = new GameObject(
      1050,
      LOWER_HIGHT,
      PAPER_TEXT_SIDE_LENGTH,
      "パー"
    );

    rock.draw(ctx);
    scissors.draw(ctx);
    paper.draw(ctx);

    this.choose(rock, scissors, paper);
  }

  choose(...obj) {
    //
    obj.map((obj) => {
      obj.collision();
    });
  }

  win() {
    // 1勝
  }

  victory() {
    //game clear
  }

  lose() {}

  gameOver() {}
}

class GameObject {
  constructor(xStart, yStart, sideLength, name) {
    (this.xStart = xStart),
      (this.yStart = yStart),
      (this.width = sideLength.width),
      (this.height = sideLength.height),
      (this.name = name);
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.font = "48px serif";
    ctx.fillText(this.name, this.xStart, this.yStart);
  }

  collision() {
    //当たり判定
    const canvas = document.getElementById("canvas");

    canvas.addEventListener("click", (e) => {
      console.log(e.clientX, e.clientY);

      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "red";
      ctx.fillRect(x, y, 10, 10);

      //x判定
      if (e.clientX < this.xStart || e.clientX > this.xStart + this.width) {
        return;
      }

      //y判定
      if (e.clientY > this.yStart || e.clientY < this.yStart - this.height) {
        return;
      }

      console.log("ok", this.name);
    });
  }
}

// カリー化？
// class GameObject {
//   constructor(xStart, yStart, width, height, drawFn) {
//     (this.xStart = xStart),
//       (this.yStart = yStart),
//       (this.width = width),
//       (this.height = height),
//       (this.drawFn = drawFn(this));
//   }

//   collision() {
//     //当たり判定
//   }
// }

new GameSystem().start();
