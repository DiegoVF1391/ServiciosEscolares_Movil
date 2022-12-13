import React, {useContext, useState} from 'react';
import {
  Button,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';

const CrearBitacoraScreen = ({navigation}) => {
  const [actividad, setActividad] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [loading, setLoading] = useState(false);
	const {userInfo} = useContext(AuthContext);
  const [bitacora, setBitacora] = useState({});

  const crearBitacora = () => {
    setLoading(true);

    axios
      .post(`${BASE_URL}/bitacoras`, {actividad, descripcion},
      {
        headers: {Authorization: `Bearer ${userInfo.access_token}`},
      })
      .then(res => {
        console.log(res.data);
        setLoading(false);
        setBitacora(res.data);
        navigation.navigate('Home');
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error al obtener solicitudes de servicios ${e.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={actividad}
          placeholder="Ingresar actividad"
          onChangeText={text => setActividad(text)}
        />

        <TextInput
          style={styles.input}
          value={descripcion}
          placeholder="Ingresar la descripción"
          onChangeText={text => setDescripcion(text)}
        />

        <Button
          title="Registrar solicitud"
          onPress={crearBitacora}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default CrearBitacoraScreen;
