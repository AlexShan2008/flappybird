class Game {
  constructor(canvas) {
    // 获取绘图环境
    this.canvas = canvas;
    this.draw = this.canvas.getContext('2d');

    // 设置画布尺寸
    let w = document.documentElement.clientWidth > 420 ? 420 : document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight > 750 ? 750 : document.documentElement.clientHeight;
    this.canvas.width = w;
    this.canvas.height = h;

    this.timer = null; //定时器
    this.frame = 0;  //帧数
    this.pipeSpace = 200; //上下管子中间的间隙

    this.score = 0; //分数
    this.scene = 0 ; //场景序号

    // 奖牌记录
    if (!localStorage.getItem('FB')) {
      localStorage.setItem('FB', '[]');
    }

    this.init();

  };
  init() {
    this.imgLoad();
  }
    // 加载所需图片资源
    imgLoad() {

      // 把图片地址转换成真实图片；
      // 注意事项：1 用箭头函数 2 用let 声明 否则加载的是最后一张图片 3 所有图片加载完整
  
      this.allImg = {
        "bg_day": "images/bg_day.png",
        "land": "images/land.png",
        "pipe_down": "images/pipe_down.png",
        "pipe_up": "images/pipe_up.png",
        "bird0_0": "images/bird0_0.png",
        "bird0_1": "images/bird0_1.png",
        "bird0_2": "images/bird0_2.png",
        "title": "images/title.png",
        "button_play": "images/button_play.png",
        "tutorial": "images/tutorial.png",
        "shuzi0": "images/font_048.png",
        "shuzi1": "images/font_049.png",
        "shuzi2": "images/font_050.png",
        "shuzi3": "images/font_051.png",
        "shuzi4": "images/font_052.png",
        "shuzi5": "images/font_053.png",
        "shuzi6": "images/font_054.png",
        "shuzi7": "images/font_055.png",
        "shuzi8": "images/font_056.png",
        "shuzi9": "images/font_057.png",
        "baozha1": "images/1.png",
        "baozha2": "images/2.png",
        "baozha3": "images/3.png",
        "baozha4": "images/4.png",
        "baozha5": "images/5.png",
        "baozha6": "images/6.png",
        "baozha7": "images/7.png",
        "baozha8": "images/8.png",
        "baozha9": "images/9.png",
        "game_over": "images/text_game_over.png",
        "game_restart": "images/text_game_restart.png",
        "score_panel": "images/score_panel.png",
        "medals_0": "images/medals_0.png",
        "medals_1": "images/medals_1.png",
        "medals_2": "images/medals_2.png",
        "medals_3": "images/medals_3.png"
      };
  
      let index = 0; // 索引
      let total = Object.keys(this.allImg).length; //所有资源的数量
  
      for (let key in this.allImg) {
        let img = new Image();
        img.src = this.allImg[key];
        img.onload = () => {
          this.allImg[key] = img;
          index++;
  
          // 所有资源加载完成后触发动画启动函数
          if (index >= total) {
            this.start();
          }
        }
      }
  
    };

  // 清除画布
  clear() {
    // 每帧绘图，先清除画布
    this.draw.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  start() {
    this.SM = new SceneManager();
    this.SM.enter(this.scene);

    // 主动画定时器
    this.timer = setInterval(() => {
      this.frame++;
      this.clear();// 每一帧都要清除上一帧的内容；

      this.SM.updateAndRender();

    }, 16)
  };

}