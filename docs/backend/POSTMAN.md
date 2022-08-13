```json
{
	"info": {
		"_postman_id": "55d3f582-02bf-442d-b9b8-9221808661f0",
		"name": "Can Play",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "POST registration csv",
			"protocolProfileBehavior": {
				"disabledSystemHeaders": {}
			},
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "test",
							"type": "file",
							"src": "Example Event Registration.csv"
						}
					]
				},
				"url": {
					"raw": "http://localhost:3000/api/form-data",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"form-data"
					]
				}
			},
			"response": []
		},
		{
			"name": "GET /api/hello",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/api/hello",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"hello"
					]
				}
			},
			"response": []
		}
	]
}
```