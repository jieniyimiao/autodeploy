$(function () {
    $("#content_form_add_dialog").hide();
    $("#content_form_action_add").click(
        function () {
            $("#content_form_add_dialog").dialog(
                {
                    title: '添加主机信息',
                    buttons: {
                        '确定': function () {
                            $(this).dialog("close");
                            var hostname = $("#content_form_add_dialog_hostname_val").val();
                            var ip = $("#content_form_add_dialog_ip_val").val();
                            $.post("/add_host_list/", {"hostname": hostname, "ip": ip},
                                function (data, status, xhr) {
                                    location.reload(true);
                                });
                        },
                        '取消': function () {
                            $(this).dialog("close");
                        }
                    },

                    draggable: true,
                    resizable: true,
                    autoOpen: true,
                    modal: true,
                    position: 'center',
                    height: 240,
                    width: 450
                }
            );
        }
    );

    $("#content_form_action_del").click(
        function () {
            var check_boxs = $("table tr td input ");
            for (var i = 0; i < check_boxs.length; i++) {
                if (check_boxs[i].checked == true) {
                    var id = check_boxs[i].id;
                    $.post("/del_host_list/", {"id": id}, function () {
                        location.reload(true);
                    });
                }
            }

        });

    $("#content_btn input").button();
});