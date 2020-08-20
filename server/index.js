const express = require("express");
const cors = require("cors");
const pool = require("./db");


const app = express();

// middleware

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ROUTES

// create todo

app.post("/todos",async(req, res) =>{
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
})
// get all todo
app.get("/todos", async(req,res) =>{
    try {
        const alltodos = await pool.query(
            "SELECT * FROM todo"
        );
        res.json(alltodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})
// get a todo
app.get("/todos/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})
// update a todo
app.put("/todos/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const {description} = req.body;

        const updatetodos = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description,id]
        );
        res.json("Todo Updated...");
    } catch (error) {
        console.error(error.message);
    }
})
// Delete todo
app.delete("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deletetodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("TODO IS DELETED ....");
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT}`);
});