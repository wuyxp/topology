/**
 * Created by wuyang on 16/5/26.
 */

var config = {
    
    width:1000,
    height:1000,
    
    hostTop : 50,//每个主机上边距
    multiple : 2,  //canvas缩放程度,按照是否有retian屏幕兼容
    
    netLeft : 70,//子网之间的距离
    yun : { //云的配置
        w : 352/2,
        h : 142/2,
        x : 100,
        y : 70
    },
    base : {
        width : 2,
        lineWidth :2,
        color : "#4c5c61",
        size : 12
    },

    router : {
        l : 130,
        t : 80,
        w : 50,
        h: 50,
        color: '#4c5c61',
        lineWidth :2,
        size : 0  //隐藏路由
    },
    
    subnet : {
        color: '#4c5c61',//隐藏子网
        lineWidth :2,
        size : 8
    },
    
    host : {
        l : 10,
        t : 20,
        w : 46/2,
        h: 40/2,
        color: '#4c5c61',
        lineWidth :2,
        size :12//隐藏主机
    },

    tip : {
        l : 0,
        t : 40,
        w : 200,
        h : 100,
        color : "#e8f7fc",
        shadowColor : '#eeeeee',
        shadowBlur : 4,
        shadowX : 2,
        shadowY : 2,
        cornerRadius : 10,
        fontSize : 12,
        lineHeigth : 24
    },
    
    
    porin : {
        r : 10,
        color: '#37b0e0'
    }
};