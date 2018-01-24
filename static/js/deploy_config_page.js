$(function () {

    /*对话框先隐藏，需要的时候弹出*/
    $("#common_ip_config_dialog").hide();
    $("#mysql_cluster_ip_config_dialog").hide();
    $("#mongodb_cluster_ip_config_dialog").hide();
    $("#redis_sentinel_ip_config_dialog").hide();
    $("#service_user_config_dialog").hide();
    $("#content_deploy_dialog").hide();

    /*选择组件*/
    $("#component_name").bind("change", function () {
        var component_name = $("#component_name").val();
        switch (component_name) {
            case "mongodb":
                $("#mode_name").html("<option value=\"\" selected=\"selected\" disabled=\"disabled\">请选择" +
                    "                        <option value=\"standalone\">单机</option>\n" +
                    "                        <option value=\"replication\">副本集</option>\n" +
                    "                        <option value=\"cluster\">集群</option>");
                break;
            case "jdk":
                $("#mode_name").html("<option value=\"\" selected=\"selected\" disabled=\"disabled\">请选择" +
                    "                        <option value=\"standalone\">单机</option>");
                break;
            case "mysql":
                $("#mode_name").html("<option value=\"\" selected=\"selected\" disabled=\"disabled\">请选择" +
                    "                        <option value=\"standalone\">单机</option>\n" +
                    "                        <option value=\"cluster\">集群</option>");
                break;
            case "redis":
                $("#mode_name").html("<option value=\"\" selected=\"selected\" disabled=\"disabled\">请选择" +
                    "                        <option value=\"standalone\">单机</option>\n" +
                    "                        <option value=\"cluster\">集群</option>\n" +
                    "                        <option value=\"sentinel\">哨兵</option>");
                break;
            case "zookeeper":
                $("#mode_name").html("<option value=\"\" selected=\"selected\" disabled=\"disabled\">请选择" +
                    "                       <option value=\"standalone\">单机</option>\n" +
                    "                       <option value=\"cluster\">集群</option>");
                break;
        }
    });

    /*选择模式,弹出对应配置对话框*/
    $("#mode_name").bind("change", function () {
        var component_name = $("#component_name").val();
        var mode_name = $("#mode_name").val();

        if (component_name == "mysql" && mode_name == "cluster") {
            $("#mysql_cluster_ip_config_dialog").dialog(
                {
                    title: 'MySQL双主配置',
                    buttons: {
                        '确定': function () {
                            $(this).dialog("close");
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
                    height: 440,
                    width: 500
                }
            );
        }
        else if (component_name == "mongodb" && mode_name == "cluster") {
            $("#mongodb_cluster_ip_config_dialog").dialog(
                {
                    title: 'mongodb集群配置',
                    buttons: {
                        '确定': function () {
                            $(this).dialog("close");
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
                    height: 440,
                    width: 500
                }
            );
        }
        else if (component_name == "redis" && mode_name == "sentinel") {
            $("#redis_sentinel_ip_config_dialog").dialog(
                {
                    title: 'redis-sentinel集群配置',
                    buttons: {
                        '确定': function () {
                            $(this).dialog("close");
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
                    height: 440,
                    width: 500
                }
            );
        }
        else {
            $("#common_ip_config_dialog").dialog(
                {
                    title: '请配置对应的ip',
                    buttons: {
                        '确定': function () {
                            $(this).dialog("close");
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
                    height: 440,
                    width: 500
                }
            );
        }
    });

    /*添加组件*/
    $("#component_operation_btn").click(function () {
        var component_name = $("#component_name").val();
        var mode_name = $("#mode_name").val();
        var conf = {};
        var user = "default";
        var type = "component";

        if (component_name == "mysql" && mode_name == "cluster") {
            var ips = [];
            var hosts = document.getElementsByClassName("dialog-2");
            for (var i = 0; i < hosts.length; i++) {
                if (hosts[i].checked) {
                    var host = hosts[i].value;
                    ips.push(host);
                }
            }
            conf.ips = ips;

            var vip = $("#mysql_cluster_ip_config_dialog_vip_val").val();
            conf.vip = vip;
        }
        else if (component_name == "mongodb" && mode_name == "cluster") {
            var ips = [];
            var hosts = document.getElementsByClassName("dialog-3");
            for (var i = 0; i < hosts.length; i++) {
                if (hosts[i].checked) {
                    var host = hosts[i].value;
                    ips.push(host);
                }
            }
            conf.repl_ips = ips;

            ips = [];
            hosts = document.getElementsByClassName("dialog-4");
            for (var i = 0; i < hosts.length; i++) {
                if (hosts[i].checked) {
                    var host = hosts[i].value;
                    ips.push(host);
                }
            }
            conf.conf_ips = ips;

            ips = [];
            hosts = document.getElementsByClassName("dialog-5");
            for (var i = 0; i < hosts.length; i++) {
                if (hosts[i].checked) {
                    var host = hosts[i].value;
                    ips.push(host);
                }
            }
            conf.os_ips = ips;
        }
        else if (component_name == "redis" && mode_name == "sentinel") {
            var ips = [];
            var hosts = document.getElementsByClassName("dialog-6");
            for (var i = 0; i < hosts.length; i++) {
                if (hosts[i].checked) {
                    var host = hosts[i].value;
                    ips.push(host);
                }
            }
            conf.redis_ips = ips;

            ips = [];
            hosts = document.getElementsByClassName("dialog-7");
            for (var i = 0; i < hosts.length; i++) {
                if (hosts[i].checked) {
                    var host = hosts[i].value;
                    ips.push(host);
                }
            }
            conf.sentinel_ips = ips;
        }
        else {
            var ips = [];
            var hosts = document.getElementsByClassName("dialog-1");
            for (var i = 0; i < hosts.length; i++) {
                if (hosts[i].checked) {
                    var host = hosts[i].value;
                    ips.push(host);
                }
            }
            conf.ips = ips;
        }

        $.post("/add_deploy_config/", {
                "component_name": component_name,
                "mode_name": mode_name,
                "user": user,
                "type": type,
                "conf": JSON.stringify(conf)
            },
            function (data, status, xhr) {
                location.reload(true);
            });
    });

    /*删除组件或者服务列表*/
    $(".content_service_list_del_btn").click(
        function () {
            var id = $(this).attr("id");
            $.post("/del_deploy_config/", {"id": id}, function (data, status, xhr) {
                location.reload(true);
            });
        });

    /*选择服务*/
    $("#service_name").bind("change", function () {
        var service_name = $("#service_name").val();
        console.log(service_name);
        switch (service_name) {
            case "rocket_mq":
                $("#service_mode_name").html("<option value=\"\" selected=\"selected\" disabled=\"disabled\">请选择" +
                    "                        <option value=\"standalone\">单机</option>" +
                    "                        <option value=\"cluster\" disabled=\"disabled\">集群</option>");
                break;
            default:
                $("#service_mode_name").html("<option value=\"\" selected=\"selected\" disabled=\"disabled\">请选择" +
                    "                        <option value=\"standalone\">单机</option>");
                break;
        }
    });

    /*自定义用户*/
    $("#content_service_deploy_panel_user_content input").click(function () {
        var isChecked = $(this).is(":checked");
        if (isChecked) {
            $("#service_user_config_dialog").dialog(
                {
                    title: '配置服务用户名',
                    buttons: {
                        '确定': function () {
                            $(this).dialog("close");
                        },
                        '取消': function () {
                            $("#content_service_deploy_panel_user_content_checkbox").attr("checked", false);
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
    });

    /*添加服务*/
    $("#service_operation_btn").click(function () {
        var service_name = $("#service_name").val();
        var service_mode_name = $("#service_mode_name").val();
        var user = "default";
        var type = "service";
        var isChecked = $("#content_service_deploy_panel_user_content_checkbox").is(":checked");
        if (isChecked) {
            user = $("#service_user_config_dialog_user_val").val();
        }

        var conf = {};
        var ips = [];
        var hosts = document.getElementsByClassName("dialog-1");
        for (var i = 0; i < hosts.length; i++) {
            if (hosts[i].checked) {
                var host = hosts[i].value;
                ips.push(host);
            }
        }
        conf.ips = ips;

        $.post("/add_deploy_config/", {
                "component_name": service_name,
                "mode_name": service_mode_name,
                "user": user,
                "type": type,
                "conf": JSON.stringify(conf)
            },
            function (data, status, xhr) {
                location.reload(true);
            });
    });

    /*服务选择ip,弹出ip选择对话框*/
    $("#content_service_deploy_panel_host_content_btn").click(function () {
        $("#common_ip_config_dialog").dialog(
            {
                title: '请配置对应的ip',
                buttons: {
                    '确定': function () {
                        $(this).dialog("close");
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
                height: 440,
                width: 500
            }
        );
    });

    /*一键部署*/
    $("#content_deploy button").button();
    $("#content_deploy button").click(
        function () {
            $("#content_deploy_dialog").dialog(
                {
                    title: '确定开始一键部署所选组件?',
                    buttons: {
                        '确定': function () {
                            $(this).dialog("close");
                            /*#########这里需要检查所选组件和服务是否适合一键部署#########*/
                            $.post("/config_and_start_deploy/", {},
                                function (data, status, xhr) {
                                   window.location.href = "/get_deploying_page/";
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
                    height: 200,
                    width: 350
                }
            );
        }
    );

});

