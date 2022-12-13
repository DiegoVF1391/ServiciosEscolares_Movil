import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, FlatList, TextInput} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';

const MostrarBitacorasScreen = ({navigation, route}) => {
  const {userInfo} = useContext(AuthContext);
  const bitacora = route.params.bitacora;
  const [actividad, setActividad] = useState(bitacora.actividad);
  const [descripcion, setDescripcion] = useState(bitacora.descripcion);
  const [fechaRegistro, setFechaRegistro] = useState(bitacora.fechaRegistro);
  const [loading, setLoading] = useState(false);

  const editBitacora = () => {
    setLoading(true);

    axios
      .put(
        `${BASE_URL}/bitacoras/${bitacora.id_bitacora}`,
        {
          actividad,
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

  const deleteBitacora = () => {
    setLoading(true);

    axios
      .delete(`${BASE_URL}/bitacoras/${bitacora.id_bitacora}`, {
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
        placeholder="Nombre de la actividad"
        style={styles.input}
        value={actividad}
        onChangeText={val => {
          setActividad(val);
        }}
      />
      <TextInput
        placeholder="Descripción de la bitacora"
        style={styles.input}
        value={descripcion}
        onChangeText={val => {
          setDescripcion(val);
        }}
      />
      <Text style={styles.input}>{fechaRegistro}</Text>

    <Button title="Actualizar" color="blue" onPress={editBitacora} />
      <View style={{marginTop: 4}}>
        <Button title="Eliminar" color="red" onPress={deleteBitacora} />
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

export default MostrarBitacorasScreen;
