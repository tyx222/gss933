var placeholder = function(obj) {
    obj.find('input[placeholder],textarea').each(function(index) {
        var bver = 10;
        if (navigator.appName == "Microsoft Internet Explorer" 
            && navigator.appVersion.match(/7./i) == "7.") {
            bver = 7;
        } else if (navigator.appName == "Microsoft Internet Explorer" 
            && navigator.appVersion.match(/8./i) == "8.") {
            bver = 8;
        } else if (navigator.appName == "Microsoft Internet Explorer" 
            && navigator.appVersion.match(/9./i) == "9.") {
            bver = 9;
        } else if (navigator.appName == "Microsoft Internet Explorer") {
            bver = 6;
        }
        if (bver < 9) {
            $(this).focus(function() {
                if ($(this).val() == $(this).attr('placeholder')) {
                    $(this).val('').css('color', '#333333');
                }
            }).blur(function() {
                if ($.trim($(this).val()) == '') {
                    $(this).val($(this).attr('placeholder')).css('color', '#aaaaaa');
                }
            });
            if ($.trim($(this).val()) == '') {
                $(this).val($(this).attr('placeholder')).css('color', '#aaaaaa');
            }
        }
    });
};

/*** 自定义下拉框插件；DOM结构示例：
    <input type="text" class="selectbox" data-list="0~100,101~200,201~300,301~500,500以上">
    <input type="text" class="selectbox" data-list="五星@1,四星@2,三星@3">
***/
;(function($){
    $.fn.extend({
        selectbox: function(cfg) {
            var dom_id = 'hgg_selectbox';
            var option = {
                onSelect: function($curr_obj){}
            };
            if (typeof cfg == 'object') {
                option = $.extend(option, cfg);
            }
            $(document.body).on('click', function(event) {
                // 因为用了阻止事件冒泡，所以这里可以直接隐藏弹层
                $('#'+dom_id).hide();
            });
            return this.each(function(){
                var $curr = $(this);
                var data = $curr.data('list');
                if (!data) return this;
                $curr.click(function(event){
                    if (option.befor_run) option.befor_run();
                    event.stopPropagation();
                    var list = data.split(',');
                    var width = $curr.outerWidth();
                    var left = $curr.offset().left,
                        top = $curr.offset().top + $curr.outerHeight();
                    var $target = $('#'+dom_id);
                    if (!$target.get(0)) {
                        $target = $('<ul>').attr({id: dom_id});
                        $target.css({position:'absolute', display: 'none', width: width, zIndex: 99998});
                        $target.appendTo($('body'));
                    } else {
                        $target.html('');
                    }
                    for (var i in list) {
                        var exp = list[i].split('@');
                        var key = exp[0], val = exp[1] ? exp[1] : exp[0];
                        var $li = $('<li data-value="'+val+'">').text(key);
                        $li.click(function(event){
                            event.stopPropagation();
                            var value = $(this).data('value'), name = $(this).text();
                            $('#'+dom_id).hide(); $curr.val(value).text(value);
                            if (typeof option.onSelect == 'function') {
                                return option.onSelect($curr);
                            }
                            return false;
                        });
                        $target.append($li);
                    }
                    $target.css({left: left, top: top, display: 'block'});
                    return false;
                });
                return this;
            });
        }
    });
})(jQuery);

// 自定义 loading 插件
// 调用方式：
// 显示 $.loading({show: true, parent: $('.ht_sch')}); 
// 隐藏 $.loading({show: false});
;(function($){
    // 预加载loading图片
    var img_url = '/img/loading.gif';
    var img = new Image();
        img.src = img_url;
    $.extend({
        // 加载展示动画层
        loading: function(cfg) {
            var dom_id = 'global_loading';
            var $loading = $('#'+dom_id);
            var option = {show: true, parent: null};
            if (cfg) option = $.extend(option, cfg);
            if (!$loading.get(0)) {
                $loading = $('<div>').attr({id: dom_id}).appendTo($('body'));
            }
            if (option.parent && option.parent.get(0)) {
                var $box = option.parent;
                var style = {
                    position: 'absolute',
                    background: 'url('+img_url+') no-repeat center',
                    left : $box.offset().left,
                    top : $box.offset().top,
                    width: $box.outerWidth(),
                    height: $box.outerHeight()
                };
                $loading.css(style);
            }
            if ($loading.get(0)) {
                option.show ? $loading.show() : $loading.hide();
            }
        }
    });
})(jQuery);

