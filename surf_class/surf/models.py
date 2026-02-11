from django.db import models

class Topic(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Resource(models.Model):
    title = models.CharField(max_length=200)
    url = models.URLField()
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    resource_type = models.CharField(
        max_length=20,
        choices=[
            ('video', 'Video'),
            ('website', 'Website'),
            ('books', 'Books'),
            # Add more types as needed
        ],
        default='website'  # Set a default resource type
    )

    def __str__(self):
        return self.title
 
class RecommendedResource(models.Model):
    resource_name = models.CharField(max_length=100)
    resource_type = models.CharField(max_length=100)
    custom_resource_type = models.CharField(max_length=100, blank=True, null=True)  # Allow blank values
    url = models.URLField()

    def __str__(self):
        return self.resource_name



# Create your models here.
