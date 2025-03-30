import requests

BASE_URL = "http://127.0.0.1:8000/api"
USERNAME = "john_doe"
PASSWORD = "pwd"

# Login to get token
def login():
    response = requests.post(f"{BASE_URL}/users/login/", json={
        "username": USERNAME,
        "password": PASSWORD
    })
    if response.status_code == 200:
        tokens = response.json()
        print("Login successful. Access Token:", tokens['access'])
        return tokens['access']
    else:
        print("Login failed:", response.json())
        return None

# Create an event
def create_event(token):
    response = requests.post(f"{BASE_URL}/events/", json={
    "title": "Music Concert",
    "description": "An amazing live music event.",
    "date_time": "2025-04-15T18:00:00Z",
    "location": "City Concert Hall",
    "available_seats": 100
}, 
    headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
})
    print("Create Event Response:", response.json())
    return response.json().get('id')


# Get all events
def get_events(token):
    response = requests.get(f"{BASE_URL}/events/", headers={"Authorization": f"Bearer {token}"})
    print("Get Events Response:", response.json())

# Update an event
def update_event(token, event_id):
    response = requests.put(f"{BASE_URL}/events/{event_id}/", json={
        "title": "Updated Event",
        "description": "Updated description!",
        "date_time": "2025-05-01T18:00:00Z",
        "location": "Los Angeles",
        "available_seats": 102
    }, headers={"Authorization": f"Bearer {token}"})
    print("Update Event Response:", response.json())

# Delete an event
def delete_event(token, event_id):
    response = requests.delete(f"{BASE_URL}/events/{event_id}/", headers={"Authorization": f"Bearer {token}"})
    print("Delete Event Status:", response.status_code)

def main():
    token = login()
    if not token:
        return

    # Create
    event_id = create_event(token)
    if event_id:
        print("Event Created with ID:", event_id)

        # Read
        get_events(token)

        # Update
        # update_event(token, event_id)

        # Delete
        # delete_event(token, event_id)
    else:
        print("Event creation failed.")

if __name__ == "__main__":
    main()
