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
        width:102*config.multiple,
        height:68*config.multiple,
        x: x*config.multiple, y: y*config.multiple,
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
        strokeWidth: baseWidth*config.multiple,
        x1: x*config.multiple, y1: (h/2+y)*config.multiple,
        x2: x*config.multiple, y2: (h/2+y+hostTop*baseHostN)*config.multiple,
        closed: true,

    }).addLayer({  //网基础网络上写简介
        type : "text",
        fillStyle: '#000',
        strokeWidth: baseWidth*config.multiple,
        x: (x-baseSize)*config.multiple, y: (hostTop*baseHostN-h/2-y)*config.multiple,
        fontSize: baseSize*config.multiple+'px',
        fontFamily: 'Arial',
        text: baseName+baseIp,
        fromCenter: true,
        rotate: -90
    });
}



//画路由
function drawRouter($c,_x,_y,_w,_h,routerData,event){ //画路由

    var subNets = {}

    var routerl = routerData.length;
    var w = config.router.l * routerl+_x;

    var subnetNum = 0;
    
    var fun = fun || function(){};

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
        var router_y = _y+config.router.t+config.router.h;

        $c.addLayer({
            type : 'image',
            source: '../image/router.png',
            x: router_x*config.multiple,
            y: router_y*config.multiple,
            width:config.router.w*config.multiple,
            height:config.router.h*config.multiple,
            mouseover: function(){
                event.mouseover($c,router_x,router_y,v) || function(){}
            },
            mouseout : function(){
                event.mouseout($c);
            }
        }).addLayer({
            type : "line",
            strokeStyle: config.router.color,
            strokeWidth: config.router.lineWidth*config.multiple,
            x1: router_x*config.multiple, y1: (_y+config.hostTop)*config.multiple,
            x2: router_x*config.multiple, y2: (_y+config.hostTop+config.router.t-config.router.h/2)*config.multiple,
            closed: true
        }).addLayer({
            type : "line",
            strokeStyle: config.router.color,
            strokeWidth: config.router.lineWidth*config.multiple,
            x1: router_x*config.multiple, y1: (_y+config.hostTop+config.router.t+config.router.h/2)*config.multiple,
            x2: router_x*config.multiple, y2: (_y+config.hostTop+config.router.t+config.router.h+config.router.lineWidth/2)*config.multiple,
            closed: true
        });
        
        //添加路由说明
        $c.addLayer({  //网基础网络上写简介
            type : "text",
            fillStyle: config.router.color,
            strokeWidth: config.router.width*config.multiple,
            x: (router_x-config.router.w/2-10)*config.multiple, y: (_y+config.router.t+config.router.h)*config.multiple,
            fontSize: config.router.size*config.multiple+'pt',
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
                    strokeWidth: config.router.lineWidth*config.multiple,
                    x1:l*config.multiple ,
                    y1: (_y+config.hostTop+config.router.t+config.router.h)*config.multiple,
                    x2:(l2 +config.router.lineWidth/2)*config.multiple,
                    y2: (_y+config.hostTop+config.router.t+config.router.h)*config.multiple,
                    closed: true
                });
            }

        }


    });

    $c.addLayer({
        type : "line",
        strokeStyle: '#000',
        strokeWidth: config.base.width*config.multiple,
        x1: _x*config.multiple, y1: (config.hostTop+_y)*config.multiple,
        x2: w*config.multiple, y2: (config.hostTop+_y)*config.multiple,
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
            strokeWidth: config.router.lineWidth*config.multiple,
            x1: x*config.multiple, y1: y*config.multiple,
            x2: x*config.multiple, y2: (y+100)*config.multiple,
            closed: true
        });

        //画虚线
        if(false){  //流出来画主机的接口
            $c.addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth*config.multiple,
                x1: x*config.multiple, y1: (y+110)*config.multiple,
                x2: x*config.multiple, y2: (y+150)*config.multiple,
                closed: true
            }).addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth*config.multiple,
                x1: x*config.multiple, y1: (y+160)*config.multiple,
                x2: x*config.multiple, y2: (y+190)*config.multiple,
                closed: true
            }).addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth*config.multiple,
                x1: x*config.multiple, y1: (y+200),
                x2: x*config.multiple, y2: (y+220)*config.multiple,
                closed: true
            }).addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth*config.multiple,
                x1: x*config.multiple, y1: (y+230)*config.multiple,
                x2: x*config.multiple, y2: (y+240)*config.multiple,
                closed: true
            });
        }


        //添加子网说明
        $c.addLayer({  //网基础网络上写简介
            type : "text",
            fillStyle: config.subnet.color,
            strokeWidth: config.subnet.width*config.multiple,
            x: (x-15)*config.multiple, y: (y+100)*config.multiple,
            fontSize: config.subnet.size*config.multiple+'pt',
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
            x: x*config.multiple, y: y*config.multiple,
            width:config.host.w*config.multiple,
            height:config.host.h*config.multiple,
            click: function(){
                console.log("主网主机");
            }
        }).addLayer({
            type : 'line',
            strokeStyle: config.host.color,
            strokeWidth: config.host.lineWidth*config.multiple,
            x1: (x-(config.host.l+config.host.w/2))*config.multiple, y1: y*config.multiple,
            x2: (x-config.host.w/2)*config.multiple, y2: y*config.multiple,
            closed: true,
        }).addLayer({
            type : 'line',
            strokeStyle: config.host.color,
            strokeWidth: config.host.lineWidth*config.multiple,
            x1: (x-(config.host.l+config.host.w/2))*config.multiple, y1: (y-hostOffset[v.net_id].host*(config.host.h+config.host.t))*config.multiple,
            x2: (x-(config.host.l+config.host.w/2))*config.multiple, y2: (y+config.host.lineWidth)*config.multiple,
            closed: true,
        });

        hostOffset[v.net_id].host++;
    })
}













