
// Services worker 

if ("serviceWorker" in navigator){
	console.log("Puedes usar Services Worker");
	navigator.serviceWorker.register("./sw.js")
		.then( res => console.log("Sw cargado correctamente" , res)) 
		.catch( err => console.log( "Sw no se registró ", err )); 
} else {
	console.log("No se puede usar");
}

// Scroll suaveizado 
$(document).ready(function(){
	$("#menu a").click(function(e){
		e.preventDefault();

		$("html, body").animate({
			scrollTop: $($(this).attr('href')).offset().top
		});

		return false;
	})
});