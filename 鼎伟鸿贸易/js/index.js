$(function() {
    $(".tab>ul>li").eq(0).css({ borderBottom: "2px solid red" })
    $(".tab-vide>ul>li").eq(1).hide()
    $(".tab>ul>li").click(function() {
        $(this).css({ borderBottom: "2px solid red" }).siblings().css({ border: "0" })
        var index = $(this).index()
        $(".tab-vide>ul>li").eq(index).show().siblings().hide()
    })
    var li = $(".videoBox>ul>li").width()
    var num = 0;
    var leng = $(".videoBox>ul>li").length
    var left = $(".videoBox").offset().left;

    setInterval(function() {
        num++;
        console.log(leng)
        if (num >= (leng - 1)) {
            $(".videoBox").css({ marginLeft: "0px" })
            setTimeout(function() { num = 0 }, 2000)
        } else {
            $(".videoBox").animate({ marginLeft: -(num * li) + "px" },
                2000)
        }
    }, 2000)




})