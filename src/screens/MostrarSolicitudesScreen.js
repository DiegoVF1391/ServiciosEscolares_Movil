import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, FlatList, TextInput} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';

const MostrarSolicitudesScreen = ({navigation, route}) => {
  const {userInfo} = useContext(AuthContext);
  const [bitacoras, setBitacoras] = useState({});
  const servicio = route.params.servicio;
  const [nombre, setNombre] = useState(servicio.nombre);
  const [descripcion, setDescripcion] = useState(servicio.descripcion);
  const [loading, setLoading] = useState(false);

  console.log(servicio);

  const editServicio = () => {
    setLoading(true);

    axios
      .put(
        `${BASE_URL}/servicios/${servicio.id_solicitud}`,
        {
          nombre,
          descripcion,
        },
        {
          headers: {Authorization: `Bearer ${userInfo.access_token}`},
        },
      )
      .then(res => {
        setLoading(false);
        console.log(res.data);
        navigation.navigate('Home');
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on updating post ${e.message}`);
      });
  };

  const deleteServicio = () => {
    setLoading(true);

    axios
      .delete(`${BASE_URL}/servicios/${servicio.id_solicitud}`, {
        headers: {Authorization: `Bearer ${userInfo.access_token}`},
      })
      .then(res => {
        console.log(res.data);
        setLoading(false);
        navigation.navigate('Home');
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on deleting post ${e.message}`);
      });
  };


  return (
    
    <View style={styles.container}>
    <Spinner visible={loading} />
    <View style={styles.wrapper}>
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={nombre}
        onChangeText={val => {
          setNombre(val);
        }}
      />
      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={descripcion}
        onChangeText={val => {
          setDescripcion(val);
        }}
      />

    <Button title="Actualizar" color="blue" onPress={editServicio} />
      <View style={{marginTop: 4}}>
        <Button title="Cancelar" color="red" onPress={deleteServicio} />
      </View>
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
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        padding: 12,
      },
      link: {
        color: 'blue',
      },
});

export default MostrarSolicitudesScreen;
