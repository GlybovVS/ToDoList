from flask import Flask
from flask import request
from typing import List
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

class Task:

    def __init__(self, id, description, resolved):
        self.id = id
        self.description = description
        self.resolved = resolved

    def to_dict(self):
        return {
            "id" : self.id,
            "description" : self.description,
            "resolved" : self.resolved,
        }

cards_list:List[Task] = []

@app.route('/')
def hello():
    return "Flask serv"


@app.get('/cards_list')
def show_cards():
    # print([task.display_task() for task in cards_list])
    return [task.to_dict() for task in cards_list]


@app.post('/create')
def create_task():
    request_data = request.get_json()
    description = request_data['description']
    created_task = Task(uuid.uuid4(), description, False)
    cards_list.append(created_task)
    return created_task.to_dict()

@app.get('/card/<task_id>')
def get_card(task_id):
    for i in cards_list:
        if str(i.id) == task_id:
            return i.to_dict()
    return "error task not found", 404

@app.delete('/card/<task_id>')
def del_card(task_id):
    for i in range(len(cards_list)):
        if str(cards_list[i].id) == task_id:
            cards_list.pop(i)
            return task_id
    return "error task not found", 404

@app.put('/card/<task_id>')
def update_task(task_id):
    request.data = request.get_json()
    description = request.data["description"]
    resolved = request.data["resolved"]
    for i in cards_list:
        if str(i.id) == task_id:
            i.description = description
            i.resolved = resolved
            return i.to_dict()
    return "error task not found", 404
    


print(__name__)
if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5555, debug=True)