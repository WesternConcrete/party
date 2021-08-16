# Generated by Django 3.2.4 on 2021-06-28 02:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parties', '0013_auto_20210627_1947'),
        ('register', '0011_extendeduser_birthday'),
    ]

    operations = [
        migrations.AddField(
            model_name='extendeduser',
            name='my_parties',
            field=models.ManyToManyField(blank=True, related_name='my_parties', to='parties.Party'),
        ),
    ]