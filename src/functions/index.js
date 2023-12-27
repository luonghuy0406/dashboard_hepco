export const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))



export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
    u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

export function formatDateTime(dateStr, format='') {
	let date = new Date()
	date = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
	const regex = new RegExp('^[\\d]{2}:[\\d]{2}:[\\d]{2}.[\\d]{0,3}\\+[\\d]{2}:[\\d]{2}$','g');
	if(regex.test(dateStr)){
		dateStr = date +" "+dateStr
	}
	const regex2 = new RegExp('^[\\d]{2}:[\\d]{2}$','g');
	if(regex2.test(dateStr)){
		dateStr = date +" "+dateStr
	}
	return formatDate(dateStr, format);
}

function formatDate(dateStr, format='') {
	if(!dateStr) return ''
	var date = new Date(dateStr);
	var result = format;
	var days =['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var props = {
		'a' : days[date.getDay()],
		'Y' : date.getFullYear(),
		'y' : date.getFullYear().toString().substring(2,4),
		'm' : intPad((date.getMonth()+1), 2),
		'n' : date.getMonth()+1,
		'd' : intPad(date.getDate(), 2),
		'e' : date.getDate(),
		'H' : intPad(date.getHours(), 2),
		'h' : date.getHours(),
		'M' : intPad(date.getMinutes(), 2),
		'S' : intPad(date.getSeconds(), 2),
		'3' : intPad(date.getMilliseconds(), 3),
	}
	for (let prop in props) {
		result = result.replace('%'+prop, props[prop]);
	}
	return result;
}


function intPad(num, l) {
	var str = num.toString(),
	zeros = l - str.length;
	for (let j=0 ; j < zeros ; j++) {
		str = '0'+str;
	}
	return str;
}