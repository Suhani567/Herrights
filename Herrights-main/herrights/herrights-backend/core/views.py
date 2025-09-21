from django.shortcuts import render
from django.db import models

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Law, Complaint, DocumentTemplate, GeneratedDocument

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

@api_view(['GET'])
def get_laws(request):
    """
    Get all laws with optional filtering by category and search
    """
    laws = Law.objects.all()

    # Filter by category
    category = request.GET.get('category')
    if category and category != 'all':
        laws = laws.filter(category=category)

    # Search functionality
    search = request.GET.get('search')
    if search:
        laws = laws.filter(
            models.Q(title__icontains=search) |
            models.Q(description__icontains=search) |
            models.Q(content__icontains=search)
        )

    # Serialize the data
    laws_data = []
    for law in laws:
        laws_data.append({
            'id': law.id,
            'title': law.title,
            'category': law.category,
            'description': law.description,
            'content': law.content,
            'importance': law.importance,
            'created_date': law.created_date,
            'updated_date': law.updated_date
        })

    return Response({
        'laws': laws_data,
        'count': len(laws_data)
    })

@api_view(['GET'])
def get_law_detail(request, law_id):
    """
    Get detailed information about a specific law
    """
    try:
        law = Law.objects.get(id=law_id)
        law_data = {
            'id': law.id,
            'title': law.title,
            'category': law.category,
            'description': law.description,
            'content': law.content,
            'importance': law.importance,
            'created_date': law.created_date,
            'updated_date': law.updated_date
        }
        return Response(law_data)
    except Law.DoesNotExist:
        return Response({'error': 'Law not found'}, status=404)

@api_view(['POST'])
def submit_complaint(request):
    """
    Submit a new complaint
    """
    try:
        data = request.data

        # Create complaint instance
        complaint = Complaint.objects.create(
            complaint_type=data.get('complaintType'),
            victim_name=data.get('victimName'),
            victim_age=int(data.get('victimAge')),
            victim_gender=data.get('victimGender', 'female'),
            contact_number=data.get('contactNumber'),
            email=data.get('email'),
            address=data.get('address'),
            incident_date=data.get('incidentDate'),
            incident_location=data.get('incidentLocation'),
            incident_description=data.get('incidentDescription'),
            witnesses=data.get('witnesses'),
            police_station=data.get('policeStation'),
            urgency=data.get('urgency', 'medium'),
            previous_complaints=data.get('previousComplaints'),
            additional_info=data.get('additionalInfo')
        )

        return Response({
            'message': 'Complaint submitted successfully',
            'complaint_id': complaint.complaint_id,
            'status': complaint.status
        }, status=201)

    except Exception as e:
        return Response({
            'error': 'Failed to submit complaint',
            'details': str(e)
        }, status=400)

@api_view(['GET'])
def get_complaints(request):
    """
    Get all complaints with optional filtering
    """
    complaints = Complaint.objects.all()

    # Filter by status
    status = request.GET.get('status')
    if status:
        complaints = complaints.filter(status=status)

    # Filter by complaint type
    complaint_type = request.GET.get('complaint_type')
    if complaint_type:
        complaints = complaints.filter(complaint_type=complaint_type)

    # Filter by urgency
    urgency = request.GET.get('urgency')
    if urgency:
        complaints = complaints.filter(urgency=urgency)

    # Serialize the data
    complaints_data = []
    for complaint in complaints:
        complaints_data.append({
            'id': complaint.id,
            'complaint_id': complaint.complaint_id,
            'complaint_type': complaint.complaint_type,
            'victim_name': complaint.victim_name,
            'victim_age': complaint.victim_age,
            'victim_gender': complaint.victim_gender,
            'contact_number': complaint.contact_number,
            'email': complaint.email,
            'address': complaint.address,
            'incident_date': complaint.incident_date,
            'incident_location': complaint.incident_location,
            'incident_description': complaint.incident_description,
            'witnesses': complaint.witnesses,
            'police_station': complaint.police_station,
            'urgency': complaint.urgency,
            'previous_complaints': complaint.previous_complaints,
            'additional_info': complaint.additional_info,
            'status': complaint.status,
            'created_date': complaint.created_date,
            'updated_date': complaint.updated_date
        })

    return Response({
        'complaints': complaints_data,
        'count': len(complaints_data)
    })

