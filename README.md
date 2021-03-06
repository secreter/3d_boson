# css3 制作3D色子并动画讲解原理

标签（空格分隔）： css3 3D transform

---

### 先看一下效果图，[演示网页][1]
![此处输入图片的描述][2]


### 用到的知识
* 色子的布局——使用的flex布局，基本可以实现任何想要的效果，十分方便，但兼容性还不是很好，正式项目里需要用postcss处理之后使用。本例没有考虑各种兼容，请在chrome浏览器下查看。关于flex的高级使用，我下次再写，大家可以参考我[练习时的一个demo][3]，这次主要讲3D效果的实现。
* 色子的3D效果——关于3D呢，有webGL，threejs都是做web3D效果的，这个例子我用的是原生的css3里的transform3d属性，其实很简单。

### 主要属性介绍
一般来讲，绘制立体图形的div嵌套有三层

    <div class="camera">
        <div class="stage">
            <div class="box"></div>
        </div>
    </div>
想象一下，用一个照相机去拍摄贴在墙上的一个盒子。那么camera就是用来控制照相机的位置，以及变焦的。stage就是墙面，在上面你可以调节盒子的位置，旋转，平移等，那box呢，就是具体绘制这个盒子的一下css样式的载体div了。
来看一张图
![此处输入图片的描述][4]
这里呢，那个眼睛，就是我们的camera div，我们需要给它加上`perspective: 10000px;`，这里的10000px就是图中d的长度，相当于你的眼睛离stage 10000px；为什么设这么大呢，你可以到demo里操作一下，当你设为10px的时候，立方体会变得特别大，相当于物体跑到了你眼前，就像一叶蔽目一样。当然这里具体如何精确设置`perspective`值我也没找到好方法，哪位大神有好方法记得告诉我一下，谢谢了。
接下来我们再看一幅图
![此处输入图片的描述][5]
这幅图里眼睛的位置上移了，对，没错，`perspective-origin`属性就是设置这个位置的。默认是50%，50%，即在stage正前方，可以设置的值呢，和background是一样的。
大家可以在[demo][6]里玩一下。
然后就到了设置stage，我们需要给它加上一个`transform-style: preserve-3d;`属性，告诉浏览器，接下来的div以及子元素要展示一个3D空间啦~，默认值是flat，扁平的，也就没有z轴上的体验。
最后我们在box里面画我们想要的东西就行了。画完之后都是在一个平面的，我们可以通过transform变换来实现3D效果。
* 3D位移：CSS3中的3D位移主要包括translateZ()和translate3d()两个功能函数；
* 3D旋转：CSS3中的3D旋转主要包括rotateX()、rotateY()、rotateZ()和rotate3d()四个功能函数；
* 3D缩放：CSS3中的3D缩放主要包括scaleZ()和scale3d()两个功能函数；
* 3D矩阵：CSS3中3D变形中和2D变形一样也有一个3D矩阵功能函数matrix3d()。
具体使用可以[参考这里][7]
我[demo][8]里的色子，大的框架就是

    <div class="wrapper">  
      <div class="cube">  
          <div class="side  front"></div>
          <div class="side  back"></div>
          <div class="side  top"></div>  
          <div class="side  bottom"></div>  
          <div class="side  left"></div>  
          <div class="side  right"></div>  
      </div>  
  </div>
span里面是六个面，点击demo里的‘3D原理’，你将看到我将六个在cube平面上的面经过变换后变成了一个色子。至于side里面的一些div，就是用来制作色子样式的了，[参考这里][9]。[github][10]
大家可以下载源码看一下。

### 小插曲
我在ie edge里打开这个页面时，报了forEach函数不存在的错误（ie不支持这个函数），因为代码都写好了，不想改，就自己实现了Array.prototype.forEach=function(){};结果还是报错，查了好久才找到问题，因为我用了

* 还有个没有解决的问题就是，我想把色子做成圆角的，现在无法实现，你应该已经发行现在顶点的地方没合缝吧。如果你有什么好的解决方案，劳烦告知我。

    var sidesArr=document.querySelectorAll('.side')                     //得到的是NodeList
    
这里得到的是NodeList，不是Array，所以又添加了一个NodeList.prototype.forEach=function(){};就好了。


* [源码下载][11]
* [动画演示][12]
* flex布局[演示][13]，[下载][14]


  [1]: https://secreter.github.io/3d_boson/
  [2]: https://secreter.github.io/3d_boson/img/1.jpg
  [3]: http://item.redream.cn/css3/flex/
  [4]: http://cdn1.w3cplus.com/cdn/farfuture/tx5DNf1tnuPJGj_waZ6EYLTrY5iwX8K_t5tabMhlaaQ/mtime:1450620821/sites/default/files/blogs/2015/1512/20150619_1_05.jpg
  [5]: http://cdn1.w3cplus.com/cdn/farfuture/4BzVj3TxnjYFl5utge5PXvMZXIBSQLOUyHUTAsYYM7g/mtime:1450620821/sites/default/files/blogs/2015/1512/20150619_1_06.jpg
  [6]: https://secreter.github.io/3d_boson/
  [7]: http://www.w3cplus.com/css3/css3-3d-transform.html
  [8]: https://secreter.github.io/3d_boson/
  [9]: http://item.redream.cn/css3/flex/
  [10]: https://github.com/secreter/css3/tree/master/flex
  [11]: https://github.com/secreter/3d_boson
  [12]: https://secreter.github.io/3d_boson/
  [13]: http://item.redream.cn/css3/flex/
  [14]: https://github.com/secreter/css3/tree/master/flex