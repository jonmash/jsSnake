requirejs.config({
	baseUrl: 'js',
	paths: {
		jquery: 'vendor/jquery-1.11.2.min',
		bootstrap: 'vendor/bootstrap.min'
	},
	shim : {
		bootstrap : { deps: ['jquery'] }
	}
});
require(['jquery', 'app/game'], function($, Game){
	$(function() {//domReady
		var game = null;
		$("#gameStart").on("click", function(){
			game = new Game($("#gameSize").val(), $("#gameSize").val(), $("#gameSkill").val(), "#gameboard");
		});
    });

	
});