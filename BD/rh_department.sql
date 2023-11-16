USE rh_department;

create table if not exists country
(
    country_id int auto_increment
        primary key,
    name       text null,
    status_id  int  not null
);

create table if not exists chargesbycountry
(
    charges_id int auto_increment
        primary key,
    country_id int           not null,
    name       text          null,
    percentage decimal(3, 2) null,
    status_id  int           not null,
    FOREIGN KEY (country_id) REFERENCES country(country_id),
    check (percentage between 0 and 100)
);


create table if not exists department
(
    department_id int auto_increment
        primary key,
    name          text null,
    status_id     int  not null
);

create table if not exists employee_role
(
    empl_role_id int auto_increment
        primary key,
    name         text    null,
    salary       decimal null,
    status_id    int     not null
);

create table if not exists status
(
    status_id int auto_increment
        primary key,
    name      text null
);

create table if not exists employee
(
    employee_id   int auto_increment
        primary key,
    emp_role_id   int     not null,
    FOREIGN KEY (emp_role_id) REFERENCES employee_role(empl_role_id),
    department_id int     not null,

    FOREIGN KEY (department_id) REFERENCES department(department_id),
    country_id    int     not null,
    FOREIGN KEY (country_id) REFERENCES country(country_id),
    name          text    null,
    status_id     int     not null,
    FOREIGN KEY (status_id) REFERENCES status(status_id),
    grade         decimal null
);

create table if not exists paymentsheet
(
    ps_id           int auto_increment
        primary key,
    emp_id          int  not null,
    FOREIGN KEY (emp_id) REFERENCES employee(employee_id),
    pay_period_from date null,
    pay_period_to   date null
);


create table if not exists paymentsheetdetail
(
    ps_id        int not null,
    FOREIGN KEY (ps_id) REFERENCES paymentsheet(ps_id),
    hours_worked int not null,
    days_worked  int not null
);














DELIMITER //
create procedure calculate_employee_payment()
BEGIN
    SELECT (hours_worked * salary) as gross_salary, (hours_worked * salary) - (salary * (percentage / 100)) as net_salary FROM paymentsheet ps
    INNER JOIN paymentsheetdetail AS psd
    ON ps.ps_id = psd.ps_id
    INNER JOIN employee AS em
    ON ps.emp_id = em.employee_id
    INNER JOIN employee_role AS er
    ON er.empl_role_id = em.emp_role_id
    INNER JOIN country as c
    ON c.country_id = em.country_id
    INNER JOIN chargesbycountry as cbc
    ON cbc.country_id = c.country_id;
END //
DELIMITER ;



DELIMITER //
create function hire_new_employee(in_emp_role_id int, in_department_id int, in_country_id int,
                                                        in_status_id int, in_name text) returns int
BEGIN
    DECLARE status_code INT DEFAULT 200;

    INSERT INTO employee (emp_role_id, department_id, country_id, name, status_id)
    VALUES (in_emp_role_id, in_department_id, in_country_id, in_status_id, in_name);

    IF ROW_COUNT() = 0 THEN
        SET status_code = 500;
    END IF;

    RETURN status_code;
END //

DELIMITER ;
