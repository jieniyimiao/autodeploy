function DropDown(el) {
    this.dd = el;
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = [];
    this.index = [];
    this.initEvents();
}

DropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            /*$(this).siblings().hide();*/
            $(this).zIndex(9999);/*保证在最上面*/

            event.stopPropagation();
        });

        obj.opts.children('label').on('click', function (event) {
            var opt = $(this).parent(),
                chbox = opt.children('input'),
                val = chbox.val(),
                idx = opt.index();

            ($.inArray(val, obj.val) !== -1) ? obj.val.splice($.inArray(val, obj.val), 1) : obj.val.push(val);
            ($.inArray(idx, obj.index) !== -1) ? obj.index.splice($.inArray(idx, obj.index), 1) : obj.index.push(idx);
        });
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
};

$(function () {

    var d1 = new DropDown($('#d1'));

    var d2 = new DropDown($('#d2'));

    var d3 = new DropDown($('#d3'));
    var d4 = new DropDown($('#d4'));
    var d5 = new DropDown($('#d5'));

    var d6 = new DropDown($('#d6'));
    var d7 = new DropDown($('#d7'));

    var d8 = new DropDown($('#d8'));

    $(document).click(function () {
        // all dropdowns
        $('.wrapper-dropdown-4').removeClass('active');
    });

});
