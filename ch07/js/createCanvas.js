/**
 * Created by wuyang on 16/5/26.
 */

//整合路由器与子网的关系,并且将x值分别加入到路由器和子网里面
function sortNets(nets){

    var routers = nets.routers;
    var subnets = nets.nets;

    var subnet_cloudNum = 0,subnet_routerNum =0 ; //将子网连接外网和连接路由进行计数

    var subnetData = [];
    var routersData = [];

    subnets.forEach(function(v){         //将再一个路由下的所有子网进行归类
        var p = true;
        for(var i=0;i<subnetData.length;i++){
            if(subnetData[i].router_id && subnetData[i].router_id == v.router_id){
                subnetData.splice(i+1,0,v);
                p = false;
                break;
            }
        }
        if(p){
            subnetData.push(v);
        };
    });

    subnetData.map(function(v){   //将归类后的子网进行计算x坐标值
        v.x = subnet_cloudNum * config.netLeft + subnet_routerNum * config.netLeft;
        if(v.router_id){
            subnet_routerNum++;
        }else{
            subnet_cloudNum++;
        }
        return v;
    });
    subnetData.forEach(function(v){//将归类后的路由器进行计算x坐标值

        if(v.router_id){
            for(var i=0;i<routers.length;i++) {
                var routersObj = routers[i];

                if(v.router_id == routersObj.router_id) {

                    var p = true;
                    for(var j=0;j<routersData.length;j++){
                        if(routersData[j].router_id == routers[i].router_id){
                            p = false;
                        }
                    }
                    if(p){
                        routersObj.x = v.x;
                        routersData.push(routersObj);
                    }

                }
            }
        }
    });
    nets.routers = routersData;
    nets.nets = subnetData;
}



//获取子网和主机,并且算出起总共的宽度,与高度
function getP(){

    var maxhost = 0;
    for(var i=0,len=nets.nets.length;i<len;i++){
        maxhost = maxhost < nets.nets[i].instances_count ? nets.nets[i].instances_count : maxhost;
    }

    var width = (nets.routers.length+1) * config.netLeft + config.yun.x + config.yun.w;
    var height = maxhost * config.hostTop;

    return {
        width : width,
        height : height
    }

}


//创建画布

