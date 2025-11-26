!function(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["iPad", "iPhone", "Android", "SymbianOS", "Windows Phone", "iPod", "webOS", "BlackBerry", "IEMobile"];
    for(var v = 0; v < Agents.length; v++) {
        if(userAgentInfo.indexOf(Agents[v]) > 0) return;
    }

    function o(w, v, i){ return w.getAttribute(v) || i }
    function j(i){ return document.getElementsByTagName(i) }
    function l(){
        var i = j("script"), w = i.length, v = i[w - 1];
        return {
            l: w,
            z: o(v, "zIndex", -1),
            o: o(v, "opacity", 0.7), // 提高整体透明度
            c: o(v, "color", "184,225,245"), // 使用更准确的御坂美琴电击蓝
            n: o(v, "count", 30) // 减少粒子数量，避免过于密集
        }
    }

    function k(){
        r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    // --- ⚡ 增强的电弧效果 ---
    function jitter(x, intensity){
        return x + (Math.random() - 0.5) * (intensity || 4);
    }
    
    // 创建多段电弧
    function drawElectricArc(x1, y1, x2, y2, intensity, opacity){
        e.beginPath();
        e.moveTo(x1, y1);
        
        // 计算电弧分段
        var segments = 3 + Math.floor(intensity * 2);
        var dx = (x2 - x1) / segments;
        var dy = (y2 - y1) / segments;
        
        // 绘制带抖动的多段电弧
        for(var s = 1; s <= segments; s++){
            var segX = x1 + dx * s;
            var segY = y1 + dy * s;
            
            if(s < segments){
                segX = jitter(segX, intensity * 8);
                segY = jitter(segY, intensity * 8);
            }
            
            e.lineTo(segX, segY);
        }
        
        e.stroke();
    }

    function b(){
        e.clearRect(0,0,r,n);

        // 更深的背景，提高对比度
        e.fillStyle = "rgba(8, 12, 24, 0.3)";
        e.fillRect(0,0,r,n);

        var w = [f].concat(t);
        var x, v, A, B, z, y;

        t.forEach(function(i){
            i.x += i.xa;
            i.y += i.ya;

            // 更自然的边界反弹
            if(i.x > r || i.x < 0) i.xa *= -0.97;
            if(i.y > n || i.y < 0) i.ya *= -0.97;

            // --- 增强的粒子发光效果 ---
            // 内层核心光
            var innerGlow = e.createRadialGradient(i.x, i.y, 0, i.x, i.y, i.size * 1.5);
            innerGlow.addColorStop(0, "rgba(255, 255, 255, " + (i.opacity * 0.8) + ")");
            innerGlow.addColorStop(1, "rgba(184, 225, 245, 0)");
            
            e.fillStyle = innerGlow;
            e.beginPath();
            e.arc(i.x, i.y, i.size * 1.5, 0, Math.PI*2);
            e.fill();
            
            // 外层光晕
            var outerGlow = e.createRadialGradient(i.x, i.y, 0, i.x, i.y, i.size * 4);
            outerGlow.addColorStop(0, "rgba(184, 225, 245, " + (i.opacity * 0.6) + ")");
            outerGlow.addColorStop(0.7, "rgba(120, 180, 255, " + (i.opacity * 0.3) + ")");
            outerGlow.addColorStop(1, "rgba(80, 140, 255, 0)");
            
            e.fillStyle = outerGlow;
            e.beginPath();
            e.arc(i.x, i.y, i.size * 4, 0, Math.PI*2);
            e.fill();

            // --- 优化的电弧连线 ---
            for(v = 0; v < w.length; v++){
                x = w[v];
                if(i !== x && x.x && x.y){
                    B = i.x - x.x, z = i.y - x.y;
                    y = B*B + z*z;

                    // 根据距离决定是否绘制电弧
                    if(y < 10000){
                        A = (10000 - y) / 10000;
                        
                        // 随机电弧爆发
                        if(Math.random() < 0.03){ // 降低频率，提高质量
                            e.lineWidth = 2.5;
                            e.strokeStyle = "rgba(255, 255, 255, " + (A * 0.8) + ")";
                            drawElectricArc(i.x, i.y, x.x, x.y, A, A * 0.8);
                        } 
                        // 常规电弧
                        else if(Math.random() < 0.1 && y < 5000){
                            e.lineWidth = 1.2;
                            e.strokeStyle = "rgba(184, 225, 245, " + (A * 0.4) + ")";
                            drawElectricArc(i.x, i.y, x.x, x.y, A * 0.5, A * 0.4);
                        }
                    }
                }
            }

            w.splice(w.indexOf(i), 1);
        });

        m(b);
    }

    var u = document.createElement("canvas"),
        s = l(),
        c = "c_n" + s.l,
        e = u.getContext("2d"),
        r, n,
        m = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(i){ window.setTimeout(i,1000/60) },
        a = Math.random,
        f = { x: null, y: null, max: 10000 };

    u.id = c;
    u.style.cssText = "position:fixed;top:0;left:0;z-index:"+s.z+";opacity:"+s.o;
    j("body")[0].appendChild(u);

    k();
    window.onresize = k;

    // 增强鼠标交互
    window.onmousemove = function(i){
        i = i || window.event;
        f.x = i.clientX;
        f.y = i.clientY;
        
        // 鼠标靠近时激活附近粒子
        t.forEach(function(p){
            var dx = p.x - f.x, dy = p.y - f.y;
            var distance = dx*dx + dy*dy;
            
            if(distance < 50000){
                p.xa += (Math.random() - 0.5) * 0.5;
                p.ya += (Math.random() - 0.5) * 0.5;
            }
        });
    };

    window.onmouseout = function(){
        f.x = null;
        f.y = null;
    };

    // 初始化粒子 - 更合理的分布
    var t = [];
    for(var p=0; s.n > p; p++){
        t.push({
            x: a()*r,
            y: a()*n,
            xa: (a()-0.5)*0.3, // 适中速度
            ya: (a()-0.5)*0.3,
            size: a()*1.2 + 0.9, // 适中大小
            opacity: a()*0.4 + 0.2, // 适中透明度
            max: 8000
        });
    }

    setTimeout(b, 100);
}();