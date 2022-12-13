import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';

const MostrarBitacorasScreen = ({navigation, route}) => {
  const {userInfo, isLoading, logout} = useContext(AuthContext);
  const [bitacoras, setBitacoras] = useState({});

  {/*const getBitacoras = () => {
    axios
      .get(`${BASE_URL}/bitacoras`, {
        headers: {Authorization: `Bearer ${userInfo.access_token}`},
      })
      .then(res => {
        console.log(res.data);
        setBitacoras(res.data);
      })
      .catch(e => {
        console.log(`Error al obtener solicitudes de servicios ${e.message}`);
      });
  };

  useEffect(() => {
    getBitacoras();
  }, [route.params?.bitacoras]);*/}
  
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.welcome}>Mostrar Bitacoras</Text>
      {/*<FlatList
        data={bitacoras}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.itemWrapper}>
              <Text style={styles.title}>{item.nombre}</Text>
              <Text>{item.descripcion}</Text>
              <Text style={styles.author}>{item.estado}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
    />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DEDEDE',
    borderRadius: 15,
    shadowColor: "#9E9E9E",
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    paddingTop: 50,
    paddingBottom: 50,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#DEDEDE",
    borderColor: "#999999",
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MostrarBitacorasScreen;
