// Demo data used while VITE_USE_MOCK=true.
// Later your FastAPI backend (AI + database) replaces all of this.

export const TARGET_ROLE = {
  name: "Backend Developer",
  required: ["Python", "Django", "FastAPI", "SQL", "Docker", "AWS", "Redis", "Git", "REST APIs"],
};

// keywords used to "detect" skills from a plain-text resume in mock mode
export const SKILL_KEYWORDS = {
  Python: ["python"],
  Django: ["django"],
  FastAPI: ["fastapi"],
  SQL: ["sql", "mysql", "postgres"],
  Docker: ["docker"],
  AWS: ["aws", "amazon web services"],
  Redis: ["redis"],
  Git: ["git", "github"],
  "REST APIs": ["rest", "api"],
  React: ["react"],
  JavaScript: ["javascript"],
  "Node.js": ["node"],
};

export const DEFAULT_RESUME_SKILLS = ["Python", "Django", "SQL"];

// 4 learning steps per skill
export const LEARNING = {
  FastAPI: [
    ["FastAPI basics: routes & Pydantic", "2 hrs", "https://fastapi.tiangolo.com/tutorial/"],
    ["Build a CRUD API with SQLAlchemy", "4 hrs", "https://fastapi.tiangolo.com/tutorial/sql-databases/"],
    ["JWT authentication", "3 hrs", "https://fastapi.tiangolo.com/tutorial/security/"],
    ["Mini project: Notes API", "5 hrs", "https://fastapi.tiangolo.com/"],
  ],
  Docker: [
    ["Containers & images explained", "2 hrs", "https://docs.docker.com/get-started/"],
    ["Write your first Dockerfile", "2 hrs", "https://docs.docker.com/build/concepts/dockerfile/"],
    ["Docker Compose for app + database", "3 hrs", "https://docs.docker.com/compose/gettingstarted/"],
    ["Dockerize your Python API", "3 hrs", "https://docs.docker.com/language/python/"],
  ],
  AWS: [
    ["Cloud and AWS fundamentals", "3 hrs", "https://aws.amazon.com/getting-started/"],
    ["EC2: launch a server", "3 hrs", "https://docs.aws.amazon.com/ec2/"],
    ["S3 file storage", "2 hrs", "https://docs.aws.amazon.com/s3/"],
    ["Deploy a backend on AWS", "5 hrs", "https://aws.amazon.com/getting-started/hands-on/"],
  ],
  Redis: [
    ["What is Redis? Data types", "2 hrs", "https://redis.io/docs/latest/get-started/"],
    ["Caching patterns", "2 hrs", "https://redis.io/docs/latest/develop/"],
    ["Redis with Python (redis-py)", "2 hrs", "https://redis.io/docs/latest/develop/clients/redis-py/"],
    ["Add caching to your API", "3 hrs", "https://redis.io/docs/latest/"],
  ],
  Git: [
    ["Git basics: commit, branch, merge", "2 hrs", "https://git-scm.com/doc"],
    ["GitHub pull request workflow", "2 hrs", "https://docs.github.com/en/get-started"],
    ["Resolve merge conflicts", "1 hr", "https://git-scm.com/book/en/v2"],
    ["Collaborate on a real repo", "3 hrs", "https://docs.github.com/en/get-started"],
  ],
  "REST APIs": [
    ["REST principles & HTTP methods", "2 hrs", "https://developer.mozilla.org/en-US/docs/Web/HTTP"],
    ["Status codes & error handling", "1 hr", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"],
    ["API design best practices", "2 hrs", "https://developer.mozilla.org/en-US/docs/Web/HTTP"],
    ["Document an API with OpenAPI", "2 hrs", "https://swagger.io/docs/"],
  ],
  Django: [
    ["Django project structure", "2 hrs", "https://docs.djangoproject.com/en/stable/intro/tutorial01/"],
    ["Models & ORM", "3 hrs", "https://docs.djangoproject.com/en/stable/topics/db/models/"],
    ["Django REST Framework", "4 hrs", "https://www.django-rest-framework.org/tutorial/quickstart/"],
    ["Deploy a Django app", "3 hrs", "https://docs.djangoproject.com/en/stable/howto/deployment/"],
  ],
  SQL: [
    ["SELECT, WHERE, ORDER BY", "2 hrs", "https://www.postgresql.org/docs/current/tutorial.html"],
    ["JOINs and aggregates", "3 hrs", "https://www.postgresql.org/docs/current/tutorial-join.html"],
    ["Indexes & query tuning", "3 hrs", "https://www.postgresql.org/docs/current/indexes.html"],
    ["Design a schema", "3 hrs", "https://www.postgresql.org/docs/current/ddl.html"],
  ],
  Python: [
    ["Python core syntax", "3 hrs", "https://docs.python.org/3/tutorial/"],
    ["OOP & modules", "3 hrs", "https://docs.python.org/3/tutorial/classes.html"],
    ["Virtual envs & packages", "1 hr", "https://docs.python.org/3/tutorial/venv.html"],
    ["Write tests with pytest", "2 hrs", "https://docs.pytest.org/"],
  ],
};

export const JOBS = [
  { id: 1, title: "Python Backend Developer", company: "TechNova", location: "Ahmedabad, IN", type: "Full-time", salary: "₹6–9 LPA", skills: ["Python", "Django", "SQL", "Git"] },
  { id: 2, title: "FastAPI Developer", company: "CloudNest", location: "Remote", type: "Full-time", salary: "₹8–12 LPA", skills: ["Python", "FastAPI", "Docker", "SQL"] },
  { id: 3, title: "Junior Django Developer", company: "InfoBridge", location: "Pune, IN", type: "Full-time", salary: "₹4–6 LPA", skills: ["Python", "Django", "SQL"] },
  { id: 4, title: "Backend Engineer", company: "Streamly", location: "Bengaluru, IN", type: "Full-time", salary: "₹10–15 LPA", skills: ["Python", "Redis", "AWS", "Docker"] },
  { id: 5, title: "API Developer Intern", company: "DataPulse", location: "Remote", type: "Internship", salary: "₹15–25k / mo", skills: ["Python", "REST APIs", "Git"] },
  { id: 6, title: "Full Stack Python Developer", company: "PixelForge", location: "Surat, IN", type: "Full-time", salary: "₹7–10 LPA", skills: ["Python", "Django", "React", "SQL"] },
  { id: 7, title: "Cloud Backend Developer", company: "SkyLayer", location: "Hyderabad, IN", type: "Full-time", salary: "₹12–18 LPA", skills: ["Python", "AWS", "Docker", "FastAPI"] },
  { id: 8, title: "Software Engineer - Python", company: "Zentrix", location: "Mumbai, IN", type: "Full-time", salary: "₹8–14 LPA", skills: ["Python", "SQL", "Git", "REST APIs"] },
  { id: 9, title: "Data Platform Engineer", company: "Insightly", location: "Remote", type: "Contract", salary: "₹14–20 LPA", skills: ["Python", "SQL", "AWS", "Redis"] },
  { id: 10, title: "Backend Developer (Django)", company: "ShopSphere", location: "Ahmedabad, IN", type: "Full-time", salary: "₹5–8 LPA", skills: ["Django", "SQL", "REST APIs", "Git"] },
];
