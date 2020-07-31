# flappy bird

> canvas坐标系原点位置：屏幕左上角；
> X轴正方形为屏幕从左向右
> Y轴正方形为屏幕从上向下

## 1 draw image

### 1.1 图片整体绘制
```
let ctx = document.getElementById('canvas').getContext('2d');
let img = new Image();
  img.src = 'iamges/bird0_1.png';

  ctx.drawImage(img, x1, y1); //img 必须为真实图片，而不是图片地址；
```

### 1.2 图片截取绘制；动画时每次改变图片截取的位置（坐标点）
> ctx.drawImage(img, x1, y1, w1, h1, x2, y2, w2, h2);  
> x1, y1, w1, h1 截取图片  
> x2, y2, w2, h2 呈现图片  
```
let ctx = document.getElementById('canvas').getContext('2d');
let img = new Image();
  img.src = 'iamges/bird0_1.png';

  ctx.drawImage(img, x1, y1, w1, h1, x2, y2, w2, h2); 
```

## 2 场景切换
> 把每个场景写成一个类；单独引用

## 2.1 游戏开始画面 0

## 2.2 游戏指导画面 1

## 2.3 游戏进行中画面 2

## 2.4 游戏结束画面