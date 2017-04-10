$(function() {
    $(".top>li").eq(0).css({ background: "#F2A04A", color: "#fff" })
    $(".box").hide()
    $(".box").eq(0).show()
    $(".top li").click(function() {
        var num = $(this).index()
        $(this).css({ background: "#F2A04A" }).siblings().css({ background: "#Fff" })
        $(".box").eq(num).show().siblings(".box").hide()
        $(".top li").eq(num).children("a").css({ color: "#fff" })
        $(".top li").eq(num).siblings().children("a").css({ color: "#999" })

    })



    function add(a, d, c) {
        $(a).click(function() {
            var index = $(this).index()
            for (var i = 0; i <= index; i++) {
                $(a).eq(i).addClass("yero1")

            }
            $(iy1).click(function() {
                var index1 = $(this).index()
                console.log(index1)
                $(iy1).slice(index1 + 1).removeClass("yero1")

            })
            $(d).click(function() {
                $(iy1).length
            })

        })
    }
    var i1 = $("#i1>i")
    var iy1 = $("#i1>.yero1")
    var df1 = $(".df").eq(0)

    add(i1, df1, iy1)


    function addd(c) {
        $("#i2>i").click(function() {
            var index = $(this).index()
            for (var i = 0; i <= index; i++) {
                $("#i2>i").eq(i).addClass("yero1")

            }
            $("#i2>.yero1").click(function() {
                var index1 = $(this).index()
                console.log(index1)
                $("#i2>.yero1").slice(index1 + 1).removeClass("yero1")

            })
            $(c).click(function() {
                $(".yero1").length
                console.log($(".yero1").length)
            })

        })
    }
    var df2 = $(".df").eq(1)
    addd(df2)


    $("#TextArea1").keyup(function() {
        $("#sy").text($("#TextArea1").val().length + "/")
    })

    $(window).load(function() {
        $(".top>li").eq(2).click(function() {
            var heig = $(".box").height();
            $(".back").css({ height: heig - 200 + "px" })

        })
        $(".top>li").eq(1).click(function() {
            var heig = $(".box").height()
            $(".back").css({ height: heig + 300 + "px" })

        })
        $(".top>li").eq(0).click(function() {
            var heig = $(".box").height();
            $(".back").css({ height: heig + 200 + "px" })
        })
    })

})