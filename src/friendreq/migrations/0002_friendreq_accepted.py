# Generated by Django 3.2.4 on 2021-06-23 01:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('friendreq', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='friendreq',
            name='accepted',
            field=models.BooleanField(default=False),
        ),
    ]