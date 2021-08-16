# Generated by Django 3.2.4 on 2021-06-23 01:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('register', '0005_alter_extendeduser_friends'),
    ]

    operations = [
        migrations.CreateModel(
            name='FriendReq',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_user', to='register.extendeduser')),
                ('to_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='to_user', to='register.extendeduser')),
            ],
        ),
    ]