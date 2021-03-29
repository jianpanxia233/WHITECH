//转换年月日方法
function getDate(format,str){  
    let oDate = new Date(str)
    let oYear = oDate.getFullYear()  
    let oMonth = oDate.getMonth()+1  
    let oDay = oDate.getDate()
    let oHour = oDate.getHours()  
    let oMin = oDate.getMinutes()  
    let oSec = oDate.getSeconds()  
    let oTime
    if(format == 'yyyy-mm-dd'){
   	    oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
    }else if(format == 'yyyy/mm/dd'){
    	oTime = oYear +'/'+ getzf(oMonth) +'/'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
    }
    return oTime;  
 };
 //补0操作  
 function getzf(num){  
     if(parseInt(num) < 10){  
         num = '0'+num;  
     }  
     return num;  
 }

 export default getDate