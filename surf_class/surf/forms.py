from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import RecommendedResource

class CustomUserCreationForm(UserCreationForm):
    error_messages = {
        'password_mismatch': "The two password fields didn't match.",
        'password_too_short': "Your password must contain at least 8 characters.",
        # Add more error messages as needed
    }

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                self.error_messages['password_mismatch'],
                code='password_mismatch',
            )
        if len(password1) < 8:
            raise forms.ValidationError(
                self.error_messages['password_too_short'],
                code='password_too_short',
            )
        # Add more custom validation logic for password requirements
        return password2

class RecommendResourceForm(forms.ModelForm):
    class Meta:
        model = RecommendedResource
        fields = ['resource_name', 'resource_type', 'custom_resource_type', 'url']  # Include custom_resource_type field
