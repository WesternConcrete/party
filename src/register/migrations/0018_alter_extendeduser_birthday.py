# Generated by Django 3.2.4 on 2021-08-24 23:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0017_alter_extendeduser_birthday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='extendeduser',
            name='birthday',
            field=models.DateField(blank=True, null=True),
        ),
    ]
