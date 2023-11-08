import { useEffect } from "react";
import { Box, Flex, HStack, Image, Link, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Link as ReactRouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };
  return (
    <Box bg={'blue.900'} px={4} position="sticky" top={0} zIndex={1000}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Link as={ReactRouterLink} to='/'>
            <Image
              src='https://mc-8afc6902-e56c-432c-8c3f-3991-cdn-endpoint.azureedge.net/-/media/project/emea/shared/global-logo/globallogo_nttdata_white_resized.png?hash='
              maxHeight={12}
              alt="Logo"
            />
          </Link>
        </HStack>
        <Link as={ReactRouterLink} to='/login'>
          <Button onClick={handleLogout} colorScheme="whiteAlpha" variant='solid' rightIcon={<ArrowForwardIcon />}>
            Cerrar sesión
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default Navbar;