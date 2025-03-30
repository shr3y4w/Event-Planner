from rest_framework import permissions

class IsEventPlanner(permissions.BasePermission):
    """
    Custom permission to allow only event planners to access certain views.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'event_planner'
