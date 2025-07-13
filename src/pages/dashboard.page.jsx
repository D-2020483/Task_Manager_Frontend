import { Typography, Box, FormControl } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { Plus, Trash2, PencilIcon } from "lucide-react";
import { Paper, Modal, Select, MenuItem, InputLabel } from "@mui/material";
import api from "../utils/api";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  height: "70vh",
  overflowY: "auto",
  backgroundColor: "#fff",
  p: 4,
  borderRadius: "8px",
};

const DashboardPage = () => {
  //state for tasks
  const [tasks, setTasks] = useState([]);

  //form fields
  const [newTask, setNewTask] = useState(""); //input state
  const [description, setDescription] = useState(""); //description for each task
  const [dueDate, setDueDate] = useState(""); //due date for each task
  const [status, setStatus] = useState(""); //status for each task

  //modal state
  const [open, setOpen] = useState(false); //modal state
  const [editingIndex, setEditingIndex] = useState(null); //editing index

  //filter and sort state
  const [filterStatus, setFilterStatus] = useState("all"); //filter state
  const [sortBy, setSortBy] = useState("none"); //sort state

  // get all the tasks for the dashboard
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  //open modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewTask("");
    setDescription("");
    setDueDate("");
    setStatus("pending");
    setEditingIndex(null);
  };

  //Add new task or edit task
  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title: newTask, description, dueDate, status };

    try {
      if (editingIndex !== null) {
        const taskToUpdate = tasks[editingIndex];
        const response = await api.put(`/tasks/${taskToUpdate._id}`, taskData);

        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = response.data;
        setTasks(updatedTasks);
      } else {
        const response = await api.post("/tasks", taskData);
        setTasks([...tasks, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  //delete task
  const handleDelete = async (index) => {
    const taskToDelete = tasks[index];
    try {
      await api.delete(`/tasks/${taskToDelete._id}`);

      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  //edit task
  const handleEdit = (index) => {
    const task = tasks[index];
    setNewTask(task.title);
    setEditingIndex(task.description);
    setDueDate(task.dueDate);
    setStatus(task.status);
    setEditingIndex(index);
    handleOpen();
  };

  //filter tasks and sort tasks
  const filteredAndSortedTasks = tasks
    .filter((task) =>
      filterStatus === "all" ? true : task.status === filterStatus
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  return (
    <div className="h-screen bg-gray-300 p-8">
      <div className="flex justify-between items-center mb-8">
        <Typography variant="h4" className="text-gray-900 font-bold">
          Task Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={handleOpen}
          className="bg-blue-700  hover:bg-blue-700 text-white"
        >
          Add Task
        </Button>
      </div>
      {/*Filter and sort*/}
      <div className="flex gap-4 mt-4">
        {/*Filter by status*/}
        <FormControl size="small" className="w-40">
          <InputLabel>Status</InputLabel>
          <Select
            labelId="status-label"
            id="status-select"
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
        {/*Sort by Due Date*/}
        <FormControl size="small" className="w-40">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="date">Due Date</MenuItem>
          </Select>
        </FormControl>
      </div>
      {/*Task list*/}
      <div className="grid gap-4 mt-4">
        {filteredAndSortedTasks.map((task, index) => (
          <Paper key={index} className="flex justify-between items-center p-4">
            <Box className="flex-1">
              <Typography className="font-bold">{task.title}</Typography>
              <Typography className="text-sm text-gray-400">
                {task.description}
              </Typography>
              <Typography className="text-sm text-gray-400">
                Due: {task.dueDate?.slice(0, 10)} | Status: {task.status}
              </Typography>
            </Box>
            <div className="flex gap-2">
              {/*Edit button*/}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(index)}
                startIcon={<PencilIcon />}
              >
                Edit
              </Button>
              {/*Delete button*/}
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(index)}
                startIcon={<Trash2 />}
              >
                Delete
              </Button>
            </div>
          </Paper>
        ))}
      </div>
      {/*Modal for adding and editing task*/}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" className="mb-4">
            {editingIndex !== null ? "Edit Task" : "Add new Task"}
          </Typography>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              label="Task"
              variant="outlined"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              className="bg-blue-700 text-white"
            >
              {editingIndex !== null ? "Update" : "Add"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default DashboardPage;
