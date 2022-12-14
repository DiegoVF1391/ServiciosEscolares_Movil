import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, FlatList, TextInput, CheckBox} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';

const MostrarSolicitudesScreen = ({navigation, route}) => {
  const {userInfo} = useContext(AuthContext);
  const servicio = route.params.servicio;
  const [nombre, setNombre] = useState(servicio.nombre);
  const [descripcion, setDescripcion] = useState(servicio.descripcion);
  const [comentarios, setComentarios] = useState(servicio.comentarios);
  const [fechaAsignacion, setFechaAsignacion] = useState(servicio.fechaAsignacion);
  const [estado, setEstado] = useState(servicio.estado);
  const [isSelected, setSelection] = useState(false);
  const [loading, setLoading] = useState(false);

  const editServicio = () => {
    setLoading(true);

    axios
      .put(
        `${BASE_URL}/servicios/${servicio.id_solicitud}`,
        {
          nombre,
          descripcion,
          comentarios,
          estado,
        },
        {
          headers: {Authorization: `Bearer ${userInfo.access_token}`},
        },
      )
      .then(res => {
        setLoading(false);
        console.log(res.data);
        console.log(estado);
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
      
      <Text style={styles.input}>{fechaAsignacion}</Text>

      <TextInput
        placeholder="Comentarios"
        style={styles.input}
        value={comentarios}
        onChangeText={val => {
          setComentarios(val);
        }}
      />

			{/*<View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Ya termino la solicitud asignada?</Text>
      </View>*/}

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
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
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
      label: {
        margin: 8,
      },
});

export default MostrarSolicitudesScreen;
