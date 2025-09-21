from django.core.management.base import BaseCommand
from core.models import DocumentTemplate

class Command(BaseCommand):
    help = 'Seeds the database with document templates for women\'s rights'

    def handle(self, *args, **kwargs):
        # Document templates data
        templates_data = [
            {
                'title': 'Domestic Violence Complaint',
                'description': 'File a formal complaint for domestic violence under Protection of Women from Domestic Violence Act, 2005',
                'category': 'complaints',
                'template_content': '''BEFORE THE HON'BLE COURT OF {{policeStation}} POLICE STATION

COMPLAINT UNDER SECTION 12 OF THE PROTECTION OF WOMEN FROM DOMESTIC VIOLENCE ACT, 2005

I, {{victimName}}, aged {{victimAge}} years, residing at {{victimAddress}}, do hereby solemnly affirm and state as follows:

1. That I am the Complainant herein.

2. That I am/was in a domestic relationship with {{perpetratorName}}, who is my {{relationship}}.

3. That the Respondent has subjected me to domestic violence on {{incidentDate}} at {{victimAddress}}.

4. That the details of the incident are as follows:
{{incidentDescription}}

5. That the following persons witnessed the incident:
{{witnesses}}

6. That I am seeking the following reliefs:
   a) Protection Order under Section 18
   b) Residence Order under Section 19
   c) Monetary Relief under Section 20
   d) Custody Order under Section 21

7. That this complaint is made in good faith and in the interest of justice.

Date: {{currentDate}}
Place: {{victimAddress}}

Complainant
{{victimName}}''',
                'fields': [
                    {'name': 'victimName', 'type': 'text', 'label': 'Your Full Name', 'required': True},
                    {'name': 'victimAge', 'type': 'number', 'label': 'Your Age', 'required': True},
                    {'name': 'victimAddress', 'type': 'textarea', 'label': 'Your Address', 'required': True},
                    {'name': 'perpetratorName', 'type': 'text', 'label': 'Perpetrator\'s Name', 'required': True},
                    {'name': 'relationship', 'type': 'text', 'label': 'Relationship with Perpetrator', 'required': True},
                    {'name': 'incidentDate', 'type': 'date', 'label': 'Date of Incident', 'required': True},
                    {'name': 'incidentDescription', 'type': 'textarea', 'label': 'Detailed Description of Incident', 'required': True},
                    {'name': 'witnesses', 'type': 'textarea', 'label': 'Witnesses (if any)', 'required': False},
                    {'name': 'policeStation', 'type': 'text', 'label': 'Nearest Police Station', 'required': True},
                    {'name': 'currentDate', 'type': 'text', 'label': 'Current Date', 'required': False}
                ]
            },
            {
                'title': 'Workplace Sexual Harassment Complaint',
                'description': 'File a complaint under Sexual Harassment of Women at Workplace Act, 2013',
                'category': 'complaints',
                'template_content': '''INTERNAL COMPLAINT COMMITTEE
{{companyName}}

COMPLAINT OF SEXUAL HARASSMENT AT WORKPLACE

Date: {{currentDate}}

To,
The Presiding Officer,
Internal Complaints Committee,
{{companyName}},
{{department}}

Subject: Complaint regarding Sexual Harassment at Workplace under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013

Respected Sir/Madam,

I, {{complainantName}}, aged {{complainantAge}} years, working as ________________ in {{department}} department, wish to bring to your kind notice that I have been subjected to sexual harassment at my workplace.

The details of the incident are as follows:

1. Name of the accused: {{harasserName}}
2. Position of the accused: {{harasserPosition}}
3. Date of incident: {{incidentDate}}
4. Place of incident: {{companyName}}, {{department}}
5. Description of incident: {{incidentDescription}}

6. Witnesses (if any): {{witnesses}}

7. Previous complaints (if any): {{previousComplaints}}

I request you to kindly take necessary action against the accused as per the provisions of the Sexual Harassment of Women at Workplace Act, 2013.

Thanking you,

Yours faithfully,
{{complainantName}}
Employee ID: __________
Department: {{department}}
Contact Number: __________
Date: {{currentDate}}
Place: __________''',
                'fields': [
                    {'name': 'complainantName', 'type': 'text', 'label': 'Your Full Name', 'required': True},
                    {'name': 'complainantAge', 'type': 'number', 'label': 'Your Age', 'required': True},
                    {'name': 'companyName', 'type': 'text', 'label': 'Company/Organization Name', 'required': True},
                    {'name': 'department', 'type': 'text', 'label': 'Department/Section', 'required': True},
                    {'name': 'harasserName', 'type': 'text', 'label': 'Harasser\'s Name', 'required': True},
                    {'name': 'harasserPosition', 'type': 'text', 'label': 'Harasser\'s Position', 'required': True},
                    {'name': 'incidentDate', 'type': 'date', 'label': 'Date of Incident', 'required': True},
                    {'name': 'incidentDescription', 'type': 'textarea', 'label': 'Detailed Description of Incident', 'required': True},
                    {'name': 'witnesses', 'type': 'textarea', 'label': 'Witnesses (if any)', 'required': False},
                    {'name': 'previousComplaints', 'type': 'textarea', 'label': 'Any Previous Complaints', 'required': False},
                    {'name': 'currentDate', 'type': 'text', 'label': 'Current Date', 'required': False}
                ]
            },
            {
                'title': 'Maternity Leave Application',
                'description': 'Application for maternity leave under Maternity Benefit Act, 1961',
                'category': 'applications',
                'template_content': '''{{companyName}}
{{department}}

APPLICATION FOR MATERNITY LEAVE

Date: {{currentDate}}

To,
The Manager (HR),
{{companyName}},
{{department}}

Subject: Application for Maternity Leave

Respected Sir/Madam,

I, {{employeeName}}, bearing Employee ID {{employeeId}}, working in {{department}} department, wish to apply for maternity leave as per the provisions of the Maternity Benefit Act, 1961.

The details are as follows:

1. Expected Date of Delivery: {{expectedDeliveryDate}}
2. Proposed Leave Period: From {{leaveStartDate}} to {{leaveEndDate}}
3. Total Leave Days: {{leaveDays}} days
4. Contact Number: {{contactNumber}}
5. Emergency Contact Person: {{emergencyContact}}
6. Emergency Contact Number: {{emergencyNumber}}

I have attached the following documents:
1. Medical Certificate
2. Expected Delivery Date Certificate
3. Any other relevant documents

I request you to kindly grant me maternity leave for the above-mentioned period and sanction the maternity benefits as per the rules of the company and the Maternity Benefit Act, 1961.

Thanking you,

Yours faithfully,
{{employeeName}}
Employee ID: {{employeeId}}
Department: {{department}}
Date: {{currentDate}}''',
                'fields': [
                    {'name': 'employeeName', 'type': 'text', 'label': 'Your Full Name', 'required': True},
                    {'name': 'employeeId', 'type': 'text', 'label': 'Employee ID', 'required': True},
                    {'name': 'department', 'type': 'text', 'label': 'Department', 'required': True},
                    {'name': 'expectedDeliveryDate', 'type': 'date', 'label': 'Expected Date of Delivery', 'required': True},
                    {'name': 'leaveStartDate', 'type': 'date', 'label': 'Leave Start Date', 'required': True},
                    {'name': 'leaveEndDate', 'type': 'date', 'label': 'Leave End Date', 'required': True},
                    {'name': 'contactNumber', 'type': 'tel', 'label': 'Contact Number', 'required': True},
                    {'name': 'emergencyContact', 'type': 'text', 'label': 'Emergency Contact Person', 'required': True},
                    {'name': 'emergencyNumber', 'type': 'tel', 'label': 'Emergency Contact Number', 'required': True},
                    {'name': 'currentDate', 'type': 'text', 'label': 'Current Date', 'required': False},
                    {'name': 'leaveDays', 'type': 'number', 'label': 'Leave Days', 'required': False}
                ]
            },
            {
                'title': 'Property Inheritance Claim',
                'description': 'Claim for property inheritance rights under Hindu Succession Act, 1956 (Amended)',
                'category': 'legal_claims',
                'template_content': '''IN THE COURT OF ________________

SUIT NO. ________ OF 20__

IN THE MATTER OF:
{{claimantName}} ... PLAINTIFF

VERSUS

1. State of __________
2. Other Legal Heirs ... DEFENDANTS

SUIT FOR DECLARATION AND PARTITION OF PROPERTY

MOST RESPECTFULLY SHOWETH:

1. That the Plaintiff is the daughter/wife of late {{deceasedName}} who died on {{dateOfDeath}}.

2. That the deceased {{deceasedName}} was the owner of the property situated at {{propertyAddress}}.

3. That the property is more particularly described as: {{propertyDescription}}

4. That the Plaintiff is entitled to inherit the said property as per the provisions of the Hindu Succession Act, 1956 (as amended in 2005).

5. That the Plaintiff has requested the other legal heirs for partition of the property but they have refused.

6. That the other legal heirs are: {{otherHeirs}}

7. That the Plaintiff is entitled to _____ share in the said property.

8. That the cause of action arose on {{dateOfDeath}} when the deceased died intestate.

9. That this Hon'ble Court has jurisdiction to try and entertain this suit.

PRAYER:

It is therefore most respectfully prayed that this Hon'ble Court may be pleased to:

a) Declare that the Plaintiff is entitled to _____ share in the property.
b) Pass a preliminary decree for partition of the property.
c) Pass a final decree for actual partition/division of the property.
d) Award costs of the suit in favour of the Plaintiff.
e) Pass any other order(s) as this Hon'ble Court may deem fit and proper.

Date: {{currentDate}}
Place: __________

PLAINTIFF
{{claimantName}}

THROUGH COUNSEL''',
                'fields': [
                    {'name': 'claimantName', 'type': 'text', 'label': 'Your Full Name', 'required': True},
                    {'name': 'claimantAge', 'type': 'number', 'label': 'Your Age', 'required': True},
                    {'name': 'relationship', 'type': 'text', 'label': 'Relationship to Deceased', 'required': True},
                    {'name': 'deceasedName', 'type': 'text', 'label': 'Deceased Person\'s Name', 'required': True},
                    {'name': 'dateOfDeath', 'type': 'date', 'label': 'Date of Death', 'required': True},
                    {'name': 'propertyAddress', 'type': 'textarea', 'label': 'Property Address', 'required': True},
                    {'name': 'propertyDescription', 'type': 'textarea', 'label': 'Property Description', 'required': True},
                    {'name': 'otherHeirs', 'type': 'textarea', 'label': 'Other Legal Heirs', 'required': False},
                    {'name': 'courtName', 'type': 'text', 'label': 'Court Name (if applicable)', 'required': False},
                    {'name': 'currentDate', 'type': 'text', 'label': 'Current Date', 'required': False}
                ]
            },
            {
                'title': 'Mutual Divorce Petition',
                'description': 'Petition for mutual consent divorce under Hindu Marriage Act, 1955',
                'category': 'legal_petitions',
                'template_content': '''IN THE FAMILY COURT AT __________

PETITION NO. _____ OF 20__

IN THE MATTER OF:
{{husbandName}} ... PETITIONER NO. 1
{{wifeName}} ... PETITIONER NO. 2

VERSUS

NIL ... RESPONDENT

PETITION FOR DISSOLUTION OF MARRIAGE BY MUTUAL CONSENT UNDER SECTION 13-B OF THE HINDU MARRIAGE ACT, 1955

MOST RESPECTFULLY SHOWETH:

1. That the Petitioners were married on {{marriageDate}} at {{marriageAddress}} according to Hindu rites and ceremonies.

2. That after marriage, the Petitioners lived together as husband and wife at {{currentHusbandAddress}}.

3. That the Petitioners have been living separately since {{separationDate}}.

4. That due to temperamental differences, the Petitioners could not live together and have mutually agreed to dissolve the marriage.

5. That there is no possibility of reconciliation between the Petitioners.

6. That the Petitioners have been living separately for more than one year.

7. That there are {{children}} children from this marriage.

8. That the Petitioners have settled all their claims regarding maintenance, alimony, custody of children, and property matters mutually.

9. That the settlement terms are: {{settlementTerms}}

10. That there is no collusion between the Petitioners in filing this petition.

11. That this Hon'ble Court has jurisdiction to entertain this petition.

PRAYER:

It is therefore most respectfully prayed that this Hon'ble Court may be pleased to:

a) Dissolve the marriage between the Petitioners by a decree of divorce by mutual consent.
b) Award costs of the petition in favour of the Petitioners.
c) Pass any other order(s) as this Hon'ble Court may deem fit and proper.

Date: {{currentDate}}
Place: __________

PETITIONER NO. 1
{{husbandName}}

PETITIONER NO. 2
{{wifeName}}

THROUGH COUNSEL''',
                'fields': [
                    {'name': 'husbandName', 'type': 'text', 'label': 'Husband\'s Full Name', 'required': True},
                    {'name': 'wifeName', 'type': 'text', 'label': 'Wife\'s Full Name', 'required': True},
                    {'name': 'marriageDate', 'type': 'date', 'label': 'Date of Marriage', 'required': True},
                    {'name': 'separationDate', 'type': 'date', 'label': 'Date of Separation', 'required': True},
                    {'name': 'marriageAddress', 'type': 'text', 'label': 'Place of Marriage', 'required': True},
                    {'name': 'currentHusbandAddress', 'type': 'textarea', 'label': 'Current Address of Husband', 'required': True},
                    {'name': 'currentWifeAddress', 'type': 'textarea', 'label': 'Current Address of Wife', 'required': True},
                    {'name': 'children', 'type': 'textarea', 'label': 'Children from Marriage', 'required': False},
                    {'name': 'settlementTerms', 'type': 'textarea', 'label': 'Settlement Terms', 'required': False},
                    {'name': 'currentDate', 'type': 'text', 'label': 'Current Date', 'required': False}
                ]
            },
            {
                'title': 'Maintenance Application',
                'description': 'Application for maintenance under Section 125 CrPC',
                'category': 'applications',
                'template_content': '''IN THE COURT OF JUDICIAL MAGISTRATE FIRST CLASS AT __________

CRL. M.P. NO. _____ OF 20__

IN THE MATTER OF:
{{applicantName}} ... PETITIONER

VERSUS

{{respondentName}} ... RESPONDENT

APPLICATION UNDER SECTION 125 OF THE CODE OF CRIMINAL PROCEDURE, 1973 FOR GRANT OF MAINTENANCE

MOST RESPECTFULLY SHOWETH:

1. That the Petitioner is the legally wedded wife of the Respondent.

2. That the Petitioner and Respondent were married on {{marriageDate}}.

3. That the Petitioner and Respondent lived together as husband and wife till {{separationDate}}.

4. That the Respondent has neglected and refused to maintain the Petitioner.

5. That the Petitioner has no independent source of income and is unable to maintain herself.

6. That the Respondent is working as {{respondentOccupation}} and earns approximately ₹{{respondentIncome}} per month.

7. That the Petitioner earns approximately ₹{{monthlyIncome}} per month.

8. That the Petitioner has {{children}} children from this marriage.

9. That the details of children are: {{childrenDetails}}

10. That the Petitioner requires ₹{{requiredMaintenance}} per month as maintenance.

11. That the Respondent has sufficient means to pay the maintenance.

12. That this Hon'ble Court has jurisdiction to entertain this application.

PRAYER:

It is therefore most respectfully prayed that this Hon'ble Court may be pleased to:

a) Direct the Respondent to pay ₹{{requiredMaintenance}} per month as maintenance to the Petitioner.
b) Award costs of the application in favour of the Petitioner.
c) Pass any other order(s) as this Hon'ble Court may deem fit and proper.

Date: {{currentDate}}
Place: __________

PETITIONER
{{applicantName}}

THROUGH COUNSEL''',
                'fields': [
                    {'name': 'applicantName', 'type': 'text', 'label': 'Your Full Name', 'required': True},
                    {'name': 'applicantAge', 'type': 'number', 'label': 'Your Age', 'required': True},
                    {'name': 'marriageDate', 'type': 'date', 'label': 'Date of Marriage', 'required': True},
                    {'name': 'separationDate', 'type': 'date', 'label': 'Date of Separation', 'required': True},
                    {'name': 'respondentName', 'type': 'text', 'label': 'Respondent\'s Name', 'required': True},
                    {'name': 'respondentOccupation', 'type': 'text', 'label': 'Respondent\'s Occupation', 'required': True},
                    {'name': 'monthlyIncome', 'type': 'number', 'label': 'Your Monthly Income', 'required': True},
                    {'name': 'respondentIncome', 'type': 'number', 'label': 'Respondent\'s Monthly Income', 'required': True},
                    {'name': 'children', 'type': 'textarea', 'label': 'Children Details', 'required': False},
                    {'name': 'requiredMaintenance', 'type': 'number', 'label': 'Maintenance Amount Required', 'required': True},
                    {'name': 'currentDate', 'type': 'text', 'label': 'Current Date', 'required': False},
                    {'name': 'childrenDetails', 'type': 'textarea', 'label': 'Children Details', 'required': False}
                ]
            }
        ]

        # Create templates
        created_count = 0
        for template_data in templates_data:
            template, created = DocumentTemplate.objects.get_or_create(
                title=template_data['title'],
                defaults={
                    'description': template_data['description'],
                    'category': template_data['category'],
                    'template_content': template_data['template_content'],
                    'fields': template_data['fields']
                }
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created template: {template.title}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Template already exists: {template.title}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully seeded {created_count} document templates')
        )
