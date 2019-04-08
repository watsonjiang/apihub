from django.contrib.auth.backends import ModelBackend
from .models import UserProfiles

class AdminAuthBackend(ModelBackend):
    '''
    复用django的用户，定制权限系统
    '''
    def get_user_permissions(self, user_obj, obj=None):
        """
        返回用户权限标识
        """
        user_profile = UserProfiles.objects.get(username=user_obj.username)
        user_profile.group
        return

    def get_group_permissions(self, user_obj, obj=None):
        """
        返回用户所在组权限标识
        """
        return []

