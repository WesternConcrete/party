# Generated by Django 3.2.4 on 2021-06-25 23:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parties', '0002_auto_20210625_2350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='party',
            name='message',
            field=models.TextField(max_length=280),
        ),
        migrations.AlterField(
            model_name='party',
            name='start_time',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 6, 25, 23, 53, 36, 409096)),
        ),
    ]
