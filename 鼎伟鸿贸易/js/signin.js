$(function() {
    $(".look").hide()
    var x = 0
    $(".tab-nav").eq(1).css({ borderTop: "1px solid #F18215" })
    $(".tab-nav").click(function() {
        var of = $(this).index()
        $(this).css({ borderTop: "1px solid #F18215" }).siblings().css({ borderTop: "1px solid #E0E0E0" })
        console.log(of)
        if (of == x) {
            $(".look").show()
            $(".OFF").attr("src", "../img/上.png")
        } else {
            $(".look").hide()
            $(".OFF").attr("src", "../img/下.png")
        }
    })

    $(".tabCompany ul li").click(function() {
        $(this).css({ border: "1px solid #F18215" }).siblings().css({ border: "1px solid #E0E0E0" })
        $(".tabCompany ol li").css({ border: "1px solid #E0E0E0" })
    })

})
var y = 0

function bd() {
    if (y == 0) {
        y = 1
    } else {
        y = 0
    }

}
$(function() {
    $(".subm").click(function() {
        if (y == 1) {
            alert("可以提交")
        } else {
            alert("请先阅读条款")
        }
    })
})

　