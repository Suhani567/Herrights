from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from openai import OpenAI
import os
import logging
import json
from datetime import datetime

# Set up logging
logger = logging.getLogger(__name__)

# Initialize OpenAI client
client = None
try:
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key:
        client = OpenAI(api_key=api_key)
        logger.info("OpenAI client initialized successfully")
    else:
        logger.error("OPENAI_API_KEY environment variable not set")
except Exception as e:
    logger.error(f"Failed to initialize OpenAI client: {str(e)}")

def generate_ai_answer(question):
    """
    Generate AI answer using OpenAI API with improved error handling
    """
    if not client:
        # Fallback to mock responses when OpenAI client is not available
        return generate_mock_answer(question)

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": question}],
            max_tokens=500,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"OpenAI API error: {str(e)}")
        # Fallback to mock responses when API fails
        return generate_mock_answer(question)

def generate_mock_answer(question):
    """
    Generate mock AI responses for demonstration purposes
    """
    question_lower = question.lower()

    # Check for random/unrelated queries - including casual conversation
    random_words = [
        'apple', 'ball', 'cat', 'dog', 'house', 'car', 'tree', 'book',
        'phone', 'computer', 'table', 'chair', 'water', 'food', 'music',
        'movie', 'game', 'sport', 'color', 'weather', 'time', 'day',
        'night', 'sun', 'moon', 'star', 'sky', 'earth', 'world', 'test',
        'hello', 'hi', 'hey', 'random', 'word', 'thing', 'stuff', 'item'
    ]

    # Common conversational/greeting words that indicate casual chat
    conversational_words = [
        'hello', 'hi', 'hey', 'howdy', 'greetings', 'good', 'morning', 'afternoon', 'evening',
        'how', 'are', 'you', 'doing', 'feeling', 'going', 'been', 'what', 'about', 'your',
        'day', 'today', 'tomorrow', 'yesterday', 'week', 'month', 'year', 'time', 'weather',
        'fine', 'good', 'great', 'okay', 'ok', 'nice', 'cool', 'awesome', 'amazing', 'wonderful',
        'thank', 'thanks', 'please', 'sorry', 'excuse', 'pardon', 'yes', 'no', 'maybe', 'perhaps',
        'think', 'know', 'like', 'love', 'hate', 'want', 'need', 'have', 'has', 'had', 'do', 'does',
        'did', 'make', 'made', 'go', 'went', 'gone', 'come', 'came', 'take', 'took', 'get', 'got',
        'give', 'gave', 'work', 'works', 'working', 'help', 'helping', 'talk', 'talking', 'speak',
        'speaking', 'say', 'said', 'tell', 'told', 'ask', 'asked', 'answer', 'answered', 'question',
        'questions', 'chat', 'chatting', 'talking', 'conversation', 'discuss', 'discussing'
    ]

    # Check if query contains only random words (not legal terms)
    query_words = question_lower.split()
    if len(query_words) <= 5:  # Check up to 5-word queries
        random_count = sum(1 for word in query_words if word in random_words)
        conversational_count = sum(1 for word in query_words if word in conversational_words)

        # If mostly conversational words or random words, treat as casual chat
        if (conversational_count >= len(query_words) * 0.7 or
            (random_count > 0 and conversational_count > 0) or
            random_count == len(query_words)):
            return "I'm here to help you with questions about your legal rights, workplace issues, safety concerns, and women's rights topics. Please ask me about topics like workplace harassment, domestic violence, marriage rights, or other legal matters that affect you. I can't provide information about general topics like '" + question + "'."

    # Additional check for very short nonsense queries (like "xyz" or "abc")
    if len(question.strip()) <= 3 and not any(char.isalpha() for char in question.strip()):
        return "I'm designed to help with questions about legal rights, workplace issues, and women's rights. Please ask me about topics like discrimination, harassment, safety, or other legal matters that concern you."

    # Workplace rights and harassment
    if any(word in question_lower for word in ["workplace", "work", "job", "employment", "office", "employer"]):
        if any(word in question_lower for word in ["harassment", "harass", "hostile", "discrimination", "discriminate"]):
            return """Based on general legal principles regarding workplace harassment:

1. **Right to a Safe Work Environment**: You have the right to work in an environment free from harassment, discrimination, and hostile behavior.

2. **Types of Harassment**: This includes sexual harassment, racial harassment, age discrimination, disability discrimination, and other forms of unwelcome conduct.

3. **What to Do**:
   - Document all incidents with dates, times, and details
   - Report to HR or your supervisor
   - If no action is taken, file a complaint with the EEOC (in the US) or relevant labor authority
   - Consider consulting an employment lawyer

4. **Legal Protection**: Many countries have laws protecting employees from workplace harassment. In the US, Title VII of the Civil Rights Act provides protection against discrimination.

**Note**: This is general information. Please consult with a qualified attorney or relevant government agency for advice specific to your situation and location."""

        elif any(word in question_lower for word in ["rights", "law", "legal", "protection", "discrimination"]):
            return """Regarding your workplace rights:

1. **Basic Rights**: You have the right to fair wages, safe working conditions, and protection from discrimination based on gender, race, age, disability, or other protected characteristics.

2. **Equal Pay**: You have the right to equal pay for equal work, regardless of gender.

3. **Family and Medical Leave**: You may be entitled to unpaid leave for medical reasons or family care under laws like FMLA (in the US).

4. **Workplace Safety**: Your employer must provide a safe work environment and address safety concerns.

5. **Anti-Retaliation**: You are protected from retaliation for reporting violations or exercising your rights.

**Note**: Workplace laws vary by country and region. Please consult local labor laws or a qualified attorney for your specific situation."""

    # Domestic violence and abuse
    elif any(word in question_lower for word in ["domestic", "abuse", "violence", "assault", "battery", "hit", "hurt", "threaten"]):
        return """Regarding domestic violence and your rights:

1. **Safety First**: Your immediate safety is the priority. Contact emergency services if you're in danger.

2. **Legal Protection**: Most jurisdictions have laws protecting victims of domestic violence, including:
   - Restraining orders/protection orders
   - Domestic violence shelters and support services
   - Legal aid for victims

3. **Workplace Rights**: Under laws like the Violence Against Women Act (in the US), you may be entitled to:
   - Unpaid leave for legal proceedings
   - Reasonable accommodations at work
   - Protection from discrimination

4. **Resources**:
   - National Domestic Violence Hotline: 1-800-799-7233 (US)
   - Local women's shelters and crisis centers
   - Legal aid organizations

**Important**: If you're in immediate danger, call emergency services. This information is general - please seek help from local authorities and legal professionals for your specific situation."""

    # Marriage and divorce
    elif any(word in question_lower for word in ["marriage", "divorce", "marry", "spouse", "husband", "wife", "wedding"]):
        if "divorce" in question_lower:
            return """Regarding divorce and your rights:

1. **Legal Grounds**: Divorce laws vary by jurisdiction, but common grounds include:
   - Irreconcilable differences
   - Adultery
   - Abandonment
   - Cruelty or abuse

2. **Property Division**: Most jurisdictions follow either:
   - Community property (equal division)
   - Equitable distribution (fair division based on various factors)

3. **Spousal Support**: You may be entitled to alimony based on:
   - Length of marriage
   - Income disparity
   - Standard of living during marriage
   - Ability to work

4. **Child Custody**: Courts prioritize the child's best interests, considering:
   - Parental fitness
   - Child's preference (if age-appropriate)
   - Stability and continuity

5. **Process**:
   - Consult a family law attorney
   - File petition with the court
   - Serve papers to spouse
   - Attend mediation/court hearings

**Note**: Divorce laws vary significantly by location. Please consult a qualified family law attorney for advice specific to your situation."""

        else:
            return """Regarding marriage rights:

1. **Legal Requirements**: Marriage requirements vary by jurisdiction but generally include age requirements, consent, and sometimes blood tests or waiting periods.

2. **Rights in Marriage**: Both spouses have equal rights to property acquired during marriage, decision-making, and inheritance rights.

3. **Prenuptial Agreements**: You have the right to protect your assets through prenuptial agreements before marriage.

4. **Name Change**: You have the right to change your name upon marriage or keep your birth name.

5. **Legal Protection**: Marriage provides legal protections including spousal benefits, tax advantages, and inheritance rights.

**Note**: Marriage laws vary significantly by country and region. Please consult local laws for specific requirements."""

    # Dowry and related issues
    elif any(word in question_lower for word in ["dowry", "bride", "groom", "wedding gift", "marriage gift"]):
        return """Regarding dowry laws and practices:

1. **Legal Status**: Dowry is illegal in many countries including India (Dowry Prohibition Act 1961), Pakistan, Bangladesh, and Nepal.

2. **Prohibition**: Giving, taking, or demanding dowry is a criminal offense punishable by imprisonment and fines.

3. **What Constitutes Dowry**: Money, property, or valuable gifts given to the groom's family in connection with marriage.

4. **Legal Protection**: Victims can file complaints with police or designated dowry prohibition officers.

5. **International Context**: Even in countries where dowry is not explicitly illegal, related practices may violate anti-fraud or anti-extortion laws.

6. **What to Do**:
   - Report to local authorities
   - Contact women's rights organizations
   - Seek legal aid for protection

**Important**: Dowry-related violence and harassment are serious crimes. If you're in danger, contact emergency services immediately. Laws vary by jurisdiction - consult local legal experts."""

    # Sexual harassment and assault
    elif any(word in question_lower for word in ["sexual", "rape", "assault", "molest", "inappropriate", "touch", "force"]):
        return """Regarding sexual harassment and assault:

1. **Legal Definition**: Sexual harassment includes unwelcome sexual advances, requests for sexual favors, and other verbal or physical conduct of a sexual nature.

2. **Workplace Protection**: Title VII (in the US) and similar laws in other countries prohibit sexual harassment in the workplace.

3. **Criminal Offenses**: Sexual assault, rape, and other forms of sexual violence are serious criminal offenses.

4. **What to Do**:
   - Ensure your immediate safety
   - Report to authorities or HR
   - Preserve evidence and document incidents
   - Seek medical attention if needed
   - Contact rape crisis centers or support organizations

5. **Resources**:
   - RAINN (Rape, Abuse & Incest National Network): 1-800-656-HOPE (US)
   - Local sexual assault crisis centers
   - Legal aid organizations

**Important**: If you've experienced sexual violence, you're not alone. Help is available 24/7. This is general information - please seek immediate help from professionals."""

    # Maternity and pregnancy rights
    elif any(word in question_lower for word in ["pregnant", "pregnancy", "maternity", "baby", "childbirth", "mother"]):
        return """Regarding pregnancy and maternity rights:

1. **Workplace Protection**: You cannot be fired or discriminated against for being pregnant or taking maternity leave.

2. **Maternity Leave**: Many countries provide paid or unpaid maternity leave:
   - In the US: Up to 12 weeks unpaid under FMLA
   - In many European countries: 14+ weeks paid leave
   - In India: 26 weeks paid maternity leave

3. **Health Care**: You have the right to prenatal care, safe childbirth, and postnatal care.

4. **Breastfeeding Rights**: Many jurisdictions protect the right to breastfeed in public and provide workplace accommodations.

5. **Child Care**: Some countries provide subsidized child care or parental leave options.

**Note**: Maternity rights vary significantly by country. Please check your local labor laws or consult with an employment attorney."""

    # General legal question (fallback)
    else:
        return """Thank you for your question about your rights. While I can't provide specific legal advice, here are some general principles:

1. **Know Your Rights**: You have fundamental rights protected by law, including protection from discrimination, harassment, and abuse.

2. **Seek Professional Help**: For personalized advice, consult with:
   - Legal aid organizations
   - Women's rights organizations
   - Government agencies
   - Qualified attorneys

3. **Document Everything**: Keep detailed records of incidents, communications, and evidence.

4. **Available Resources**:
   - Government websites for legal information
   - Non-profit organizations specializing in your area of concern
   - Bar association lawyer referral services

5. **Emergency Situations**: If you're in immediate danger, contact emergency services or crisis hotlines.

**Important Disclaimer**: This is general information only and not legal advice. Laws vary by jurisdiction, and your specific situation may require professional legal counsel. Please consult qualified legal professionals for advice tailored to your circumstances."""

    # Check if the answer contains an error message
    if answer.startswith("Error:"):
        logger.error(f"AI generation failed: {answer}")
        return Response({'error': answer}, status=500)

