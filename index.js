const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
let requests = 0;

server.use((req, res, next) => {
    requests++;
    console.log("Requests: ", requests);
    next();
});

function checkProjectExists(req, res, next) {
    const { id } = req.params;
    project = projects.find(item => item.id == id);

    if (!project) {
        return res.status(400).json({ error: "Project does not exists" });
    }

    return next();
}

server.get("/projects", (req, res) => {
    return res.json(projects);
});

server.post("/projects", (req, res) => {
    projects.push(req.body);
    return res.json(projects);
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(item => item.id == id);

    project.tasks.push(title);

    return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(item => item.id == id);

    project.title = title;

    return res.json(projects);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
    const { id } = req.params;

    const index = projects.findIndex(item => item.id == id);

    projects.splice(index, 1);

    return res.send();
});

server.listen(3000);
