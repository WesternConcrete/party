# Generated by Django 3.2.4 on 2021-06-28 23:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0014_extendeduser_profile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='extendeduser',
            name='last_latitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='extendeduser',
            name='last_longitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
    ]
