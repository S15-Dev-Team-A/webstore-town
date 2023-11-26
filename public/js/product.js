$(document).ready(function(){
    $(".dot").tooltip({
        classes: {
            "ui-tooltip":"highlight"
        },
        position:{my: 'left center', at:'right+20 center'},
        content:function(result){
            $.get('/hoverProduct', {prodid:$(this).attr('prodid')}, function(data){
                result(data);
            });
        }
    });


    $(".dot").click(function(){
        // window.location="/login"
            $.get('/clickProduct', {prodid:$(this).attr('prodid')}, function(loggedin){

                if(loggedin){
                     $(".mycart").append(

                        '<p class="fade" style="text-align:center; border-radius:10px; padding:10px; margin-top:-105px; background-color:green;">Item added to Cart!</p>'
                        
                        );
                    $('.fade').delay(4000).fadeOut(2000, function() {
                        $(this).remove();
                    });
                } else {
                    alert("Please log in an account to start adding items to your Cart!")
                    window.location="/login"
                }
            });
    });
});