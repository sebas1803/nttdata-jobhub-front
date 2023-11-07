import { useState, useEffect } from 'react'
import {
  VStack, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormLabel, FormControl, HStack, Select, Tag, TagLabel, TagCloseButton, Stack, Switch, Flex
} from "@chakra-ui/react";

function EmployeeModal({ isOpen, onClose, employee, onUpdateEmployee }) {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    phoneNumber: "",
    dni: "",
    address: "",
    offices: [],
    isRemote: false,
  });

  const [selectedOffice, setSelectedOffice] = useState("");
  const [officeOptions, setOfficeOptions] = useState([]);
  const [isRemote, setIsRemote] = useState(false);

  useEffect(() => {
    if (employee) {
      setEmployeeData({ ...employee });
    }
  }, [employee]);

  const handleFieldChange = (fieldName, value) => {
    setEmployeeData({
      ...employeeData,
      [fieldName]: value,
    });
  };

  const handleUpdateOffices = (newOffices) => {
    setEmployeeData({
      ...employeeData,
      offices: newOffices,
    });
  };

  const handleAddOffice = () => {
    if (selectedOffice && !isRemote) {
      setEmployeeData({
        ...employeeData,
        offices: [...employeeData.offices, selectedOffice],
      });
      setSelectedOffice("");
    }
  };

  const handleRemoveOffice = (officeToRemove) => {
    const updatedOffices = employeeData.offices.filter((office) => office !== officeToRemove);
    handleUpdateOffices(updatedOffices);
  };

  const handleUpdate = () => {
    if (isRemote) {
      employeeData.offices = ["Remoto"];
    }
    onUpdateEmployee(employeeData);
  };

  return (
    <Modal blockScrollOnMount={true} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar colaborador</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="baseline">
            <FormControl>
              <FormLabel>Nombre:</FormLabel>
              <Input value={employeeData.name} onChange={(e) => handleFieldChange("name", e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Telefono:</FormLabel>
              <Input value={employeeData.phoneNumber} onChange={(e) => handleFieldChange("phoneNumber", e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>DNI:</FormLabel>
              <Input value={employeeData.dni} onChange={(e) => handleFieldChange("dni", e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Dirección:</FormLabel>
              <Input value={employeeData.address} onChange={(e) => handleFieldChange("address", e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Oficinas:</FormLabel>
              <Stack>
                <Flex justify="space-between">
                  <HStack spacing={2} flexWrap="wrap">
                    {isRemote ? ( // Si es remoto, muestra el tag "Remoto"
                      <Tag variant='subtle' colorScheme='blue'>
                        <TagLabel>Remoto</TagLabel>
                      </Tag>
                    ) : (
                      employeeData.offices.map((office, index) => ( // Si no es remoto, muestra las oficinas
                        <Tag key={index} variant='subtle' colorScheme='blue'>
                          <TagLabel>{office}</TagLabel>
                          <TagCloseButton onClick={() => handleRemoveOffice(office)} />
                        </Tag>
                      ))
                    )}
                  </HStack>
                  <HStack align="center">
                    <FormLabel m={0}>Remoto</FormLabel>
                    <Switch onChange={() => setIsRemote(!isRemote)} isChecked={isRemote} />
                  </HStack>
                </Flex>
                <Select value={selectedOffice} onChange={(e) => setSelectedOffice(e.target.value)} defaultValue="">
                  <option value="" disabled>Seleccionar oficina</option>
                  <option value="Oficina A">Oficina A</option>
                  <option value="Oficina B">Oficina B</option>
                  {/* Agrega más opciones según sea necesario */}
                </Select>
                <Button size="sm" onClick={handleAddOffice}>
                  Agregar
                </Button>
              </Stack>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdate}>Guardar</Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EmployeeModal;