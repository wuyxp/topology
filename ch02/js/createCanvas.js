/**
 * Created by wuyang on 16/5/26.
 */



//创建画布

function createCanvas($obj,setting){   //生成canvas
    var setting = setting || {};
    var $topology = $obj;
    var $canvas = $('<canvas></canvas>');
    $canvas.attr({
        width: setting.width,
        height: setting.height
    });
    setting.move && move();
    function move(){
        var LEFT = 0;
        var TOP = 0;

        $canvas.mousedown(function(e){
            var s_x = $(this).position().left;
            var s_y = $(this).position().top;

            var s_w = $(this).width();
            var s_h = $(this).height();

            var t_w = $topology.width();
            var t_h = $topology.height();

            var p_x = e.pageX;
            var p_y = e.pageY;


            function move(e){
                var o_x = e.pageX;
                var o_y = e.pageY;
                TOP = (o_y-p_y)+s_y;
                LEFT = (o_x-p_x)+s_x;
                TOP = TOP >= 0 ? TOP = 0 : ( TOP <= (t_h-s_h) ? (t_h-s_h) : TOP );
                LEFT = LEFT >=0 ? LEFT = 0 : ( LEFT <= (t_w-s_w) ? (t_w-s_w) : LEFT );
                $canvas.css({
                    top  : TOP,
                    left : LEFT
                })
            }

            $(document).on("mousemove",move);
            $(document).mouseup(function(){
                $(this).off("mousemove");
            })

        })
    }


    $topology.append($canvas);
    return $canvas;

}



//创建云

function drawYun(c,x,y,fn){   //画云函数
    c.addLayer({
        type: 'image',
        source: '../image/topology-yun.png',
        x: x, y: y,
        click : fn || function(){}
    }).drawLayers();
}

//画基础

function drawBase(c,x,y,w,h,baseData){  //画基础网络

    var hostTop = config.hostTop || 50;
    var baseHostN = baseData.hostN;
    var baseIp = baseData.ip;
    var baseName = baseData.name;
    var baseDHCP = baseData.DHCP;
    var baseColor = config.base.color;
    var baseWidth = config.base.width;
    var baseSize = config.base.size;



    c.addLayer({
        type : "line",
        strokeStyle: baseColor,
        strokeWidth: baseWidth,
        x1: x, y1: h/2+y,
        x2: x, y2: h/2+y+hostTop*baseHostN,
        closed: true,

    }).addLayer({  //网基础网络上写简介
        type : "text",
        fillStyle: '#000',
        strokeWidth: 2,
        x: x-baseSize, y: hostTop*baseHostN-h/2-y,
        fontSize: baseSize+'pt',
        fontFamily: 'Arial',
        text: baseName+baseIp,
        fromCenter: true,
        rotate: -90
    });
}



//画路由
function drawRouter($c,_x,_y,_w,_h,routerData){ //画路由

    var subNets = {}

    var routerl = routerData.length;
    var w = config.router.l * routerl+_x;

    var subnetNum = 0;

    routerData.forEach(function(v,i){
        //console.log(v);
        w += (v.rtr_subnet-1)*config.netLeft;



        var router_x = (i+1)*config.router.l+_x+subnetNum*config.netLeft;

        subNets[v.rtr_id] = {
            x : router_x,
            net : 0,
            host : 0
        }

        subnetNum = v.rtr_subnet-1+subnetNum;

        $c.addLayer({
            type : 'image',
            source: '../image/router.png',
            x: router_x,
            y: _y+config.router.t+config.router.h,
            width:config.router.w,
            height:config.router.h,
            click: function(){
                console.log(v);
            }
        }).addLayer({
            type : "line",
            strokeStyle: config.router.color,
            strokeWidth: config.router.lineWidth,
            x1: router_x, y1: _y+config.hostTop,
            x2: router_x, y2: _y+config.hostTop+config.router.t-config.router.h/2,
            closed: true
        }).addLayer({
            type : "line",
            strokeStyle: config.router.color,
            strokeWidth: config.router.lineWidth,
            x1: router_x, y1: _y+config.hostTop+config.router.t+config.router.h/2,
            x2: router_x, y2: _y+config.hostTop+config.router.t+config.router.h+config.router.lineWidth/2,
            closed: true
        });
        
        //添加路由说明
        $c.addLayer({  //网基础网络上写简介
            type : "text",
            fillStyle: config.router.color,
            strokeWidth: config.router.width,
            x: router_x-config.router.w/2-10, y: _y+config.router.t+config.router.h,
            fontSize: config.router.size+'pt',
            fontFamily: 'Arial',
            text:  v.rtr_name,
            fromCenter: true,
            rotate: -90
        });

        addNet(v.rtr_subnet-1);

        function addNet(len){   //画出每一个子网的大致框架
            for(var i=0;i<len;i++){
                var l = router_x+config.netLeft*i;
                var l2 = router_x+config.netLeft*(i+1);
                $c.addLayer({
                    type : "line",
                    strokeStyle: config.router.color,
                    strokeWidth: config.router.lineWidth,
                    x1:l ,
                    y1: _y+config.hostTop+config.router.t+config.router.h,
                    x2:l2 +config.router.lineWidth/2,
                    y2: _y+config.hostTop+config.router.t+config.router.h,
                    closed: true
                });
            }

        }


    });

    $c.addLayer({
        type : "line",
        strokeStyle: '#000',
        strokeWidth: 5,
        x1: _x, y1: config.hostTop+_y,
        x2: w+20, y2: config.hostTop+_y,
        closed: true,
        click : function(e){

            console.log("子网干线");
        }
    })

    return subNets;

}

