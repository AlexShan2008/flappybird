// 场景管理
class SceneManager {
  constructor() {
    this.bindEvent();
  };

  enter(sceneNumber) {
    switch (sceneNumber) {
      case 0:
        // 开始场景
        game.scence = 0;
        game.bg = new Background();
        game.land = new Land();

        this.titleW = game.allImg['title'].width;
        this.titleX = (game.canvas.width - this.titleW) / 2;
        this.titleY = -50;

        this.btnX = (game.canvas.width - game.allImg['button_play'].width) / 2;
        this.btnY = -50;

        this.birdW = game.allImg['bird0_0'].width;
        this.birdX = (game.canvas.width - this.birdW) / 2;
        this.birdY = 250;
        this.birdChangeY = 1;

        this.goHome = document.getElementsByClassName('js-go-home')[0];
        this.goHome.className = 'js-go-home go-home';

        break;
      case 1:
        game.scence = 1;
        game.bg = new Background();
        game.land = new Land();
        game.bird = new Bird();

        // 加载教程图片
        this.tutorialW = game.allImg['tutorial'].width;
        this.tutorialX = (game.canvas.width - this.tutorialW) / 2;
        this.tutorialY = 250;

        this.alpha = 1;
        this.alphaChange = 0.01;

        break;
      case 2:
        // 游戏场景
        game.scence = 2;
        game.bg = new Background();
        game.land = new Land();
        game.bird = new Bird();
        game.pipeArr = [];
        break;
      case 3:
        game.scence = 3;
        this.isBoom = false;
        this.index = 0;
        break;
      case 4:
        game.scence = 4;
        let arr = JSON.parse(localStorage.getItem('FB'));

        // 颁发奖牌
        if (arr.length) {
          for (let i = 0; i < arr.length; i++) {
            if (game.score >= arr[0]) {
              arr[0] = game.score;
              this.model = 'medals_1';
            } else if (game.score >= arr[1]) {
              arr[1] = game.score;
              this.model = 'medals_2';
            } else if (game.score >= arr[2]) {
              arr[2] = game.score;
              this.model = 'medals_3';
            } else {
              this.model = 'medals_0';
            }
          }
        } else {
          this.model = 'medals_0';
          arr[0] = game.score;
        }

        // 最佳成绩
        this.best = arr[0];
        localStorage.setItem('FB', JSON.stringify(arr));
        this.overX = (game.canvas.width - game.allImg['game_over'].width) / 2;
        this.overY = -100;

        // 奖牌
        this.panelX = (game.canvas.width - game.allImg['score_panel'].width) / 2;
        this.panelY = game.canvas.height;

        // 重新开始
        this.restartX = (game.canvas.width - game.allImg['game_restart'].width) / 2;
        this.restartY = game.canvas.height + 150;

        // 回到主页
        this.goHome.className = 'js-go-home go-home show';

        break;
      default:
        break;
    }

  };

