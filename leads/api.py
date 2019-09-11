from rest_framework import viewsets, permissions

from .models import Lead
from .serializers import LeadSerializer


class LeadViewset(viewsets.ModelViewSet):
    serializer_class = LeadSerializer

    def get_queryset(self):
        return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
