import {useState} from "react";
import {Button, Form, FormControl} from "react-bootstrap";
import {toast} from "react-toastify";

import Page from "../../components/Page";
import ListView from "../../components/ListView";
import Modal from "../../components/Modal";
import api from "../../services/axios";

const endpoint = "/departments";

const columns = [
    { value: "ID", id: "id" },
    { value: "Name", id:"name" },
];

const INITIAL_STATE = { id: 0, name:"" };

const Departments = () =>{
    const [visible, setVisible] = useState(false);
    const [department, setDepartment] = useState(INITIAL_STATE);

    const handleSave = async(refetch)=>{
        try {
            if (department.id){
                await api.put(`${endpoint}/${department.id}`, {name: department.name});
                toast.success("Atualizado com sucesso!");
            }else{
                await api.post(endpoint, {name:department.name});
                toast.success("Departamento cadastrado com sucesso!");
            }
            setVisible(false);
    
            await refetch();
        } catch (error){
            toast.error(error.message);
        }    
    }
    const handleClose = () => setVisible(false);
  
    const actions = [
        {
        name: "Edit",
        action: (_department)=>{ 
        setCourse(_department);
        setVisible(true);
    },
        },
        {   
            name: "Remove",
            action: async (department, refetch) => {
                if (window.confirm("você tem certeza disso?")){
                    try{
                        await api.delete(`${endpoint}/${department.id}`);
                        await refetch();
                        toast.info(`Departamento ${department.name} foi removido!`);
                    } catch (error){ 
                        toast.info(error.message);
                    }
                }    
            },
        },
        ];
        return (
            <Page title = "Departments">
                <Button className = "mb-2" onClick = {() =>{
                    setDepartment(INITIAL_STATE);
                    setVisible(true);
                }} 
                > 
        Create Department
        
    </Button>
    <ListView
    actions = {actions} 
    columns = {columns} 
    endpoint= {endpoint}
    >
        {({refetch}) => (
            <Modal 
            title={`${department.id ? "Update" : "Create"} Department`}
            show ={visible}
            handleSave={() =>handleSave(refetch)}
            handleClose={() => setVisible(false)}
            >
                <Form>
                    <Form Group>
                        <Form.Label>Department Name</Form.Label>
                        <FormControl 
                        name="department" 
                        onChange={(event)=> 
                            setDepartment({...department, name:event.target.value})
                    }
                    value={department.name}
                    />
                    </Form>
                </Form>
                </Modal>
                )}

    </ListView>
</Page>
);
};
     export default() =><div>Testando</div>