function createCanvas($obj,setting){   //生成canvas
    var setting = setting || {};
    var $topology = $obj;
    var $canvas = $('<canvas></canvas>');
    var pos = getP();
    if(pos.width<$topology.width()){
        pos.width = $topology.width();
    };
    $canvas.attr({
        width : pos.width*config.multiple,
        height: pos.height*config.multiple,
    }).css({
        width:pos.width+'px',
        height:pos.height+'px'
    });
    setting.move && move();
    $canvas.showHost = setting.showHost || false;
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
                console.log(LEFT);
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

function drawYun(c,x,y,net,fn){   //画云函数
    var routers = net.routers;
    var nets =net.nets;


    var _x = routers[routers.length-1].x > nets[nets.length-1].x ? routers[routers.length-1].x :nets[nets.length-1].x;
    _x = _x/2+x;
    c.addLayer({
        type: 'image',
        source: '../image/cloud.png',
        width:config.yun.w*config.multiple,
        height:config.yun.h*config.multiple,
        x: _x*config.multiple, y: y*config.multiple,
        click : fn || function(){}
    }).addLayer({
        type : "line",
        strokeStyle: config.router.color,
        strokeWidth: config.router.lineWidth*config.multiple,
        x1: _x*config.multiple, y1: (y+35)*config.multiple,
        x2: _x*config.multiple, y2: (y+50)*config.multiple,
        closed: true
    }).addLayer({
        type : "line",
        strokeStyle: '#000',
        strokeWidth: config.base.width*config.multiple,
        x1: x*config.multiple, y1: (y+50)*config.multiple,
        x2: (_x*2-x)*config.multiple, y2: (y+50)*config.multiple,
        closed: true
    }).drawLayers();
    c.drawArc({
        fillStyle :config.porin.color,
        x: _x*config.multiple, y: (y+50)*config.multiple,
        radius : config.porin.r,
        closed: true,
        layer: true,
    });
}


//画路由
function drawRouter($c,_x,_y,routerData,event){ //画路由

    var subNets = {};

    var routerl = routerData.length;
    var w = 0;

    var subnetNum = 0;
    
    var fun = fun || function(){};
    routerData.forEach(function(v,i){
        //console.log(v);


        var router_x = v.x+_x;
        w = router_x;
    });



    routerData.forEach(function(v,i){
        //console.log(v);


        var router_x = v.x+_x;
        subNets[v.rtr_id] = {
            x : router_x,
            net : 0,
            host : 0
        };

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
            },
            click : function () {
                event.click();
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
        $c.drawArc({
            fillStyle :config.porin.color,
            x: router_x*config.multiple, y: (_y+config.hostTop)*config.multiple,
            radius : config.porin.r,
            closed: true,
            layer: true,
        })
        
        //添加路由说明
        $c.addLayer({  //网基础网络上写简介
            type : "text",
            fillStyle: config.router.color,
            strokeWidth: config.router.width*config.multiple,
            x: (router_x-config.router.w/2-10)*config.multiple, y: (_y+config.router.t+config.router.h)*config.multiple,
            fontSize: config.router.size*config.multiple+'pt',
            fontFamily: 'Arial',
            text:  v.router_name,
            fromCenter: true,
            rotate: -90
        });



    });

    subNets.base = {   //添加基础对应关系
        x : _x,
        net : 0,
        host : 0
    }

    return subNets;

}

//画子网

function drawNets($c,_x,_y,subnetData,event){

    var hostOffset = {};

    subnetData.forEach(function(v,i,arr){
        var x = v.x+_x;
        var y = _y+config.hostTop+config.router.t+config.router.h+config.router.lineWidth/2;


        hostOffset[v.net_id] = {
            x : x,
            net : 0,
            host : 0
        };

        if(v.router_id){
            var _y_ = y*config.multiple
        }else{
            var _y_ = (_y+config.hostTop)*config.multiple
        }


        $c.addLayer({
            type : "line",
            strokeStyle: config.router.color,
            strokeWidth: config.router.lineWidth*config.multiple,
            x1: x*config.multiple, y1: _y_,
            x2: x*config.multiple, y2: (y+50)*config.multiple,
            closed: true
        });
        if(v.router_id && v.router_id == arr[i-1].router_id){
            $c.addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth*config.multiple,
                x1:x*config.multiple ,
                y1: y*config.multiple,
                x2:(x-config.netLeft)*config.multiple,
                y2: y*config.multiple,
                closed: true
            });
            $c.drawArc({
                fillStyle :config.porin.color,
                x: (x-config.netLeft)*config.multiple, y: _y_,
                radius : config.porin.r,
                closed: true,
                layer: true,
            })
        };
        $c.drawArc({
            fillStyle :config.porin.color,
            x: x*config.multiple, y: _y_,
            radius : config.porin.r,
            closed: true,
            layer: true,
        })



        //画虚线
        if(!$c.showHost){  //流出来画主机的接口
            $c.addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth*config.multiple,
                groups: ['hideHostLayer'],
                x1: x*config.multiple, y1: (y+10)*config.multiple,
                x2: x*config.multiple, y2: (y+50)*config.multiple,
                closed: true
            }).addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth*config.multiple,
                groups: ['hideHostLayer'],
                x1: x*config.multiple, y1: (y+60)*config.multiple,
                x2: x*config.multiple, y2: (y+90)*config.multiple,
                closed: true
            }).addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth*config.multiple,
                groups: ['hideHostLayer'],
                x1: x*config.multiple, y1: (y+100)*config.multiple,
                x2: x*config.multiple, y2: (y+120)*config.multiple,
                closed: true
            }).addLayer({
                type : "line",
                strokeStyle: config.router.color,
                strokeWidth: config.router.lineWidth*config.multiple,
                groups: ['hideHostLayer'],
                x1: x*config.multiple, y1: (y+130)*config.multiple,
                x2: x*config.multiple, y2: (y+140)*config.multiple,
                closed: true
            });
        }


        //添加子网说明
        $c.addLayer({  //网基础网络上写简介
            type : "text",
            fillStyle: config.subnet.color,
            strokeWidth: config.subnet.width*config.multiple,
            x: (x-10)*config.multiple, y: (y+100)*config.multiple,
            fontSize: config.subnet.size*config.multiple+'pt',
            fontFamily: 'Arial',
            text:  v.net_name,
            fromCenter: true,
            rotate: -90,
            mouseover: function(){
                event.mouseover($c,(x-15),(y+100),v) || function(){}
            },
            mouseout : function(){
                event.mouseout($c);
            },
            click : function(){
                event.click();
            }
        });



    });



    return hostOffset;

}


