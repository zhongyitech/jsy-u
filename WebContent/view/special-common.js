//检测界面中的保证是否已经选中
function ValidAccept(){
	return $('input[name="acceptbox"]:checked').length >0;
}