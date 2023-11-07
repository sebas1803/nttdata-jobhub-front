import { useState } from 'react'
import {
  Grid, HStack, VStack, Flex, Divider, Avatar, IconButton, Text, Tag, TagLabel, Card,
  CardBody, Heading, Input, InputGroup, InputLeftElement, Stack, useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import Navbar from "../layouts/Navbar";
import EmployeeModal from '../components/EmployeeModal';

const employees = [
  {
    id: 1,
    name: "Sebastian Santiago Alfaro Mendoza",
    phoneNumber: "123-456-7890",
    dni: "12345678",
    address: "123 Main St",
    birthdate: "1990-01-01",
    offices: ["Oficina A", "Oficina B", "Oficina C", "Oficina D"],
  },
  {
    id: 2,
    name: "Johana Campos Davila",
    phoneNumber: "987-654-3210",
    dni: "87654321",
    address: "456 Elm St",
    birthdate: "1995-03-16",
    offices: ["Oficina B", "Oficina C"],
  },
  {
    id: 3,
    name: "Alex Gabriel Quispe Bendezu",
    phoneNumber: "987-654-3210",
    dni: "87654321",
    address: "456 Elm St",
    birthdate: "1995-03-15",
    offices: ["Oficina B", "Oficina C"],
  },
  {
    id: 4,
    name: "Alex Gabriel Quispe Bendezu",
    phoneNumber: "987-654-3210",
    dni: "87654321",
    address: "456 Elm St",
    birthdate: "1995-03-15",
    offices: ["Oficina B", "Oficina C"],
  },
  {
    id: 5,
    name: "Alex Gabriel Quispe Bendezu",
    phoneNumber: "987-654-3210",
    dni: "87654321",
    address: "456 Elm St",
    birthdate: "1995-03-15",
    offices: ["Oficina B", "Oficina C"],
  },
  {
    id: 6,
    name: "Alex Gabriel Quispe Bendezu",
    phoneNumber: "987-654-3210",
    dni: "87654321",
    address: "456 Elm St",
    birthdate: "1995-03-15",
    offices: ["Oficina B", "Oficina C"],
  },
  {
    id: 7,
    name: "Alex Gabriel Quispe Bendezu",
    phoneNumber: "987-654-3210",
    dni: "87654321",
    address: "456 Elm St",
    birthdate: "1995-03-15",
    offices: ["Oficina B", "Oficina C"],
  }
  // Agrega más empleados con sus datos
];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    onOpen();
  };

  const handleDelete = (employee) => {
    const updatedEmployees = filteredEmployees.filter((e) => e.id !== employee.id);
    setFilteredEmployees(updatedEmployees);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    const updatedEmployees = filteredEmployees.map((employee) => {
      if (employee.id === updatedEmployee.id) {
        if (updatedEmployee.isRemote) {
          updatedEmployee.offices = ["Remoto"];
        }
        return updatedEmployee;
      }
      return employee;
    });
    setSelectedEmployee(updatedEmployee);
    setFilteredEmployees(updatedEmployees);
    onClose();
  };

  return (
    <>
      <Navbar />
      <Flex minH={"100vh"} justify={"center"} align="center">
        <Stack spacing={6} mx={"auto"} py={6} px={6}>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon color='gray.600' />
            </InputLeftElement>
            <Input type='text' placeholder='Buscar colaborador' value={searchTerm} onChange={handleSearch} />
          </InputGroup>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} maxW='300px' borderRadius="md" variant='outline' p={2}>
                <Flex justify="end">
                  <IconButton variant='ghost' size='sm' icon={<EditIcon color="blue.500" />} onClick={() => handleEdit(employee)} />
                  <IconButton variant='ghost' size='sm' icon={<DeleteIcon color="red.500" />} onClick={() => handleDelete(employee)} />
                </Flex>
                <Heading fontSize="xl" fontWeight="bold" mt={2} mx={2}>{employee.name}</Heading>
                <CardBody>
                  <Avatar size='2xl' mb={4} name={employee.name} src='https://bit.ly/code-beast' />
                  <VStack spacing={2} align="baseline">
                    <HStack>
                      <Text as='b'>Teléfono:</Text>
                      <Text>{employee.phoneNumber}</Text>
                    </HStack>
                    <HStack>
                      <Text as='b'>DNI:</Text>
                      <Text>{employee.dni}</Text>
                    </HStack>
                    <HStack>
                      <Text as='b'>Dirección:</Text>
                      <Text>{employee.address}</Text>
                    </HStack>
                    <HStack>
                      <Text as='b'>F. de nacimiento:</Text>
                      <Text>{employee.birthdate}</Text>
                    </HStack>
                  </VStack>
                  <Divider my={2} />
                  <HStack spacing={2} flexWrap="wrap" justify="center">
                    {employee.offices.map((office, index) => (
                      <Tag key={index} variant='subtle' colorScheme='blue'>
                        <TagLabel>{office}</TagLabel>
                      </Tag>
                    ))}
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Flex>
      <EmployeeModal isOpen={isOpen} onClose={onClose} employee={selectedEmployee} onUpdateEmployee={handleUpdateEmployee} />
    </>
  );
}

export default Home;