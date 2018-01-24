# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from webui import models
#from tools.ping import ping

# Create your views here.

user_list = [{"user": "jack", "pwd": "abc"}, {"user": "tom", "pwd": "def"}]


def test(request):
    # return HttpResponse("Hello Django!")
    if request.method == 'POST':
        username = request.POST.get("username", "xx")
        password = request.POST.get("password", "xx")
        tmp = {"user": username, "pwd": password}
        user_list.append(tmp)
        print(username, password)

        models.UserInfo.objects.create(user=username, pwd=password)

    users = models.UserInfo.objects.all()
    print("users: ", users)
    # return render(request, "test.html", {"data": user_list})
    return render(request, "test.html", {"data": users})


def template(request):
    return render(request, "template.html")


# 获取主页
def index(request):
    return render(request, "index.html")


# ----------------------全局配置-----------------------------
# 获取全局配置页面，数据库中有配置也显示到页面中
def get_global_config_page(request):
    global_config_data = models.GlobalConfig.objects.all().first()
    return render(request, "global_config_page.html", {"data": global_config_data})


# 保存全局配置，先删除旧配置，然后插入新配置
def save_global_config(request):
    if request.method == 'POST':
        username = request.POST.get("username", None)
        password = request.POST.get("password", None)
        enable_debug = request.POST.get("enable_debug", None)

        if enable_debug is None:
            enable_debug = False
        else:
            enable_debug = True

        models.GlobalConfig.objects.filter().delete()
        models.GlobalConfig.objects.update_or_create(user=username, pwd=password, enable_debug=enable_debug)
    # 获取并返回下一页的数据
    host_list = models.HostList.objects.all()
    return render(request, "host_list_page.html", {"data": host_list})


# ----------------------主机管理-----------------------------
def get_host_list_page(request):
    host_list = models.HostList.objects.all().order_by("ip")
    return render(request, "host_list_page.html", {"data": host_list})


def add_host_list(request):
    if request.method == 'POST':
        hostname = request.POST.get("hostname", None)
        ip = request.POST.get("ip", None)
        #status = ping(ip)
        status = "ok"
        models.HostList.objects.update_or_create(host_name=hostname, ip=ip, status=status)
    return HttpResponse("ok")


def del_host_list(request):
    if request.method == 'POST':
        id = request.POST.get("id", None)
        models.HostList.objects.filter(id=id).delete()
    return HttpResponse("ok")


# ----------------------部署配置-----------------------------
def get_deploy_config_page(request):
    host_list = models.HostList.objects.all().order_by("ip")
    deploy_config = models.DeployConfig.objects.all()
    return render(request, "deploy_config_page.html", {"host_list": host_list, "deploy_config": deploy_config})


def add_deploy_config(request):
    if request.method == 'POST':
        component_name = request.POST.get("component_name", None)
        mode_name = request.POST.get("mode_name", None)
        type = request.POST.get("type", None)
        conf = request.POST.get("conf", None)
        user_name = request.POST.get("user", "default")

        print(conf)

        models.DeployConfig.objects.create(component_name=component_name, mode_name=mode_name,
                                           conf=conf, user_name=user_name, type=type)
    return HttpResponse("ok")


def del_deploy_config(request):
    if request.method == 'POST':
        id = request.POST.get("id", None)
        models.DeployConfig.objects.filter(id=id).delete()
    return HttpResponse("ok")


# ----------------------正在部署-----------------------------
def get_deploying_page(request):
    return render(request, "deploying_page.html")


def config_and_start_deploy(request):
    if request.method == 'POST':
        print("start deploy...")
        pass
    return HttpResponse("ok")
