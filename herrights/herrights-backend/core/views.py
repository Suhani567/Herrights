from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

def generate_ai_answer(question):
    return f"You asked: '{question}'. Here's a placeholder answer."

@api_view(['POST'])
def ask_ai(request):
    data = request.data
    question = data.get('question','')

    if not question:
        return Response({'error': 'Question is required.'},status=400)
    answer = generate_ai_answer(question)
    return Response({'answer': answer})

def home(request):
    """
    Home view that serves the React frontend or provides a basic response
    """
    return render(request, 'index.html')
