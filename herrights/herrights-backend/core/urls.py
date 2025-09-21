from django.urls import path
from .views import ask_ai, user_rewards, share_story

urlpatterns = [
    path('ask-ai/', ask_ai, name='ask-ai'),
    path('user-rewards/', user_rewards, name='user-rewards'),
    path('share-story/', share_story, name='share-story'),
]