@api_view(['GET'])
def get_complaint_detail(request, complaint_id):
    """
    Get detailed information about a specific complaint
    """
    try:
        complaint = Complaint.objects.get(complaint_id=complaint_id)
        complaint_data = {
            'id': complaint.id,
            'complaint_id': complaint.complaint_id,
            'complaint_type': complaint.complaint_type,
            'victim_name': complaint.victim_name,
            'victim_age': complaint.victim_age,
            'victim_gender': complaint.victim_gender,
            'contact_number': complaint.contact_number,
            'email': complaint.email,
            'address': complaint.address,
            'incident_date': complaint.incident_date,
            'incident_location': complaint.incident_location,
            'incident_description': complaint.incident_description,
            'witnesses': complaint.witnesses,
            'police_station': complaint.police_station,
            'urgency': complaint.urgency,
            'previous_complaints': complaint.previous_complaints,
            'additional_info': complaint.additional_info,
            'status': complaint.status,
            'created_date': complaint.created_date,
            'updated_date': complaint.updated_date
        }
        return Response(complaint_data)
    except Complaint.DoesNotExist:
        return Response({'error': 'Complaint not found'}, status=404)

@api_view(['PUT'])
def update_complaint_status(request, complaint_id):
    """
    Update the status of a complaint
    """
    try:
        complaint = Complaint.objects.get(complaint_id=complaint_id)
        new_status = request.data.get('status')

        if new_status not in ['pending', 'under_investigation', 'resolved', 'rejected']:
            return Response({'error': 'Invalid status'}, status=400)

        complaint.status = new_status
        complaint.save()

        return Response({
            'message': 'Complaint status updated successfully',
            'complaint_id': complaint.complaint_id,
            'status': complaint.status
        })

    except Complaint.DoesNotExist:
        return Response({'error': 'Complaint not found'}, status=404)
    except Exception as e:
        return Response({
            'error': 'Failed to update complaint status',
            'details': str(e)
        }, status=400)

@api_view(['GET'])
def get_document_templates(request):
    """
    Get all active document templates with optional filtering by category
    """
    templates = DocumentTemplate.objects.filter(is_active=True)

    # Filter by category
    category = request.GET.get('category')
    if category:
        templates = templates.filter(category=category)

    # Serialize the data
    templates_data = []
    for template in templates:
        templates_data.append({
            'id': template.id,
            'title': template.title,
            'description': template.description,
            'category': template.category,
            'fields': template.fields,
            'created_date': template.created_date,
            'updated_date': template.updated_date
        })

    return Response({
        'templates': templates_data,
        'count': len(templates_data)
    })

@api_view(['GET'])
def get_document_template_detail(request, template_id):
    """
    Get detailed information about a specific document template
    """
    try:
        template = DocumentTemplate.objects.get(id=template_id, is_active=True)
        template_data = {
            'id': template.id,
            'title': template.title,
            'description': template.description,
            'category': template.category,
            'fields': template.fields,
            'template_content': template.template_content,
            'created_date': template.created_date,
            'updated_date': template.updated_date
        }
        return Response(template_data)
    except DocumentTemplate.DoesNotExist:
        return Response({'error': 'Document template not found'}, status=404)

@api_view(['POST'])
def generate_document(request):
    """
    Generate a document using a template and user data
    """
    try:
        data = request.data
        template_id = data.get('template_id')
        user_data = data.get('user_data', {})

        # Get the template
        template = DocumentTemplate.objects.get(id=template_id, is_active=True)

        # Generate document content by replacing placeholders
        generated_content = template.template_content
        for key, value in user_data.items():
            placeholder = f"{{{{{key}}}}}"
            generated_content = generated_content.replace(placeholder, str(value))

        # Save the generated document
        generated_doc = GeneratedDocument.objects.create(
            template=template,
            user_data=user_data,
            generated_content=generated_content
        )

        return Response({
            'message': 'Document generated successfully',
            'document_id': generated_doc.document_id,
            'generated_content': generated_content
        }, status=201)

    except DocumentTemplate.DoesNotExist:
        return Response({'error': 'Document template not found'}, status=404)
    except Exception as e:
        return Response({
            'error': 'Failed to generate document',
            'details': str(e)
        }, status=400)

@api_view(['GET'])
def get_generated_documents(request):
    """
    Get all generated documents for the user
    """
    documents = GeneratedDocument.objects.all()

    # Serialize the data
    documents_data = []
    for document in documents:
        documents_data.append({
            'id': document.id,
            'document_id': document.document_id,
            'template_title': document.template.title,
            'template_category': document.template.category,
            'created_date': document.created_date,
            'user_data': document.user_data
        })

    return Response({
        'documents': documents_data,
        'count': len(documents_data)
    })

@api_view(['GET'])
def get_generated_document_detail(request, document_id):
    """
    Get detailed information about a specific generated document
    """
    try:
        document = GeneratedDocument.objects.get(document_id=document_id)
        document_data = {
            'id': document.id,
            'document_id': document.document_id,
            'template_title': document.template.title,
            'template_category': document.template.category,
            'generated_content': document.generated_content,
            'user_data': document.user_data,
            'created_date': document.created_date
        }
        return Response(document_data)
    except GeneratedDocument.DoesNotExist:
        return Response({'error': 'Generated document not found'}, status=404)

def home(request):
    """
    Home view that serves the React frontend or provides a basic response
    """
    return render(request, 'index.html')
