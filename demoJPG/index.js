
var touchNum=0;

//映射
function convertToRange(value, srcRange, dstRange){
  // value is outside source range return
  if ( value > srcRange[1]){
    return 53; 
  }
  if (value < srcRange[0]){
    return 0; 
  }

  var srcMax = srcRange[1] - srcRange[0],
      dstMax = dstRange[1] - dstRange[0],
      adjValue = value - srcRange[0];

  return (adjValue * dstMax / srcMax) + dstRange[0];

}



$(document).ready(function () {
 var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: false, // 循环模式选项
    freeMode : true,
    freeModeMomentum : false,
    watchSlidesProgress : true,
      on:{
     progress: function(progress){
      //你的事件
      touchNum=Math.floor(convertToRange(progress,[0.25,1],[0,53]));
      console.log(touchNum);
    },
    },
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },

  })  

	//play
    var canvas = document.getElementById("canvas");
        //设置宽高不从css中设置
        canvas.width = 296.29;//设置canvas宽
        canvas.height = 524;//设置canvas高
        //获取上下文
        var ctx = canvas.getContext("2d");
        //加载图片
        var img = new Image();
        img.src = "001.jpg";
        var frameIndex = 0,dirIndex = 0;
        img.onload = function () {
            setInterval(function () {
                //清除 之前的 图片墨迹。
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(
                    img
                    , touchNum*296.29    //截取原始图片的 x坐标
                    , dirIndex*524    //截取原始图片的 y坐标
                    , 296.29    //截取原始图片的 宽度
                    , 524    // 截取的高度
                    , 0    //图片在canvas画布上的x坐标
                    , 0    //图片在canvas画布上的y坐标
                    , 296.29    //绘制图片的宽度
                    , 524 *1    //绘制图片的高度
                );
                frameIndex++;// 添加到下一帧
                frameIndex %=54;// 取余数   7 %4 = 3   3%4 =3  4%4 =0
            },50)
        }

})





