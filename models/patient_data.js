const patients_data = [
    {
        "id": 1,
        "name": "John Smith",
        "message": "hello John",
        "message_edit_time": "01/01/2022",
        "data": [
            {
                "date": "1/1/2022",
                
                "blood_level": {
                    "data": 11,
                    "comment": "this is blood_level"
                },
                "weight":{
                    "data": 65,
                    "comment": "this is weight"
                },
                "insulin_intake": {
                    "data": 2,
                    "comment": "this is insulin intake"
                },
                "exercise":{
                    "data": 1000,
                    "comment": "this is exercise"
                }
            },
            {
                "date": "1/1/2022",
                "blood_level": {
                    "data": 9,
                    "comment": "this is blood_level"
                },
                "weight":{
                    "data": 60,
                    "comment": "this is weight"
                },
                "insulin_intake": {
                    "data": 3,
                    "comment": "this is insulin intake"
                },
                "exercise":{
                    "data": 999,
                    "comment": "this is exercise"
                }
            },
            {
                "date": "09/04/2022",
                "blood_level": {
                    "data": 9,
                    "comment": "this is blood_level"
                },
                "weight":{
                    "data": 67,
                    "comment": "this is weight"
                },
                "insulin_intake": {
                    "data": 5,
                    "comment": "this is insulin intake"
                },
                "exercise":{
                    "data": 456,
                    "comment": "this is exercise"
                }
            }
        ]
        

    },
    {
        "id": 2,
        "name": "Jane Smith",
        "message": "hello jane",
        "data": [
            {
                "date": "3/1/2022",
                "blood_level": {
                    "data": 20,
                    "comment": "this is blood_level"
                },
                "weight":{
                    "data": 70,
                    "comment": "this is weight"
                },
                "insulin_intake": {
                    "data": 4,
                    "comment": "this is insulin intake"
                },
                "exercise":{
                    "data": 1234,
                    "comment": "this is exercise"
                }
            },
            {
                "date": "1/10/2022",
                "blood_level": {
                    "data": 9,
                    "comment": "this is blood_level"
                },
                "weight":{
                    "data": 65,
                    "comment": "this is weight"
                },
                "insulin_intake": {
                    "data": 4,
                    "comment": "this is insulin intake"
                },
                "exercise":{
                    "data": 999,
                    "comment": "this is exercise"
                }
            }
        ]
        

    }
]
module.exports = patients_data;