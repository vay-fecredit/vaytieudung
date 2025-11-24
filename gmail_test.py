# This file previously contained real OAuth client credentials, which is unsafe to commit.
# Replace with environment-based loading when running locally or in CI.
import json
import os

CONFIG = {
    "web": {
        "client_id": os.environ.get("GOOGLE_CLIENT_ID", ""),
        "project_id": os.environ.get("GOOGLE_PROJECT_ID", ""),
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": os.environ.get("GOOGLE_CLIENT_SECRET", "")
    }
}

if __name__ == "__main__":
    print(json.dumps(CONFIG))
