"""autodeploy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from webui import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    # global config
    url(r'^test/$', views.test),
    url(r'^$', views.index),
    url(r'^template/$', views.template),
    url(r'^get_global_config_page/$', views.get_global_config_page),
    url(r'^save_global_config/$', views.save_global_config),
    url(r'^index/$', views.index),

    # host list
    url(r'^get_host_list_page/$', views.get_host_list_page),
    url(r'^add_host_list/$', views.add_host_list),
    url(r'^del_host_list/$', views.del_host_list),

    # deploy config
    url(r'^get_deploy_config_page/$', views.get_deploy_config_page),
    url(r'^add_deploy_config/$', views.add_deploy_config),
    url(r'^del_deploy_config/$', views.del_deploy_config),

    # deploying
    url(r'^get_deploying_page/$', views.get_deploying_page),
    url(r'^config_and_start_deploy/$', views.config_and_start_deploy),
]
