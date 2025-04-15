const Todo = require('../models/Todo');

//Get-todo
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//add-todo
exports.addTodo = async (req, res) => {
  const { title } = req.body;

  try {
    const newTodo = new Todo({
      title,
      user: req.user._id
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//update-todo
exports.updateTodo = async (req, res) => {
  const { title, completed } = req.body;

  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: { title, completed } },
      { new: true }
    );

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//delete-todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    console.log("🚀 ~ exports.deleteTodo ~ todo:", todo)

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Todo.findByIdAndDelete(req.params.id); 

    res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
