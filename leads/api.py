from rest_framework import viewsets, permissions

from .models import Lead
from .serializers import LeadSerializer


class LeadViewset(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