//画主机函数


function drawHost($c,_x,_y,_w,_h,hostOffset,hosts,event){

    for(var nn in hostOffset){
        hostOffset[nn].host = 0;
    }


    hosts.forEach(function(v){

        var net_arr = v.nets;
        net_arr.forEach(function(w){
            var x = hostOffset[w.id].x+config.host.l+config.host.w/2;

            var y = _y+config.hostTop*2+config.router.t+config.router.h+config.router.lineWidth+hostOffset[w.id].host*(config.host.h+config.host.t);


            $c.addLayer({
                type : 'image',
                source: '../image/host.png',
                x: x*config.multiple, y: y*config.multiple,
                width:config.host.w*config.multiple,
                height:config.host.h*config.multiple,
                groups: ['hostLayer'],
                mouseover: function(){
                    event.mouseover($c,x,y,v) || function(){}
                },
                mouseout : function(){
                    event.mouseout($c);
                },
                click : function(){
                    event.click();
                }
            }).addLayer({
                type : 'line',
                strokeStyle: config.host.color,
                strokeWidth: config.host.lineWidth*config.multiple,
                x1: (x-(config.host.l+config.host.w/2))*config.multiple, y1: y*config.multiple,
                x2: (x-config.host.w/2)*config.multiple, y2: y*config.multiple,
                groups: ['hostLayer'],
                closed: true,
            }).addLayer({
                type : 'line',
                strokeStyle: config.host.color,
                strokeWidth: config.host.lineWidth*config.multiple,
                x1: (x-(config.host.l+config.host.w/2))*config.multiple,
                y1: (y-hostOffset[w.id].host*(config.host.h+config.host.t))*config.multiple,
                x2: (x-(config.host.l+config.host.w/2))*config.multiple,
                y2: (y+config.host.lineWidth)*config.multiple,
                groups: ['hostLayer'],
                closed: true,
            });

            hostOffset[w.id].host++;
        });


    });
    $c.drawLayers();
    
}




//添加提示的小标志

function showTip($c,x,y,textA,config_data){
    console.log(config_data);
    var len = textA.length;
    var maxWidth = 0;
    var gd = $c[0].getContext("2d");
    gd.fontSize = config.tip.fontSize*config.multiple+'pt';
    console.log(gd.fontSize);
    for(var j=0;j<len;j++){
        var width = gd.measureText(textA[j].key+":"+textA[j].value).width;
        maxWidth = width > maxWidth ? width : maxWidth;
    }
    var _x = (x-maxWidth/2/2+config.tip.l)*config.multiple;

    if(_x<0){//控制tip的左边距
        _x = 80;
    }
    $c.drawRect({
        layer: true,
        fillStyle:config.tip.color,
        x : _x,
        y : (y+config.tip.t)*config.multiple,
        width:maxWidth+100,
        height:(len*(config.tip.lineHeigth)+config.tip.fontSize)*config.multiple || config.tip.h*config.multiple,
        shadowColor: config.tip.shadowColor,
        shadowBlur: config.tip.shadowBlur*config.multiple,
        shadowX: config.tip.shadowX*config.multiple,
        shadowY: config.tip.shadowY*config.multiple,
        fromCenter: false,
        groups: ['myBoxes'],
        cornerRadius: config.tip.cornerRadius*config.multiple
    }).drawRect({
        layer: true,
        fillStyle:config.tip.color,
        x : (x+config.tip.l)*config.multiple,
        y : (y+config.tip.t)*config.multiple,
        width:15*config.multiple,
        height:15*config.multiple,
        rotate: -45,
        groups: ['myBoxes']
    });

    for(var i=0;i<len;i++){
        if(textA[i].key != 'x'){
            $c.addLayer({  //网基础网络上写简介
                type : "text",
                fillStyle: '#000',
                x:_x+20*config.multiple,
                y: (y+config.tip.t+i*config.tip.lineHeigth)*config.multiple,
                fontSize: config.tip.fontSize*config.multiple+'px',
                fontFamily: 'Arial',
                baseline:"top",
                text:config_data[textA[i].key]+":"+textA[i].value,
                fromCenter: false,
                groups: ['myBoxes']
            });
        }
    }
}

function hideTip($c){
    console.log("hidetip");
//            $c.removeLayer('box').drawLayers();
    $c.removeLayerGroup('myBoxes');
    // cellid.style.cursor = "default";
}






