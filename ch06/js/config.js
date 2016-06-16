/**
 * Created by wuyang on 16/5/26.
 */

var config = {
    
    width:1000,
    height:1000,
    
    hostTop : 50,//每个主机上边距
    multiple : 2,  //canvas缩放程度,按照是否有retian屏幕兼容
    
    netLeft : 90,//子网之间的距离
    yun : { //云的配置
        w : 102,
        h : 68,
        x : 100,
        y : 70
    },
    base : {
        width : 2,
        lineWidth :2,
        color : "#000",
        size : 12
    },

    router : {
        l : 130,
        t : 80,
        w : 50,
        h: 50,
        color: '#000',
        lineWidth :2,
        size : 12
    },
    
    subnet : {
        color: '#000',
        lineWidth :2,
        size : 12
    },
    
    host : {
        l : 30,
        t : 20,
        w : 50,
        h: 40,
        color: '#000',
        lineWidth :2,
        size : 12
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
        fontSize : 14,
        lineHeigth : 24
    }
};