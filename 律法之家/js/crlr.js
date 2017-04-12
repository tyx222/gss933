 $(function() {
     $(window).resize(function() {
         var tt = $(".foot").offset().top
         console.log(tt)
         var height = $(document.body).height();
         console.log(height)
         if (tt < 450) {
             $(".foot").hide()
         }
         if (height > 450) { $(".foot").show() }
     })

 })