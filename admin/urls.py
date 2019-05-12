from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.Login.as_view(), name='login'),
    path('logout', views.Logout.as_view(), name='logout'),
    path('menu', views.Menu.as_view(), name='menu'),
    path('group', views.Group.as_view(), name='group'),
    path('user', views.User.as_view(), name='user'),
]