import {useEffect, useState} from "react";
import {Button, Form, FormControl} from "react-bootstrap";
import {toast} from "react-toastify";

import Page from "../../components/Page";
import ListView from "../../components/ListView";
import Modal from "../../components/Modal";
import api from "../../services/axios";

const endpoint = "/professors";

const columns = [
    { value: "ID", id: "id" },
    { value: "Name", id:"name" },
    { value:"CPF", id:"cpf"},
    {
        value: "Department",
        id: "departmentId",
        render: (department) => department.name,
    }
];
const INITIAL_STATE = { id: 0, name:"" };

const professor = () =>{
    const [professor, setProfessor] = useState(false);
    const [visible, setVisible] = useState(false);
    const [departments, setDepartment] = useState([]);

    useEffect(() => {
        api.get("/departments"). then((response) => {
            setDepartment(response.data);
        })
        .catch((error) => {
            toast.error(error.message);
        });
    }, []);

    const actions = [
        {
            name:"Edit",
            action: ({id, name, cpf, department: { id: departmentId}})
        }
    ]

     return<div>Testando</div>
};
