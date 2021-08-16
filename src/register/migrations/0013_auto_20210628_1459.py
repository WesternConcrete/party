# Generated by Django 3.2.4 on 2021-06-28 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0012_extendeduser_my_parties'),
    ]

    operations = [
        migrations.AddField(
            model_name='extendeduser',
            name='blocked',
            field=models.ManyToManyField(blank=True, related_name='_register_extendeduser_blocked_+', to='register.ExtendedUser'),
        ),
        migrations.AddField(
            model_name='extendeduser',
            name='blocked_by',
            field=models.ManyToManyField(blank=True, related_name='_register_extendeduser_blocked_by_+', to='register.ExtendedUser'),
        ),
    ]