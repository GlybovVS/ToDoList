from flask import Flask
from flask import request
import uuid
app = Flask(__name__)
cards_list = []


class Task:

    def __init__(self, id, description, is_resolved):
        self.id = id
        self.description = description
        self.is_resolved = is_resolved

    def display_task(self):
        return ('ID: {} || Description: {} || Is resolved: {}'.format(self.id, self.description, self.is_resolved))


@app.route('/')
def hello():
    return cards_list[-1].display_task()


@app.route('/cards_list')
def show_cards():
    print([task.display_task() for task in cards_list])
    return [task.display_task() for task in cards_list]


@app.route('/create', methods=['POST'])
def create_task():
    if request.method == 'POST':
        request_data = request.get_json()
        description = request_data['description']
        created_task = Task(uuid.uuid4(), description, False)
        created_task.display_task() #Тест создания задачи
        cards_list.append(created_task)
        print(cards_list[-1])

    return '''
        ID: {}
        Description: {}
        Is resolved: {}'''.format(created_task.id, created_task.description, created_task.is_resolved)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5555, debug=True)