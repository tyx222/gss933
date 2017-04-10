 $(function() {
     function add(a, d, c) {
         $("#ddd>i").click(function() {
             var index = $(this).index()
             for (var i = 0; i <= index; i++) {
                 $("#ddd>i").eq(i).addClass("yero")

             }
             $("#ddd>.yero").click(function() {
                 var index1 = $(this).index()
                 console.log(index1)
                 $("#ddd>.yero").slice(index1 + 1).removeClass("yero")

             })
             $(".grade button").click(function() {
                 $("#ddd>.yero").length
             })

         })
     }
     add()

     $("#TextArea1").keyup(function() {
         $("#sy").text($("#TextArea1").val().length + "/")
     })
 })