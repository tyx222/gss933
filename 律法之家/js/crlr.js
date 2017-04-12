 $(function() {
     $(window).resize(function() {
         var tt = $(".foot").offset().top
         var height = $(document.body).height();
         if (tt < 400) {
             $(".foot").fadeOut()
         }
         if (height > 400) {
             $(".foot").show()
         }
     })

 })