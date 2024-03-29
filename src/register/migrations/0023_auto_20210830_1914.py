# Generated by Django 3.2.4 on 2021-08-31 02:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('friendreq', '0003_friendreq_rejected'),
        ('parties', '0015_party_hide_host'),
        ('groups', '0004_alter_group_members'),
        ('register', '0022_auto_20210830_1913'),
    ]

    operations = [
        migrations.AlterField(
            model_name='extendeduser',
            name='attending_parties',
            field=models.ManyToManyField(blank=True, related_name='attending_parties', to='parties.Party'),
        ),
        migrations.AlterField(
            model_name='extendeduser',
            name='blocked',
            field=models.ManyToManyField(blank=True, related_name='_register_extendeduser_blocked_+', to='register.ExtendedUser'),
        ),
        migrations.AlterField(
            model_name='extendeduser',
            name='friends',
            field=models.ManyToManyField(blank=True, related_name='_register_extendeduser_friends_+', to='register.ExtendedUser'),
        ),
        migrations.AlterField(
            model_name='extendeduser',
            name='groups',
            field=models.ManyToManyField(blank=True, to='groups.Group'),
        ),
        migrations.AlterField(
            model_name='extendeduser',
            name='hidden_parties',
            field=models.ManyToManyField(blank=True, related_name='hidden_parties', to='parties.Party'),
        ),
        migrations.AlterField(
            model_name='extendeduser',
            name='invited_parties',
            field=models.ManyToManyField(blank=True, related_name='invited_parties', to='parties.Party'),
        ),
        migrations.AlterField(
            model_name='extendeduser',
            name='my_parties',
            field=models.ManyToManyField(blank=True, related_name='my_parties', to='parties.Party'),
        ),
        migrations.AlterField(
            model_name='extendeduser',
            name='pending_friend_requests',
            field=models.ManyToManyField(blank=True, to='friendreq.FriendReq'),
        ),
    ]
