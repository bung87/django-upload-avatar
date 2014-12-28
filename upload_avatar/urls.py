# -*- coding: utf-8 -*-

from django.conf.urls import patterns, url


from . import views

urlpatterns = patterns('',
    url(r'^uploadavatar_upload/?$', views.upload_avatar, name="uploadavatar_upload"),
    url(r'^uploadavatar_crop/?$', views.crop_avatar, name="uploadavatar_crop"),
    url(r'^uploadavatar_settings/?$', views.upload_avatar_settings, name="uploadavatar_settings"),
    url(r'^uploadavatar_style/?$', views.upload_avatar_style, name="uploadavatar_style"),
    url(r'^uploadavatar_script.js$', views.upload_avatar_script, name="uploadavatar_script"),
)