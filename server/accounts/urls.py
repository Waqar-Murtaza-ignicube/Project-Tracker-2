"""imported modules"""
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.SignUpView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('membersignup/', views.MemberSignupView.as_view(), name='member_signup'),
]
