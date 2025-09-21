from django.core.management.base import BaseCommand
from ...models import Law

class Command(BaseCommand):
    help = 'Seeds the database with sample women\'s rights laws'

    def handle(self, *args, **options):
        # Sample laws data
        laws_data = [
            {
                'title': 'Protection of Women from Domestic Violence Act, 2005',
                'category': 'Domestic Violence',
                'description': 'Provides protection to women from domestic violence and covers all women in domestic relationships.',
                'content': 'This act defines domestic violence broadly to include physical, sexual, verbal, emotional, and economic abuse. It provides for protection orders, residence orders, and monetary relief for victims.',
                'importance': 'High'
            },
            {
                'title': 'Sexual Harassment of Women at Workplace Act, 2013',
                'category': 'Workplace Rights',
                'description': 'Prevents and addresses sexual harassment of women at workplace through internal complaints committees.',
                'content': 'Every employer with 10 or more employees must constitute an Internal Complaints Committee. The act covers all women including regular, temporary, ad-hoc employees, and daily wagers.',
                'importance': 'High'
            },
            {
                'title': 'Maternity Benefit Act, 1961',
                'category': 'Maternity Rights',
                'description': 'Regulates employment of women in certain establishments for certain periods before and after childbirth.',
                'content': 'Provides for 26 weeks of paid maternity leave, mandatory crèche facilities, and protection against dismissal during maternity period.',
                'importance': 'High'
            },
            {
                'title': 'Equal Remuneration Act, 1976',
                'category': 'Equal Pay',
                'description': 'Provides for payment of equal remuneration to men and women workers for same work or work of similar nature.',
                'content': 'Prohibits discrimination in recruitment, training, transfers, and promotions based on gender. Employers cannot reduce wages to meet equal pay requirements.',
                'importance': 'Medium'
            },
            {
                'title': 'Prohibition of Child Marriage Act, 2006',
                'category': 'Child Rights',
                'description': 'Prohibits child marriage and makes it punishable with rigorous imprisonment and fine.',
                'content': 'The act defines child marriage as marriage where either party is below 18 years for females and 21 years for males. It provides for maintenance and residence for female contracting party.',
                'importance': 'High'
            },
            {
                'title': 'Hindu Succession Act, 1956 (Amended 2005)',
                'category': 'Property Rights',
                'description': 'Governs succession and inheritance of property among Hindus, including equal rights for daughters.',
                'content': 'Daughters have equal coparcenary rights in ancestral property. The amendment removed gender discrimination in inheritance rights.',
                'importance': 'High'
            },
            {
                'title': 'Medical Termination of Pregnancy Act, 1971',
                'category': 'Reproductive Rights',
                'description': 'Legalizes abortion under certain conditions and regulates the termination of pregnancies.',
                'content': 'Allows termination of pregnancy up to 20 weeks with the opinion of one doctor, and up to 24 weeks with the opinion of two doctors in certain cases.',
                'importance': 'Medium'
            },
            {
                'title': 'Dowry Prohibition Act, 1961',
                'category': 'Dowry',
                'description': 'Prohibits the giving or taking of dowry and makes it punishable under law.',
                'content': 'The act covers giving, taking, or demanding dowry. It applies to all citizens of India and provides for minimum 5 years imprisonment and fine.',
                'importance': 'High'
            }
        ]

        # Create laws
        for law_data in laws_data:
            law, created = Law.objects.get_or_create(
                title=law_data['title'],
                defaults=law_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created law: {law.title}')
                )
            else:
                self.stdout.write(
                    f'Law already exists: {law.title}'
                )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully seeded {len(laws_data)} laws')
        )
