// Modify dropdown to change value on click
$(".dropdown-menu li a").click(function(){
  $(this).parents(".dropdown").find('.btn').text($(this).text());
  $(this).parents(".dropdown").find('.btn').val($(this).text());
});