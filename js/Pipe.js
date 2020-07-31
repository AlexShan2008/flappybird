class Pipe {
  // 注意事项：
  // 1 注意管子出现的概率是随机的
  constructor() {
    this.w = game.allImg['pipe_down'].width;
    this.h = game.allImg['pipe_down'].height;
    this.h1 = Math.round(Math.random() * 200 + 100) //上面管子的高度 100 - 300
    this.space = 140; //上下管子中间的间隙 TODO:关卡
    this.h2 = game.canvas.height - game.allImg['land'].height - this.h1 - this.space; //下方管子的高度
    this.x = game.canvas.width; //管子出现的位置；管子从右方进入
    this.speed = 1; //管子的移动速度1px/帧 

    this.scoreFlag = true; // 每个管子只能加1次分数；

    game.pipeArr.push(this);//保存实例化的管子

  }
  update() {
    // 销毁屏幕外的管子
    for (let i = 0; i < game.pipeArr.length; i++) {
      if (game.pipeArr[i].x <= -this.w) {
        game.pipeArr.splice(i, 1);
        i--;
      }
    }
    this.x -= this.speed;

    // 管子的四周坐标；
    this.x1 = this.x;
    this.x2 = this.x + this.w;
    this.y1 = this.h1;
    this.y2 = this.h1 + this.space;

    // 碰撞检测
    if (game.bird.x2 >= this.x1 && game.bird.x1 <= this.x2 &&
      (game.bird.y1 <= this.y1 || game.bird.y2 >= this.y2)) {
      game.SM.enter(3);

      document.getElementById('music_hit').play();
      document.getElementById('music_die').play();

    }

    // 通过加分
    if (game.bird.x1 > this.x2 && this.scoreFlag) {
      game.score++;
      this.scoreFlag = false;
      // 响音乐
      document.getElementById('music_point').play();
    }
  };

  render() {
    game.draw.drawImage(game.allImg["pipe_down"], 0, this.h - this.h1, this.w, this.h1, this.x, 0, this.w, this.h1) //截图图片，不改变图片的原始比例；
    game.draw.drawImage(game.allImg['pipe_up'], 0, 0, this.w, this.h2, this.x, this.h1 + this.space, this.w, this.h2);
  };
}