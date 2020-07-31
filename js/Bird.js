// 定义鸟的飞行状态
const BIRD_STATUS_DROP = 'BIRD_STATUS_DROP';
const BIRD_STATUS_UP = 'BIRD_STATUS_UP';

class Bird {
  // 注意事项：
  // 1. 小鸟只是原地上下移动；x坐标为0；y轴坐标变化；
  // 2. 无交互的时候，小鸟会下落，抛物线运动,加速下降
  // 3. 下落时不拍打翅膀
  // 4. 通过状态来表示上升还是下落;通过状态机进行监控
  // 5. 小鸟下落时旋转；
  // 6. 移动画布的中心至小鸟中心，让小鸟旋转
  // 7. 碰撞检测，小鸟的外包矩形 34*24

  constructor() {
    this.w = game.allImg['bird0_0'].width;
    this.x = (game.canvas.width - this.w) / 2;
    this.y = game.land.y * (1 - 0.618); //在大地高度的黄金分割线上
    this.wing = 0;
    this.wing_speed = 10;//翅膀扇动的间隔,没此1次/10帧

    this.status = BIRD_STATUS_DROP;// 鸟的状态; up or drop 默认是下降 
    this.speed = 5;
    this.changeY = 0;// 下降高度 
    this.changeY_g = 0.1; // 下降加速度；
    this.rotate = 0; //旋转角度
    this._rotate_a = 0.05; //旋转常量
  };

  update() {

    switch (this.status) {
      case BIRD_STATUS_DROP:
        this.drop();
        break;
      case BIRD_STATUS_UP:
        this.up();
        break;
      default:
        break;
    }

    // 边界值检测;
    // 小鸟落地进入下一个场景
    if (this.y >= game.canvas.height - game.allImg['land'].height) {
      this.y = game.canvas.height - game.allImg['land'].height;
      document.getElementById('music_die').play();
      game.SM.enter(3);
    }

    // 34*17 四个方向左右上下（x1,x2,y1,y2）坐标
    this.x1 = this.x - 17;
    this.x2 = this.x + 17;
    this.y1 = this.y - 12;
    this.y2 = this.y + 12;
  };

  render() {
    // 只对小鸟进行旋转，不影响其他元素
    game.draw.save();
    game.draw.translate(this.x, this.y);
    game.draw.rotate(this.rotate);
    game.draw.drawImage(game.allImg['bird0_' + this.wing], -24, -24); //移到小鸟中心
    game.draw.restore();

  };

  // 下降
  drop() {
    this.changeY += this.changeY_g;
    this.y += this.changeY;
    this.rotate += this._rotate_a;
  };

  // 上升
  up() {
    this.changeY -= this.changeY_g;
    this.changeY <= 0 ? this.status = BIRD_STATUS_DROP : null;
    this.y -= this.changeY;
    this.y <= 0 ? this.y = 24 : null; //不要超出屏幕上方

    // 根据帧数来拍打翅膀
    if (game.frame % this.wing_speed === 0) {
      this.wing >= 2 ? this.wing = 0 : this.wing++;
      document.getElementById('music_wing').play();
    }

  };

  // 飞行
  fly() {
    this.status = BIRD_STATUS_UP;
    this.changeY = 3; //上升速度 TODO:关卡
    this.rotate = -1.2; //旋转角度
    document.getElementById("music_wing").play();
  };
}