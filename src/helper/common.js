import Moment from 'moment'

const helpers = {
    isValidEmail: function(email){
        return /\S+@\S+\.\S+/.test(email);
    },
	
	validateNumber: function(number){
		var pattern = /^[0-9]{10}$/;
        return pattern.test(number);  // returns a boolean
	},
	
	IsNumeric: function(input) {
		return /^-?(0|[1-9]\d*|(?=\.))(\.\d+)?$/.test(input);
	},
	
	validateInterestRate: function(input){
		return input.replace(/[^0-9_.]/g, '');
	},
	
    isValidFormatForPassword: function(passwordInputValue){
        const uppercaseRegExp = /(?=.*?[A-Z])/;
        const lowercaseRegExp = /(?=.*?[a-z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{8,}/;
        const passwordLength = passwordInputValue.length;
        const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
        const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
        const digitsPassword = digitsRegExp.test(passwordInputValue);
        const specialCharPassword = specialCharRegExp.test(passwordInputValue);
        const minLengthPassword = minLengthRegExp.test(passwordInputValue);
        let errMsg = "";
        if ((passwordLength === 0)) {
            errMsg = "Password is empty";
        } else if ((!uppercasePassword) || (!lowercasePassword) || (!digitsPassword) || (!specialCharPassword) || (!minLengthPassword)) {
            errMsg = "Password should be contain at least one uppercase, one lowercase, one digit, one special Characters and minumum 8 characters.";
        } else {
            errMsg = "";
        }
        return errMsg;
    },
	
	truncateString: function ( str, n, useWordBoundary ){
		if (str.length <= n) { return str; }
		const subString = str.substr(0, n-1); // the original check
		return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + "...";
	},
	
	formatAmount: function (amount) {
		var settings = { thousands: ",", decimal: ".", integer: false };
		var inputValue = amount;
			inputValue = inputValue.replace(/\D/g, "");
			if (!settings.integer) {
				inputValue = inputValue.replace(/(\d{2})$/, settings.decimal.concat("$1"));
				inputValue = inputValue.replace(/(\d+)(\d{3}, \d{2})$/g, "$1".concat(settings.thousands).concat("$2"));
			}
		//add thousand seprator
		var totalThousandsPoints = (inputValue.length - 3) / 3;
		var thousandsPointsAdded = 0;
		while (totalThousandsPoints > thousandsPointsAdded) {
			thousandsPointsAdded++;
			inputValue = inputValue.replace(/(\d+)(\d{3}.*)/, "$1".concat(settings.thousands).concat("$2"));
		}
		//remove left zero
		inputValue = inputValue.replace(/^(0)(\d)/g,"$2");
		return '£'+inputValue;
	},
	
	diffYMDHMS: function(date1) {
		date1 = Moment(date1);
		let date2 = Moment();
		let years = date1.diff(date2, 'year');
		date2.add(years, 'years');
		let months = date1.diff(date2, 'months');
		date2.add(months, 'months');
		let days = date1.diff(date2, 'days');
		date2.add(days, 'days');
		let hours = date1.diff(date2, 'hours');
		date2.add(hours, 'hours');
		let minutes = date1.diff(date2, 'minutes');
		date2.add(minutes, 'minutes');
		//let seconds = date1.diff(date2, 'seconds');
		if(days > 0 || hours > 0 || minutes > 0){
			var new_string = '';
			new_string += days > 0 ? days + 'd,' : '';
			new_string += hours > 0 ? hours + 'h,' : '';
			new_string += minutes > 0 ? minutes + 'm' : '';
			return new_string;
		}else{
			return '';
		}
	},
	
	getParsedDate: function(date){
		date = String(date).split(' ');
		var days = String(date[0]).split('-');
		var hours = String(date[1]).split(':');
		return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
	},
	
	randomString: function (len) {
		var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		return [...Array(len)].reduce(a=>a+p[~~(Math.random()*p.length)],'');
	},
	
	capitalize: function(string){
		//console.log('string', string)
		if(typeof string !== "undefined" && string !== null){
			  return string.replace(/^./, function (match) {
				return match.toUpperCase();
			  });
		}
	}	
	
}

export default helpers;