  updateAndRender() {
    switch (game.scence) {
      case 0:
        game.bg.render();
        game.land.render();
        game.score = 0;

        // 加入标题
        game.draw.drawImage(game.allImg['title'], this.titleX, this.titleY);
        game.draw.drawImage(game.allImg['bird0_0'], this.birdX, this.birdY);
        game.draw.drawImage(game.allImg['button_play'], this.btnX, this.btnY);

        this.titleY >= 150 ? this.titleY = 150 : this.titleY += 5;//从上方进入
        this.btnY <= 370 ? this.btnY = 370 : this.btnY -= 5;//从下方进入

        if (this.birdY > 300 || this.birdY < 220) {
          this.birdChangeY *= -1;
        }

        this.birdY += this.birdChangeY;

        break;
      case 1:
        game.bg.render();
        game.land.render();

        game.draw.drawImage(game.allImg['bird0_0'], game.canvas.width / 2 - 24, 160);

        if (this.alpha >= 1 || this.alpha <= 0) this.alphaChange *= -1;

        this.alpha += this.alphaChange;

        // 单独保存闪烁场景
        game.draw.save();
        game.draw.globalAlpha = this.alpha;
        game.draw.drawImage(game.allImg['tutorial'], this.tutorialX, this.tutorialY);
        game.draw.restore();

        break;
      case 2:
        game.bg.update();
        game.bg.render();
        game.land.update();
        game.land.render();

        game.pipeArr.forEach(item => {
          item.update();
          item.render();
        });

        game.bird.update();
        game.bird.render();

        if (game.frame % 150 === 0) {
          new Pipe()
        }

        this.renderScore();

        break;
      case 3:
        game.bg.render();
        game.land.render();
        game.pipeArr.forEach(item => item.render());

        if (this.isBoom) {

          // if (game.frame % 3 === 0) {
          this.index++;
          // }

          if (this.index > 9) {
            this.enter(4);
            return;
          }
          game.draw.drawImage(game.allImg['baozha' + this.index], game.bird.x, game.bird.y - 100, 100, 100);
        } else {
          game.bird.y += 5;
          if (game.bird.y >= game.canvas.height - game.allImg['land'].height) {
            this.isBoom = true;
            document.getElementById("music_die").play();
            document.getElementById("music_hit").play();
          }
          game.bird.render();
        }

        break;
      case 4:
        game.bg.render();
        game.land.render();

        this.overY >= 160 ? this.overY = 160 : this.overY += 5;
        this.panelY <= 250 ? this.panelY = 250 : this.panelY -= 10;
        this.restartY <= game.canvas.height * 0.6 ? this.restartY = game.canvas.height * 0.6 : this.restartY -= 5;
        game.draw.drawImage(game.allImg['game_over'], this.overX, this.overY);
        game.draw.drawImage(game.allImg['score_panel'], this.panelX, this.panelY);
        game.draw.drawImage(game.allImg['game_restart'], this.restartX, this.restartY);

        game.draw.drawImage(game.allImg[this.model], game.canvas.width / 2 - 88, this.panelY + 44);
        //添加文字；
        game.draw.fillStyle = '#666';
        game.draw.font = '20px consolas';
        game.draw.textAlign = 'right';
        game.draw.fillText(game.score, (game.canvas.width / 2) + 90, this.panelY + 50);
        game.draw.fillText(game.score, (game.canvas.width / 2) + 90, this.panelY + 96);

        break;
      default:
        break;
    }
  };

  bindEvent() {

    let handleClick = (e) => {
      let offsetLeft = 0;
      if (isPhone()) {
        try {
          let touch = e.touches[0];
          e.clientX = touch.pageX;
          e.clientY = touch.pageY;
        } catch (e) { }
      } else {
        offsetLeft = canvas.offsetLeft
      }

      switch (game.scence) {
        case 0:
          // 点击按钮时进入
          if (e.clientX >= this.btnX + offsetLeft && e.clientX <= this.btnX + offsetLeft + 116 &&
            e.clientY >= this.btnY && e.clientY <= this.btnY + 70) {
            this.enter(1);
          }

          break;
        case 1:
          this.enter(2);
          break;
        case 2:
          game.bird.fly();
          break;
        case 3:
          break;
        case 4:
          // 点击按钮时进入
          if (e.clientX >= this.restartX + offsetLeft && e.clientX <= this.restartX + offsetLeft + 204 &&
            e.clientY >= this.restartY && e.clientY <= this.restartY + 54) {
            this.enter(0);
          }
          break;
        default:
          break;
      }
    };

    if (isPhone()) {
      game.canvas.ontouchstart = handleClick;
    } else {
      game.canvas.onclick = handleClick;
    }

  };

  renderScore() {
    let str = game.score.toString();
    let baseline = (game.canvas.width - str.length * 30) / 2;

    for (let i = 0; i < str.length; i++) {
      game.draw.drawImage(game.allImg['shuzi' + str[i]], baseline + i * 30, 100);
    }
  }
}

// 判断是手机(包括iPad、iPod)还是PC；
function isPhone() {
  var userAgent = navigator.userAgent.toLowerCase();
  return userAgent.match(/(iPhone|iPod|ipad|Android|ios|mobile|ucweb)/i)
}
