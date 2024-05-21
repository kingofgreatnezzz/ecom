from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Products(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User,null=True, on_delete=models.CASCADE)
    product_name = models.CharField(max_length = 150)
    product_img = models.ImageField(blank=True,null=True)
    product_category = models.CharField(null=True, blank=True,max_length=50)
    product_info = models.TextField(null=True, blank=True)
    rating = models.DecimalField( max_digits=8, decimal_places=2, null=True, blank=True)
    price = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True)
    stock_count = models.IntegerField(null=True, blank=True, default=0)
    createdat = models.DateField( auto_now_add=True)

    def __str__(self):
        return self.product_name
     

    
    
