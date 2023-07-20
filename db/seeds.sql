USE employees_db;

INSERT INTO departments (name)
values  ("Pizza Land"),
        ("Barone Sanitation"),
        ("Cozzarelli's"),
        ("Cleveland Auto Body"),
        ("Bada-Bing"),
        ("Esplanade Construction"),
        ("Satriale's"),
        ("Nuovo Vesuvio");

INSERT INTO roles (title, salary, department_id)
values  ("Dough Boy", 60000, 1),
        ("Waste Management Consultant", 12000000, 2),
        ("Director", 80000, 3),
        ("Manager", 80000, 4),
        ("Owner / Operator", 120000, 5),
        ("No-Work", 65000, 6),
        ("Butcher", 45000, 7),
        ("Owner", 65000, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
values  ("AJ", "Soprano", 1, 2),
        ("Tony", "Soprano", 2, 2),
        ("Russ", "Cozzarelli", 3, 2),
        ("Angie", "Bonpensiero", 4, 2),
        ("Silvio", "Dante", 5, 2),
        ("Finn", "DeTrolio", 6, 2),
        ("Furio", "Giunta", 7, 2),
        ("Artie", "Bucco", 8, 2),
        ("Charmaine", "Bucco", 8, 2);
