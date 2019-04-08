from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from .models import Menu

class HttpResponseUnauthorized(HttpResponse):
    status_code = 401


def index(request):
    return render(request, 'admin/index.html')

class Login(View):
    def get(self, request):
        if request.user.is_anonymous:
            return HttpResponseUnauthorized()
        else:
            return HttpResponse('ok')

    def post(self, request):
        username = request.POST['user']
        password = request.POST['password']
        print(username, password)
        user = authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            login(request, user)
            return HttpResponse('ok')
        else:
            return HttpResponseUnauthorized('Username or password not correct!')

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

def menu(request):
    if request.user.is_anonymous:
        return JsonResponse({})
    else:
        user_profile = request.user.profile
        permitted_menus = [p.menu for p in user_profile.group.permission_set.all()]

        items = []
        root_menu = Menu.objects.get(id=1)
        fill_menu(items, root_menu, permitted_menus)

        rsp = {'items':items}
        return JsonResponse(rsp)
