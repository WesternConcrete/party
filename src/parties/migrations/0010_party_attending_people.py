# Generated by Django 3.2.4 on 2021-06-26 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0010_auto_20210626_1559'),
        ('parties', '0009_auto_20210625_1727'),
    ]

    operations = [
        migrations.AddField(
            model_name='party',
            name='attending_people',
            field=models.ManyToManyField(blank=True, related_name='attending_people', to='register.ExtendedUser'),
        ),
    ]