# Generated by Django 3.2.4 on 2021-06-26 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parties', '0008_alter_party_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='party',
            name='latitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9),
        ),
        migrations.AlterField(
            model_name='party',
            name='longitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9),
        ),
    ]