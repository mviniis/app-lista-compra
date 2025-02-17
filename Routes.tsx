import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Inicio from "./pages/Inicio";
import Cadastro from "./pages/Cadastro";

import { criarTabela, resetarTabelas } from './database/instance';
import Editar from './pages/Editar';

const Stack = createStackNavigator();

export default function Routes() {
  useEffect(() => {
    criarTabela();
  }, []);

	return (
    <NavigationContainer>
      <Stack.Navigator id={ undefined } initialRouteName="Início" >
        <Stack.Screen name="Início" component={ Inicio } />
        <Stack.Screen name="Cadastro" component={ Cadastro } />
        <Stack.Screen name="Edição" component={ Editar } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}