import { useState, useEffect } from 'react'
import {
  VStack, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormLabel, FormControl, HStack, Select, Tag, TagLabel, TagCloseButton, Stack, Switch, Flex
} from "@chakra-ui/react";
import { getAllOffices } from '../services/OfficeService'

function EmployeeModal({ isOpen, onClose, employee, onUpdateEmployee }) {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    phoneNumber: "",
    dni: "",
    address: "",
    offices: [],
    remote: false,
  });

  const [selectedOffice, setSelectedOffice] = useState("");
  const [officeOptions, setOfficeOptions] = useState([]);

  const [availableOffices, setAvailableOffices] = useState([]);


  useEffect(() => {
    if (employee) {
      setEmployeeData({ ...employee });
    }

    const fetchOffices = async () => {
      try {
        const offices = await getAllOffices();
        setOfficeOptions(offices);
        setAvailableOffices(offices);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOffices();
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
    if (selectedOffice && !employeeData.remote) {
      const selectedOfficeId = parseInt(selectedOffice);
      const officeToAdd = officeOptions.find((office) => office.id === selectedOfficeId);
      if (officeToAdd) {
        setEmployeeData({
          ...employeeData,
          offices: [...employeeData.offices, officeToAdd],
        });
        setSelectedOffice("");
      }
    }
  };

  const handleRemoveOffice = (officeToRemove) => {
    const updatedOffices = employeeData.offices.filter((office) => office !== officeToRemove);
    handleUpdateOffices(updatedOffices);
  };

  const handleUpdate = () => {
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
                    {employeeData.remote ? (
                      <Tag variant='subtle' colorScheme='blue'>
                        <TagLabel>Remoto</TagLabel>
                      </Tag>
                    ) : (
                      employeeData.offices.map((office, index) => (
                        <Tag key={index} variant='subtle' colorScheme='blue'>
                          <TagLabel>{office.name}</TagLabel>
                          <TagCloseButton onClick={() => handleRemoveOffice(office)} />
                        </Tag>
                      ))
                    )}
                  </HStack>
                  <HStack align="center">
                    <FormLabel m={0}>Remoto</FormLabel>
                    <Switch onChange={(e) => handleFieldChange("remote", e.target.checked)} isChecked={employeeData.remote} />
                  </HStack>
                </Flex>
                <Select value={selectedOffice} onChange={(e) => setSelectedOffice(e.target.value)} isDisabled={employeeData.remote}>
                  <option value="" disabled>Seleccionar oficina</option>
                  {availableOffices
                    .filter((office) => !employeeData.offices.some((addedOffice) => addedOffice.id === office.id))
                    .map((office) => (
                      <option key={office.id} value={office.id}>
                        {office.name}
                      </option>
                    ))}
                </Select>
                <Button size="sm" onClick={handleAddOffice} isDisabled={employeeData.remote}>
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