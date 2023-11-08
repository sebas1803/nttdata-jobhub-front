import { useState, useEffect } from 'react'
import {
  Grid, HStack, VStack, Flex, Divider, Avatar, IconButton, Text, Tag, TagLabel, Card,
  CardBody, Heading, Input, InputGroup, InputLeftElement, Stack, useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import Navbar from "../layouts/Navbar";
import EmployeeModal from '../components/EmployeeModal';
import { getAllEmployees, deleteEmployee, updateEmployee } from '../services/EmployeeService'

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees();
        setEmployees(response);
        setFilteredEmployees(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, []);

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

  const handleDelete = async (employee) => {
    try {
      await deleteEmployee(employee.id);
      const updatedEmployees = filteredEmployees.filter((e) => e.id !== employee.id);
      setFilteredEmployees(updatedEmployees);
    } catch (error) {
      console.log("Error al eliminar empleado: ", error);
    }
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      const officeIds = updatedEmployee.offices.map((office) => office.id);
      const updatedData = { ...updatedEmployee, offices: officeIds };
      await updateEmployee(updatedEmployee.id, updatedData);

      const updatedIndex = filteredEmployees.findIndex((employee) => employee.id === updatedEmployee.id);

      if (updatedIndex !== -1) {
        const updatedEmployees = [...filteredEmployees];
        updatedEmployees[updatedIndex] = updatedEmployee;
        setFilteredEmployees(updatedEmployees);
      }
      onClose();
    } catch (error) {
      console.error('Error al actualizar el empleado', error);
    }
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
              <Card key={employee.id} maxW='320px' borderRadius="md" variant='outline' p={2}>
                <Flex justify="end">
                  <IconButton variant='ghost' size='sm' icon={<EditIcon color="blue.500" />} onClick={() => handleEdit(employee)} />
                  <IconButton variant='ghost' size='sm' icon={<DeleteIcon color="red.500" />} onClick={() => handleDelete(employee)} />
                </Flex>
                <Heading fontSize="xl" fontWeight="bold" mt={2} mx={2}>{employee.name}</Heading>
                <CardBody>
                  <Avatar size='2xl' mb={4} bg='blue.200' />
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
                    {employee.remote ? (
                      <Tag variant='subtle' colorScheme='blue'>
                        <TagLabel>Remoto</TagLabel>
                      </Tag>
                    ) : (
                      employee.offices.map((office, index) => (
                        <Tag key={index} variant='subtle' colorScheme='blue'>
                          <TagLabel>{office.name}</TagLabel>
                        </Tag>
                      ))
                    )}
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