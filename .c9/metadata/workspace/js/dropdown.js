{"filter":false,"title":"dropdown.js","tooltip":"/js/dropdown.js","undoManager":{"mark":5,"position":5,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":9,"column":3},"action":"insert","lines":["$(function(){","","    $(\".dropdown-menu li a\").click(function(){","","      $(\".btn:first-child\").text($(this).text());","      $(\".btn:first-child\").val($(this).text());","","   });","","});"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":9,"column":3},"action":"remove","lines":["$(function(){","","    $(\".dropdown-menu li a\").click(function(){","","      $(\".btn:first-child\").text($(this).text());","      $(\".btn:first-child\").val($(this).text());","","   });","","});"]},{"start":{"row":0,"column":0},"end":{"row":3,"column":3},"action":"insert","lines":["$(\".dropdown-menu li a\").click(function(){","  $(this).parents(\".input-group-btn\").find('.btn').text($(this).text());","  $(this).parents(\".input-group-btn\").find('.btn').val($(this).text());","});"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":4,"column":2},"action":"insert","lines":["window.onload = function() {"," ","    alert( \"welcome\" );"," ","};"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":2},"end":{"row":5,"column":0},"action":"remove","lines":["",""]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":8,"column":3},"end":{"row":8,"column":3},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":39,"mode":"ace/mode/javascript"}},"timestamp":1418321153160,"hash":"35524036bbb16db6c7c843a714a178f6da7b0093"}