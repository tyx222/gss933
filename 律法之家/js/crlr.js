 $(function() {
     $(window).resize(function() {
         var tt = $(".foot").offset().top
         console.log(tt)
         var height = $(document.body).height();
         console.log(height)
         if (tt < 400) {
             $(".foot").hide()
         }
         if (height > 400) { $(".foot").show() }
     })

 })