//画子网

function drawNets($c,_x,_y,_w,_h,netOffset,subnetData){


    var hostOffset = {}
    subnetData.forEach(function(v,i){

        var x = netOffset[v.router_id].x+config.netLeft*netOffset[v.router_id].net;
        var y = _y+config.hostTop+config.router.t+config.router.h+config.router.lineWidth/2;
        netOffset[v.router_id].net += 1;


        hostOffset[v.net_id] = {
            x : x,
            net : 0,
            host : 0
        }

        $c.addLayer({
            type : "line",
            strokeStyle: config.router.color,
            strokeWidth: config.router.lineWidth,
            x1: x, y1: y,
            x2: x, y2: y+100,
            closed: true
        });

        //画虚线
        if(false){  //流出来画主机的接口
            $c.addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth,
                x1: x, y1: y+110,
                x2: x, y2: y+150,
                closed: true
            }).addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth,
                x1: x, y1: y+160,
                x2: x, y2: y+190,
                closed: true
            }).addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth,
                x1: x, y1: y+200,
                x2: x, y2: y+220,
                closed: true
            }).addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth,
                x1: x, y1: y+230,
                x2: x, y2: y+240,
                closed: true
            });
        }


        //添加子网说明
        $c.addLayer({  //网基础网络上写简介
            type : "text",
            fillStyle: config.subnet.color,
            strokeWidth: config.subnet.width,
            x: x-15, y: y+100,
            fontSize: config.subnet.size+'pt',
            fontFamily: 'Arial',
            text:  v.net_name,
            fromCenter: true,
            rotate: -90
        });
    });

    return hostOffset;

}


//画主机函数


function drawHost($c,_x,_y,_w,_h,hostOffset,hosts){
    console.log(hostOffset);
    console.log(hosts);


    hosts.forEach(function(v,i){
        var x = hostOffset[v.net_id].x+config.host.l+config.host.w/2;

        var y = _y+config.hostTop*2+config.router.t+config.router.h+config.router.lineWidth+hostOffset[v.net_id].host*(config.host.h+config.host.t);


        $c.addLayer({
            type : 'image',
            source: '../image/billing_host.png',
            x: x, y: y,
            width:config.host.w,
            height:config.host.h,
            click: function(){
                console.log("主网主机");
            }
        }).addLayer({
            type : 'line',
            strokeStyle: config.host.color,
            strokeWidth: config.host.lineWidth,
            x1: x-(config.host.l+config.host.w/2), y1: y,
            x2: x-config.host.w/2, y2: y,
            closed: true,
        }).addLayer({
            type : 'line',
            strokeStyle: config.host.color,
            strokeWidth: config.host.lineWidth,
            x1: x-(config.host.l+config.host.w/2), y1: y-hostOffset[v.net_id].host*(config.host.h+config.host.t),
            x2: x-(config.host.l+config.host.w/2), y2: y+config.host.lineWidth,
            closed: true,
        });

        hostOffset[v.net_id].host++;
    })
}













