function phoneConverter(phoneStr){
	var re = new RegExp("\\s", "g")
    var noSpace = phoneStr.replace(re,"")
    console.log(noSpace)
}

phoneConverter("1 2 3"); 