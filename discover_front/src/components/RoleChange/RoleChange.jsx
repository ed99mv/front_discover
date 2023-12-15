import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../authContext";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
} from "reactstrap";

const RoleChange = ({ isRoleChangeOpen, toggle }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { userRole } = useContext(AuthContext);

  // Obtener lista de usuarios
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/users")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sortedUsers = data.sort((a, b) => {
            const emailA = a.email.toLowerCase();
            const emailB = b.email.toLowerCase();
            if (emailA < emailB) {
              return -1;
            }
            if (emailA > emailB) {
              return 1;
            }
            return 0;
          });
          setUsers(sortedUsers);
        } else {
          throw new Error("Data fetched is not an array");
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/api/v1/users/${selectedUser}/change_role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: selectedRole }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
        setError("");
      })
      .catch((error) => {
        setMessage("");
        setError("Failed to change role.");
        console.error("Error changing role:", error);
      });
  };

  return (
    <>
      <Modal isOpen={isRoleChangeOpen} toggle={toggle}>
        <ModalHeader>Cambiar Rol de un Usuario</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div>
              <Label for="selectUser">Selecciona al usuario solicitante:</Label>
              <Input type="select" id="selectUser" onChange={handleChange}>
                <option value="">Seleccionar usuario</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </Input>
            </div>
            <br />
            <div>
              <Label for="selectRole">Seleccionar rol:</Label>
              <Input type="select" id="selectRole" onChange={handleRoleChange}>
                <option value="">Elige un rol</option>
                <option value="admin">admin</option>
                <option value="company">company</option>
                <option value="user">user</option>
              </Input>
            </div>
            <br />
            <Button type="submit">Cambiar Rol</Button>
          </form>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default RoleChange;
