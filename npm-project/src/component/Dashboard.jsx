import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  FaBars, FaProjectDiagram, FaTasks, FaChartPie, FaCog, FaSignOutAlt,
  FaSun, FaMoon, FaSearch, FaBell, FaUserCircle, FaPlus, FaEdit, FaTrash 
} from "react-icons/fa";
import "./Dashboard.css";  // Make sure this file exists

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [projects, setProjects] = useState(["Project A", "Project B", "Project C"]);
  const [newProject, setNewProject] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:5000/api/auth/me");
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  const addProject = () => {
    if (newProject.trim()) {
      setProjects([...projects, newProject]);
      setNewProject("");
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task = { id: Date.now(), text: newTask, completed: false, priority: "Medium" };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button onClick={() => setCollapsed(!collapsed)} className="collapse-btn">
          <FaBars />
        </button>
        <h2 className="sidebar-title">{collapsed ? "" : "Dashboard"}</h2>
        <ul className="nav-list">
          <li className="nav-item">
            <FaProjectDiagram />
            {!collapsed && <span>Projects</span>}
          </li>
          <li className="nav-item">
            <FaTasks />
            {!collapsed && <span>Tasks</span>}
          </li>
          <li className="nav-item">
            <FaChartPie />
            {!collapsed && <span>Analytics</span>}
          </li>
          <li className="nav-item">
            <FaCog />
            {!collapsed && <span>Settings</span>}
          </li>
        </ul>
        <button onClick={handleSignOut} className="signout-btn">
          <FaSignOutAlt />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </aside>

      {/* Main Section */}
      <div className="main-section">
        {/* Top Navigation Bar */}
        <header className="topbar">
          <div className="welcome">
            <h2>Welcome, {user?.email}</h2>
            <br/>
          </div>
          <div className="topbar-actions">
            <div className="search-box">
              <input type="text" placeholder="Search..." />
              <FaSearch className="search-icon" />
            </div>
            <br/>
            <button onClick={() => setDarkMode(!darkMode)} className="mode-btn">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button className="notification-btn">
              <FaBell />
              {notifications.length > 0 && <span className="notif-count">{notifications.length}</span>}
            </button>
            <FaUserCircle className="user-icon" />
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="main-content">
          <div className="grid-container">
            {/* Projects Section */}
            <section className="projects-section">
              <h3 className="section-title">Projects</h3>
              <ul className="project-list">
                {projects.map((project, index) => (
                  <li key={index} className="project-item">
                    {project}
                    <div className="project-actions">
                      <button className="edit-btn"><FaEdit /></button>
                      <button className="delete-btn"><FaTrash /></button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="project-add">
                <input
                  type="text"
                  placeholder="New project name"
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                />
                <button onClick={addProject} className="add-btn">
                  <FaPlus /> Add
                </button>
              </div>
            </section>

            {/* Tasks Section */}
            <section className="tasks-section">
              <h3 className="section-title">Task Management</h3>
              <div className="task-add">
                <input
                  type="text"
                  placeholder="Enter a new task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask} className="add-btn">
                  Add
                </button>
              </div>
              <ul className="task-list">
                {tasks.map((task, index) => (
                  <li key={task.id} className="task-item">
                    {task.text} ({task.priority})
                    <div className="task-actions">
                      <button onClick={() => toggleTask(task.id)} className="toggle-btn">Toggle</button>
                      <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
