    // 工具封装
    var clock = null;
    var state = 0;
    var speed = 4;
    // 根据id来获取元素
    function $(id) {
        return document.getElementById(id);
    }

    /*
     *    初始化 init
     */
    function init() {
        var con = $('con');
        while (con.hasChildNodes()) {
            con.removeChild(con.firstChild);
        }
        for (var i = 0; i < 4; i++) {
            createrow();
        }

        // 添加onclick事件
        $('main').onclick = function (ev) {
            ev = ev || event
            judge(ev);
        }

        // 定时器 每30毫秒调用一次move()
        clock = window.setInterval('move()', 30);
    }
    //创建div, 参数className是其类名
    function creatediv(className) {
        var div = document.createElement('div');
        div.className = className;
        return div;
    }


    // 创造一个<div class="row">并且有四个子节点<div class="cell">
    function createrow() {
        var con = $('con');
        var row = creatediv('row'); //创建div className=row
        var arr = creatcell(); //定义div cell的类名,其中一个为cell black

        con.appendChild(row); // 添加row为con的子节点

        for (var i = 0; i < 4; i++) {
            row.appendChild(creatediv(arr[i])); //添加row的子节点 cell
        }

        if (con.firstChild == null) {
            con.appendChild(row);
        } else {
            con.insertBefore(row, con.firstChild);
        }
    }


    //创建一个类名的数组，其中一个为cell black, 其余为cell
    function creatcell() {
        var temp = ['cell', 'cell', 'cell', 'cell', ];
        var i = Math.floor(Math.random() * 4); //随机生成黑块的位置
        temp[i] = 'cell black';
        return temp;
    }
    //使黑块向下移动    
    function move() {
        var con = $('con');
        var top = parseInt(window.getComputedStyle(con, null)['top']);

        if (speed + top > 0) {
            top = 0;
        } else {
            top += speed;
        }
        con.style.top = top + 'px';

        if (top == 0) {
            createrow();
            con.style.top = '-100px';
            delrow();
        } else if (top == (-100 + speed)) {
            var rows = con.childNodes;
            if ((rows.length == 5) && (rows[rows.length - 1].pass !== 1)) {
                fail();
            }
        }
    }

    function fail() {
        clearInterval(clock);
        confirm('你的最终得分为 ' + parseInt($('score').innerHTML));
    }

    //判断用户是否点击到了黑块，
    function judge(ev) {
        ev = ev || event
        if (ev.target.className.indexOf('black') != -1) {
            ev.target.className = 'cell';
            ev.target.parentNode.pass = 1; //定义属性pass，表明此行row的黑块已经被点击
            score();
        }
    }
    //让黑块动起来
    function move() {
        var con = $('con');
        var top = parseInt(window.getComputedStyle(con, null)['top']);

        if (speed + top > 0) {
            top = 0;
        } else {
            top += speed;
        }
        con.style.top = top + 'px'; //不断移动top值，使它动起来

        if (top == 0) {
            createrow();
            con.style.top = '-100px';
            delrow();
        } else if (top == (-100 + speed)) {
            var rows = con.childNodes;
            if ((rows.length == 5) && (rows[rows.length - 1].pass !== 1)) {
                fail();
            }
        }
    }

    // 加速函数
    function speedup() {
        speed += 2;
        if (speed == 20) {
            alert('你超神了');
        }
    }
    //删除div#con的子节点中最后那个<div class="row">    
    function delrow() {
        var con = $('con');
        if (con.childNodes.length == 6) {
            con.removeChild(con.lastChild);
        }
    }

    // 记分
    function score() {
        var newscore = parseInt($('score').innerHTML) + 1; //分数加一
        $('score').innerHTML = newscore; //修改分数
        if (newscore % 10 == 0) { //当分数是10 的倍数时使用加速函数，越来越快
            speedup();
        }
    }
    //点击开始游戏按钮 开始游戏
    function mouseover(obj){
        obj.style.backgroundColor = 'orange';
    }
    
    function mouseout(obj){
        obj.style.backgroundColor = 'yellowgreen';
    }
    init();