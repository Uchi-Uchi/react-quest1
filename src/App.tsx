import React from "react";
import './styles.css';
import { RecoilRoot } from "recoil";
import AppContent from "./components/AppContent";
import { ChakraProvider } from '@chakra-ui/react'


const App: React.FC =() => {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <AppContent />
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default App;


