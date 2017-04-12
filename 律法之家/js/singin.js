$(function() {
    $('.singin-input>input').eq(0).blur(function() {
        var phone = $('.singin-input>input').eq(0).val();
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            $('.singin-input>input').eq(0).css({ border: "1px solid red" })
        } else {
            $('.singin-input>input').eq(0).css({ border: "1px solid #DFDFE1" })
        }
    })

    $('.singin-input>input').eq(2).blur(function() {
        var phone2 = $('.singin-input>input').eq(2).val().length;
        if (phone2 < 6) {
            $('.singin-input>input').eq(2).css({ border: "1px solid red" })
        } else {
            $('.singin-input>input').eq(2).css({ border: "1px solid #DFDFE1" })
        }
        console.log(phone2)
    })
})