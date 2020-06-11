import express, { Application, Request, Response } from 'express';
import Joi from 'joi';
import { Course } from './models/courses.model';

const app = express();

app.use(express.json());

let courses: Array<Course> = [{
    id: 1,
    name: 'course1'
},
{
    id: 2,
    name: 'course2'
},
{
    id: 3,
    name: 'course3'
},
]

app.get('/', (req, res) => {
    res.send("Hello World!!!");
});

app.get('/api/courses', (req: Request, res, Response) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(course => course.id === id);
    if (!course) {
        res.status(404).send(`The course with id=${id} was not found`);
    } else {
        res.send(course);
    }
});

app.post('/api/courses', (req, res) => {
    const {
        error
    } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: ++courses.length,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!id || id === NaN) {
        res.status(400).send(`The course id=${req.params.id} is not valid.`);
        return;
    }

    const {
        error
    } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const courseIndex = courses.findIndex(course => course.id === id);
    if (courseIndex < 0) {
        res.status(404).send(`The course with id=${id} was not found`);
    }

    courses[courseIndex].name = req.body.name;
    res.send(courses[courseIndex])

});

app.delete('/api/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!id || id === NaN) {
        res.status(400).send(`The course id=${req.params.id} is not valid.`);
        return;
    }

    const courseIndex = courses.findIndex(course => course.id === id);
    if (courseIndex < 0) {
        res.status(404).send(`The course with id=${id} was not found`);
        return;
    }
    res.send(courses.splice(courseIndex, 1));
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

function validateCourse(course: any) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course as any, schema);
}