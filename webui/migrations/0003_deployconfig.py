# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-01-11 06:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webui', '0002_hostlist'),
    ]

    operations = [
        migrations.CreateModel(
            name='DeployConfig',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('component_name', models.CharField(max_length=255)),
                ('mode_name', models.CharField(max_length=255)),
                ('type', models.CharField(max_length=255)),
                ('conf', models.CharField(max_length=1023)),
                ('user_name', models.CharField(max_length=255)),
            ],
        ),
    ]
