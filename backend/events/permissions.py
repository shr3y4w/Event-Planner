from rest_framework import permissions

class IsEventMakerOrAdmin(permissions.BasePermission):
    """
    Custom permission to allow only the event maker or admin to perform CRUD operations.
    """

    def has_object_permission(self, request, view, obj):
        # Read-only permissions are allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Allow if user is admin or the event maker
        return obj.created_by == request.user or request.user.is_staff

