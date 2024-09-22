import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import Task from '../models/Task.js';

const chai = use(chaiHttp);


describe('Task Controller', () => {
  let taskId;

  it('should get all tasks', (done) => {
    chai.request.execute(app)
      .get('/api/tasks')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(0);
        done();
      });
  });

  it('should add a new task', (done) => {
    const newTask = { 
      assignedTo: 'User1', 
      description: 'This is a new task', 
      dueDate: '2024-09-30', 
      priority: 'High', 
      status: 'Not Started'  
    };

    chai.request.execute(app)
      .post('/api/tasks')
      .send(newTask)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.assignedTo).to.be.equal(newTask.assignedTo);
        expect(res.body.description).to.be.equal(newTask.description);
        taskId = res.body._id;
        done();
      });
  });

  it('should update an existing task', (done) => {
    const updatedTask = { 
      assignedTo: 'User1', 
      description: 'This is an updated task', 
      dueDate: '2024-10-01', 
      priority: 'Low', 
      status: 'In Progress' 
    };

    chai.request.execute(app)
      .put(`/api/tasks/${taskId}`)
      .send(updatedTask)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.description).to.be.equal(updatedTask.description);
        done();
      });
  });

  it('should delete an existing task', (done) => {
    chai.request.execute(app)
      .delete(`/api/tasks/${taskId}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(204);
        done();
      });
  });
});
