# Generated by Django 3.2.4 on 2021-06-26 00:09

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parties', '0004_auto_20210626_0004'),
    ]

    operations = [
        migrations.AlterField(
            model_name='party',
            name='end_time',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='party',
            name='start_time',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
    ]
