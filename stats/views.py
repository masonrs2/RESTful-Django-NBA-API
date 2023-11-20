from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic, View
from .forms import CustomUserCreationForm
from django.http import JsonResponse


class SignUpView(generic.CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'


class CheckLoginView(View):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return JsonResponse({'is_authenticated': True})
        else:
            return JsonResponse({'is_authenticated': False})