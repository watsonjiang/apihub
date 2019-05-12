from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.core import serializers
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from . import models

class HttpResponseUnauthorized(HttpResponse):
    status_code = 401


def index(request):
    return render(request, 'admin/index.html')

class Login(View):
    def get(self, request):
        if not request.user.is_authenticated:
            return HttpResponseUnauthorized()
        else:
            return HttpResponse('ok')

    def post(self, request):
        username = request.POST['user']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse('ok')
        else:
            return HttpResponseUnauthorized('Username or password not correct!')

class Logout(View):
    def post(self, request):
        if request.user is None or request.user.is_anonymous:
            return HttpResponse('ok')
        else:
            logout(request)
            return HttpResponse('ok')


def fill_menu(items, menu, permitted_menus):
    if menu not in permitted_menus:
        return
    item = {}
    item['id'] = menu.id
    item['text'] = menu.text
    item['iconCls'] = menu.icon_cls
    item['parent_id'] = menu.parent.id if menu.parent is not None else None
    item['className'] = menu.class_name
    item['leaf'] = False
    sub_items = []
    for sub_menu in menu.submenus.all():
        fill_menu(sub_items, sub_menu, permitted_menus)
    item['items'] = sub_items
    items.append(item)

class Menu(LoginRequiredMixin, View):
    raise_exception = True

    def get(self, request):
        user_profile = request.user.profile
        permitted_menus = [p.menu for p in user_profile.group.permission_set.all()]

        items = []
        root_menu = models.Menu.objects.get(id=1)
        fill_menu(items, root_menu, permitted_menus)

        rsp = {'items':items}
        return JsonResponse(rsp)

class User(LoginRequiredMixin, View):
    raise_exception = True

    def get(self, request):
        user_profile = request.user.profile
        u = {}
        u['id'] = user_profile.id
        u['name'] = user_profile.name
        u['userName'] = user_profile.username
        u['email'] = user_profile.email
        u['picture'] = user_profile.picture
        u['Group_id'] = user_profile.group.id
        rsp = {'data': [u]}
        return JsonResponse(rsp)

class Group(LoginRequiredMixin, View):
    raise_exception = True

    def get(self, request):
        user_profile = request.user.profile
        group = user_profile.group
        g = {}
        g['id'] = group.id
        g['name'] = group.name
        rsp = {'data': [g]}
        return JsonResponse(rsp)