$(function() {
    // 兼容老版本浏览器的 placeholder
    placeholder($('body'));

    // 顶部通用选择城市功能
    var $chooseCity = $('.hgg-header .header-local .local-city-link > span');
    if ($chooseCity.get(0) && typeof($.fn.popCity) == 'function') {
        $chooseCity.popCity(function(cityId, item, $that) {
            // 存一下选择的城市ID和名称到COOKIE中
            $.cookie('curr_cookie_city_name', item.name, {path: '/', expires: 365});
            $.cookie('curr_cookie_city_id', cityId, {path: '/', expires: 365});
            // 如果当前页面是酒店列表页，则更改默认城市为选择的城市
            if (/^\/venue/g.test(window.location.pathname)) {
                var url = [null, 'venue', item.url, null].join('/');
                return window.location.href = url;
            }
            // // 如果是会议顾问页面，自动跳转到选择的城市
            // if (/^\/planner/g.test(window.location.pathname)) {
            //     var url = '/planner?city=' + item.name;
            //     return window.location.href = url;
            // }
            window.location.href = window.location.href;
        });
    }

    // 顶部登录后个人资料下拉菜单
    var $profile = $('.hgg-header-box .header-wrap .login-info .login-user');
    if ($profile.get(0)) {
        var profileMenuTimer = false;
        var profileMenuId = 'js-hgg-header-profile-menu';
        var $profileMenu = $('#'+profileMenuId);
        if (!$profileMenu.get(0)) {
            $profileMenu = $('<div class="login-user-list">\
                <ul>\
                    <li><a href="/my"><i class="hggfont hgg-user"></i>个人中心</a></li>\
                    <li><a href="/my/rfp/hotel"><i class="hggfont hgg-shouju"></i>订单管理</a></li>\
                    <li><a href="/logout"><i class="hggfont hgg-tuichu"></i>退出</a></li>\
                </ul>\
                <i class="login-user-arrow"></i>\
            </div>').attr('id', profileMenuId);
            $profileMenu.hover(function(){
                if (profileMenuTimer) {
                    clearTimeout(profileMenuTimer);
                }
            }, function(){
                $(this).hide();
            });
            $profileMenu.appendTo($('body'));
            $profileMenu.hide();
        }
        $profile.hover(function(){
            var pos = $(this).offset();
            var height = $(this).outerHeight() ? $(this).outerHeight() : $(this).height();
                height = parseInt(height) ? parseInt(height) : 20;
            $profileMenu.css({
                position: 'absolute', 
                left: pos.left, 
                top: pos.top + height + 10, 
                zIndex: 10000
            }).show();
        }, function(){
            profileMenuTimer = setTimeout(function(){
                $profileMenu.hide();
            }, 800);
        });
    }

    // 日期选择器（使用Pikaday插件）
    if (typeof(Pikaday) == 'function') {
        $('input.datepicker').each(function(){
            var now = new Date();
            var day = now.toLocaleString().split(' ')[0].replace(/\//g, '-');

            var $handle = $(this);
            var picker = new Pikaday({
                field: $handle.get(0),
                firstDay: 1,
                minDate: new Date(day),
                maxDate: new Date('2020-12-31'),
                yearRange: [2000, 2020],
                onSelect: function() {
                    var callFuncName = $handle.attr('callback');
                    if ($handle && callFuncName && typeof(window[callFuncName]) == 'function') {
                        window[callFuncName]($handle);
                    }
                },
                i18n: {
                    previousMonth : '上月',
                    nextMonth     : '下月',
                    months        : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
                    weekdays      : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
                    weekdaysShort : '日_一_二_三_四_五_六'.split('_')
                }
            });
        });
    }

    // 自定义下拉框选择器
    if (typeof($.fn.selectbox) == 'function') {
        $('input.selectbox').selectbox({
            befor_run: function(){
                $('.pop_city_box,#hgg_selectbox').hide();
            },
            onSelect: function($handle){
                var callFuncName = $handle.attr('callback');
                if ($handle && callFuncName && typeof(window[callFuncName]) == 'function') {
                    window[callFuncName]($handle);
                }
            }
        });
    }

    // 自定义城市选择弹层
    if (typeof($.fn.popCity) == 'function') {
        $('input[name=city_name]').popCity(function(cityId, item, $handle){
            var callFuncName = $handle.attr('callback');
            if ($handle && callFuncName && typeof(window[callFuncName]) == 'function') {
                window[callFuncName]($handle, cityId, item);
            }
        });
    }
});

//手机号码格式化 (xxx xxxx xxxx)
var mobileFormat = function (number) {
    var reg = /^(\d{3})(\d{4})(\d{4})$/;
    var matches = reg.exec(number);
    return matches[1] + '-' + matches[2] + '-' + matches[3];
};


/* back top */
$(function(){
    var offsetTop = 100;
    var $backTop = $('<span class="back-top"><i class="hggfont hgg-dingbuduiqi"></i></span>');
    $backTop.attr('title', '返回顶部').click(function(){
        $('html,body').animate({scrollTop: 0}, 500);
    });
    $('body').append($backTop);

    $(window).scroll(function(){
        var scrollTop = $(document).scrollTop();
        if (scrollTop > offsetTop){
            $backTop.fadeIn(100);
        } else {
            $backTop.fadeOut(200);
        };
    });
});

