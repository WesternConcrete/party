# Generated by Django 3.2.4 on 2021-06-24 05:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0007_alter_extendeduser_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='extendeduser',
            name='friends',
        ),
        migrations.AddField(
            model_name='extendeduser',
            name='friends',
            field=models.ManyToManyField(blank=True, related_name='_register_extendeduser_friends_+', to='register.ExtendedUser'),
        ),
    ]
