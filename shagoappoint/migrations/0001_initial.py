# Generated by Django 2.0.2 on 2020-07-16 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='appointment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('contact_no', models.CharField(max_length=10)),
                ('date', models.DateField()),
                ('time', models.CharField(max_length=50)),
            ],
        ),
    ]
