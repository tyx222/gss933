 function imgPreview(fileDom) {
     if (window.FileReader) {
         var reader = new FileReader();
     } else {
         alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
     }
     var file = fileDom.files[0];
     var imageType = /^image\//;
     if (!imageType.test(file.type)) {
         alert("请选择图片！");
         return;
     }
     reader.onload = function(e) {
         var img = document.getElementById("preview");
         img.src = e.target.result;
     };
     reader.readAsDataURL(file);
 }

 $(function() {
     var fileSelect = document.getElementsByClassName("upload")[0],
         fileElem = document.getElementById("upfile");
     $("#upfile").hide()
     fileSelect.addEventListener("click", function(e) {
         fileElem.click()
         if ($("#previer").attr("src") != " ") {
             $(".upload>p").hide()
         } else {
             $(".upload>p").show()
         }
     }, false);
 })

 $(function() {
     $(".tab-box").hide()
     $(".tab-box").eq(0).show()
     $("#tab>button").eq(0).css({ border: "1px solid #F18215" })
     $("#tab>button").click(function() {
         $(this).css({ border: "1px solid #F18215" }).siblings().css({ border: "1px solid #999" })
         var index = $(this).index()
         $(".tab-box").eq(index).show().siblings(".tab-box").hide()
     })
 })