@api_view(['GET'])
def user_rewards(request):
    """
    Get user rewards/points
    """
    try:
        # For now, return mock data. In a real app, this would fetch from database
        points = 150  # Mock user points
        logger.info(f"Returning user rewards: {points} points")
        return Response({'points': points})
    except Exception as e:
        logger.error(f"Error in user_rewards: {str(e)}")
        return Response({'error': 'Unable to fetch rewards'}, status=500)

@api_view(['POST'])
def share_story(request):
    """
    Handle story submission and award points
    """
    try:
        data = request.data
        story = data.get('story', '').strip()

        if not story:
            return Response({'error': 'Story content is required.'}, status=400)

        if len(story) < 10:
            return Response({'error': 'Story must be at least 10 characters long.'}, status=400)

        # Award points for sharing story (mock implementation)
        points_earned = 25
        logger.info(f"Story submitted successfully. Awarded {points_earned} points.")

        return Response({
            'message': 'Story submitted successfully!',
            'points': points_earned
        })

    except Exception as e:
        logger.error(f"Error in share_story: {str(e)}")
        return Response({'error': 'Unable to submit story'}, status=500)

@api_view(['POST'])
def ask_ai(request):
    """
    Handle AI questions with improved error handling and logging
    """
    try:
        data = request.data
        question = data.get('question', '').strip()

        if not question:
            return Response({'error': 'Question is required.'}, status=400)

        logger.info(f"Processing AI question: {question[:100]}...")

        answer = generate_ai_answer(question)

        # Check if the answer contains an error message
        if answer.startswith("Error:"):
            logger.error(f"AI generation failed: {answer}")
            return Response({'error': answer}, status=500)

        logger.info("AI answer generated successfully")
        return Response({'answer': answer})

    except Exception as e:
        logger.error(f"Unexpected error in ask_ai view: {str(e)}")
        return Response({'error': 'An unexpected error occurred. Please try again.'}, status=500)

def home(request):
    """
    Home view that serves the React frontend or provides a basic response
    """
    return render(request, 'index.html')
