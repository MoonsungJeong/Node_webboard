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
    formatDate : function(date){
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
    commentDate : function(date){
        let mm = String(date.getMonth() + 1).padStart(2, '0');  // Month
        let dd = String(date.getDate()).padStart(2, '0');       // Day
        let H = String(date.getHours()).padStart(2, '0');       // Hour
        let M = String(date.getMinutes()).padStart(2, '0');     // Minute
        
        return mm+"."+dd+" " + H + ":"+M;
    }
}