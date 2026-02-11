from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import authenticate, login, logout
from .models import Topic, Resource
from django.contrib.auth.forms import UserCreationForm
from .forms import CustomUserCreationForm
from .forms import RecommendResourceForm

def index(request):
    return render(request, 'index.html')

def loginuser(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("/")
        else:
            return render(request, 'login.html')
    return render(request, 'login.html')

def logoutuser(request):
    logout(request)
    return redirect("/login")

def topic_detail(request, topic_name):
    if request.user.is_authenticated:
        topic = get_object_or_404(Topic, name=topic_name)
        resources = Resource.objects.filter(topic=topic).order_by('resource_type')

        # Group resources by type
        grouped_resources = {}
        for resource in resources:
            if resource.resource_type not in grouped_resources:
                grouped_resources[resource.resource_type] = []
            grouped_resources[resource.resource_type].append(resource)

        return render(request, 'topic.html', {'topic': topic, 'grouped_resources': grouped_resources})
    else:
        return redirect('login')

def topic_list(request):
    if request.user.is_authenticated:
        topics = Topic.objects.all()
        return render(request, 'topics_list.html', {'topics': topics})
    else:
        return redirect('login')

def profile_view(request):
    return render(request, 'profile.html')

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)  # Use your custom form
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('products')  # Redirect to profile page after registration
    else:
        form = CustomUserCreationForm()  # Use your custom form
    return render(request, 'register.html', {'form': form})

def recommend(request):
    if request.method == 'POST':
        form = RecommendResourceForm(request.POST)
        if form.is_valid():
            custom_resource_type = form.cleaned_data.get('custom_resource_type')  # Get custom resource type
            if custom_resource_type and form.cleaned_data.get('resource_type') == 'custom':
                # If resource type is custom, set custom_resource_type field
                form.instance.resource_type = custom_resource_type
            form.save()
            # Optionally, you can add a success message here
            form = RecommendResourceForm()  # Reset the form
    else:
        form = RecommendResourceForm()
    return render(request, 'recommend.html', {'form': form})
