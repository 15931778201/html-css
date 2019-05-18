var postFile = {
    init: function () { //初始化
        var t = this;
        t.regional = document.getElementById("label");
        t.getImage = document.getElementById('get_image');
        t.editPic = document.getElementById('edit_pic');
        t.editBox = document.getElementById('cover_box');
        t.px = 0; //background image x
        t.py = 0; //background image y
        t.sx = 15; //crop area x
        t.sy = 15; //crop area y
        t.sHeight = 150; //crop area height
        t.sWidth = 150 //crop area width
        document.getElementById('post_file').addEventListener("change", t.handleFiles, false);
        //保存截图
        // 首先监听 save 按钮的点击事件，然后我们将选中区域的图片利用drawImage方法绘制出来，最后利用toDataURL方法转换成 base64 编码格式，并将该值赋予show_pic下img的src属性，这样就完成了图片的裁剪保存。
        document.getElementById('save_button').onclick = function () {
            t.editPic.height = t.sHeight;
            t.editPic.width = t.sWidth;
            var ctx = t.editPic.getContext('2d');
            var images = new Image();
            images.src = t.imgUrl;

            images.onload = function () {
                ctx.drawImage(images, t.sx, t.sy, t.sHeight, t.sWidth, 0, 0, t.sHeight, t.sWidth);
                document.getElementById('show_pic').getElementsByTagName('img')[0].src = t.editPic.toDataURL();

            }
        };

    },

    //通过监听id为post_file的input表单的change事件来处理用户上传的文件
    handleFiles: function () {
        var fileList = this.files[0];
        var oFReader = new FileReader(); //通过new FileReader()来实例化一个 FileReader 对象oFReader
        oFReader.readAsDataURL(fileList); //调用其readAsDataURL()方法将文件的内容读取出来并处理成 base64 编码的格式。
        oFReader.onload = function (oFREvent) {
            postFile.paintImage(oFREvent.target.result);
            //最后，当文件读取完毕并完成加载的时候，我们通过 postFile.paintImage(oFREvent.target.result)处理我们读取到的图片，说白了就是将读取到的图片数据重新绘画到浏览器上。
        };
    },

    //使用canvas画出图片
    paintImage: function (url) {
        var t = this;
        var createCanvas = t.getImage.getContext("2d");
        var img = new Image();
        img.src = url;
        img.onload = function () {

            if (img.width < t.regional.offsetWidth && img.height < t.regional.offsetHeight) {
                t.imgWidth = img.width;
                t.imgHeight = img.height;

            } else {
                var pWidth = img.width / (img.height / t.regional.offsetHeight);
                var pHeight = img.height / (img.width / t.regional.offsetWidth);
                t.imgWidth = img.width > img.height ? t.regional.offsetWidth : pWidth;
                t.imgHeight = img.height > img.width ? t.regional.offsetHeight : pHeight;
            }
            //确保canvas居中于div#label中，需要计算其left、top偏移
            t.px = (t.regional.offsetWidth - t.imgWidth) / 2 + 'px';
            t.py = (t.regional.offsetHeight - t.imgHeight) / 2 + 'px';
            //确保canvas居中于div#label中，需要计算其left、top偏移
            t.getImage.height = t.imgHeight;
            t.getImage.width = t.imgWidth;
            t.getImage.style.left = t.px;
            t.getImage.style.top = t.py;

            createCanvas.drawImage(img, 0, 0, t.imgWidth, t.imgHeight);
            t.imgUrl = t.getImage.toDataURL();
            t.cutImage();
            t.drag();
        };
    },
    // 如果用img直接插入页面，就无法自适应居中了，如果使用canvas绘制图片，不但能使图片自适应居中以及能等比例缩放，并且方便把图片的坐标，尺寸大小传给后来的遮罩层(id为label的 div)，这样能根据图片的坐标以及图片的尺寸大小来绘制遮罩层。
    cutImage: function () {
        var t = this;

        t.editBox.height = t.imgHeight;
        t.editBox.width = t.imgWidth;
        t.editBox.style.display = 'block';
        t.editBox.style.left = t.px;
        t.editBox.style.top = t.py;

        var cover = t.editBox.getContext("2d");
        cover.fillStyle = "rgba(0, 0, 0, 0.5)";
        cover.fillRect(0, 0, t.imgWidth, t.imgHeight);
        cover.clearRect(t.sx, t.sy, t.sHeight, t.sWidth);


        document.getElementById('show_edit').style.background = 'url(' + t.imgUrl + ')' + -t.sx + 'px ' + -t.sy + 'px no-repeat';
        document.getElementById('show_edit').style.height = t.sHeight + 'px';
        document.getElementById('show_edit').style.width = t.sWidth + 'px';
    },

    drag: function () {
        var t = this;
        var draging = false;
        var startX = 0;
        var startY = 0;

        document.getElementById('cover_box').onmousemove = function (e) {

            // 获取鼠标距离背景图片的距离，e.pageX 代表鼠标到浏览器左边缘的距离，t.regional.offsetLeft + this.offsetLeft 可以计算出图片到浏览器的左边边缘的距离。?
            var pageX = e.pageX - (t.regional.offsetLeft + this.offsetLeft);
            var pageY = e.pageY - (t.regional.offsetTop + this.offsetTop);
            // 在理解了鼠标距离背景图片的距离之后，这个应该很容易理解：就是判断鼠标是否在图片的区域内部。
            if (pageX > t.sx && pageX < t.sx + t.sWidth && pageY > t.sy && pageY < t.sy + t.sHeight) {
                this.style.cursor = 'move';

                this.onmousedown = function () {
                    draging = true;

                    t.ex = t.sx;
                    t.ey = t.sy;


                    startX = e.pageX - (t.regional.offsetLeft + this.offsetLeft);
                    startY = e.pageY - (t.regional.offsetTop + this.offsetTop);

                }
                window.onmouseup = function () {
                    draging = false;
                }
                // 上面这一行代码就是说：如果是在拖动的情况下，我们需要根据坐标的变化来实时更新t.sx和t.sy的值,并且实时调用cutImage方法实现预览。
                if (draging) {

                    // 移动时裁剪区域的坐标 = 上次记录的定位 + (当前鼠标的位置 - 按下鼠标的位置)
                    if (t.ex + (pageX - startX) < 0) {
                        t.sx = 0;
                    } else if (t.ex + (pageX - startX) + t.sWidth > t.imgWidth) {
                        t.sx = t.imgWidth - t.sWidth;
                    } else {
                        t.sx = t.ex + (pageX - startX);
                    };

                    if (t.ey + (pageY - startY) < 0) {
                        t.sy = 0;
                    } else if (t.ey + (pageY - startY) + t.sHeight > t.imgHeight) {
                        t.sy = t.imgHeight - t.sHeight;
                    } else {
                        t.sy = t.ey + (pageY - startY);
                    }

                    t.cutImage();
                }
            } else {
                this.style.cursor = 'auto';
            }
        };
    },
}

postFile.init();