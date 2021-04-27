module.exports = {
    currentTime : function(req,res){
        let date = new Date();
        let S = String(date.getSeconds()).padStart(2, '0');
        let M = String(date.getMinutes()).padStart(2, '0');
        let H = String(date.getHours()).padStart(2, '0');
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();
        date = yyyy + '-' + mm + '-' + dd + ' ' + H + ':'+M+':'+S;
        return date;
    },
    formatDate : function(date){        //  yy-mm-dd
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = String(d.getFullYear()).substring(2);

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    },
    formatDate_2 : function(date){      //  yyyy.mm.dd
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = String(d.getFullYear());

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('.');
    },
    formatDate_3 : function(date){      //  yyyy-mm-dd
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = String(d.getFullYear());

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    },
    formatDate_4 : function(date){      //  yyyy.mm.dd HH:MM
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = String(d.getFullYear());
        let H = String(d.getHours()).padStart(2, '0');       // Hour
        let M = String(d.getMinutes()).padStart(2, '0');     // Minute
        
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('.')+" "+H+":"+M;
    },
    commentDate : function(date){
        let mm = String(date.getMonth() + 1).padStart(2, '0');  // Month
        let dd = String(date.getDate()).padStart(2, '0');       // Day
        let H = String(date.getHours()).padStart(2, '0');       // Hour
        let M = String(date.getMinutes()).padStart(2, '0');     // Minute
        
        return mm+"."+dd+" " + H + ":"+M;
    },
    timeDifference: function(date){
        var date1 = new Date(date);
        var date2 = new Date(); 
        // To calculate the time difference of two dates 
        var Difference_In_Time = date2.getTime() - date1.getTime(); 
        // To calculate the no. of days between two dates 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
        
        return Difference_In_Days
    }
}