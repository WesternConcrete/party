# Generated by Django 3.2.4 on 2021-08-28 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0018_alter_extendeduser_birthday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='extendeduser',
            name='birthday',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]