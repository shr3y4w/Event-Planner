import requests

BASE_URL = 'http://127.0.0.1:8000/api/'



def register_and_login(username, password, role):
    email = f"{username}@example.com"  
    print(f"Registering {username} as {role}")

    response = requests.post(BASE_URL + 'users/register/', data={
        'username': username,
        'email': email,
        'password': password,
        'role': role
    })
    print(f"Logging in {username}")
    response = requests.post(BASE_URL + 'users/login/', data={'username': username, 'password': password})
    
    if response.status_code != 200:
        print(f"Login failed for {username}. Status: {response.status_code}, Response: {response.text}")
        return None

    token = response.json().get('access')
    if not token:
        print("Failed to get access token.")
        return None
    return token


def create_event(token, title):
    headers = {'Authorization': f'Bearer {token}'}
    data = {
        'title': title,
        'description': 'A test event',
        'date_time': '2025-04-01T18:00:00Z',
        'location': 'City Concert Hall',
        'available_seats': 100
    }
    response = requests.post(BASE_URL + 'events/', headers=headers, json=data)
    
    
    if response.status_code != 201:
        print("Event creation failed.")
        return None

    try:
        return response.json().get('id')
    except requests.exceptions.JSONDecodeError:
        print("Failed to decode JSON. Response might be an error.")
        return None



def test_crud_operations():
    user_token = register_and_login('user1_new', 'password123', 'user')
    maker1_token = register_and_login('maker1_new', 'password123', 'event_planner')
    maker2_token = register_and_login('maker2_new', 'password123', 'event_planner')

    #event Maker 1 creates an event
    event_id = create_event(maker1_token, 'Event by Maker1')
    print(f"Event created with ID: {event_id}")

    #event Maker 2 tries to update Maker 1's event (should fail)
    headers = {'Authorization': f'Bearer {maker2_token}'}
    data = {'title': 'Maker2 Attempt Update', 'description': 'A test event','date_time': '2025-04-01T18:00:00Z','location': 'City Concert Hall','available_seats': 100}
    response = requests.patch(BASE_URL + f'events/{event_id}/', headers=headers, json=data)
    print(f"Maker2 Update Attempt: {response.status_code} ")

    # Event Maker 2 tries to delete Maker 1's event (should fail)
    response = requests.delete(BASE_URL + f'events/{event_id}/', headers=headers)
    print(f"Maker2 Delete Attempt: {response.status_code}")

    # Event Maker 1 successfully updates the event
    headers = {'Authorization': f'Bearer {maker1_token}'}
    data = {'title': 'Updated by Maker1'}
    response = requests.patch(BASE_URL + f'events/{event_id}/', headers=headers, json=data)
    print(f"Maker1 Update Success: {response.status_code} {response.json()}")

    # Event Maker 1 deletes the event
    response = requests.delete(BASE_URL + f'events/{event_id}/', headers=headers)
    print(f"Maker1 Delete Success: {response.status_code}")

if __name__ == '__main__':
    test_crud_operations()
