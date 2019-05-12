from django.db import models
from django.contrib.auth.models import User

class Menu(models.Model):
    text = models.CharField(max_length=45)
    icon_cls = models.CharField(max_length=15, null=True)
    class_name = models.CharField(max_length=45, null=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, related_name='submenus')

class UserProfile(models.Model):
    #复用django账号,扩展业务相关信息
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    picture = models.CharField(max_length=100, null=True)
    #目前一个用户只归属一个组
    group = models.ForeignKey('Group', on_delete=models.CASCADE)

class Group(models.Model):
    name = models.CharField(max_length=45)


class Permission(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

