# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.

class UserInfo(models.Model):
    user = models.CharField(max_length=32)
    pwd = models.CharField(max_length=32)


class GlobalConfig(models.Model):
    user = models.CharField(max_length=255)
    pwd = models.CharField(max_length=255)
    enable_debug = models.BooleanField()


class HostList(models.Model):
    host_name = models.CharField(max_length=255)
    ip = models.CharField(max_length=255)
    status = models.CharField(max_length=255)


class DeployConfig(models.Model):
    component_name = models.CharField(max_length=255)
    mode_name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    conf = models.CharField(max_length=1023)
    user_name = models.CharField(max_length=255)
