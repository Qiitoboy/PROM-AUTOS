import os
import sys

# Add the backend directory to Python's path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

username = os.environ.get("ADMIN_USERNAME")
password = os.environ.get("ADMIN_PASSWORD")

if not username or not password:
    print("ERROR: ADMIN_USERNAME or ADMIN_PASSWORD is not set.")
    sys.exit(1)

user, created = User.objects.get_or_create(username=username)

user.is_staff = True
user.is_superuser = True
user.set_password(password)
user.save()

if created:
    print(f"Production admin created: {username}")
else:
    print(f"Production admin updated: {username}")