import React, {useContext, useState, useEffect} from 'react';
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  Picker,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';

const CrearSolicitudScreen = ({navigation, route}) => {
  const [nombre, setNombre] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [id_departamento, setIdDepartamento] = useState(null);
  const [loading, setLoading] = useState(false);
	const {userInfo} = useContext(AuthContext);
  const [solicitud, setSolicitud] = useState({});

  const crearSolicitud = () => {
    setLoading(true);

    axios
      .post(`${BASE_URL}/servicios`, {nombre, descripcion, id_departamento},
      {
        headers: {Authorization: `Bearer ${userInfo.access_token}`},
      })
      .then(res => {
        console.log(res.data);
        setLoading(false);
        setSolicitud(res.data);
        navigation.navigate('Home');
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error al crear solicitudes de servicios ${e.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={nombre}
          placeholder="Ingresar nombre de la solicitud"
          onChangeText={text => setNombre(text)}
        />

        <TextInput
          style={styles.input}
          value={descripcion}
          placeholder="Ingresar la descripción"
          onChangeText={text => setDescripcion(text)}
        />

			<Picker
      	selectedValue={id_departamento}
        style={styles.input}
        onValueChange={(itemValue) => setIdDepartamento(parseInt(itemValue))}
      >
        <Picker.Item label="Mantenimiento" value="1" />
        <Picker.Item label="IT" value="2" />
      </Picker>

        <Button
          title="Registrar solicitud"
          onPress={crearSolicitud}
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    padding: 14,
  },
  link: {
    color: 'blue',
  },
});

export default CrearSolicitudScreen;
