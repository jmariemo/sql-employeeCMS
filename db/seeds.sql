INSERT INTO department (department)
values  ("Operations"),
        ("Accounting"),
        ("Production"),
        ("Cut & Sew"),
        ("Garment Dye"),
        ("Quality Control"),
        ("Retail"),
        ("Wholesale"),
        ("Customer Service");

INSERT INTO role (title, salary, department_id)
values  ("Operations Manager", 120000, 1),
        ("CPA", 140000, 2),
        ("Pattern maker", 80000, 3),
        ("Garment Associate", 80000, 4),
        ("Dye Supervisor", 80000, 5),
        ("Trimming Supervisor", 60000, 6),
        ("Web Manager", 80000, 7),
        ("Wholesale Coordinator", 90000, 8),
        ("Concierge", 70000, 9);

INSERT INTO employee (first_name, last_name, role_id)
values  ("Monica", "Moyers", 1),
        ("Bob", "Weir", 2),
        ("Kate", "Bush", 3),
        ("Morocco", "Moyers", 4),
        ("Jazmin", "Rosado", 5),
        ("Jennifer", "Mo", 6),
        ("Ashley", "Michelson", 7),
        ("Katya", "Honda", 8),
        ("Paul", "Angeles", 9);
