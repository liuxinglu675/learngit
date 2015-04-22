/**
 * Created by liuxinglu on 15/4/21.
 */
class Path
{
    public constructor() {

    }

    public static createRect(w:number, h:number):Array<any> {
        var arr = [];
        arr.push({'x':0, 'y':0});
        arr.push({'x':w, 'y':0});
        arr.push({'x':w, 'y':h});
        arr.push({'x':0, 'y':h});

        return arr;
    }

    public static createCircle(r:number):Array<any> {
        var arr = [];
        var a = r;
        var b = r;
        var i = 0;
        var x1:number;
        var y1:number;
        i += (2 / 180 * Math.PI);
        x1=b * Math.cos(i);
        y1=a * Math.sin(i);
        arr.push({'x':x1, 'y':y1})
        while(i < Math.PI * 2){
            i += (2 / 180 * Math.PI);
            x1 = b * Math.cos(i);
            y1 = a * Math.sin(i);
            arr.push({'x':x1, 'y':y1});
        }
        return arr;
    }


    public static createFan(r:number, angleStart:number, angleEnd:number):Array<any> {
        var arr = [];
        var a = r;
        var b = r;
        var istart = Math.PI / 180 * (360-(360 - angleEnd));
        var iend = Math.PI / 180 * (360-(360 - angleStart));
        var x1:number;
        var y1:number;
        arr.push({'x':0, 'y':0})
        while(iend <= istart){
            iend += (2 / 180 * Math.PI);
            x1 = b * Math.cos(iend);
            y1 = a * Math.sin(iend);
            arr.push({'x':x1, 'y':y1})
        }
        return arr;
    }




}