// $(function() {
//     $(".checkall").click(function() {
//         $(".check>ul>li").children("input").attr("checked", true);
//     });
// });

$(function() {
    $("#checkAll").click(function() {
        $('input[name="subBox"]').attr("checked", this.checked);
    });
    var $subBox = $("input[name='subBox']");

    $subBox.click(function() {
        console.log($subBox.length)
        $("#checkAll").attr("checked", $subBox.length == $("input[name='subBox']:checked").length ? true : false);
    });
});