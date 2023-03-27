export const users_info_base = `import requests

API_URL = "https://api.1561.ru/"
USER_ID = 1
data = requests.get(f"{API}users/{USER_ID}/info")
if data.status_code == 200:
    res_dict = data.json()
    print(res_dict)
else:
    print("Invalid status code return")
`;