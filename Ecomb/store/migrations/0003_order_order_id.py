# Generated by Django 5.0.6 on 2024-05-30 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_alter_products_product_img_order_orderitem_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='order_id',
            field=models.CharField(blank=True, editable=False, max_length=6, null=True, unique=True),
        ),
    ]
