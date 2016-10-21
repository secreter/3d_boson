Array.prototype.forEach=function(callback){
	debugger
	if (!Array.prototype.forEach) {
		this.forEach(callback)
	}else{
		for(var i=0;i<this.length;i++){
			callback.call(this,this[i],i,this)
		}
	}
}